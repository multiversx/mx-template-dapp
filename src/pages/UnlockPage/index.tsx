import React from 'react';
import { DappUI, getIsLoggedIn } from '@elrondnetwork/dapp-core-components';
import { routeNames } from 'routes';

export const UnlockRoute: () => JSX.Element = () => {
  const {
    ExtensionLoginButton,
    WebWalletLoginButton,
    LedgerLoginButton,
    WalletConnectLoginButton
  } = DappUI;

  React.useEffect(() => {
    const isLoggedIn = getIsLoggedIn();
    if (isLoggedIn) {
      window.location.href = routeNames.dashboard;
    }
  }, []);

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card my-4 text-center'>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
            <h4 className='mb-4'>Login</h4>
            <p className='mb-4'>pick a login method</p>

            <ExtensionLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Extension'}
            />
            <WebWalletLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Web wallet'}
            />
            <LedgerLoginButton
              loginButtonText={'Ledger'}
              callbackRoute={routeNames.dashboard}
              className={'test-class_name'}
            />
            <WalletConnectLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Maiar'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
