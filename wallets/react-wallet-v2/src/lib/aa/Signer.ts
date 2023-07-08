import "@ethersproject/shims";
import {Buffer} from "buffer";
global.Buffer = Buffer;

import {BigNumber, ethers, Signer} from "ethers";

import {getChainRPCs} from "../utils";
import * as constants from "../constants";
import {Hooks} from "./ClientConfig";
import {ERC4337EthersSigner} from "./ERC4337EthersSigner";
import {ERC4337EthersProvider} from "./ERC4337EthersProvider";
import {wrapProvider} from "./Provider";
import {BUNDLER_URLS} from "../constants";

import {AccountImplementation, upgradeableOpenfortAccount_v1_unaudited} from "./accounts";
import {BaseAccountAPI, BaseApiParams} from "./BaseAccountAPI";

import {getPaymaster} from "./paymasters";

export {ERC4337EthersSigner, AssetType} from "./ERC4337EthersSigner";
export {ERC4337EthersProvider} from "./ERC4337EthersProvider";
export {getPrivateKeyOwner, getRPCProviderOwner} from "./owner";

export type AccountParams = {
    owner: Signer;
    hash_nonce?: string;
    rpcProviderUrl?: string;
    bundlerUrl?: string;
    factoryAddress?: string;
    hooks?: Hooks;
    chainId: number;
    usePaymaster?: boolean;
    address?: string;
    implementation?: AccountImplementation<BaseAccountAPI, BaseApiParams>;
    gasToken?: string;
    tokenExchangeRate?: BigNumber;
};

export async function getERC4337EthersProvider(params: AccountParams): Promise<ERC4337EthersProvider> {
    const provider = new ethers.providers.JsonRpcProvider(params.rpcProviderUrl || getChainRPCs(params.chainId)[0]);

    const aaConfig = {
        chainId: params.chainId,
        entryPointAddress: constants.ENTRYPOINT_ADDRESS,
        hash_nonce: params.hash_nonce,
        bundlerUrl: params.bundlerUrl || BUNDLER_URLS[params.chainId],
        paymasterAPI: !params.usePaymaster
            ? undefined
            : await getPaymaster(params.chainId, params.gasToken, params.tokenExchangeRate),
        accountFactoryAddress: params.factoryAddress || constants.UPGRADEABLE_ACCOUNT_FACTORY_ADDRESS,
        hooks: params.hooks,
        walletAddress: params.address,
        implementation: params.implementation ?? upgradeableOpenfortAccount_v1_unaudited,
    };

    const aaProvider = await wrapProvider(provider, aaConfig, params.owner);
    return aaProvider;
}

export async function getERC4337EthersSigner(params: AccountParams): Promise<ERC4337EthersSigner> {
    const aaProvider = await getERC4337EthersProvider(params);

    const aaSigner = aaProvider.getSigner();

    return aaSigner;
}
