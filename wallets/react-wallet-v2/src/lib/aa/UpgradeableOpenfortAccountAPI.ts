import {BigNumber, BigNumberish, Contract} from "ethers";
import {
    UpgradeableOpenfortFactory,
    UpgradeableOpenfortAccount__factory,
    UpgradeableOpenfortAccount,
    UpgradeableOpenfortFactory__factory,
} from "./contracts/typechain";
import {BytesLike, Result, arrayify, formatBytes32String, hexConcat} from "ethers/lib/utils";
import {BaseApiParams, BaseAccountAPI} from "./BaseAccountAPI";
import {MultiSendCall} from "./multisend";
import {Call} from "../types";

/**
 * constructor params, added on top of base params:
 * @param index nonce value used when creating multiple accounts for the same owner
 * @param factoryAddress address of factory to deploy new contracts (not needed if account already deployed)
 */
export interface UpgradeableOpenfortApiParams extends BaseApiParams {
    factoryAddress?: string;
    index?: number;
    hash_nonce?: string;
}

interface ExecBatchParams {
    dest: string[];
    func: string[];
}
const getExecBatchParams = (calls: Call[]): ExecBatchParams => {
    const dest = calls.map(({to}) => to);
    const func = calls.map(({data}) => data);
    return {dest, func};
};

/**
 * An implementation of the BaseAccountAPI.
 * - Pass "owner" address and "index" nonce to the factory
 * - owner signs requests using normal "Ethereum Signed Message" (ether's signer.signMessage())
 * - nonce is a public variable "nonce"
 * - execute method is "execTransactionFromModule()", since the entrypoint is set as a module
 */
export class UpgradeableOpenfortAccountAPI extends BaseAccountAPI {
    factoryAddress?: string;
    accountContract?: UpgradeableOpenfortAccount;
    factory?: UpgradeableOpenfortFactory;
    accountAddress?: string;
    ownerAddress?: string;
    index: number;
    hash_nonce: string;

    constructor(params: UpgradeableOpenfortApiParams) {
        super(params);
        this.factoryAddress = params.factoryAddress;
        this.accountAddress = params.accountAddress;
        this.ownerAddress = params.ownerAddress;
        this.index = params.index ?? 0;
        this.hash_nonce = params.hash_nonce ?? "";
    }

    async _getAccountContract(): Promise<UpgradeableOpenfortAccount> {
        if (this.accountContract == null) {
            this.accountContract = UpgradeableOpenfortAccount__factory.connect(
                await this.getAccountAddress(),
                this.provider,
            );
        }
        return this.accountContract;
    }

    /**
     * return the value to put into the "initCode" field, if the account is not yet deployed.
     * this value holds the "factory" address, followed by this account's information
     */
    async getAccountInitCode(): Promise<string> {
        return hexConcat([await this.getFactoryAddress(), await this.getFactoryAccountInitCode()]);
    }

    async getFactoryAddress(): Promise<string> {
        if (this.factoryAddress != null) {
            return this.factoryAddress;
        }
        throw new Error("no factory address");
    }

    async getAccountInitCodeByAddress(): Promise<string> {
        const ownerAddress = await this.ownerAddress;
        if (this.factory == null) {
            if (this.factoryAddress != null && this.factoryAddress !== "") {
                this.factory = UpgradeableOpenfortFactory__factory.connect(this.factoryAddress, this.provider);
            } else {
                throw new Error("no factory to get initCode");
            }
        }
        const initCode = this.factory.interface.encodeFunctionData("createAccountWithNonce", [
            ownerAddress!,
            this.hash_nonce,
        ]);

        return hexConcat([await this.getFactoryAddress(), await initCode]);
    }

    async getFactoryAccountInitCode(): Promise<string> {
        const ownerAddress = await this.owner.getAddress();
        if (this.factory == null) {
            if (this.factoryAddress != null && this.factoryAddress !== "") {
                this.factory = UpgradeableOpenfortFactory__factory.connect(this.factoryAddress, this.provider);
            } else {
                throw new Error("no factory to get initCode");
            }
        }

        return this.factory.interface.encodeFunctionData("createAccountWithNonce", [ownerAddress, this.hash_nonce]);
    }

    /**
     * Register a master session key to the account
     * @param _key session key to register
     * @param _validAfter - this session key is valid only after this timestamp.
     * @param _validUntil - this session key is valid only up to this timestamp.
     * @notice using this function will automatically set the sessionkey as a
     * master session key because no further restricion was set.
     * @notice default limit set to 100.
     */
    async registerSessionKey(address: string, _validAfter: BigNumberish, _validUntil: BigNumberish): Promise<string> {
        const accountContract = await this._getAccountContract();
        return accountContract.interface.encodeFunctionData("registerSessionKey(address,uint48,uint48)", [
            address,
            _validAfter,
            _validUntil,
        ]);
    }

    /**
     * Register a master session key to the account
     * @param _key session key to register
     * @param _validAfter - this session key is valid only after this timestamp.
     * @param _validUntil - this session key is valid only up to this timestamp.
     * @param _limit - this session key is valid only up to this timestamp.
     * @notice using this function will automatically set the sessionkey as a
     * master session key because no further restriction was set.
     */
    async registerSessionKeyLimit(
        address: string,
        _validAfter: BigNumberish,
        _validUntil: BigNumberish,
        _limit: BigNumberish,
    ): Promise<string> {
        const accountContract = await this._getAccountContract();
        return accountContract.interface.encodeFunctionData("registerSessionKey(address,uint48,uint48,uint48)", [
            address,
            _validAfter,
            _validUntil,
            _limit,
        ]);
    }

    /**
     * Register a session key to the account
     * @param _key session key to register
     * @param _validAfter - this session key is valid only after this timestamp.
     * @param _validUntil - this session key is valid only up to this timestamp.
     * @param _whitelist - this session key can only interact with the addresses in the _whitelist.
     */
    async registerSessionKeyWhitelist(
        address: string,
        _validAfter: BigNumberish,
        _validUntil: BigNumberish,
        _whitelist: string[],
    ): Promise<string> {
        const accountContract = await this._getAccountContract();
        return accountContract.interface.encodeFunctionData("registerSessionKey(address,uint48,uint48,address[])", [
            address,
            _validAfter,
            _validUntil,
            _whitelist,
        ]);
    }

    /**
     * Register a session key to the account
     * @param _key session key to register
     * @param _validAfter - this session key is valid only after this timestamp.
     * @param _validUntil - this session key is valid only up to this timestamp.
     * @param _limit - this session key is valid only up to this timestamp.
     * @param _whitelist - this session key can only interact with the addresses in the _whitelist.
     */
    async registerSessionKeyLimitWhitelist(
        address: string,
        _validAfter: BigNumberish,
        _validUntil: BigNumberish,
        _limit: BigNumberish,
        _whitelist: string[],
    ): Promise<string> {
        const accountContract = await this._getAccountContract();
        return accountContract.interface.encodeFunctionData(
            "registerSessionKey(address,uint48,uint48,uint48,address[])",
            [address, _validAfter, _validUntil, _limit, _whitelist],
        );
    }

    /**
     *
     * @param target
     * @param value
     * @param data
     */
    async getNonce(): Promise<BigNumber> {
        if (await this.checkAccountPhantom()) {
            return BigNumber.from(0);
        }
        const accountContract = await this._getAccountContract();
        return await accountContract.getNonce();
    }

    /**
     * encode a method call from entryPoint to our contract
     * @param target
     * @param value
     * @param data
     */
    async encodeExecute(target: string, value: BigNumberish, data: string): Promise<string> {
        const accountContract = await this._getAccountContract();

        return accountContract.interface.encodeFunctionData("execute", [target, value, data]);
    }

    async encodeExecuteBatch(calls: MultiSendCall[]): Promise<string> {
        const accountContract = await this._getAccountContract();

        const {dest, func} = getExecBatchParams(calls);
        const upgradeableOpenfortAccount = new Contract(
            this.accountAddress!,
            ["function executeBatch(address[],uint256[],bytes[])"],
            accountContract.provider,
        );
        return upgradeableOpenfortAccount.interface.encodeFunctionData("executeBatch", [
            dest,
            dest.map((_) => 0),
            func,
        ]);
    }

    async signUserOpHash(userOpHash: string): Promise<string> {
        return await this.owner.signMessage(arrayify(userOpHash));
    }

    async encodeExecuteDelegate(target: string, value: BigNumberish, data: string): Promise<string> {
        throw new Error("encodeExecuteDelegate not implemented");
    }

    async decodeExecuteDelegate(data: BytesLike): Promise<Result> {
        throw new Error("decodeExecuteDelegate not implemented");
    }
}
