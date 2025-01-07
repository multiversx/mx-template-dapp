import React from 'react';
import { WebWalletLoginButtonPropsType } from '@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton/WebWalletLoginButton';

interface DualLoginButtonProps extends WebWalletLoginButtonPropsType {
  initiateLoginWithIframe: () => void;
  loginButtonText: string;
  buttonClassName?: string;
}

export const DualLoginButton = ({
  initiateLoginWithIframe,
  loginButtonText,
  buttonClassName,
  containerClassName,
  wrapperClassName,
  ...props
}: DualLoginButtonProps) => {
  return (
    <div
      onClick={initiateLoginWithIframe}
      className={buttonClassName}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          initiateLoginWithIframe();
        }
      }}
    >
      {loginButtonText}
    </div>
  );
};
