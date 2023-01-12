import React, { PropsWithChildren } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { Navigate } from 'react-router-dom';
import { routeNames } from 'routes';

export const AuthRedirectWrapper = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useGetIsLoggedIn();

  if (isLoggedIn) {
    return <Navigate to={routeNames.dashboard} />;
  }

  return <>{children}</>;
};
