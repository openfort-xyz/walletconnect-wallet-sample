import {UserOperationStruct} from "@account-abstraction/contracts";
import {PaymasterAPI} from "./PaymasterAPI";
import {BigNumber, ethers} from "ethers";
import {ERC20_ABI, VERIFYINGPAYMASTER_ADDRESS} from "../../constants";
import {Provider} from "@ethersproject/abstract-provider";
import {MultiSendCall} from "../multisend";
import {signUserOp} from "./paymasterSigner";
import {ErrTransactionFailedGasChecks} from "../errors";

export class TokenPaymasterAPI extends PaymasterAPI {
    constructor(readonly chainId: number, readonly gasTokenAddress: string, readonly tokenExchangeRate: BigNumber) {
        super();
    }

    async createGasTokenApprovalRequest(provider: Provider): Promise<MultiSendCall> {
        const erc20 = new ethers.Contract(this.gasTokenAddress, ERC20_ABI, provider);

        return {
            to: erc20.address,
            value: BigNumber.from(0),
            data: erc20.interface.encodeFunctionData("approve", [
                VERIFYINGPAYMASTER_ADDRESS,
                ethers.utils.parseUnits("10", 18),
            ]),
        };
    }

    async getPaymasterResp(userOp: Partial<UserOperationStruct>): Promise<object | undefined> {
        const paymasterResp = await signUserOp(userOp, this.chainId, this.gasTokenAddress, this.tokenExchangeRate);
        if (paymasterResp === undefined) {
            throw ErrTransactionFailedGasChecks;
        }

        return paymasterResp;
    }
}
