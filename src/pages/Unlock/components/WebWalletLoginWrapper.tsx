import React from 'react';
import { useWebWalletLogin } from '@multiversx/sdk-dapp/hooks/login/useWebWalletLogin';
import { WebWalletLoginButtonPropsType } from '@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton/WebWalletLoginButton';
import { CrossWindowLoginButton } from 'components/sdkDappComponents';
import { DualLoginButton } from './DualLoginButton';

export const WebWalletLoginWrapper = ({
  ...commonProps
}: WebWalletLoginButtonPropsType) => {
  const [onInitiateLogin] = useWebWalletLogin({
    ...commonProps
  });

  return (
    <DualLoginButton label='Web Wallet' onInitiateLogin={onInitiateLogin}>
      <CrossWindowLoginButton
        loginButtonText='Web Wallet'
        data-testid='webWalletLoginBtn'
        className='!mr-0 !rounded-none !rounded-l-md'
        {...commonProps}
      />
    </DualLoginButton>
  );
};
