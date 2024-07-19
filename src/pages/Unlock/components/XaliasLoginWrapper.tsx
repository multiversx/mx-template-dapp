import React from 'react';
import { WebWalletLoginButtonPropsType } from '@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton/WebWalletLoginButton';
import { useXaliasLogin } from '@multiversx/sdk-dapp/hooks/login/useXaliasLogin';
import { XaliasCrossWindowLoginButton } from 'components/sdkDappComponents';
import { DualLoginButton } from './DualLoginButton';

export const XaliasLoginWrapper = ({
  ...commonProps
}: WebWalletLoginButtonPropsType) => {
  const [onInitiateLogin] = useXaliasLogin({
    ...commonProps
  });

  return (
    <DualLoginButton label='xAlias' onInitiateLogin={onInitiateLogin}>
      <XaliasCrossWindowLoginButton
        loginButtonText='xAlias'
        data-testid='xAliasLoginBtn'
        className='!mr-0 !rounded-none !rounded-l-md'
        {...commonProps}
      />
    </DualLoginButton>
  );
};
