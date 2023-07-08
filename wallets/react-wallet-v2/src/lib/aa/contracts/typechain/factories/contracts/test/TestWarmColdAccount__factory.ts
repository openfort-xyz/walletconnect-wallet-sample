/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestWarmColdAccount,
  TestWarmColdAccountInterface,
} from "../../../contracts/test/TestWarmColdAccount";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IEntryPoint",
        name: "_ep",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "state",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "paymaster",
        type: "address",
      },
    ],
    name: "touchPaymaster",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "touchStorage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "missingAccountFunds",
        type: "uint256",
      },
    ],
    name: "validateUserOp",
    outputs: [
      {
        internalType: "uint256",
        name: "validationData",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052600180556040516104c93803806104c98339810160408190526100269161004b565b600080546001600160a01b0319166001600160a01b039290921691909117905561007b565b60006020828403121561005d57600080fd5b81516001600160a01b038116811461007457600080fd5b9392505050565b61043f8061008a6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80633a871cdd14610051578063c19d93fb14610076578063f115d40d1461007f578063fb0c2425146100a7575b600080fd5b61006461005f366004610281565b6100af565b60405190815260200160405180910390f35b61006460015481565b61006461008d3660046102d5565b73ffffffffffffffffffffffffffffffffffffffff163b90565b600154610064565b600080546040517fb760faf900000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff9091169063b760faf99084906024016000604051808303818588803b15801561011c57600080fd5b505af1158015610130573d6000803e3d6000fd5b505050505083602001356001036101ba573073ffffffffffffffffffffffffffffffffffffffff1663fb0c24256103e86040518263ffffffff1660e01b81526004016020604051808303818786fa15801561018f573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906101b49190610312565b50610277565b83602001356002036102775760006101d661012086018661032b565b6101e591601491600091610397565b6101ee916103c1565b6040517ff115d40d00000000000000000000000000000000000000000000000000000000815260609190911c600482018190529150309063f115d40d906103e8906024016020604051808303818786fa15801561024f573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906102749190610312565b50505b5060009392505050565b60008060006060848603121561029657600080fd5b833567ffffffffffffffff8111156102ad57600080fd5b840161016081870312156102c057600080fd5b95602085013595506040909401359392505050565b6000602082840312156102e757600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461030b57600080fd5b9392505050565b60006020828403121561032457600080fd5b5051919050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261036057600080fd5b83018035915067ffffffffffffffff82111561037b57600080fd5b60200191503681900382131561039057600080fd5b9250929050565b600080858511156103a757600080fd5b838611156103b457600080fd5b5050820193919092039150565b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000081358181169160148510156104015780818660140360031b1b83161692505b50509291505056fea2646970667358221220cfc8a1ad27aad471ebf2ba7c5d797875b29660f565feecb4da8d0e014ea4972b64736f6c63430008110033";

type TestWarmColdAccountConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestWarmColdAccountConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestWarmColdAccount__factory extends ContractFactory {
  constructor(...args: TestWarmColdAccountConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _ep: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<TestWarmColdAccount> {
    return super.deploy(_ep, overrides || {}) as Promise<TestWarmColdAccount>;
  }
  override getDeployTransaction(
    _ep: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_ep, overrides || {});
  }
  override attach(address: string): TestWarmColdAccount {
    return super.attach(address) as TestWarmColdAccount;
  }
  override connect(signer: Signer): TestWarmColdAccount__factory {
    return super.connect(signer) as TestWarmColdAccount__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestWarmColdAccountInterface {
    return new utils.Interface(_abi) as TestWarmColdAccountInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestWarmColdAccount {
    return new Contract(address, _abi, signerOrProvider) as TestWarmColdAccount;
  }
}
