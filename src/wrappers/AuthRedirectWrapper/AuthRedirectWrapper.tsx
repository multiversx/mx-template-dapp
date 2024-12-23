import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteNamesEnum } from 'localConstants';
import { useStore } from 'hooks/useStore';
import { isLoggedInSelector } from 'lib/sdkDappCore';

interface AuthRedirectWrapperPropsType extends PropsWithChildren {
  requireAuth?: boolean;
}

export const AuthRedirectWrapper = ({
  children,
  requireAuth = true
}: AuthRedirectWrapperPropsType) => {
  const state = useStore();
  const isLoggedIn = isLoggedInSelector(state);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && !requireAuth) {
      navigate(RouteNamesEnum.dashboard);

      return;
    }

    if (!isLoggedIn && requireAuth) {
      navigate(RouteNamesEnum.unlock);
    }
  }, [isLoggedIn]);

  return <>{children}</>;
};
