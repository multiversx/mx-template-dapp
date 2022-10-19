import React from 'react';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from '@elrondnetwork/dapp-core/UI';
import { useLocalStorage } from 'hooks';
import { routeNames } from 'routes';
import { getLoginToken } from 'services/auth';

export const UnlockRoute: () => JSX.Element = () => {
  const [loginToken, setLoginToken] = useLocalStorage<string>('loginToken', '');
  const { isLoggedIn } = useGetLoginInfo();

  React.useEffect(() => {
    if (isLoggedIn && loginToken) {
      window.location.href = routeNames.dashboard;
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    (async () => {
      const token = await getLoginToken();
      setLoginToken(token);
    })();
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
              token={loginToken}
            />
            <WebWalletLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Web wallet'}
              token={loginToken}
            />
            <LedgerLoginButton
              loginButtonText={'Ledger'}
              callbackRoute={routeNames.dashboard}
              className={'test-class_name'}
              token={loginToken}
            />
            <WalletConnectLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Maiar'}
              token={loginToken}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
