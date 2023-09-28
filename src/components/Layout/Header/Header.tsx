import { Button } from 'components/Button';
import { MxLink } from 'components/MxLink';
import { environment } from 'config';
import { logout } from 'helpers';
import { useGetIsLoggedIn } from 'hooks';
import { RouteNamesEnum } from 'localConstants';
import MultiversXLogo from '../../../assets/img/multiversx-logo.svg?react';

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    sessionStorage.clear();
    logout(`${window.location.origin}/unlock`, undefined, false);
  };

  return (
    <header className='flex flex-row align-center justify-between pl-6 pr-6 pt-6'>
      <MxLink
        className='flex items-center justify-between'
        to={isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home}
      >
        <MultiversXLogo className='w-full h-6' />
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div className='flex justify-end container mx-auto items-center gap-2'>
          <div className='flex gap-1 items-center'>
            <div className='w-2 h-2 rounded-full bg-green-500' />
            <p className='text-gray-600'>{environment}</p>
          </div>

          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
            >
              Close
            </Button>
          ) : (
            <MxLink to={RouteNamesEnum.unlock}>Connect</MxLink>
          )}
        </div>
      </nav>
    </header>
  );
};
