import {UserOperationStruct} from "@account-abstraction/contracts";
import {resolveProperties} from "@ethersproject/properties";
import {ethers, BigNumber, BigNumberish} from "ethers";
import {arrayify, hexConcat} from "ethers/lib/utils";
import {VerifyingPaymaster__factory} from "../contracts/typechain";
import {MOCK_VALID_AFTER, MOCK_VALID_UNTIL, VERIFYINGPAYMASTER_ADDRESS} from "../../constants";
import {ErrTransactionFailedGasChecks} from "../errors";

import {getChainRPCs, hexifyUserOp} from "../../utils";
import {HttpRpcClient} from "../HttpRpcClient";
import {ENTRYPOINT_ADDRESS, BUNDLER_URLS} from "../../constants";

export function encodePaymasterData(token = ethers.constants.AddressZero, fx = ethers.constants.Zero) {
    return ethers.utils.defaultAbiCoder.encode(
        ["uint48", "uint48", "address", "uint256"],
        [MOCK_VALID_UNTIL, MOCK_VALID_AFTER, token, fx],
    );
}
export async function estimateGas(userOp: Partial<UserOperationStruct>, chainId: number): Promise<any> {
    const httpRpcClient = new HttpRpcClient(BUNDLER_URLS[chainId], ENTRYPOINT_ADDRESS, chainId);
    const UserOp = [
        "sender",
        "nonce",
        "initCode",
        "callData",
        "callGasLimit",
        "verificationGasLimit",
        "preVerificationGas",
        "maxFeePerGas",
        "maxPriorityFeePerGas",
        "paymasterAndData",
        "signature",
    ];

    userOp = {
        sender: userOp.sender ? userOp.sender : "0x",
        nonce: ethers.BigNumber.from(userOp.nonce ? userOp.nonce : "0x"),
        initCode: userOp.initCode ? userOp.initCode : "0x",
        callData: userOp.callData ? userOp.callData : "0x",
        callGasLimit: ethers.BigNumber.from(userOp.callGasLimit ? userOp.callGasLimit : "0x").add(550000),
        verificationGasLimit: ethers.BigNumber.from(userOp.verificationGasLimit ? userOp.verificationGasLimit : "0x"),
        preVerificationGas: ethers.BigNumber.from(userOp.preVerificationGas ? userOp.preVerificationGas : "0x"),
        maxFeePerGas: ethers.BigNumber.from(userOp.maxFeePerGas ? userOp.maxFeePerGas : "0x"),
        maxPriorityFeePerGas: ethers.BigNumber.from(userOp.maxPriorityFeePerGas ? userOp.maxPriorityFeePerGas : "0x"),
        paymasterAndData:
            userOp.paymasterAndData !== "0x"
                ? userOp.paymasterAndData
                : "0xf26acbbf356fb561b64b29aae887ffdb1dd1980200000000000000000000000000000000000000000000000000000000deadbeef0000000000000000000000000000000000000000000000000000000000001234000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000322217c99bc47293fbba050a29a78c3f68663b2b22a92ecc6b72f77c8e23bda653276b191f192b59b73bf3c87581ee3b91975bf9bac7f595fce7140722860171b",
        signature:
            userOp.signature !== "0x"
                ? userOp.signature
                : "0xe29e513227c1864cc1086aa5554b4e72ce6dd9e6d138db97f88d19c2cdc7aee64eff828db3754c63824edb7a812643b1857c5facd858f5650a0cb8900b8ebd641b",
    };
    UserOp.forEach((key) => {
        // @ts-ignore
        userOp[key] = userOp[key] ? userOp[key] : "0x";
    });

    const gasInfo: any = await httpRpcClient.estimateUserOpGas({
        ...userOp,
        // random dummy signature, because some bundlers (e.g. StackUp's)
        // require that the signature length is correct, in order to estimate
        // preverification gas properly.
        signature:
            "0xe29e513227c1864cc1086aa5554b4e72ce6dd9e6d138db97f88d19c2cdc7aee64eff828db3754c63824edb7a812643b1857c5facd858f5650a0cb8900b8ebd641b",
    });

    return {
        preVerificationGas: BigNumber.from(gasInfo.preVerificationGas),
        callGasLimit: BigNumber.from(gasInfo.callGasLimit),
        verificationGas: BigNumber.from(gasInfo.verificationGas),
    };
}
/**
 * return maximum gas used for verification.
 * NOTE: createUnsignedUserOp will add to this value the cost of creation, if the contract is not yet created.
 */
export async function getVerificationGasLimit(): Promise<BigNumberish> {
    // TODO: need to check on-chain for this one
    return 110000;
}

export async function signUserOp(
    userOp: Partial<UserOperationStruct>,
    chainId: number,
    gasTokenAddress?: string,
    tokenExchangeRate?: BigNumber,
): Promise<object | undefined> {
    let resolvedUserOp = await resolveProperties(userOp);

    let gasLimits = await estimateGas(resolvedUserOp, chainId);
    // console.log("gasLimits PM", gasLimits);
    resolvedUserOp.preVerificationGas = gasTokenAddress
        ? gasLimits.preVerificationGas.add(350)
        : gasLimits.preVerificationGas;
    const verificationGasLimit = BigNumber.from(await getVerificationGasLimit())
        .add(gasLimits.callGasLimit)
        .add(gasLimits.verificationGas);

    resolvedUserOp.callGasLimit = gasLimits.preVerificationGas
        .add(gasLimits.callGasLimit)
        .add(gasLimits.verificationGas);
    resolvedUserOp.verificationGasLimit = verificationGasLimit;
    const provider = new ethers.providers.JsonRpcProvider(getChainRPCs(chainId)[0]);

    const wallet = new ethers.Wallet(process.env.PAYMASTER_PRIVATE_KEY!, provider);

    const Paymaster = VerifyingPaymaster__factory.connect(VERIFYINGPAYMASTER_ADDRESS, wallet);

    resolvedUserOp.paymasterAndData = hexConcat([
        VERIFYINGPAYMASTER_ADDRESS,
        encodePaymasterData(gasTokenAddress, tokenExchangeRate),
        "0x" + "00".repeat(65),
    ]);
    let hexifiedUserOp: any = hexifyUserOp(resolvedUserOp);

    let hash = await Paymaster.getHash(
        hexifiedUserOp,
        MOCK_VALID_UNTIL,
        MOCK_VALID_AFTER,
        gasTokenAddress ?? ethers.constants.AddressZero,
        tokenExchangeRate ?? ethers.constants.Zero,
    );

    let sig = await wallet.signMessage(arrayify(hash));

    let paymasterAndData = hexConcat([
        VERIFYINGPAYMASTER_ADDRESS,
        encodePaymasterData(gasTokenAddress, tokenExchangeRate),
        sig,
    ]);

    if (!paymasterAndData) {
        throw ErrTransactionFailedGasChecks;
    }

    return {
        paymasterAndData: paymasterAndData,
        preVerificationGas: hexifiedUserOp.preVerificationGas,
        verificationGasLimit: hexifiedUserOp.verificationGasLimit,
        callGasLimit: hexifiedUserOp.callGasLimit,
    };
}
