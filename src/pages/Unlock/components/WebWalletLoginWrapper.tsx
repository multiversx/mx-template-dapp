import React from 'react';
import { WebWalletLoginButtonPropsType } from '@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton/WebWalletLoginButton';

interface WebWalletLoginWrapperProps {
  children: React.ReactNode;
}

export const WebWalletLoginWrapper = ({ children }: WebWalletLoginWrapperProps) => {
  return <>{children}</>;
};
