import { ReactNode, useEffect } from 'react';
import BigNumber from 'bignumber.js';

import { RouteType } from 'types';
import {
  isWindowAvailable,
  getSearchParamAddress,
  useGetLoginInfo,
  useGetIsLoggedIn,
  useGetAccount,
  safeRedirect
} from 'utils/sdkDappCore';
import { matchRoute } from './helpers/matchRoute';

export const AuthenticatedRoutesWrapper = ({
  children,
  routes,
  pathName,
  unlockRoute,
  onRedirect
}: {
  children: ReactNode;
  routes: RouteType[];
  pathName?: string;
  unlockRoute: string;
  onRedirect?: (unlockRoute?: string) => void;
}) => {
  const searchParamAddress = getSearchParamAddress();
  const isLoggedIn = useGetIsLoggedIn();
  const account = useGetAccount();
  const walletLogin = useGetLoginInfo();

  const getLocationPathname = () => {
    if (isWindowAvailable()) {
      return window.location.pathname;
    }
    return '';
  };

  const isOnAuthenticatedRoute = matchRoute(
    routes,
    pathName ?? getLocationPathname()
  );

  const shouldRedirect =
    isOnAuthenticatedRoute && !isLoggedIn && walletLogin == null;

  useEffect(() => {
    if (!shouldRedirect) {
      return;
    }

    if (onRedirect) {
      return onRedirect(unlockRoute);
    }

    safeRedirect({ url: unlockRoute });
  }, [shouldRedirect, unlockRoute]);

  const isValidWalletLoginAttempt = walletLogin != null && searchParamAddress;
  const isBalanceReady = !new BigNumber(account.balance).isNaN();

  if (!isBalanceReady || isValidWalletLoginAttempt) {
    return null;
  }

  return <>{children}</>;
};
