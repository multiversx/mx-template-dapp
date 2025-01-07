import React, { useEffect } from 'react';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  OperaWalletLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from '@multiversx/sdk-dapp/UI';
import { AuthRedirectWrapper } from 'wrappers/AuthRedirectWrapper';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { RouteNamesEnum } from 'localConstants/routes/routeNames.enums';
import { useNavigate } from 'react-router-dom';
import { DualLoginButton } from './components/DualLoginButton';
import { IframeLoginTypes } from '@multiversx/sdk-web-wallet-iframe-provider/out/constants';
import { useIframeLogin } from '@multiversx/sdk-dapp/hooks/login/useIframeLogin';

export const Unlock = () => {
  const navigate = useNavigate();
  const isLoggedIn = useGetIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(RouteNamesEnum.dashboard, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const commonProps = {
    callbackRoute: RouteNamesEnum.dashboard,
    onLoginRedirect: () => {
      navigate(RouteNamesEnum.dashboard, { replace: true });
    }
  };

  const { initiateLogin } = useIframeLogin({
    type: IframeLoginTypes.wallet,
    ...commonProps
  });

  const commonClasses = {
    containerClassName: 'w-full transition-transform hover:scale-[1.02]',
    buttonClassName: 'w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
  };

  return (
    <AuthRedirectWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header avec logo Tikaw */}
          <div className="flex-none h-20 flex items-center justify-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Tikaw
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 -mt-20">
            <div className="w-full max-w-md mx-auto">
              {/* Header */}
              <div className="text-center space-y-4 mb-6">
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                    Connect Your Wallet
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose your preferred wallet to connect to Tikaw
                  </p>
                </div>
              </div>

              {/* Wallet Options */}
              <div className="space-y-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10 mb-6">
                <ExtensionLoginButton
                  loginButtonText="DeFi Wallet"
                  className={commonClasses.buttonClassName}
                  {...commonProps}
                />

                <LedgerLoginButton
                  loginButtonText="Ledger"
                  className={commonClasses.buttonClassName}
                  {...commonProps}
                />

                <WalletConnectLoginButton
                  loginButtonText="xPortal App"
                  className={commonClasses.buttonClassName}
                  {...commonProps}
                />

                <OperaWalletLoginButton
                  loginButtonText="Opera Crypto Wallet"
                  className={commonClasses.buttonClassName}
                  {...commonProps}
                />

                <div className={commonClasses.containerClassName}>
                  <WebWalletLoginButton
                    loginButtonText="Web Wallet"
                    className={commonClasses.buttonClassName}
                    {...commonProps}
                  />
                </div>

                <div className={commonClasses.containerClassName}>
                  <DualLoginButton
                    loginButtonText="xAlias Login"
                    buttonClassName={commonClasses.buttonClassName}
                    initiateLoginWithIframe={initiateLogin}
                  />
                </div>
              </div>

              {/* Security Note */}
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By connecting, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
