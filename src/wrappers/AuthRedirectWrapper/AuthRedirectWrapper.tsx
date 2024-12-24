import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteNamesEnum } from 'localConstants';
import { isLoggedInSelector } from 'lib/sdkDappCore';
import { addressSelector } from '@multiversx/sdk-dapp-core/out/store/selectors/accountSelectors';
import { useSelector } from 'hooks/useSelector';

interface AuthRedirectWrapperPropsType extends PropsWithChildren {
  requireAuth?: boolean;
}

export const AuthRedirectWrapper = ({
  children,
  requireAuth = true
}: AuthRedirectWrapperPropsType) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const address = useSelector(addressSelector);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(address, isLoggedIn);
    if (isLoggedIn && !requireAuth) {
      debugger;
      navigate(RouteNamesEnum.dashboard);

      return;
    }

    if (!isLoggedIn && requireAuth) {
      debugger;

      navigate(RouteNamesEnum.unlock);
    }
  }, [isLoggedIn]);

  return <>{children}</>;
};
