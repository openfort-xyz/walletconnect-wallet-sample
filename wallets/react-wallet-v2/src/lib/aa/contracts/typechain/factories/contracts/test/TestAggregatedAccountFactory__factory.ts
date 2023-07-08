/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestAggregatedAccountFactory,
  TestAggregatedAccountFactoryInterface,
} from "../../../contracts/test/TestAggregatedAccountFactory";

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
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "accountImplementation",
    outputs: [
      {
        internalType: "contract TestAggregatedAccount",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "salt",
        type: "uint256",
      },
    ],
    name: "createAccount",
    outputs: [
      {
        internalType: "contract TestAggregatedAccount",
        name: "ret",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "salt",
        type: "uint256",
      },
    ],
    name: "getAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161302438038061302483398101604081905261002f916100aa565b818160405161003d90610085565b6001600160a01b03928316815291166020820152604001604051809103906000f080158015610070573d6000803e3d6000fd5b506001600160a01b0316608052506100e49050565b61229280610d9283390190565b6001600160a01b03811681146100a757600080fd5b50565b600080604083850312156100bd57600080fd5b82516100c881610092565b60208401519092506100d981610092565b809150509250929050565b608051610c8661010c60003960008181604b0152818161011401526102580152610c866000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806311464fbe146100465780635fbfb9cf146100965780638cb84e18146100a9575b600080fd5b61006d7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b61006d6100a436600461039d565b6100bc565b61006d6100b736600461039d565b6101ee565b6000806100c984846101ee565b905073ffffffffffffffffffffffffffffffffffffffff81163b80156100f1575090506101e8565b60405173ffffffffffffffffffffffffffffffffffffffff8616602482015284907f000000000000000000000000000000000000000000000000000000000000000090604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fc4d66de800000000000000000000000000000000000000000000000000000000179052516101b790610390565b6101c2929190610406565b8190604051809103906000f59050801580156101e2573d6000803e3d6000fd5b50925050505b92915050565b60006103578260001b6040518060200161020790610390565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe082820381018352601f90910116604081905273ffffffffffffffffffffffffffffffffffffffff871660248201527f000000000000000000000000000000000000000000000000000000000000000090604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152918152602080830180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fc4d66de800000000000000000000000000000000000000000000000000000000179052905161030093929101610406565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529082905261033c9291602001610474565b6040516020818303038152906040528051906020012061035e565b9392505050565b60006103578383306000604051836040820152846020820152828152600b8101905060ff815360559020949350505050565b6107ad806104a483390190565b600080604083850312156103b057600080fd5b823573ffffffffffffffffffffffffffffffffffffffff811681146103d457600080fd5b946020939093013593505050565b60005b838110156103fd5781810151838201526020016103e5565b50506000910152565b73ffffffffffffffffffffffffffffffffffffffff8316815260406020820152600082518060408401526104418160608501602087016103e2565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016060019392505050565b600083516104868184602088016103e2565b83519083019061049a8183602088016103e2565b0194935050505056fe60806040526040516107ad3803806107ad83398101604081905261002291610319565b61002e82826000610035565b5050610436565b61003e8361006b565b60008251118061004b5750805b156100665761006483836100ab60201b6100291760201c565b505b505050565b610074816100d7565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100d08383604051806060016040528060278152602001610786602791396101a9565b9392505050565b6100ea8161022260201b6100551760201c565b6101515760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b806101887f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61023160201b6100711760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b6060600080856001600160a01b0316856040516101c691906103e7565b600060405180830381855af49150503d8060008114610201576040519150601f19603f3d011682016040523d82523d6000602084013e610206565b606091505b50909250905061021886838387610234565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102a357825160000361029c576001600160a01b0385163b61029c5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610148565b50816102ad565b6102ad83836102b5565b949350505050565b8151156102c55781518083602001fd5b8060405162461bcd60e51b81526004016101489190610403565b634e487b7160e01b600052604160045260246000fd5b60005b838110156103105781810151838201526020016102f8565b50506000910152565b6000806040838503121561032c57600080fd5b82516001600160a01b038116811461034357600080fd5b60208401519092506001600160401b038082111561036057600080fd5b818501915085601f83011261037457600080fd5b815181811115610386576103866102df565b604051601f8201601f19908116603f011681019083821181831017156103ae576103ae6102df565b816040528281528860208487010111156103c757600080fd5b6103d88360208301602088016102f5565b80955050505050509250929050565b600082516103f98184602087016102f5565b9190910192915050565b60208152600082518060208401526104228160408501602087016102f5565b601f01601f19169190910160400192915050565b610341806104456000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610074565b6100b9565b565b606061004e83836040518060600160405280602781526020016102e5602791396100dd565b9392505050565b73ffffffffffffffffffffffffffffffffffffffff163b151590565b90565b60006100b47f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b3660008037600080366000845af43d6000803e8080156100d8573d6000f35b3d6000fd5b60606000808573ffffffffffffffffffffffffffffffffffffffff16856040516101079190610277565b600060405180830381855af49150503d8060008114610142576040519150601f19603f3d011682016040523d82523d6000602084013e610147565b606091505b509150915061015886838387610162565b9695505050505050565b606083156101fd5782516000036101f65773ffffffffffffffffffffffffffffffffffffffff85163b6101f6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064015b60405180910390fd5b5081610207565b610207838361020f565b949350505050565b81511561021f5781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ed9190610293565b60005b8381101561026e578181015183820152602001610256565b50506000910152565b60008251610289818460208701610253565b9190910192915050565b60208152600082518060208401526102b2816040850160208701610253565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212202885c233b066ebfe9337a3a5d48562f2041f8cf02caf8c41f24408593565514164736f6c63430008110033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212202bd91f789b7dfc1b0b611e3caae9b0a19eca771875673fd7d0fa59a02d16335c64736f6c6343000811003360e0604052306080523480156200001557600080fd5b50604051620022923803806200229283398101604081905262000038916200013f565b6001600160a01b03821660a052816200005062000064565b506001600160a01b031660c052506200017e565b600054610100900460ff1615620000d15760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff908116101562000124576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b6001600160a01b03811681146200013c57600080fd5b50565b600080604083850312156200015357600080fd5b8251620001608162000126565b6020840151909250620001738162000126565b809150509250929050565b60805160a05160c051612090620002026000396000818161025701526108d401526000818161037e01528181610917015281816109be01528181610de2015281816110340152818161107b015281816113cd01526115a60152600081816106ba0152818161076a01528181610a8201528181610b320152610c7b01526120906000f3fe6080604052600436106101475760003560e01c80634f1ef286116100c0578063bc197c8111610074578063c4d66de811610059578063c4d66de81461041f578063d087d2881461043f578063f23a6e611461045457600080fd5b8063bc197c81146103c2578063c399ec881461040a57600080fd5b80638da5cb5b116100a55780638da5cb5b1461033c578063b0d691fe1461036f578063b61d27f6146103a257600080fd5b80634f1ef2861461031457806352d1902d1461032757600080fd5b8063245a7bfc116101175780633a871cdd116100fc5780633a871cdd146102be5780634a58db19146102ec5780634d44560d146102f457600080fd5b8063245a7bfc146102455780633659cfe61461029e57600080fd5b806223de291461015357806301ffc9a71461017a578063150b7a02146101af57806318dfb3c71461022557600080fd5b3661014e57005b600080fd5b34801561015f57600080fd5b5061017861016e366004611967565b5050505050505050565b005b34801561018657600080fd5b5061019a610195366004611a18565b61049a565b60405190151581526020015b60405180910390f35b3480156101bb57600080fd5b506101f46101ca366004611a5a565b7f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016101a6565b34801561023157600080fd5b50610178610240366004611b12565b61057f565b34801561025157600080fd5b506102797f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101a6565b3480156102aa57600080fd5b506101786102b9366004611b7e565b6106a3565b3480156102ca57600080fd5b506102de6102d9366004611b9b565b6108a8565b6040519081526020016101a6565b610178610915565b34801561030057600080fd5b5061017861030f366004611bef565b6109b4565b610178610322366004611c4a565b610a6b565b34801561033357600080fd5b506102de610c61565b34801561034857600080fd5b506000546102799062010000900473ffffffffffffffffffffffffffffffffffffffff1681565b34801561037b57600080fd5b507f0000000000000000000000000000000000000000000000000000000000000000610279565b3480156103ae57600080fd5b506101786103bd366004611d2c565b610d4d565b3480156103ce57600080fd5b506101f46103dd366004611d7c565b7fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b34801561041657600080fd5b506102de610d9c565b34801561042b57600080fd5b5061017861043a366004611b7e565b610e53565b34801561044b57600080fd5b506102de610fe7565b34801561046057600080fd5b506101f461046f366004611e1a565b7ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a0200000000000000000000000000000000000000000000000000000000148061052d57507fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000145b8061057957507fffffffff0000000000000000000000000000000000000000000000000000000082167f01ffc9a700000000000000000000000000000000000000000000000000000000145b92915050565b610587611063565b8281146105f5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f77726f6e67206172726179206c656e677468730000000000000000000000000060448201526064015b60405180910390fd5b60005b8381101561069c5761068a85858381811061061557610615611e96565b905060200201602081019061062a9190611b7e565b600085858581811061063e5761063e611e96565b90506020028101906106509190611ec5565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061112c92505050565b8061069481611f2a565b9150506105f8565b5050505050565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610768576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c000000000000000000000000000000000000000060648201526084016105ec565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166107dd7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff1614610880576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f7879000000000000000000000000000000000000000060648201526084016105ec565b610889816111a9565b604080516000808252602082019092526108a5918391906111b1565b50565b60006108b26113b5565b506040805160608101825273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016808252600060208301819052919092015261090e82611454565b9392505050565b7f00000000000000000000000000000000000000000000000000000000000000006040517fb760faf900000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff919091169063b760faf99034906024016000604051808303818588803b1580156109a057600080fd5b505af115801561069c573d6000803e3d6000fd5b6109bc6114bf565b7f00000000000000000000000000000000000000000000000000000000000000006040517f205c287800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015260248201849052919091169063205c287890604401600060405180830381600087803b158015610a4f57600080fd5b505af1158015610a63573d6000803e3d6000fd5b505050505050565b73ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000163003610b30576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c000000000000000000000000000000000000000060648201526084016105ec565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610ba57f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff1614610c48576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f7879000000000000000000000000000000000000000060648201526084016105ec565b610c51826111a9565b610c5d828260016111b1565b5050565b60003073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610d28576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c000000000000000060648201526084016105ec565b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b610d55611063565b610d96848484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061112c92505050565b50505050565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906370a08231906024015b602060405180830381865afa158015610e2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e4e9190611f89565b905090565b600054610100900460ff1615808015610e735750600054600160ff909116105b80610e8d5750303b158015610e8d575060005460ff166001145b610f19576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a656400000000000000000000000000000000000060648201526084016105ec565b600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790558015610f7757600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff166101001790555b610f816000611550565b8015610c5d57600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b6040517f35567e1a0000000000000000000000000000000000000000000000000000000081523060048201526000602482018190529073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906335567e1a90604401610e0d565b3373ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614806110c4575060005462010000900473ffffffffffffffffffffffffffffffffffffffff1633145b61112a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f6163636f756e743a206e6f74204f776e6572206f7220456e747279506f696e7460448201526064016105ec565b565b6000808473ffffffffffffffffffffffffffffffffffffffff1684846040516111559190611fc6565b60006040518083038185875af1925050503d8060008114611192576040519150601f19603f3d011682016040523d82523d6000602084013e611197565b606091505b50915091508161069c57805160208201fd5b6108a56114bf565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156111e9576111e4836115ef565b505050565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561126e575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261126b91810190611f89565b60015b6112fa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f74205555505300000000000000000000000000000000000060648201526084016105ec565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc81146113a9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c6555554944000000000000000000000000000000000000000000000060648201526084016105ec565b506111e48383836116f9565b3373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461112a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f6163636f756e743a206e6f742066726f6d20456e747279506f696e740000000060448201526064016105ec565b80156108a55760405160009033907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90849084818181858888f193505050503d806000811461069c576040519150601f19603f3d011682016040523d82523d6000602084013e61069c565b60005462010000900473ffffffffffffffffffffffffffffffffffffffff163314806114ea57503330145b61112a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f6f6e6c79206f776e65720000000000000000000000000000000000000000000060448201526064016105ec565b600080547fffffffffffffffffffff0000000000000000000000000000000000000000ffff166201000073ffffffffffffffffffffffffffffffffffffffff8481168202929092178084556040519190048216927f0000000000000000000000000000000000000000000000000000000000000000909216917f47e55c76e7a6f1fd8996a1da8008c1ea29699cca35e7bcd057f2dec313b6e5de91a350565b73ffffffffffffffffffffffffffffffffffffffff81163b611693576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e74726163740000000000000000000000000000000000000060648201526084016105ec565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6117028361171e565b60008251118061170f5750805b156111e457610d96838361176b565b611727816115ef565b60405173ffffffffffffffffffffffffffffffffffffffff8216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b606061090e83836040518060600160405280602781526020016120346027913960606000808573ffffffffffffffffffffffffffffffffffffffff16856040516117b59190611fc6565b600060405180830381855af49150503d80600081146117f0576040519150601f19603f3d011682016040523d82523d6000602084013e6117f5565b606091505b509150915061180686838387611810565b9695505050505050565b606083156118a657825160000361189f5773ffffffffffffffffffffffffffffffffffffffff85163b61189f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016105ec565b50816118b0565b6118b083836118b8565b949350505050565b8151156118c85781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ec9190611fe2565b73ffffffffffffffffffffffffffffffffffffffff811681146108a557600080fd5b60008083601f84011261193057600080fd5b50813567ffffffffffffffff81111561194857600080fd5b60208301915083602082850101111561196057600080fd5b9250929050565b60008060008060008060008060c0898b03121561198357600080fd5b883561198e816118fc565b9750602089013561199e816118fc565b965060408901356119ae816118fc565b955060608901359450608089013567ffffffffffffffff808211156119d257600080fd5b6119de8c838d0161191e565b909650945060a08b01359150808211156119f757600080fd5b50611a048b828c0161191e565b999c989b5096995094979396929594505050565b600060208284031215611a2a57600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461090e57600080fd5b600080600080600060808688031215611a7257600080fd5b8535611a7d816118fc565b94506020860135611a8d816118fc565b935060408601359250606086013567ffffffffffffffff811115611ab057600080fd5b611abc8882890161191e565b969995985093965092949392505050565b60008083601f840112611adf57600080fd5b50813567ffffffffffffffff811115611af757600080fd5b6020830191508360208260051b850101111561196057600080fd5b60008060008060408587031215611b2857600080fd5b843567ffffffffffffffff80821115611b4057600080fd5b611b4c88838901611acd565b90965094506020870135915080821115611b6557600080fd5b50611b7287828801611acd565b95989497509550505050565b600060208284031215611b9057600080fd5b813561090e816118fc565b600080600060608486031215611bb057600080fd5b833567ffffffffffffffff811115611bc757600080fd5b84016101608187031215611bda57600080fd5b95602085013595506040909401359392505050565b60008060408385031215611c0257600080fd5b8235611c0d816118fc565b946020939093013593505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008060408385031215611c5d57600080fd5b8235611c68816118fc565b9150602083013567ffffffffffffffff80821115611c8557600080fd5b818501915085601f830112611c9957600080fd5b813581811115611cab57611cab611c1b565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715611cf157611cf1611c1b565b81604052828152886020848701011115611d0a57600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b60008060008060608587031215611d4257600080fd5b8435611d4d816118fc565b935060208501359250604085013567ffffffffffffffff811115611d7057600080fd5b611b728782880161191e565b60008060008060008060008060a0898b031215611d9857600080fd5b8835611da3816118fc565b97506020890135611db3816118fc565b9650604089013567ffffffffffffffff80821115611dd057600080fd5b611ddc8c838d01611acd565b909850965060608b0135915080821115611df557600080fd5b611e018c838d01611acd565b909650945060808b01359150808211156119f757600080fd5b60008060008060008060a08789031215611e3357600080fd5b8635611e3e816118fc565b95506020870135611e4e816118fc565b94506040870135935060608701359250608087013567ffffffffffffffff811115611e7857600080fd5b611e8489828a0161191e565b979a9699509497509295939492505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112611efa57600080fd5b83018035915067ffffffffffffffff821115611f1557600080fd5b60200191503681900382131561196057600080fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611f82577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b600060208284031215611f9b57600080fd5b5051919050565b60005b83811015611fbd578181015183820152602001611fa5565b50506000910152565b60008251611fd8818460208701611fa2565b9190910192915050565b6020815260008251806020840152612001816040850160208701611fa2565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a264697066735822122044f4dbf362d1db1b3a80f2a4f1d2ea0ee3c30880cbda61bc7611ccff6f6e77e164736f6c63430008110033";

type TestAggregatedAccountFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestAggregatedAccountFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestAggregatedAccountFactory__factory extends ContractFactory {
  constructor(...args: TestAggregatedAccountFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    anEntryPoint: PromiseOrValue<string>,
    anAggregator: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestAggregatedAccountFactory> {
    return super.deploy(
      anEntryPoint,
      anAggregator,
      overrides || {}
    ) as Promise<TestAggregatedAccountFactory>;
  }
  override getDeployTransaction(
    anEntryPoint: PromiseOrValue<string>,
    anAggregator: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      anEntryPoint,
      anAggregator,
      overrides || {}
    );
  }
  override attach(address: string): TestAggregatedAccountFactory {
    return super.attach(address) as TestAggregatedAccountFactory;
  }
  override connect(signer: Signer): TestAggregatedAccountFactory__factory {
    return super.connect(signer) as TestAggregatedAccountFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestAggregatedAccountFactoryInterface {
    return new utils.Interface(_abi) as TestAggregatedAccountFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestAggregatedAccountFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestAggregatedAccountFactory;
  }
}
