import {UserOperationStruct} from "@account-abstraction/contracts";
import {PaymasterAPI} from "./paymasters/PaymasterAPI";
import {SessionProposal, TransactionInfo} from "../types";
import {AccountImplementation} from "./accounts";
import {BaseAccountAPI, BaseApiParams} from "./BaseAccountAPI";

export interface Hooks {
    transactionStarted?: (tx: TransactionInfo) => void;
    transactionConfirmed?: (txHash: string) => void;
    transactionReverted?: (txHash: string) => void;
    walletConnectSessionProposal?: (proposal: SessionProposal) => void;
    userOperationStarted?: (userOp: UserOperationStruct) => Promise<boolean>;
}

/**
 * configuration params for wrapProvider
 */
export interface ClientConfig {
    /**
     * Needed to track gas usage
     */

    /**
     * the entry point to use
     */
    entryPointAddress: string;
    /**
     * url to the bundler
     */
    bundlerUrl: string;
    /**
     * implementation of the smart account
     */
    implementation: AccountImplementation<BaseAccountAPI, BaseApiParams>;

    /**
     * if set, use this pre-deployed wallet.
     * (if not set, use getSigner().getAddress() to query the "counterfactual" address of wallet.
     *  you may need to fund this address so the wallet can pay for its own creation)
     */
    walletAddress?: string;

    /**
     * if set, call just before signing.
     */
    paymasterAPI?: PaymasterAPI;

    /**
     * hooks are functions invoked during the lifecycle of transactions
     */
    hooks?: Hooks;

    /**
     * index of the account with regard to the owner
     */
    index?: number;

    /**
     * hash used as nonce
     */
    hash_nonce?: string;
}