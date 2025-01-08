import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteNamesEnum } from 'localConstants';
import { isLoggedInSelector, useSelector } from 'lib/sdkDappCore';

interface AuthRedirectWrapperPropsType extends PropsWithChildren {
  requireAuth?: boolean;
}

export const AuthRedirectWrapper = ({
  children,
  requireAuth = true
}: AuthRedirectWrapperPropsType) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
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
