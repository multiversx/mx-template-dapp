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

## 2. Summary of Changes in [`App.tsx`](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/App.tsx)

- AxiosInterceptorContext is now created as a local component
- DappProvider was removed and initialization is now made in initApp
- NotificationModal, SignTransactionsModals and TransactionsToastList are removed and functionality is handled under the hood
- Unlock page is a child route since it only diplays a side panel over an existing route (in our case Home `/`)

## 3. Logging in and out

### 3.1 [Logging in](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/pages/Unlock/Unlock.tsx)

Login buttons have been removed and there is a universal Unlock side panel, which can be inserted in the DOM at a desired location.

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

### 3.2 [Logging out](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/components/Layout/Header/Header.tsx#L14)

In order to perform a logut action you simply need to get the current signing provider and call the `logout()` method:

```typescript
import { getAccountProvider } from '@multiversx/sdk-dapp/out/providers/helpers/accountProvider';
const provider = getAccountProvider();
await provider.logout();
```

## 4. [Sending transactions](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/helpers/signAndSendTransactions.ts)

- `sendTransactions` has been replaced by `provider.signTransactions`, `txManager.send` and `txManager.track`
- `newTransaction` function has been removed and you need to create `Transaction` objects directly

## 5. [UI components are now imported from sdk-dapp-core-ui](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDappUI/sdkDappUI.components.ts)

  - [CopyButton.tsx](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDapp/components/CopyButton/CopyButton.tsx)
  - [ExplorerLink.tsx](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDapp/components/ExplorerLink/ExplorerLink.tsx)
  - [FormatAmount.tsx](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDapp/components/FormatAmount/FormatAmount.tsx)

Some new UI elements have been added:

  - [UnlockPanel](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/pages/Unlock/Unlock.tsx#L10)
  - [NotificationsFeed](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/components/Layout/Header/components/NotificationsButton.tsx)

## 6. [Types](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDapp/sdkDapp.types.ts)

  - `LoginMethodsEnum` is replaced by `ProviderTypeEnum`
  - `RawTransactionType` was removed
  - some new types were added, related to UI elements, like [MvxCopyButtonPropsType](https://github.com/multiversx/mx-template-dapp/blob/a98cadfc291321e9874acd7e53632a6b43ca8c59/src/lib/sdkDapp/components/CopyButton/CopyButton.tsx#L2)
