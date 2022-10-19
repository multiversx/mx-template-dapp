import React from 'react';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';

const getAccessTokenExpirationTime = () => {
  const credentials = localStorage.getItem('credentials');

  if (credentials) {
    const { accessTokenExpirationTime } = JSON.parse(credentials);

    return accessTokenExpirationTime;
  }

  return null;
};

const useIsAuthenticated = () => {
  const [isValidAccessToken, setIsValidAccessToken] =
    React.useState<boolean>(false);
  const { isLoggedIn } = useGetLoginInfo();

  React.useEffect(() => {
    const handleChangeCredentials = () => {
      const tokenExpirationTime = getAccessTokenExpirationTime();

      if (tokenExpirationTime) {
        if (tokenExpirationTime > Date.now() / 1000) {
          setIsValidAccessToken(true);
        } else {
          setIsValidAccessToken(false);
        }
      }
    };

    window.addEventListener('storage', handleChangeCredentials);
    return () => window.removeEventListener('storage', handleChangeCredentials);
  }, []);

  if (isLoggedIn && isValidAccessToken) return true;

  return false;
};

export default useIsAuthenticated;
