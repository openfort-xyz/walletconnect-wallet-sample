import {Deferrable, defineReadOnly, resolveProperties} from "@ethersproject/properties";
import {Provider, TransactionRequest, TransactionResponse} from "@ethersproject/providers";
import {Signer} from "@ethersproject/abstract-signer";
import {getMultiSendAddress} from "./multisend";
import {BigNumber, Bytes, BigNumberish, ContractTransaction, ethers} from "ethers";
import {TypedDataUtils, SignTypedDataVersion} from "@metamask/eth-sig-util";
import {ERC4337EthersProvider} from "./ERC4337EthersProvider";
import {ClientConfig} from "./ClientConfig";
import {HttpRpcClient, UserOperationReceipt} from "./HttpRpcClient";
import {BaseAccountAPI, ExecuteType} from "./BaseAccountAPI";
import {Call, DelegateCall} from "../types";
import {_TypedDataEncoder} from "ethers/lib/utils";
import {fixSignedData, getERC1155Contract, getERC20Contract, getERC721Contract} from "../utils";
import {UserOperationStruct} from "@account-abstraction/contracts";
import {UpgradeableOpenfortAccount__factory} from "./contracts/typechain";

export enum AssetType {
    ETH = 1,
    ERC20 = 2,
    ERC721 = 3,
    ERC1155 = 4,
}

export interface AssetTransfer {
    asset_type: AssetType;
    address?: string;
    token_id?: BigNumberish;
    amount?: BigNumberish;
}

export interface AssetBalance {
    nft_assets: AssetTransfer[] | null;
    native_asset: AssetTransfer | null;
    token_assets: AssetTransfer[] | null;
}

export interface ExecArgs {
    gasLimit?: number;
    gasPrice?: BigNumberish;
}

export class ERC4337EthersSigner extends Signer {
    // TODO: we have 'erc4337provider', remove shared dependencies or avoid two-way reference
    constructor(
        readonly config: ClientConfig,
        readonly originalSigner: Signer,
        readonly erc4337EthersProvider: ERC4337EthersProvider,
        readonly httpRpcClient: HttpRpcClient,
        readonly smartAccountAPI: BaseAccountAPI,
    ) {
        super();
        defineReadOnly(this, "provider", erc4337EthersProvider);
    }

    address?: string;

    // This one is called by Contract. It signs the request and passes in to Provider to be sent.
    async sendTransaction(
        transaction: Deferrable<TransactionRequest>,
        executeBatchType: ExecuteType = ExecuteType.EXECUTE,
    ): Promise<TransactionResponse> {
        const gasLimit = await transaction.gasLimit;
        // console.log("ESTIMATE");
        // const gasLimit_bisu = await this.estimateGas(transaction, executeBatchType);
        // console.log("END ESTIMATE", gasLimit_bisu);
        const target = (transaction.to as string) ?? "";
        const data = transaction.data?.toString() ?? "0x";
        const value = transaction.value as BigNumberish;
        const maxFeePerGas = transaction.maxFeePerGas as BigNumberish;
        const maxPriorityFeePerGas = transaction.maxPriorityFeePerGas as BigNumberish;

        let userOperation: UserOperationStruct;
        // console.log("Signer createSignedUserOp");
        userOperation = await this.smartAccountAPI.createSignedUserOp(
            {
                target,
                data,
                value,
                gasLimit,
                maxFeePerGas,
                maxPriorityFeePerGas,
            },
            executeBatchType,
        );

        const transactionResponse = await this.erc4337EthersProvider.constructUserOpTransactionResponse(userOperation);

        userOperation.nonce = transactionResponse.nonce;
        userOperation.sender = transactionResponse.from;
        // Invoke the transaction hook

        let from, to;
        from = transaction.from! as string;
        to = transaction.to! as string;
        this.config.hooks?.transactionStarted?.({
            hash: transactionResponse.hash,
            from,
            to,
            value: value ?? 0,
            userOp: userOperation,
            sponsored: userOperation.paymasterAndData !== "0x",
        });
        if (this.config.hooks?.userOperationStarted) {
            const proceed = await this.config.hooks?.userOperationStarted(await resolveProperties(userOperation));
            if (!proceed) {
                throw new Error("user operation rejected by user");
            }
        }

        try {
            await this.httpRpcClient.sendUserOpToBundler(userOperation);
        } catch (error) {
            // console.error("sendUserOpToBundler failed", error);
            throw this.unwrapError(error);
        }
        // TODO: handle errors - transaction that is "rejected" by bundler is _not likely_ to ever resolve its "wait()"
        return transactionResponse;
    }

    unwrapError(errorIn: any): Error {
        if (errorIn.body != null) {
            const errorBody = JSON.parse(errorIn.body);
            let paymasterInfo: string = "";
            let failedOpMessage: string | undefined = errorBody?.error?.message;
            if (failedOpMessage?.includes("FailedOp") === true) {
                // TODO: better error extraction methods will be needed
                const matched = failedOpMessage.match(/FailedOp\((.*)\)/);
                if (matched != null) {
                    const split = matched[1].split(",");
                    paymasterInfo = `(paymaster address: ${split[1]})`;
                    failedOpMessage = split[2];
                }
            }
            const error = new Error(
                `The bundler has failed to include UserOperation in a batch: ${failedOpMessage} ${paymasterInfo})`,
            );
            error.stack = errorIn.stack;
            return error;
        }
        return errorIn;
    }

    async estimateGas(
        transaction: Deferrable<TransactionRequest>,
        executeBatchType: ExecuteType = ExecuteType.EXECUTE,
    ): Promise<BigNumber> {
        const tx = await resolveProperties(this.checkTransaction(transaction));
        let userOperation: UserOperationStruct;

        userOperation = await this.smartAccountAPI.createUnsignedUserOp(
            {
                target: tx.to ?? "",
                data: tx.data?.toString() ?? "0x",
                value: tx.value,
                maxFeePerGas: tx.maxFeePerGas,
                maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
            },
            executeBatchType,
        );

        const gasInfo: any = await this.httpRpcClient.estimateUserOpGas({
            ...userOperation,
            // random dummy signature, because some bundlers (e.g. StackUp's)
            // require that the signature length is correct, in order to estimate
            // preverification gas properly.
            signature:
                "0xa19538b56257b0d050bb4aa30b3218ef0e436cc1ca49283192a5ee3b290c094c24fd36f8257006eeccdc25902980ea7f865b0f5561bc56c24eec06b8299382481b",
        });

        // missing verification gas given need of deployment?
        return BigNumber.from(gasInfo.preVerificationGas)
            .add(BigNumber.from(gasInfo.verificationGas))
            .add(BigNumber.from(gasInfo.callGasLimit));
    }

    async estimateUserOpGas(
        transaction: Deferrable<TransactionRequest>,
        executeBatchType: ExecuteType = ExecuteType.EXECUTE,
    ): Promise<{
        preVerificationGas: BigNumberish;
        verificationGas: BigNumberish;
        callGasLimit: BigNumberish;
    }> {
        const tx = await resolveProperties(this.checkTransaction(transaction));
        let userOperation: UserOperationStruct;

        userOperation = await this.smartAccountAPI.createUnsignedUserOp(
            {
                target: tx.to ?? "",
                data: tx.data?.toString() ?? "0x",
                value: tx.value,
                maxFeePerGas: tx.maxFeePerGas,
                maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
            },
            executeBatchType,
        );

        const gasInfo: any = await this.httpRpcClient.estimateUserOpGas({
            ...userOperation,
            // random dummy signature, because some bundlers (e.g. StackUp's)
            // require that the signature length is correct, in order to estimate
            // preverification gas properly.
            signature:
                "0xe29e513227c1864cc1086aa5554b4e72ce6dd9e6d138db97f88d19c2cdc7aee64eff828db3754c63824edb7a812643b1857c5facd858f5650a0cb8900b8ebd641b",
        });

        // missing verification gas given need of deployment?
        return {
            preVerificationGas: BigNumber.from(gasInfo.preVerificationGas),
            verificationGas: BigNumber.from(gasInfo.verificationGas),
            callGasLimit: BigNumber.from(gasInfo.callGasLimit),
        };
    }

    async getUserOperationReceipt(hash: string): Promise<UserOperationReceipt> {
        return await this.httpRpcClient.getUserOperationReceipt(hash);
    }

    async verifyAllNecessaryFields(transactionRequest: TransactionRequest): Promise<void> {
        if (transactionRequest.to == null) {
            throw new Error("Missing call target");
        }
        if (transactionRequest.data == null && transactionRequest.value == null) {
            // TBD: banning no-op UserOps seems to make sense on provider level
            throw new Error("Missing call data or value");
        }
    }

    connect(provider: Provider): Signer {
        throw new Error("changing providers is not supported");
    }

    async getAddress(): Promise<string> {
        if (this.address == null) {
            this.address = await this.erc4337EthersProvider.getSenderAccountAddress();
        }
        return this.address;
    }

    async signMessage(message: Bytes | string): Promise<string> {
        const dataHash = ethers.utils.arrayify(ethers.utils.hashMessage(message));
        let sig = fixSignedData(await this.originalSigner.signMessage(dataHash));

        // If the account is undeployed, use ERC-6492
        if (await this.smartAccountAPI.checkAccountPhantom()) {
            const coder = new ethers.utils.AbiCoder();
            sig =
                coder.encode(
                    ["address", "bytes", "bytes"],
                    [
                        await this.smartAccountAPI.getFactoryAddress(),
                        await this.smartAccountAPI.getFactoryAccountInitCode(),
                        sig,
                    ],
                ) + "6492649264926492649264926492649264926492649264926492649264926492"; // magic suffix
        }

        return sig;
    }

    // async approvePlugin(plugin: Contract, validUntil: BigNumber, validAfter: BigNumber, data: string): Promise<string> {
    //   const sender = await this.getAddress();
    //   this.smartAccountAPI.
    //   return ownerSig;
    // }

    async signTypedData(typedData: any): Promise<string> {
        const digest = TypedDataUtils.eip712Hash(typedData, SignTypedDataVersion.V4);
        return fixSignedData(await this.originalSigner.signMessage(digest));
    }

    async _signTypedData(domain: any, types: any, value: any): Promise<string> {
        const message = _TypedDataEncoder.getPayload(domain, types, value);
        return await this.signTypedData(message);
    }

    async signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
        throw new Error("not implemented");
    }

    async signUserOperation(userOperation: UserOperationStruct): Promise<string> {
        const message = await this.smartAccountAPI.getUserOpHash(userOperation);
        return await this.originalSigner.signMessage(message);
    }

    async getExecBatchTransaction(calls: Array<Call>, options?: ExecArgs): Promise<Deferrable<TransactionRequest>> {
        const calldata = await this.smartAccountAPI.encodeExecuteBatch(calls);

        if (this.smartAccountAPI instanceof UpgradeableOpenfortAccount__factory || true) {
            return {
                to: await this.smartAccountAPI.getAccountAddress(),
                data: calldata,
            };
        } else {
            return {
                ...options,
                to: getMultiSendAddress(),
                value: 0,
                data: calldata,
            };
        }
    }

    async execBatch(calls: Array<Call>, options?: ExecArgs): Promise<ContractTransaction> {
        const transaction: Deferrable<TransactionRequest> = await this.getExecBatchTransaction(calls, options);
        return await this.sendTransaction(transaction, ExecuteType.EXECUTE_BATCH);
    }

    async execDelegateCall(call: DelegateCall, options?: ExecArgs): Promise<ContractTransaction> {
        return await this.sendTransaction(
            {
                ...options,
                to: call.to,
                data: call.data,
            },
            ExecuteType.EXECUTE_DELEGATE,
        );
    }

    async transferAllAssets(
        to: string,
        assets: AssetTransfer[],
        options?: {
            gasLimit?: number;
            gasPrice?: BigNumberish;
            multiSendAddress?: string;
        },
    ): Promise<ContractTransaction> {
        const selfAddress = await this.getAddress();
        const calls = assets.map(async (asset) => {
            switch (asset.asset_type) {
                case AssetType.ETH:
                    return {
                        to: to,
                        value: asset.amount ? asset.amount : await this.provider!.getBalance(selfAddress),
                        data: "0x",
                    };
                case AssetType.ERC20:
                    const erc20 = getERC20Contract(this.provider!, asset.address!);
                    return {
                        to: asset.address!,
                        value: 0,
                        data: erc20.interface.encodeFunctionData("transfer", [
                            to,
                            asset.amount ? asset.amount : await erc20.balanceOf(selfAddress),
                        ]),
                    };
                case AssetType.ERC721:
                    const erc721 = getERC721Contract(this.provider!, asset.address!);
                    return {
                        to: asset.address!,
                        value: 0,
                        data: erc721.interface.encodeFunctionData("transferFrom", [selfAddress, to, asset.token_id!]),
                    };
                case AssetType.ERC1155:
                    const erc1155 = getERC1155Contract(this.provider!, asset.address!);
                    return {
                        to: asset.address!,
                        value: 0,
                        data: erc1155.interface.encodeFunctionData("safeTransferFrom", [
                            selfAddress,
                            to,
                            asset.token_id!,
                            asset.amount ? asset.amount : await erc1155.balanceOf(selfAddress, asset.token_id!),
                            "0x",
                        ]),
                    };
            }
        });
        const awaitedCall = await Promise.all(calls);
        return await this.execBatch(awaitedCall, options);
    }

    async registerSessionKey(
        address: string,
        valid_after: BigNumberish,
        valid_until: BigNumberish,
        limit?: number,
        whitelist?: string[],
    ): Promise<ContractTransaction> {
        const selfAddress = await this.getAddress();
        const account = UpgradeableOpenfortAccount__factory.connect(selfAddress, this);

        if (limit && whitelist) {
            return account["registerSessionKey(address,uint48,uint48,uint48,address[])"](
                address,
                valid_after,
                valid_until,
                limit,
                whitelist,
            );
        } else if (limit) {
            return account["registerSessionKey(address,uint48,uint48,uint48)"](
                address,
                valid_after,
                valid_until,
                limit,
            );
        } else if (whitelist) {
            return account["registerSessionKey(address,uint48,uint48,address[])"](
                address,
                valid_after,
                valid_until,
                whitelist,
            );
        } else {
            return account["registerSessionKey(address,uint48,uint48)"](address, valid_after, valid_until);
        }
    }

    async revokeSessionKey(address: string): Promise<ContractTransaction> {
        const selfAddress = await this.getAddress();
        const account = UpgradeableOpenfortAccount__factory.connect(selfAddress, this);

        return account["revokeSessionKey"](address);
    }
}
