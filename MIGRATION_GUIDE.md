# @multiversx/template-dapp

Migrating your application to the new SDK will probably require more code removal than insertion. Of course, each application is different, so this guide will have a generic character, pointing to you the main areas where you might need to change your code.
The main areas that might need code restructuring are:
- package.json library dependencies
- index.tsx file where the app bootstraps
- App.tsx, the main file of your application
- logging in and out
- sending and signing transactions
- component imports related to displaying data
- types

A typical migration can be seen in this [pull request](https://github.com/multiversx/mx-template-dapp/pull/264).

Next, we will make a brief overview of the main changes required.

## 1. Changes in [`package.json`](https://github.com/multiversx/mx-template-dapp/pull/264/files#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519)

#### Dependencies
- Removed:
  - `@multiversx/sdk-dapp`
- Added:
  - `@multiversx/sdk-dapp-core` (version `0.0.0-alpha.12`)
  - `@multiversx/sdk-dapp-core-ui` (version `0.0.0-alpha.2`)
  - `@multiversx/sdk-dapp-utils` (version `1.0.5`)

## 2. Changes in [`index.tsx`](https://github.com/multiversx/mx-template-dapp/pull/264/files#diff-0b5adbfe7b36e4ae2f479291e20152e33e940f7f265162d77f40f6bdb5da7405)

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

## 2. Summary of Changes in  [`App.tsx`](https://github.com/multiversx/mx-template-dapp/pull/264/files#diff-26ad4b834941d9b19ebf9db8082bd202aaf72ea0ddea85f5a8a0cb3c729cc6f2)

- AxiosInterceptorContext is now created as a local component
- DappProvider was removed and initialization is now made in initApp
- NotificationModal, SignTransactionsModals and TransactionsToastList are removed and functionality is handled under the hood

## 3. Logging in and out:

Login buttons have been removed and there is a universal Unlock side panel, which can be inserted in the DOM at a desired location. 

Example of how to use the Unlock side panel:

```tsx
import { Button } from 'components';
import { useState } from 'react';
import { ProviderFactory } from 'lib';
export { UnlockPanel, UnlockButton } from '@multiversx/sdk-dapp-core-ui/react';
import { ExtendedProviders } from 'initConfig';
import { IProviderFactory } from '@multiversx/sdk-dapp-core/out/core/providers/types/providerFactory.types';
import { useNavigate } from 'react-router-dom';
import { RouteNamesEnum } from 'localConstants';

export const ConnectButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async ({ type, anchor }: IProviderFactory) => {
    const provider = await ProviderFactory.create({
      type,
      anchor
    });
    await provider?.login();
    navigate(RouteNamesEnum.dashboard);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Connect</Button>
      <UnlockPanel
        open={open}
        onLogin={(options) =>
          handleLogin({
            type: options.detail.provider,
            anchor: options.detail.anchor
          })
        }
        onClose={() => {
          setOpen(false);
        }}
      >
        <UnlockButton
          label='In Memory Provider'
          onClick={() =>
            handleLogin({
              type: ExtendedProviders.inMemoryProvider
            })
          }
        />
      </UnlockButton>
    </>
  );
};
```

## 4. [Sending transactions](https://github.com/multiversx/mx-template-dapp/pull/264/files#diff-1eadd6ccf43da9c2a8c30f5dfddbb56f3daeec28f04e43b41c134811bec478fb)
   - `sendTransactions` has been replaced by `provider.signTransactions`, `txManager.send` and `txManager.track`
   - `newTransaction` function has been removed and you need to create `Transaction` objects directly

## 5. [UI components get imported from sdk-dapp-core-ui](https://github.com/multiversx/mx-template-dapp/pull/264/files#diff-e07cb98fcda2927e31f2a0f6cc5db5cb9a364c8da43d8df70597321bb1558336)
    - see `src/lib/sdkDapp/components/CopyButton/CopyButton.tsx`

### URL login is no longer supported 
    - see TODO how to login with PostMessage

## 6. [Types](https://github.com/multiversx/mx-template-dapp/pull/264/files#diff-bd634780b000031ebfffb83de483b66a93ed12fde321950128e31a794ce96057)
    - `LoginMethodsEnum` is replaced by `ProviderTypeEnum`
    - `RawTransactionType` was removed
    - some new types were added, related to UI elements, like `FormatAmountControllerPropsType`