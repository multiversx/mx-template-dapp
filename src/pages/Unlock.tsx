import React from 'react';
import {
  AuthRedirectWrapper,
  ExtensionLoginButton,
  LedgerLoginButton,
  OperaWalletLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from 'components';
import { routeNames } from 'routes';

const UnlockPage = () => {
  const commonProps = {
    callbackRoute: routeNames.dashboard,
    nativeAuth: true // optional
  };

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card my-4 text-center'>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
            <h4 className='mb-4'>Login</h4>
            <p className='mb-4'>pick a login method</p>

            <ExtensionLoginButton
              loginButtonText='MultiversX DeFi Wallet'
              {...commonProps}
            />

            <OperaWalletLoginButton
              loginButtonText='Opera Crypto Wallet - Beta'
              {...commonProps}
            />

            <WebWalletLoginButton
              loginButtonText='MultiversX Web Wallet'
              data-testid='webWalletLoginBtn'
              {...commonProps}
            />
            <LedgerLoginButton
              loginButtonText='Ledger'
              className='test-class_name'
              {...commonProps}
            />
            <WalletConnectLoginButton
              loginButtonText='xPortal App'
              {...commonProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Unlock = () => (
  <AuthRedirectWrapper>
    <UnlockPage />
  </AuthRedirectWrapper>
);
