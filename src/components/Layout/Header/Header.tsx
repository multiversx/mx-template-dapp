import { faMoon, faPowerOff, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateLogo from 'assets/img/template-logo.svg?react';
import { Button, MxLink } from 'components';
import { environment } from 'config';
import {
  CopyButton,
  getAccountProvider,
  MvxExplorerLink,
  useGetAccountInfo,
  useGetIsLoggedIn
} from 'lib';
import { RouteNamesEnum } from 'localConstants';
// import { GitHubButton } from './components/GitHubButton';
// import { NotificationsButton } from './components/NotificationsButton';

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const provider = getAccountProvider();
  const { address } = useGetAccountInfo();
  const [themeIcon, setThemeIcon] = useState(faSun);

  const handleLogout = async () => {
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  const handleChangeTheme = () => {
    const currentIcon = themeIcon;
    if (currentIcon === faSun) {
      setThemeIcon(faMoon);
    } else {
      setThemeIcon(faSun);
    }
  };

  return (
    <header className='flex flex-row align-center justify-between pl-6 pr-6 pt-6'>
      <MxLink
        className='flex items-center justify-between'
        to={isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home}
      >
        <TemplateLogo className='w-full h-6 fill-primary' />
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div className='flex justify-end container mx-auto items-center gap-4'>
          <button
            onClick={handleChangeTheme}
            className='text-secondary font-normal text-sm bg-primary w-8 h-8 flex items-center justify-center rounded-lg border border-primary cursor-pointer'
          >
            <FontAwesomeIcon icon={themeIcon} />
          </button>

          <div className='flex gap-1 items-center relative'>
            <div className='w-3 h-3 rounded-full absolute left-0 -top-0.5 bg-accent flex items-center justify-center'>
              <div className='w-2 h-2 rounded-full bg-black' />
            </div>
            <p className='text-secondary font-normal text-sm bg-primary w-20 h-8 flex items-center justify-center rounded-lg border border-primary'>
              {environment[0].toUpperCase() + environment.slice(1)}
            </p>
          </div>

          <div className='bg-primary h-8 flex items-center justify-center rounded-lg border border-primary pl-3.5 pr-3 py-3'>
            <div className='flex gap-2'>
              <p className='truncate text-secondary font-normal text-sm'>
                {address}
              </p>

              <div className='flex gap-1 text-link'>
                <CopyButton />

                <MvxExplorerLink
                // link={explorerLink}
                // className=''
                ></MvxExplorerLink>
              </div>
            </div>

            <span className='w-0.25 h-3.25 bg-link mx-2' />

            {isLoggedIn && (
              <>
                <Button
                  onClick={handleLogout}
                  className='text-center text-link'
                >
                  <FontAwesomeIcon icon={faPowerOff} className='' />
                </Button>
              </>
            )}
          </div>
          {/* 
          <GitHubButton />

          <NotificationsButton /> */}

          {!isLoggedIn && (
            <Button
              onClick={() => {
                navigate(RouteNamesEnum.unlock);
              }}
            >
              Connect
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
