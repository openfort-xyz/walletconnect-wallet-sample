import {Provider} from "@ethersproject/abstract-provider";
import {BigNumber, BigNumberish, Contract, ethers} from "ethers";
import {Deferrable, hexValue, resolveProperties} from "ethers/lib/utils";
import {JsonRpcProvider} from "@ethersproject/providers";
import {Chain, allChains} from "@thirdweb-dev/chains";
import fetch from "node-fetch";
import * as types from "./types";
import * as constants from "./constants";
import {AccountImplementation} from "./aa/accounts";
import {AccountAPIConstructor, BaseAccountAPI, BaseApiParams, ExecuteType} from "./aa/BaseAccountAPI";
import {getPaymaster} from "./aa/paymasters";
import {TransactionRequest} from "@ethersproject/providers";
import {UpgradeableOpenfortAccount__factory} from "./aa/contracts/typechain";
import {EntryPoint__factory, UserOperationStruct} from "@account-abstraction/contracts";
import {TransactionReceipt, TransactionResponse} from "@ethersproject/providers";
import {UserOperationEventListener} from "./aa/UserOperationEventListener";
import {UpgradeableOpenfortAccountAPI, UpgradeableOpenfortApiParams} from "./aa/UpgradeableOpenfortAccountAPI";
import {AssetTransfer} from "./aa/ERC4337EthersSigner";

export const hexifyUserOp = (resolvedUserOp: any) => {
    return Object.keys(resolvedUserOp)
        .map((key) => {
            let val = (resolvedUserOp as any)[key];
            if (typeof val !== "string" || !val.startsWith("0x")) {
                val = hexValue(val);
            }
            return [key, val];
        })
        .reduce(
            (set, [k, v]) => ({
                ...set,
                [k]: v,
            }),
            {},
        );
};

// Some signers do not return signed data with 0x prefix, which makes it
// an invalid hex byte string.  So we first check if it's a hex string,
// and if it's not, we prepend 0x and check if it's a valid hex string.
// If it's still not, we throw an error.
export const fixSignedData = (sig: string) => {
    if (ethers.utils.isHexString(sig)) {
        return sig;
    }
    const fixedSig = `0x${sig}`;
    if (ethers.utils.isHexString(fixedSig)) {
        return fixedSig;
    }
    throw new Error("Invalid signed data " + sig);
};

export function parseNumber(a: any): BigNumber | null {
    if (a == null || a === "") return null;
    return BigNumber.from(a.toString());
}
export const getERC721Contract = (provider: Provider, address: string): Contract => {
    return new Contract(address, constants.ERC721_ABI, provider);
};

export const getERC20Contract = (provider: Provider, address: string): Contract => {
    return new Contract(address, constants.ERC20_ABI, provider);
};

export const getERC1155Contract = (provider: Provider, address: string): Contract => {
    return new Contract(address, constants.ERC1155_ABI, provider);
};

export const getDecodeArgs = async (callData: any, abi: any) => {
    const iface = new ethers.utils.Interface(abi);
    return iface.decodeFunctionData(callData.slice(0, 10), callData);
};

export const getFunction = async (callData: any, abi: any) => {
    const iface = new ethers.utils.Interface(abi);
    return iface.getFunction(callData.slice(0, 10));
};

export const isValidAddress = async (provider: JsonRpcProvider, address: string) => {
    var isValid: boolean = false;
    try {
        const isValidString: string = await provider.getCode(address);
        isValid = isValidString !== "0x" ? true : false;
    } catch (error) {
        isValid = false;
    }
    return isValid;
};

export const chainIdToChain: Record<number, Chain> = allChains.reduce((acc, chain) => {
    acc[chain.chainId] = chain;
    return acc;
}, {} as Record<number, Chain>);

const RequestStatus = {
    OK: "1",
    NOTOK: "0",
};

export function isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const fetchABI = async (address: string, chain_id: number) => {
    try {
        const endpoint: string | undefined = constants.apiMap[chain_id];
        if (!endpoint) {
            throw new Error(`ChainId ${chain_id} is not supported for etherscan verification`);
        }

        const chain = chainIdToChain[chain_id];
        if (!chain) {
            throw new Error(`Chain_id ${chain_id} is not supported for etherscan verification`);
        }

        const requestBody: Record<string, string> = {
            apikey: constants.apiKeyMap[chain_id],
            module: "contract",
            action: "getabi",
            address: address,
        };
        const parameters = new URLSearchParams({...requestBody});
        const result = await fetch(endpoint + "?" + parameters.toString(), {
            method: "GET",
        });

        const data: any = await result.json();
        if (data.status === RequestStatus.OK) {
            return {data: data.result};
        } else {
            return {error: data.result};
        }
    } catch (e) {
        console.error(e);
        return {error: (e as any).toString()};
    }
};

/**
 * Construct the list of RPC URLs given a specific chain config. Format any RPC URLs
 * with necessary API keys.
 *
 * @param chain - The chain config to assemble RPC URLs from
 * @param options - Options to configure the RPC URLs
 * @returns The list of RPC URLs for the chain
 */
export function getChainRPCs(chainId: number, options?: types.ChainRPCOptions): string[] {
    const {thirdwebApiKey, alchemyApiKey, infuraApiKey, mode} = {
        ...constants.defaultOptions,
        ...options,
    };
    const chain = chainIdToChain[chainId];

    const modeChains = chain.rpc.filter((rpc) => {
        if (rpc.startsWith("http") && mode === "http") {
            return true;
        }
        if (rpc.startsWith("ws") && mode === "ws") {
            return true;
        }

        return false;
    });

    const thirdwebRPC = modeChains
        .filter((rpc) => {
            return rpc.includes("${THIRDWEB_API_KEY}") && thirdwebApiKey;
        })
        .map((rpc) => (thirdwebApiKey ? rpc.replace("${THIRDWEB_API_KEY}", thirdwebApiKey) : rpc));

    const alchemyRPC = modeChains
        .filter((rpc) => {
            return rpc.includes("${ALCHEMY_API_KEY}") && alchemyApiKey;
        })
        .map((rpc) => (alchemyApiKey ? rpc.replace("${ALCHEMY_API_KEY}", alchemyApiKey) : rpc));

    const infuraRPC = modeChains
        .filter((rpc) => {
            return rpc.includes("${INFURA_API_KEY}") && infuraApiKey;
        })
        .map((rpc) => (infuraApiKey ? rpc.replace("${INFURA_API_KEY}", infuraApiKey) : rpc));

    const allOtherRpcs = modeChains.filter((rpc) => {
        return !rpc.includes("${");
    });

    const orderedRPCs = [...infuraRPC, ...thirdwebRPC, ...alchemyRPC, ...allOtherRpcs];

    if (orderedRPCs.length === 0) {
        throw new Error(`No RPC available for chainId "${chain.chainId}" with mode ${mode}`);
    }

    return orderedRPCs;
}

/**
 * Calculate the account address even before it is deployed
 */
export async function getAddressCounterFactualAddress(
    owner_address: string,
    implementation: AccountImplementation<BaseAccountAPI, BaseApiParams>,
    chain_id: number,
    hash_nonce: string,
): Promise<string> {
    // const accountAPI = BaseAccountAPI.create(
    //   (implementation.accountAPIClass as unknown) as AccountAPIConstructor<
    //     any,
    //     {}
    //   >,
    //   {
    //     // Use our own provider because some providers like Magic doesn't support custom errors, which
    //     // we rely on for getting counterfactual address
    //     // Unless it's hardhat.
    //     provider: new ethers.providers.JsonRpcProvider({
    //       url: getChainRPCs(chain_id)[0],
    //     }),
    //     factoryAddress: implementation.factoryAddress,
    //     entryPointAddress: constants.ENTRYPOINT_ADDRESS,
    //     ownerAddress: owner_address,
    //     index: index
    //   }
    // );

    const accountAPI = UpgradeableOpenfortAccountAPI.create(
        implementation.accountAPIClass as unknown as AccountAPIConstructor<any, {}>,
        {
            // Use our own provider because some providers like Magic doesn't support custom errors, which
            // we rely on for getting counterfactual address
            // Unless it's hardhat.
            provider: new ethers.providers.JsonRpcProvider({
                url: getChainRPCs(chain_id)[0],
            }),
            factoryAddress: implementation.factoryAddress,
            entryPointAddress: constants.ENTRYPOINT_ADDRESS,
            ownerAddress: owner_address,
            hash_nonce: hash_nonce,
        },
    );

    return await accountAPI.getAddressCounterFactualAddress();
}

/**
 * create the unsigned userOp
 */
export async function createUnsignedUserOp(
    tx: Deferrable<TransactionRequest>,
    accountAddress: string,
    hash_nonce: string,
    ownerAddress: string,
    implementation: AccountImplementation<BaseAccountAPI, BaseApiParams>,
    chain_id: number,
    use_paymaster: boolean,
    gas_token?: string,
    token_exchange_rate?: BigNumber,
    executeType: ExecuteType = ExecuteType.EXECUTE,
): Promise<UserOperationStruct> {
    const provider = new ethers.providers.JsonRpcProvider({
        url: getChainRPCs(chain_id)[0],
    });

    const accountAPI = UpgradeableOpenfortAccountAPI.create(
        implementation.accountAPIClass as unknown as AccountAPIConstructor<any, {}>,
        {
            provider: provider,
            paymasterAPI: !use_paymaster ? undefined : await getPaymaster(chain_id, gas_token, token_exchange_rate),
            factoryAddress: implementation.factoryAddress,
            entryPointAddress: constants.ENTRYPOINT_ADDRESS,
            accountAddress: accountAddress,
            ownerAddress: ownerAddress,
            hash_nonce: hash_nonce,
        },
    );

    const senderAddressCode = await provider.getCode(accountAddress);
    let initCode;
    if (senderAddressCode.length > 2) {
        initCode = "0x";
    } else {
        initCode = await accountAPI.getAccountInitCodeByAddress();
    }

    return await accountAPI.createUnsignedUserOp(
        {
            target: tx.to ?? "",
            data: tx.data?.toString() ?? "0x",
            value: tx.value,
            maxFeePerGas: tx.maxFeePerGas,
            maxPriorityFeePerGas: tx.maxPriorityFeePerGas,
            initCode: initCode,
        },
        executeType,
    );
}

/**
 * create registerSessionKey tx
 */
export async function registerSessionKey(
    chain_id: number,
    address_account: string,
    address_session: string,
    valid_after: BigNumberish,
    valid_until: BigNumberish,
    limit?: number,
    whitelist?: string[],
): Promise<string> {
    const provider = new ethers.providers.JsonRpcProvider({
        url: getChainRPCs(chain_id)[0],
    });
    const account = UpgradeableOpenfortAccount__factory.connect(address_account, provider);

    if (limit && whitelist) {
        return account.interface.encodeFunctionData("registerSessionKey(address,uint48,uint48,uint48,address[])", [
            address_session,
            valid_after,
            valid_until,
            limit,
            whitelist,
        ]);
    } else if (limit) {
        return account.interface.encodeFunctionData("registerSessionKey(address,uint48,uint48,uint48)", [
            address_session,
            valid_after,
            valid_until,
            limit,
        ]);
    } else if (whitelist) {
        return account.interface.encodeFunctionData("registerSessionKey(address,uint48,uint48,address[])", [
            address_session,
            valid_after,
            valid_until,
            whitelist,
        ]);
    } else {
        return account.interface.encodeFunctionData("registerSessionKey(address,uint48,uint48)", [
            address_session,
            valid_after,
            valid_until,
        ]);
    }
}

export async function revokeSessionKey(
    chain_id: number,
    address_account: string,
    session_address: string,
): Promise<string> {
    const provider = new ethers.providers.JsonRpcProvider({
        url: getChainRPCs(chain_id)[0],
    });
    const account = UpgradeableOpenfortAccount__factory.connect(address_account, provider);

    return account.interface.encodeFunctionData("revokeSessionKey", [session_address]);
}

export async function getUserOpHash(userOp: UserOperationStruct, chain_id: number): Promise<string> {
    const provider = new ethers.providers.JsonRpcProvider({
        url: getChainRPCs(chain_id)[0],
    });
    const entryPointView = EntryPoint__factory.connect(constants.ENTRYPOINT_ADDRESS, provider).connect(
        ethers.constants.AddressZero,
    );

    return await entryPointView.getUserOpHash({...userOp, signature: "0x"});
}

// fabricate a response in a format usable by ethers users...
export async function constructUserOpTransactionResponse(
    userOp1: UserOperationStruct,
    chain_id: number,
    userOpHash: string,
): Promise<TransactionResponse> {
    const userOp = await resolveProperties(userOp1);
    const provider = new ethers.providers.JsonRpcProvider({
        url: getChainRPCs(chain_id)[0],
    });
    const entryPointView = EntryPoint__factory.connect(constants.ENTRYPOINT_ADDRESS, provider).connect(
        ethers.constants.AddressZero,
    );
    const waitPromise = new Promise<TransactionReceipt>((resolve, reject) => {
        new UserOperationEventListener(
            resolve,
            reject,
            entryPointView,
            userOp.sender,
            userOpHash,
            userOp.nonce,
        ).start();
    });

    // session key nonces use 2D nonces, so it's going to overflow Ethers
    // https://github.com/ethers-io/ethers.js/blob/0802b70a724321f56d4c170e4c8a46b7804dfb48/src.ts/transaction/transaction.ts#L44
    // so we manually set the nonce to 0 here
    let nonce = BigNumber.from(userOp.nonce);
    if (nonce.gt(Number.MAX_SAFE_INTEGER - 1)) {
        nonce = BigNumber.from(0);
    }

    return {
        hash: userOpHash,
        confirmations: 0,
        from: userOp.sender,
        nonce: nonce.toNumber(),
        gasLimit: BigNumber.from(userOp.callGasLimit), // ??
        value: BigNumber.from(0),
        data: hexValue(userOp.callData), // should extract the actual called method from this "execFromEntryPoint()" call
        chainId: chain_id,
        wait: async (confirmations?: number): Promise<TransactionReceipt> => {
            const transactionReceipt = await waitPromise
                .then((receipt) => {
                    return receipt;
                })
                .catch((reason) => {
                    return reason;
                });

            return transactionReceipt;
        },
    };
}

export async function getExecBatchTransaction(
    calls: Array<types.Call>,
    accountAddress: string,
    hash_nonce: string,
    ownerAddress: string,
    implementation: AccountImplementation<UpgradeableOpenfortAccountAPI, UpgradeableOpenfortApiParams>,
    chain_id: number,
    use_paymaster: boolean,
    gas_token?: string,
    token_exchange_rate?: BigNumber,
): Promise<Deferrable<TransactionRequest>> {
    const provider = new ethers.providers.JsonRpcProvider({
        url: getChainRPCs(chain_id)[0],
    });

    const accountAPI = UpgradeableOpenfortAccountAPI.create(
        implementation.accountAPIClass as unknown as AccountAPIConstructor<any, {}>,
        {
            provider: provider,
            paymasterAPI: !use_paymaster ? undefined : await getPaymaster(chain_id, gas_token, token_exchange_rate),
            factoryAddress: implementation.factoryAddress,
            entryPointAddress: constants.ENTRYPOINT_ADDRESS,
            accountAddress: accountAddress,
            ownerAddress: ownerAddress,
            hash_nonce: hash_nonce,
        },
    );

    const calldata = await accountAPI.encodeExecuteBatch(calls);
    return {
        to: accountAddress,
        data: calldata,
    };
}

// if true, it's a phantom account i.e. not deployed yet
export async function checkAccountPhantom(providerUrl: string, accoountAddress: string): Promise<boolean> {
    // Connect to your ethereum provider
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const senderAddressCode = await provider.getCode(accoountAddress);
    if (senderAddressCode.length > 2) {
        // console.log(`SimpleAccount Contract already deployed at ${this.senderAddress}`)
        return false;
    } else {
        // console.log(`SimpleAccount Contract is NOT YET deployed at ${this.senderAddress} - working in "phantom account" mode.`)
    }
    return true;
}
