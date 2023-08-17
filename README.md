# Wallet Example using Walletconnect

This sample aims to show a basic use case enabled by WalletConnect's Sign SDK so games can let their players interact with their own Openfort accounts. Please note that WalletConnect can only be used with self-custodial Openfort accounts as it needs the owner to sign transactions.

Please only use this for reference and development purposes, otherwise you are at risk of losing your funds.


## Features
- 🚀 NextJS & Typescript
- 🔗 WalletConnect v2
- 🏰 Openfort Accounts


## How to run locally

Example is built atop of [NextJS](https://nextjs.org/) in order to abstract complexity of setting up bundlers, routing etc. So there are few steps you need to follow in order to set everything up

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/sign-in) and obtain a project id

2. Install dependencies `yarn install` or `npm install`

3. Setup your environment variables

```bash
cp .env.local.example .env.local
```

Your `.env.local` now contains the following environment variables:

- `NEXT_PUBLIC_PROJECT_ID` - Put your WalletConnect project id from step 1
- `NEXT_PUBLIC_RELAY_URL` - (already set)

4. Replace the following values from:

- `wallets/react-wallet-v2/src/utils/EIP4337WalletUtil.ts`
    - `...MNEMONIC...` with the mnemonic of the owner of the Openfort account.
    - `...OPENFORT_ACCOUNT...` with the address the Openfort account to use.

- `wallets/react-wallet-v2/src/lib/constants.ts`
    - `...MUMBAI_BUNDLER...` URL of a valid bundler. This sample is configured to run on the Mumbai network.

- `wallets/react-wallet-v2/src/lib/EIP4337Lib.ts`
    - `...OPENFORT_ACCOUNT...` with the address the Openfort account to use.

5. Run `yarn dev` or `npm run dev` to start local development


## Navigating through the sample

1. Initial setup and initializations happen in [_app.ts](src/pages/_app.tsx) file.
2. The WalletConnect client is initialized in [useInitialization.ts ](src/hooks/useInitialization.ts) hook.
3. Subscription and handling of WalletConnect events happens in [useWalletConnectEventsManager.ts](src/hooks/useWalletConnectEventsManager.ts) hook, that opens related [Modal views](src/views) and passes them all necessary data.
4. [Modal views](src/views) are responsible for data display and handling approval or rejection actions.
5. Upon approval or rejection, modals pass the request data to [RequestHandlerUtil.ts](src/utils/RequestHandlerUtil.ts) that performs all necessary work based on the request method and returns formated json rpc result data that can be then used for WalletConnect client responses.

## Get support
If you found a bug or want to suggest a new [feature/use case/sample], please [file an issue](../../../issues).

If you have questions, comments, or need help with code, we're here to help:
- on [Discord](https://discord.com/invite/t7x7hwkJF4)
- on Twitter at [@openfortxyz](https://twitter.com/openfortxyz)
- by [email](mailto:support+github@openfort.xyz)
