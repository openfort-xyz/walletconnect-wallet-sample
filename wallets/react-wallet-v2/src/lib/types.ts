import {UserOperationStruct} from "@account-abstraction/contracts";
import {TransactionRequest} from "@ethersproject/providers";
import {BigNumberish, ethers} from "ethers";
import {getModuleName} from "./aa/module";

export interface TransactionInfo {
    // hash of the transaction
    hash: string;

    // sender addr
    from: string;

    // receiver addr
    to: string;

    // value
    value: BigNumberish;

    // whether the transaction is sponsored
    sponsored: boolean;

    // if this transaction enables a module, this is the module info
    module?: ModuleInfo;

    // userOp information
    userOp?: UserOperationStruct;
}

export interface ModuleInfo {
    name: string;
    address: string;
}

export interface SessionProposal {}

// we determine if a transaction enables a module by checking:
// - if the sender is equal to the receiver
// - if the function selector is `enableModule`
export const getModuleInfo = (tx: TransactionRequest): ModuleInfo | undefined => {
    if (tx.to !== tx.from) return undefined;

    // parse calldata
    const iface = new ethers.utils.Interface(["function enableModule(address)"]);
    try {
        const res = iface.decodeFunctionData("enableModule(address)", tx.data || "0x");
        return {
            name: getModuleName(res[0]),
            address: res[0],
        };
    } catch (e) {
        return undefined;
    }
};

export interface Call {
    to: string;
    data: string;
    value?: BigNumberish;
}

export interface DelegateCall {
    to: string;
    data: string;
}

export type ChainRPCOptions = {
    thirdwebApiKey?: string;
    alchemyApiKey?: string;
    infuraApiKey?: string;
    mode?: "http" | "ws";
};
