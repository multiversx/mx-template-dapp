import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountProvider, useGetIsLoggedIn } from 'lib';
import { RouteNamesEnum } from 'localConstants';

export const Logout = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const provider = getAccountProvider();

  const handleLogout = async () => {
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(RouteNamesEnum.home, { replace: true });
      return;
    }
    handleLogout();
  }, [isLoggedIn]);

  return (
    <div className='flex justify-center items-center w-full h-full self-center'>
      <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
    </div>
  );
};
