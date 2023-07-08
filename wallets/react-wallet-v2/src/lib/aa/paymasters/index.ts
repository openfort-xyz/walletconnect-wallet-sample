import {PaymasterAPI} from "./PaymasterAPI";
import {TokenPaymasterAPI} from "./TokenPaymasterAPI";
import {VerifyingPaymasterAPI} from "./VerifyingPaymasterAPI";
import {BigNumber} from "ethers";

export async function getPaymaster(
    chainId: number,
    gasToken?: string,
    tokenExchangeRate?: BigNumber,
): Promise<PaymasterAPI> {
    if (gasToken || tokenExchangeRate) {
        return new TokenPaymasterAPI(chainId, gasToken!, tokenExchangeRate!);
    }
    return new VerifyingPaymasterAPI(chainId);
}
