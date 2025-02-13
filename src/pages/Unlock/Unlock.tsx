import { useIframeLogin } from '@multiversx/sdk-dapp/hooks/login/useIframeLogin';
import {
  type ExtensionLoginButtonPropsType,
  type WebWalletLoginButtonPropsType,
  type OperaWalletLoginButtonPropsType,
  type LedgerLoginButtonPropsType,
  type WalletConnectLoginButtonPropsType
} from '@multiversx/sdk-dapp/UI';
import { IframeLoginTypes } from '@multiversx/sdk-web-wallet-iframe-provider/out/constants';
import { useNavigate } from 'react-router-dom';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  OperaWalletLoginButton,
  WalletConnectLoginButton
} from 'components/sdkDapp';
import { nativeAuth } from 'config';
import { useWindowSize } from 'hooks';
import { RouteNamesEnum } from 'localConstants';
import {
  IframeButton,
  WebWalletLoginWrapper,
  XaliasLoginWrapper
} from './components';

type CommonPropsType =
  | OperaWalletLoginButtonPropsType
  | ExtensionLoginButtonPropsType
  | WebWalletLoginButtonPropsType
  | LedgerLoginButtonPropsType
  | WalletConnectLoginButtonPropsType;

export const Unlock = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const [onInitiateLogin, { isLoading }] = useIframeLogin({
    callbackRoute: RouteNamesEnum.dashboard,
    nativeAuth,
    onLoginRedirect: () => {
      navigate(RouteNamesEnum.dashboard);
    }
  });

  const isMobile = width < 768;
  const commonProps: CommonPropsType = {
    callbackRoute: RouteNamesEnum.dashboard,
    nativeAuth,
    onLoginRedirect: () => {
      navigate(RouteNamesEnum.dashboard);
    },
    disabled: isLoading
  };

  return (
    <div className='flex justify-center items-center'>
      <div
        className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]'
        data-testid='unlockPage'
      >
        <div className='flex flex-col items-center gap-1'>
          <h2 className='text-2xl'>Login</h2>

          <p className='text-center text-gray-400'>Choose a login method</p>
        </div>

        <div className='flex flex-col md:flex-row'>
          <WalletConnectLoginButton
            loginButtonText='xPortal App'
            {...commonProps}
          />
          <LedgerLoginButton loginButtonText='Ledger' {...commonProps} />
          <ExtensionLoginButton
            loginButtonText='DeFi Wallet'
            {...commonProps}
          />
          <OperaWalletLoginButton
            loginButtonText='Opera Crypto Wallet - Beta'
            {...commonProps}
          />
          <XaliasLoginWrapper {...commonProps} />
          <WebWalletLoginWrapper {...commonProps} />
          {isMobile && (
            <IframeButton
              loginButtonText='Passkey Proxy'
              {...commonProps}
              onClick={() => onInitiateLogin(IframeLoginTypes.passkey)}
            />
          )}

          <IframeButton
            loginButtonText='Metamask Proxy'
            {...commonProps}
            onClick={() => onInitiateLogin(IframeLoginTypes.metamask)}
          />
        </div>
      </div>
    </div>
  );
};
