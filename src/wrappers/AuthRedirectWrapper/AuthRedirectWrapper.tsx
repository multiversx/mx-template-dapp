import React, { PropsWithChildren, useEffect } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { useNavigate } from 'react-router-dom';
import { RouteNamesEnum } from 'localConstants/routes/routeNames.enums';

export const AuthRedirectWrapper = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const isLoggedIn = useGetIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(RouteNamesEnum.dashboard, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
};
