import {AccountAPIConstructor, BaseAccountAPI, BaseApiParams} from "./BaseAccountAPI";
import { UPGRADEABLE_ACCOUNT_FACTORY_ADDRESS} from "../constants";
import {UpgradeableOpenfortAccountAPI, UpgradeableOpenfortApiParams} from "./UpgradeableOpenfortAccountAPI";

export interface AccountImplementation<
    T extends BaseAccountAPI = BaseAccountAPI,
    A extends BaseApiParams = BaseApiParams,
> {
    factoryAddress: string;
    accountAPIClass: AccountAPIConstructor<T, A>;
}

export const upgradeableOpenfortAccount_v1_unaudited: AccountImplementation<
    UpgradeableOpenfortAccountAPI,
    UpgradeableOpenfortApiParams
> = {
    factoryAddress: UPGRADEABLE_ACCOUNT_FACTORY_ADDRESS,
    accountAPIClass: UpgradeableOpenfortAccountAPI,
};
