import { PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate, matchPath } from 'react-router-dom';
import { useGetIsLoggedIn } from 'lib';
import { RouteNamesEnum } from 'localConstants';
import { routes } from 'routes';

export const AuthRedirectWrapper = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentRoute = routes.find((route) => matchPath(route.path, pathname));

  const requireAuth = Boolean(currentRoute?.authenticatedRoute);

  useEffect(() => {
    if (isLoggedIn && !requireAuth) {
      navigate(RouteNamesEnum.dashboard);

      return;
    }

    if (!isLoggedIn && requireAuth) {
      navigate(RouteNamesEnum.unlock);
    }
  }, [isLoggedIn, currentRoute]);

  return <>{children}</>;
};
