import {JsonRpcProvider} from "@ethersproject/providers";
import {BigNumberish, ethers} from "ethers";
import {resolveProperties} from "ethers/lib/utils";

import Debug from "debug";
import {deepHexlify} from "@account-abstraction/utils";
import {UserOperationStruct} from "@account-abstraction/contracts";

const debug = Debug("aa.rpc");

/**
 * return value from estimateUserOpGas
 */
export interface EstimateUserOpGasResult {
    /**
     * the preVerification gas used by this UserOperation.
     */
    preVerificationGas: BigNumberish;
    /**
     * gas used for validation of this UserOperation, including account creation
     */
    verificationGas: BigNumberish;
    /**
     * the deadline after which this UserOperation is invalid (not a gas estimation parameter, but returned by validation
     */
    validUntil?: BigNumberish;
    /**
     * the deadline after which this UserOperation is valid (not a gas estimation parameter, but returned by validation
     */
    validAfter?: BigNumberish;
    /**
     * estimated cost of calling the account with the given callData
     */
    callGasLimit: BigNumberish;
}

export interface UserOperationReceipt {
    userOpHash: BigNumberish;
    entryPoint: string;
    sender: string;
    nonce: BigNumberish;
    paymaster: string;
    actualGasCost: BigNumberish;
    actualGasUsed: BigNumberish;
    success: boolean;
    reason: string;
    logs: any;
    receipt: any;
}

export class HttpRpcClient {
    private readonly userOpJsonRpcProvider: JsonRpcProvider;

    initializing: Promise<void>;

    constructor(readonly bundlerUrl: string, readonly entryPointAddress: string, readonly chainId: number) {
        this.userOpJsonRpcProvider = new ethers.providers.JsonRpcProvider(this.bundlerUrl, {
            name: "Connected bundler network",
            chainId,
        });
        this.initializing = this.validateChainId();
    }

    async validateChainId(): Promise<void> {
        // validate chainId is in sync with expected chainid
        const chain = await this.userOpJsonRpcProvider.send("eth_chainId", []);
        const bundlerChain = parseInt(chain);
        if (bundlerChain !== this.chainId) {
            throw new Error(
                `bundler ${this.bundlerUrl} is on chainId ${bundlerChain}, but provider is on chainId ${this.chainId}`,
            );
        }
    }

    /**
     * send a UserOperation to the bundler
     * @param userOp1
     * @return userOpHash the id of this operation, for getUserOperationTransaction
     */
    async sendUserOpToBundler(userOp1: UserOperationStruct): Promise<string> {
        await this.initializing;
        const hexifiedUserOp = deepHexlify(await resolveProperties(userOp1));
        const jsonRequestData: [UserOperationStruct, string] = [hexifiedUserOp, this.entryPointAddress];
        await this.printUserOperation("eth_sendUserOperation", jsonRequestData);
        return await this.userOpJsonRpcProvider.send("eth_sendUserOperation", [hexifiedUserOp, this.entryPointAddress]);
    }

    async estimateUserOpGas(userOp1: Partial<UserOperationStruct>): Promise<EstimateUserOpGasResult> {
        await this.initializing;

        const resolvedUserOp = await resolveProperties(userOp1);

        const hexifiedUserOp = deepHexlify(resolvedUserOp);
        const jsonRequestData: [UserOperationStruct, string] = [hexifiedUserOp, this.entryPointAddress];
        await this.printUserOperation("eth_estimateUserOperationGas", jsonRequestData);
        return await this.userOpJsonRpcProvider.send("eth_estimateUserOperationGas", [
            hexifiedUserOp,
            this.entryPointAddress,
        ]);
    }

    async getUserOperationReceipt(hash: string): Promise<UserOperationReceipt> {
        const res: UserOperationReceipt = await this.userOpJsonRpcProvider.send("eth_getUserOperationReceipt", [hash]);
        return res;
    }

    private async printUserOperation(
        method: string,
        [userOp1, entryPointAddress]: [UserOperationStruct, string],
    ): Promise<void> {
        const userOp = await resolveProperties(userOp1);
        debug(
            "sending",
            method,
            {
                ...userOp,
                // initCode: (userOp.initCode ?? '').length,
                // callData: (userOp.callData ?? '').length
            },
            entryPointAddress,
        );
    }
}
