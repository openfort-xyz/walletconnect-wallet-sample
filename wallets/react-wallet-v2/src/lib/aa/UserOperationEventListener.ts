import {BigNumberish, Event} from "ethers";
import {TransactionReceipt} from "@ethersproject/providers";

import {defaultAbiCoder} from "ethers/lib/utils";
import Debug from "debug";
import {EntryPoint} from "@account-abstraction/contracts";
import {config} from "dotenv";

config()

const debug = Debug("aa.listener");

const DEFAULT_TRANSACTION_TIMEOUT: number = 60000;

/**
 * This class encapsulates Ethers.js listener function and necessary UserOperation details to
 * discover a TransactionReceipt for the operation.
 */
export class UserOperationEventListener {
    resolved: boolean = false;
    boundLisener: (this: any, ...param: any) => void;

    constructor(
        readonly resolve: (t: TransactionReceipt) => void,
        readonly reject: (reason?: any) => void,
        readonly entryPoint: EntryPoint,
        readonly sender: string,
        readonly userOpHash: string,
        readonly nonce?: BigNumberish,
        readonly timeout?: number,
    ) {
        this.boundLisener = this.listenerCallback.bind(this);
        setTimeout(() => {
            this.stop();
            this.reject(new Error("Timed out"));
        }, this.timeout ?? DEFAULT_TRANSACTION_TIMEOUT);
    }

    start(): void {
        const filter = this.entryPoint.filters.UserOperationEvent(this.userOpHash);
        // listener takes time... first query directly:
        this.entryPoint.once(filter, this.boundLisener);
        const manualQuery: (iteration: number) => void = (iteration = 0) => {
            if (!this.resolved) {
                void this.entryPoint.queryFilter(filter, -100).then((res) => {
                    if (res.length > 0) {
                        void this.listenerCallback(res[0]);
                    } else if (iteration < 3) {
                        setTimeout(() => manualQuery(iteration + 1), 5000);
                    }
                });
            }
        };
        setTimeout(manualQuery, 100);
    }

    stop(): void {
        this.entryPoint.off("UserOperationEvent", this.boundLisener);
    }

    async listenerCallback(this: any, ...param: any): Promise<void> {
        // @ts-expect-error
        const event = arguments[arguments.length - 1] as Event;
        if (event.args == null) {
            console.error("got event without args", event);
            return;
        }
        // TODO: can this happen? we register to event by userOpHash..
        if (event.args.userOpHash !== this.userOpHash) {
            console.log(
                `== event with wrong userOpHash: sender/nonce: event.${event.args.sender as string}@${
                    event.args.nonce.toString() as string
                }!= userOp.${this.sender as string}@${parseInt(this.nonce?.toString())}`,
            );
            return;
        }

        const transactionReceipt = await event.getTransactionReceipt();
        // very hacky but sometimes the client will find the bundle transaction
        // hash useful, such as in the context of wallet connect where the dapp
        // needs the hash to properly wait for the transaction.
        Object.defineProperty(transactionReceipt, "bundleTransactionHash", {
            value: transactionReceipt.transactionHash,
        });
        transactionReceipt.transactionHash = this.userOpHash;
        debug("got event with status=", event.args.success, "gasUsed=", transactionReceipt.gasUsed);

        // before returning the receipt, update the status from the event.
        if (!event.args.success) {
            await this.extractFailureReason(transactionReceipt);
        }
        this.stop();
        this.resolve(transactionReceipt);
        this.resolved = true;
    }

    async extractFailureReason(receipt: TransactionReceipt): Promise<void> {
        debug("mark tx as failed");
        receipt.status = 0;
        const revertReasonEvents = await this.entryPoint.queryFilter(
            this.entryPoint.filters.UserOperationRevertReason(this.userOpHash, this.sender),
            receipt.blockHash,
        );
        if (revertReasonEvents[0] != null) {
            let message = revertReasonEvents[0].args.revertReason;
            if (message.startsWith("0x08c379a0")) {
                // Error(string)
                message = defaultAbiCoder.decode(["string"], "0x" + message.substring(10)).toString();
            }
            debug(`rejecting with reason: ${message}`);
            this.reject(new Error(`UserOp failed with reason: ${message}`));
        }
    }
}
