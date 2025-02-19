# @multiversx/template-dapp

## Changes in package.json

#### Dependencies
- Removed:
  - `@multiversx/sdk-core`
  - `@multiversx/sdk-dapp`
- Added:
  - `@multiversx/sdk-dapp-core` (version `0.0.0-alpha.12`)
  - `@multiversx/sdk-dapp-core-ui` (version `0.0.0-alpha.2`)
  - `@multiversx/sdk-dapp-utils` (version `1.0.5`)

#### Scripts
- Modified `build` scripts to include TypeScript compilation (`tsc`):
  - `"build:devnet": "tsc & yarn run copy:devnet-config & vite build"`
  - `"build:testnet": "tsc & yarn run copy:testnet-config & vite build"`
  - `"build:mainnet": "tsc & yarn run copy:mainnet-config & vite build"`

#### Development Dependencies
- Changed versions from caret (`^`) to specific versions:
  - `@vitejs/plugin-basic-ssl` to `1.0.1`
  - `@wdio/cli` to `8.33.1`
  - `eslint-plugin-sort-exports` to `0.9.1`


### Summary of Changes in `App.tsx`

1. **AxiosInterceptorContext**:
   - TODO: check usage

2. **DappProvider**:
   - initialization is now made in initApp

2. **NotificationModal, SignTransactionsModals, TransactionsToastList**:
   - are all handled under the hood

### Summary of Changes in `signAndSendTransactions.tsx`

1. **Sending transactions**:
   - sendTransactions has been replaced by provider.signTransactions, txManager.send and txManager.track
   - newTransaction function has been removed and you need to create Transaction objects directly

### URL login is no longer supported 
    - see TODO how to login with PostMessage

### UI components get imported from sdk-dapp-core-ui
    - see src/lib/sdkDapp/components/CopyButton/CopyButton.tsx

### Types
    - `LoginMethodsEnum` is replaced by `ProviderTypeEnum`
    - `RawTransactionType` was removed
    - some new types were added, related to UI elements, like `FormatAmountControllerPropsType`