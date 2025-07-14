# @multiversx/template-dapp

Migrating your application to `sdk-dapp@5.x` will probably require more code removal than insertion. Of course, each application is different, so this guide will have a generic character, pointing out the main areas where you might need to change your code.
The main areas that might need code restructuring are:

- package.json library dependencies
- index.tsx file where the app bootstraps
- App.tsx, the main file of your application
- logging in and out
- sending and signing transactions
- component imports related to displaying data
- types

A typical migration can be seen in this [pull request](https://github.com/multiversx/mx-template-dapp/pull/343).

Next, we will make a brief overview of the main changes required.

## 1. Changes in [`package.json`](https://github.com/multiversx/mx-template-dapp/pull/343/files#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519)

#### Dependencies


- Updated:
  - `@multiversx/sdk-dapp` (version `^5.x`)
  - `@multiversx/sdk-dapp-utils` (version `2.0.0`)
- Added:
  - `@multiversx/sdk-dapp-ui` (version `^0.x`)

## 2. Changes in [`index.tsx`](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/index.tsx)

You will need to wrap your application in a call to `initApp`:

```tsx
initApp(config).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
```

## 3. Summary of Changes in [`App.tsx`](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/App.tsx)

- AxiosInterceptorContext is now created as a local component
- DappProvider was removed ❌ and initialization is now made in initApp
- NotificationModal, SignTransactionsModals and TransactionsToastList are removed ❌ and functionality is handled under the hood
- Unlock page is a child route since it only displays a side panel over an existing route (in our case Home `/`)

## 4. Logging in and out

### 4.1 [Logging in](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/pages/Unlock/Unlock.tsx)

Login buttons have been removed ❌ and there is a universal Unlock side panel, which can be inserted in the DOM at a desired location.

> NOTE: Web-wallet URL login is no longer supported

Example of how to use the `UnlockPanelManager` in the `unlock` route is shown below. Of course the `openUnlockPanel()` method can also be linked to a button.

```tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnlockPanelManager, useGetLoginInfo } from 'lib';
import { RouteNamesEnum } from 'localConstants';

export const Unlock = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useGetLoginInfo();

  const unlockPanelManager = UnlockPanelManager.init({
    loginHandler: () => {
      navigate(RouteNamesEnum.dashboard);
    },
    onClose: () => {
      navigate(RouteNamesEnum.home);
    }
  });

  const handleOpenUnlockPanel = () => {
    unlockPanelManager.openUnlockPanel();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(RouteNamesEnum.dashboard);
      return;
    }

    handleOpenUnlockPanel();
  }, [isLoggedIn]);

  return null;
};
```

- isAccountLoading has been deprecated
- `import { getIsProviderEqualTo } from “@multiversx/sdk-dapp/utils/account/getIsProviderEqualTo”` --> removed ❌

### 4.2 [Logging out](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/components/Layout/Header/Header.tsx#L14)

In order to perform a logout action you simply need to get the current signing provider and call the `logout()` method:

```typescript
import { getAccountProvider } from '@multiversx/sdk-dapp/out/providers/helpers/accountProvider';
const provider = getAccountProvider();
await provider.logout();
```

## 5. [Sending transactions](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/helpers/signAndSendTransactions.ts)

- `sendTransactions` and `useSendBatchTransactions` have been replaced by `provider.signTransactions`, `txManager.send` and `txManager.track`
- `newTransaction` function has been removed ❌ and you need to create `Transaction` objects directly

## 6. [Tracking transactions](https://github.com/multiversx/mx-template-dapp/blob/423e782fec5e04b6a35b6297eaf253eb8d7ca1ba/src/helpers/signAndSendTransactions.ts#L22)

Tracking transactions is now handled using the `txManager.track` method. You should use this method to monitor the status and outcome of your transactions after sending them. Refer to the linked file for implementation details and examples.

```typescript
  const txManager = TransactionManager.getInstance();

  const sentTransactions = await txManager.send(signedTransactions);
  const sessionId = await txManager.track(sentTransactions, {
    transactionsDisplayInfo
  });
```

 - [onFail](https://github.com/multiversx/mx-sdk-dapp/blob/0d7d9627ceccda56982a73c8ac00ed0558f0e2ec/src/hooks/transactions/useTrackTransactionStatus.ts#L34) and [onSuccess](https://github.com/multiversx/mx-sdk-dapp/blob/0d7d9627ceccda56982a73c8ac00ed0558f0e2ec/src/hooks/transactions/batch/tracker/useVerifyBatchStatus.ts#L11) callbacks can now be configured in [initApp config](https://github.com/multiversx/mx-sdk-dapp/blob/1518a070f10ef0dc133e756c07b6fc0f2165bddb/src/methods/initApp/initApp.types.ts#L42) or with [TransactionManager.setCallbacks](https://github.com/multiversx/mx-sdk-dapp/blob/1518a070f10ef0dc133e756c07b6fc0f2165bddb/src/managers/TransactionManager/TransactionManager.ts#L45)

## 7. [UI components are now imported from sdk-dapp-core-ui](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDappUI/sdkDappUI.components.ts)

  - [CopyButton.tsx](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDapp/components/CopyButton/CopyButton.tsx)
  - [ExplorerLink.tsx](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDapp/components/ExplorerLink/ExplorerLink.tsx)
  - [FormatAmount.tsx](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDapp/components/FormatAmount/FormatAmount.tsx)

Some UI components were removed:

  - [AxiosInteceptor](https://github.com/multiversx/mx-sdk-dapp/blob/old-main/src/wrappers/AxiosInterceptorContext/AxiosInterceptorContext.tsx) ❌ no longer needed because signed token can be accessed via store directly 
  - [IdleTimer](https://github.com/multiversx/mx-sdk-dapp/blob/old-main/src/web/hooks/useIdleTimer.tsx) ❌ must be implemented locally if needed
  - [TransactionsToastList](https://github.com/multiversx/mx-sdk-dapp/blob/old-main/src/UI/TransactionsToastList/TransactionsToastList.tsx) - removed ❌
  - [SignTransactionsModals](https://github.com/multiversx/mx-sdk-dapp/blob/old-main/src/UI/SignTransactionsModals/SignTransactionsModals.tsx) - removed ❌
  - [NotificationModal](https://github.com/multiversx/mx-sdk-dapp/blob/old-main/src/UI/NotificationModal/NotificationModal.tsx) - removed ❌

Some new UI elements have been added:

  - [UnlockPanel](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/pages/Unlock/Unlock.tsx#L10) replaces [login buttons](https://github.com/multiversx/mx-sdk-dapp/blob/old-main/src/UI/walletConnect/WalletConnectLoginButton/WalletConnectLoginButton.tsx)
  - [NotificationsFeed](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/components/Layout/Header/components/NotificationsButton.tsx)

## 8. Methods

- `import { deleteCustomToast } from “@multiversx/sdk-dapp/utils/toasts/customToastsActions”` --> `import { removeCustomToast } from “@multiversx/sdk-dapp/out/store/actions/toasts/toastsActions”`
- `export { setNonce } from “@multiversx/sdk-dapp/out/utils/account”;` --> `export { setAccountNonce as setNonce } from “@multiversx/sdk-dapp/out/store/actions”`
- `export { getAccount } from “@multiversx/sdk-dapp/out/utils/account”;` --> `export { getAccountFromApi as getAccount } from “@multiversx/sdk-dapp/out/apiCalls/account/getAccountFromApi”;`
- `export {
  setTransactionsToSignedState,
  setTransactionsDisplayInfoState,
} from “@multiversx/sdk-dapp/services/transactions/updateSignedTransactions”;` have been removed ❌
- `export { deleteTransactionToast } from “@multiversx/sdk-dapp/services/transactions/clearTransactions”;` --> `export { removeTransactionToast as deleteTransactionToast } from “@multiversx/sdk-dapp/out/store/actions/toasts/toastsActions”;`
- `export {
  addressIsValid,
} from “@multiversx/sdk-dapp/out/utils/account”;` --> `export { addressIsValid } from “@multiversx/sdk-dapp/out/utils/validation/addressIsValid”;`
- `export { getShardOfAddress } from “@multiversx/sdk-dapp/out/utils/account”;` -->
`import { AddressComputer } from “@multiversx/sdk-core/out”;
const addressComputer = new AddressComputer();
const getShardOfAddress = addressComputer.getShardOfAddress;
export { getShardOfAddress };`
- `walletConnectDeepLink` is now set in [initApp](https://github.com/multiversx/mx-sdk-dapp/blob/1518a070f10ef0dc133e756c07b6fc0f2165bddb/src/methods/initApp/initApp.types.ts#L23C21-L23C40)


## 9. [Types](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDapp/sdkDapp.types.ts)

  - `LoginMethodsEnum` is replaced by `ProviderTypeEnum`
  - `RawTransactionType` was removed ❌
  - some new types were added, related to UI elements, like [MvxCopyButtonPropsType](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDapp/components/CopyButton/CopyButton.tsx#L2)
