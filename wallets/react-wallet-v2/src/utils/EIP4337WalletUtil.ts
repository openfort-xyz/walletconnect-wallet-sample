import EIP4337Lib from '@/lib/EIP4337Lib'

export let wallet1: EIP4337Lib
export let eip4337Wallets: Record<string, EIP4337Lib>
export let eip4337Addresses: string[]

let address1: string

/**
 * Utilities
 */
export async function createOrRestoreEIP4337Wallet() {
  wallet1 = await EIP4337Lib.init({mnemonic: "...MNEMONIC..."}) // Put the mnemonic here

  address1 = "...OPENFORT_ACCOUNT..."; // Put your openfort account address here

  eip4337Wallets = {
    [address1]: wallet1
  }
  eip4337Addresses = Object.keys(eip4337Wallets)

  return {
    eip4337Wallets,
    eip4337Addresses
  }
}
