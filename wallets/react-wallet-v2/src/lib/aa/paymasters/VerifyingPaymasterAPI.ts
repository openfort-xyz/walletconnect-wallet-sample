import {UserOperationStruct} from "@account-abstraction/contracts";
import {PaymasterAPI} from "@account-abstraction/sdk";
import {ErrTransactionFailedGasChecks} from "../errors";
import {signUserOp} from "./paymasterSigner";

export class VerifyingPaymasterAPI extends PaymasterAPI {
    constructor(readonly chainId: number) {
        super();
    }

    async getPaymasterResp(userOp: Partial<UserOperationStruct>): Promise<object | undefined> {
        const paymasterResp = await signUserOp(userOp, this.chainId);
        if (paymasterResp === undefined) {
            throw ErrTransactionFailedGasChecks;
        }

        return paymasterResp;
    }
}
