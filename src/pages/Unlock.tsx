import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthRedirectWrapper,
  ExtensionLoginButton,
  LedgerLoginButton,
  OperaWalletLoginButton,
  WalletConnectLoginButton,
  // WalletV2LoginButton,
  WebWalletLoginButton
} from 'components';
import { routeNames } from 'routes';

const UnlockPage = () => {
  const navigate = useNavigate();
  const commonProps = {
    callbackRoute: routeNames.dashboard,
    nativeAuth: true, // optional,
    onLoginRedirect: () => {
      navigate(routeNames.dashboard);
    }
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

            {/* <WalletV2LoginButton loginButtonText='WalletV2' {...commonProps} /> */}

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
