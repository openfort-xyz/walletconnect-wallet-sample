import { providers, Signer, Wallet } from 'ethers'
import { ERC4337EthersSigner } from './aa/ERC4337EthersSigner'
import { getERC4337EthersSigner, AccountParams } from './aa/Signer'

/**
 * Types
 */
interface IInitArgs {
  mnemonic: string
}

/**
 * Library
 */
export default class EIP4337Lib {
  wallet: ERC4337EthersSigner

  constructor(wallet: ERC4337EthersSigner) {
    this.wallet = wallet
  }

  static async init({ mnemonic }: IInitArgs) : Promise<EIP4337Lib> {
    const owner = Wallet.fromMnemonic(mnemonic) as Signer
    const params : AccountParams = {
      owner: owner,
      address: "...OPENFORT_ACCOUNT...", // Put your openfort account address here
      chainId: 80001
    }

    let wallet = await getERC4337EthersSigner(params)

    //*/
    return new EIP4337Lib(wallet)
  }

  getAddress() {
    return this.wallet.getAddress()
  }

  signMessage(message: string) {
    return this.wallet.signMessage(message)
  }

  _signTypedData(domain: any, types: any, data: any) {
    return this.wallet._signTypedData(domain, types, data)
  }

  connect(provider: providers.JsonRpcProvider) {
    return this.wallet.connect(provider)
  }

  signTransaction(transaction: providers.TransactionRequest) {
    return this.wallet.signTransaction(transaction)
  }
}

function nameERC4337(params:AccountParams) : ERC4337EthersSigner{
  let result: ERC4337EthersSigner; // Declare a variable in the wider scope

  getERC4337EthersSigner(params)
  .then((value) => {
    result = value
    return(value); // Access the value here
  })
  .catch((error) => {
    console.error(error);
  });

  return result!
}
