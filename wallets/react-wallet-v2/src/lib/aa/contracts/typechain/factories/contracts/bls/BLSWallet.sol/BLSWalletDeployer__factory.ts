/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  BLSWalletDeployer,
  BLSWalletDeployerInterface,
} from "../../../../contracts/bls/BLSWallet.sol/BLSWalletDeployer";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IEntryPoint",
        name: "anEntryPoint",
        type: "address",
      },
      {
        internalType: "address",
        name: "anAggregator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "salt",
        type: "uint256",
      },
      {
        internalType: "uint256[4]",
        name: "aPublicKey",
        type: "uint256[4]",
      },
    ],
    name: "deployWallet",
    outputs: [
      {
        internalType: "contract BLSWallet",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506115aa806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80636385789d14610030575b600080fd5b61004361003e366004610118565b61006c565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b60008260001b858584604051610081906100b7565b61008d939291906101c6565b8190604051809103906000f59050801580156100ad573d6000803e3d6000fd5b5095945050505050565b6113528061022383390190565b73ffffffffffffffffffffffffffffffffffffffff811681146100e657600080fd5b50565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008060008060e0858703121561012e57600080fd5b8435610139816100c4565b935060208581013561014a816100c4565b935060408601359250607f8601871361016257600080fd5b6040516080810181811067ffffffffffffffff82111715610185576101856100e9565b6040528060e088018981111561019a57600080fd5b606089015b818110156101b6578035835291840191840161019f565b5096999598509396509450505050565b73ffffffffffffffffffffffffffffffffffffffff8481168252831660208083019190915260c082019060408301908460005b6004811015610216578151845292820192908201906001016101f9565b5050505094935050505056fe60a06040523480156200001157600080fd5b50604051620013523803806200135283398101604081905262000034916200010b565b600180546001600160a01b0319166001600160a01b038516179055600080546001600160601b031690556200006d600282600462000082565b50506001600160a01b031660805250620001bd565b8260048101928215620000b3579160200282015b82811115620000b357825182559160200191906001019062000096565b50620000c1929150620000c5565b5090565b5b80821115620000c15760008155600101620000c6565b6001600160a01b0381168114620000f257600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b600080600060c084860312156200012157600080fd5b83516200012e81620000dc565b809350506020808501516200014381620000dc565b9250605f850186136200015557600080fd5b604051608081016001600160401b03811182821017156200017a576200017a620000f5565b6040528060c08701888111156200019057600080fd5b604088015b81811015620001ae578051835291840191840162000195565b50505080925050509250925092565b60805161116b620001e760003960008181610197015281816101f2015261099f015261116b6000f3fe6080604052600436106100f75760003560e01c806380c5c7d01161008a578063b0d691fe11610059578063b0d691fe146102e8578063c399ec8814610313578063d0cb75fa14610328578063e02afbae1461034857600080fd5b806380c5c7d01461023e5780638da5cb5b1461025e578063a9059cbb1461029b578063affed0e0146102bb57600080fd5b8063245a7bfc116100c6578063245a7bfc146101855780633ad59dbc146101e35780634a58db19146102165780634d44560d1461021e57600080fd5b80630565bb67146101035780630825d1fc1461012557806318fc5c44146101455780631b71bb6e1461016557600080fd5b366100fe57005b600080fd5b34801561010f57600080fd5b5061012361011e366004610cae565b61036a565b005b34801561013157600080fd5b50610123610140366004610d37565b6103b9565b34801561015157600080fd5b50610123610160366004610d9e565b6103f4565b34801561017157600080fd5b50610123610180366004610e43565b610447565b34801561019157600080fd5b506101b97f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b3480156101ef57600080fd5b507f00000000000000000000000000000000000000000000000000000000000000006101b9565b61012361045b565b34801561022a57600080fd5b50610123610239366004610e67565b6104e6565b34801561024a57600080fd5b50610123610259366004610cae565b610595565b34801561026a57600080fd5b506000546101b9906c01000000000000000000000000900473ffffffffffffffffffffffffffffffffffffffff1681565b3480156102a757600080fd5b506101236102b6366004610e67565b61059d565b3480156102c757600080fd5b506000546bffffffffffffffffffffffff165b6040519081526020016101da565b3480156102f457600080fd5b5060015473ffffffffffffffffffffffffffffffffffffffff166101b9565b34801561031f57600080fd5b506102da6105ed565b34801561033457600080fd5b50610123610343366004610edf565b6106a3565b34801561035457600080fd5b5061035d6107c7565b6040516101da9190610f6e565b610372610802565b6103b3848484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061089f92505050565b50505050565b6103c161091c565b6103cc84848461099d565b6103d96040850185610f82565b90506000036103eb576103eb84610a52565b6103b381610b1a565b6103fc610802565b7f42e4c4ce1432650f17e41c4ea77ed12c0ab20b229d3ffd84a2ebc9f8abb25a8360028260405161042e929190610fe7565b60405180910390a16104436002826004610c1b565b5050565b61044f610b85565b61045881610b8d565b50565b600061047c60015473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff163460405160006040518083038185875af1925050503d80600081146104d3576040519150601f19603f3d011682016040523d82523d6000602084013e6104d8565b606091505b505090508061045857600080fd5b6104ee610802565b60015473ffffffffffffffffffffffffffffffffffffffff166040517f205c287800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015260248201849052919091169063205c287890604401600060405180830381600087803b15801561057957600080fd5b505af115801561058d573d6000803e3d6000fd5b505050505050565b61037261091c565b6105a5610802565b60405173ffffffffffffffffffffffffffffffffffffffff83169082156108fc029083906000818181858888f193505050501580156105e8573d6000803e3d6000fd5b505050565b600061060e60015473ffffffffffffffffffffffffffffffffffffffff1690565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa15801561067a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069e9190611020565b905090565b6106ab610802565b828114610719576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f77726f6e67206172726179206c656e677468730000000000000000000000000060448201526064015b60405180910390fd5b60005b838110156107c0576107ae85858381811061073957610739611039565b905060200201602081019061074e9190610e43565b600085858581811061076257610762611039565b90506020028101906107749190610f82565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061089f92505050565b806107b881611097565b91505061071c565b5050505050565b6107cf610c59565b6040805160808101918290529060029060049082845b8154815260200190600101908083116107e5575050505050905090565b6000546c01000000000000000000000000900473ffffffffffffffffffffffffffffffffffffffff1633148061083757503330145b61089d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f6f6e6c79206f776e6572000000000000000000000000000000000000000000006044820152606401610710565b565b6000808473ffffffffffffffffffffffffffffffffffffffff1684846040516108c891906110cf565b60006040518083038185875af1925050503d8060008114610905576040519150601f19603f3d011682016040523d82523d6000602084013e61090a565b606091505b5091509150816107c057805160208201fd5b60015473ffffffffffffffffffffffffffffffffffffffff16331461089d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f77616c6c65743a206e6f742066726f6d20456e747279506f696e7400000000006044820152606401610710565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146105e8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f424c5357616c6c65743a2077726f6e672061676772656761746f7200000000006044820152606401610710565b600080546020830135916bffffffffffffffffffffffff9091169080610a778361110a565b91906101000a8154816bffffffffffffffffffffffff02191690836bffffffffffffffffffffffff1602179055506bffffffffffffffffffffffff1614610458576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f77616c6c65743a20696e76616c6964206e6f6e636500000000000000000000006044820152606401610710565b80156104585760405160009033907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90849084818181858888f193505050503d80600081146107c0576040519150601f19603f3d011682016040523d82523d6000602084013e6107c0565b61089d610802565b60015460405173ffffffffffffffffffffffffffffffffffffffff8084169216907f450909c1478d09248269d4ad4fa8cba61ca3f50faed58c7aedefa51c7f62b83a90600090a3600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b8260048101928215610c49579160200282015b82811115610c49578251825591602001919060010190610c2e565b50610c55929150610c77565b5090565b60405180608001604052806004906020820280368337509192915050565b5b80821115610c555760008155600101610c78565b73ffffffffffffffffffffffffffffffffffffffff8116811461045857600080fd5b60008060008060608587031215610cc457600080fd5b8435610ccf81610c8c565b935060208501359250604085013567ffffffffffffffff80821115610cf357600080fd5b818701915087601f830112610d0757600080fd5b813581811115610d1657600080fd5b886020828501011115610d2857600080fd5b95989497505060200194505050565b60008060008060808587031215610d4d57600080fd5b843567ffffffffffffffff811115610d6457600080fd5b85016101608188031215610d7757600080fd5b9350602085013592506040850135610d8e81610c8c565b9396929550929360600135925050565b600060808284031215610db057600080fd5b82601f830112610dbf57600080fd5b6040516080810181811067ffffffffffffffff82111715610e09577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604052806080840185811115610e1e57600080fd5b845b81811015610e38578035835260209283019201610e20565b509195945050505050565b600060208284031215610e5557600080fd5b8135610e6081610c8c565b9392505050565b60008060408385031215610e7a57600080fd5b8235610e8581610c8c565b946020939093013593505050565b60008083601f840112610ea557600080fd5b50813567ffffffffffffffff811115610ebd57600080fd5b6020830191508360208260051b8501011115610ed857600080fd5b9250929050565b60008060008060408587031215610ef557600080fd5b843567ffffffffffffffff80821115610f0d57600080fd5b610f1988838901610e93565b90965094506020870135915080821115610f3257600080fd5b50610f3f87828801610e93565b95989497509550505050565b8060005b60048110156103b3578151845260209384019390910190600101610f4f565b60808101610f7c8284610f4b565b92915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112610fb757600080fd5b83018035915067ffffffffffffffff821115610fd257600080fd5b602001915036819003821315610ed857600080fd5b6101008101818460005b6004811015611010578154835260209092019160019182019101610ff1565b505050610e606080830184610f4b565b60006020828403121561103257600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036110c8576110c8611068565b5060010190565b6000825160005b818110156110f057602081860181015185830152016110d6565b818111156110ff576000828501525b509190910192915050565b60006bffffffffffffffffffffffff80831681810361112b5761112b611068565b600101939250505056fea26469706673582212201aa1c1f9f85a1f0110d3809c564f5ab6b04b1a7dc1257f4e5c2336e4dbce1f0464736f6c634300080f0033a2646970667358221220c8594f5089419ffaacc3d82adc156932886171b75ddd14cf61ee4e4d68a2ba8564736f6c634300080f0033";

type BLSWalletDeployerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BLSWalletDeployerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BLSWalletDeployer__factory extends ContractFactory {
  constructor(...args: BLSWalletDeployerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BLSWalletDeployer> {
    return super.deploy(overrides || {}) as Promise<BLSWalletDeployer>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BLSWalletDeployer {
    return super.attach(address) as BLSWalletDeployer;
  }
  override connect(signer: Signer): BLSWalletDeployer__factory {
    return super.connect(signer) as BLSWalletDeployer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BLSWalletDeployerInterface {
    return new utils.Interface(_abi) as BLSWalletDeployerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BLSWalletDeployer {
    return new Contract(address, _abi, signerOrProvider) as BLSWalletDeployer;
  }
}