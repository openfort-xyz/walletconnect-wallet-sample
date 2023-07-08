/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestHelpers,
  TestHelpersInterface,
} from "../../../contracts/test/TestHelpers";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "validationData",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paymasterValidationData",
        type: "uint256",
      },
    ],
    name: "intersectTimeRange",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "aggregator",
            type: "address",
          },
          {
            internalType: "uint48",
            name: "validAfter",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "validUntil",
            type: "uint48",
          },
        ],
        internalType: "struct ValidationData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "sigFailed",
        type: "bool",
      },
      {
        internalType: "uint48",
        name: "validUntil",
        type: "uint48",
      },
      {
        internalType: "uint48",
        name: "validAfter",
        type: "uint48",
      },
    ],
    name: "packValidationData",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "aggregator",
            type: "address",
          },
          {
            internalType: "uint48",
            name: "validAfter",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "validUntil",
            type: "uint48",
          },
        ],
        internalType: "struct ValidationData",
        name: "data",
        type: "tuple",
      },
    ],
    name: "packValidationDataStruct",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "validationData",
        type: "uint256",
      },
    ],
    name: "parseValidationData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "aggregator",
            type: "address",
          },
          {
            internalType: "uint48",
            name: "validAfter",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "validUntil",
            type: "uint48",
          },
        ],
        internalType: "struct ValidationData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506104d5806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806324d3cde6146100515780634fe5f5cf14610077578063a4b2282e146100d2578063b059e2fa146100e5575b600080fd5b61006461005f36600461036c565b6100f8565b6040519081526020015b60405180910390f35b61008a61008536600461041a565b61014c565b60408051825173ffffffffffffffffffffffffffffffffffffffff16815260208084015165ffffffffffff90811691830191909152928201519092169082015260600161006e565b61008a6100e036600461043c565b61017a565b6100646100f3366004610455565b6101a0565b600061014682600060d0826020015165ffffffffffff16901b60a0836040015165ffffffffffff16901b836000015173ffffffffffffffffffffffffffffffffffffffff1617179050919050565b92915050565b604080516060810182526000808252602082018190529181019190915261017383836101b5565b9392505050565b60408051606081018252600080825260208201819052918101919091526101468261029b565b60006101ad848484610319565b949350505050565b60408051606081018252600080825260208201819052918101829052906101db8461029b565b905060006101e88461029b565b825190915073ffffffffffffffffffffffffffffffffffffffff811661020c575080515b602080840151604080860151928501519085015191929165ffffffffffff808316908516101561023a578193505b8065ffffffffffff168365ffffffffffff161115610256578092505b50506040805160608101825273ffffffffffffffffffffffffffffffffffffffff909416845265ffffffffffff92831660208501529116908201529250505092915050565b60408051606081018252600080825260208201819052918101919091528160a081901c65ffffffffffff81166000036102d7575065ffffffffffff5b6040805160608101825273ffffffffffffffffffffffffffffffffffffffff909316835260d09490941c602083015265ffffffffffff16928101929092525090565b600060d08265ffffffffffff16901b60a08465ffffffffffff16901b85610341576000610344565b60015b60ff161717949350505050565b803565ffffffffffff8116811461036757600080fd5b919050565b60006060828403121561037e57600080fd5b6040516060810181811067ffffffffffffffff821117156103c8577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604052823573ffffffffffffffffffffffffffffffffffffffff811681146103ef57600080fd5b81526103fd60208401610351565b602082015261040e60408401610351565b60408201529392505050565b6000806040838503121561042d57600080fd5b50508035926020909101359150565b60006020828403121561044e57600080fd5b5035919050565b60008060006060848603121561046a57600080fd5b8335801515811461047a57600080fd5b925061048860208501610351565b915061049660408501610351565b9050925092509256fea2646970667358221220ea95f5fee3b77050b709d3206be21e445a4a0736a9ce6fabd8d66b046d0f9a8264736f6c63430008110033";

type TestHelpersConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestHelpersConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestHelpers__factory extends ContractFactory {
  constructor(...args: TestHelpersConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestHelpers> {
    return super.deploy(overrides || {}) as Promise<TestHelpers>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestHelpers {
    return super.attach(address) as TestHelpers;
  }
  override connect(signer: Signer): TestHelpers__factory {
    return super.connect(signer) as TestHelpers__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestHelpersInterface {
    return new utils.Interface(_abi) as TestHelpersInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestHelpers {
    return new Contract(address, _abi, signerOrProvider) as TestHelpers;
  }
}
