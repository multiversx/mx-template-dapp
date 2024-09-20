import {
  type ExtensionLoginButtonPropsType,
  type WebWalletLoginButtonPropsType,
  type OperaWalletLoginButtonPropsType,
  type LedgerLoginButtonPropsType,
  type WalletConnectLoginButtonPropsType,
  IframeButton
} from '@multiversx/sdk-dapp/UI';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  OperaWalletLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton as WebWalletUrlLoginButton,
  XaliasCrossWindowLoginButton,
  CrossWindowLoginButton
} from 'components/sdkDappComponents';
import { nativeAuth } from 'config';
import { RouteNamesEnum } from 'localConstants';
import { useNavigate } from 'react-router-dom';
import { AuthRedirectWrapper } from 'wrappers';
import { WebWalletLoginWrapper, XaliasLoginWrapper } from './components';

type CommonPropsType =
  | OperaWalletLoginButtonPropsType
  | ExtensionLoginButtonPropsType
  | WebWalletLoginButtonPropsType
  | LedgerLoginButtonPropsType
  | WalletConnectLoginButtonPropsType;

// choose how you want to configure connecting to the web wallet
const USE_WEB_WALLET_CROSS_WINDOW = true;

const WebWalletLoginButton = USE_WEB_WALLET_CROSS_WINDOW
  ? CrossWindowLoginButton
  : WebWalletUrlLoginButton;

export const Unlock = () => {
  const navigate = useNavigate();
  const commonProps: CommonPropsType = {
    callbackRoute: RouteNamesEnum.dashboard,
    nativeAuth,
    onLoginRedirect: () => {
      navigate(RouteNamesEnum.dashboard);
    }
  };

  return (
    <AuthRedirectWrapper requireAuth={false}>
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
            <IframeButton
              loginButtonText='Passkey Proxy'
              loginType='passkey'
              {...commonProps}
            />

            <IframeButton
              loginButtonText='Metamask Proxy'
              loginType='metamask'
              {...commonProps}
            />
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
