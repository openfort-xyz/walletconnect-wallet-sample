import { EIP4337_SIGNING_METHODS } from '@/data/EIP4337Data'
import { eip4337Addresses, eip4337Wallets, wallet1 } from '@/utils/EIP4337WalletUtil'
import {
  getSignParamsMessage,
  getSignTypedDataParamsData,
  getWalletAddressFromParams
} from '@/utils/HelperUtil'
import {getChainRPCs} from "../lib/utils"
import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils'
import { SignClientTypes } from '@walletconnect/types'
import { getSdkError } from '@walletconnect/utils'
import { ethers } from 'ethers'

type RequestEventArgs = Omit<SignClientTypes.EventArguments['session_request'], 'verifyContext'>
export async function approveEIP4337Request(requestEvent: RequestEventArgs) {
  const { params, id } = requestEvent
  const { chainId, request } = params
  // const wallet = eip4337Wallets[getWalletAddressFromParams(eip4337Addresses, params)]
  const wallet = wallet1.wallet

  switch (request.method) {
    case EIP4337_SIGNING_METHODS.PERSONAL_SIGN:
    case EIP4337_SIGNING_METHODS.ETH_SIGN:
      try {
        const message = getSignParamsMessage(request.params)
        const signedMessage = await wallet.signMessage(message)
        return formatJsonRpcResult(id, signedMessage)
      } catch (error: any) {
        console.error(error)
        alert(error.message)
        return formatJsonRpcError(id, error.message)
      }

    case EIP4337_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
    case EIP4337_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
    case EIP4337_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
      try {
        const { domain, types, message: data } = getSignTypedDataParamsData(request.params)
        // https://github.com/ethers-io/ethers.js/issues/687#issuecomment-714069471
        delete types.EIP712Domain
        const signedData = await wallet._signTypedData(domain, types, data)
        return formatJsonRpcResult(id, signedData)
      } catch (error: any) {
        console.error(error)
        alert(error.message)
        return formatJsonRpcError(id, error.message)
      }

    case EIP4337_SIGNING_METHODS.ETH_SEND_TRANSACTION:
      try {
        // const provider = new providers.JsonRpcProvider(EIP4337_CHAINS[chainId as TEIP4337Chain].rpc)
        const provider = new ethers.providers.JsonRpcProvider(getChainRPCs(80001)[0]);
        const sendTransaction = request.params[0]
        const connectedWallet = wallet
        const { hash } = await connectedWallet.sendTransaction(sendTransaction)
        return formatJsonRpcResult(id, hash)
      } catch (error: any) {
        console.error(error)
        alert(error.message)
        return formatJsonRpcError(id, error.message)
      }

    case EIP4337_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
      try {
        const signTransaction = request.params[0]
        const signature = await wallet.signTransaction(signTransaction)
        return formatJsonRpcResult(id, signature)
      } catch (error: any) {
        console.error(error)
        alert(error.message)
        return formatJsonRpcError(id, error.message)
      }

    default:
      throw new Error(getSdkError('INVALID_METHOD').message)
  }
}

export function rejectEIP4337Request(request: RequestEventArgs) {
  const { id } = request

  return formatJsonRpcError(id, getSdkError('USER_REJECTED').message)
}
