import { faPowerOff, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { AddressComponent, Button, MxLink } from 'components';
import { environment } from 'config';
import { getAccountProvider, useGetAccountInfo, useGetIsLoggedIn } from 'lib';
import { RouteNamesEnum } from 'localConstants';
import {
  GitHubButton,
  HeaderElementContainer,
  NotificationsButton,
  SwitchThemeButton,
  TemplateLogo
} from './components';

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const provider = getAccountProvider();
  const { address } = useGetAccountInfo();

  const handleLogout = async () => {
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  return (
    <header className='flex flex-row align-center justify-between p-4 lg:py-8 :px-10'>
      <MxLink
        className='flex items-center justify-between'
        to={isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home}
      >
        <TemplateLogo isHeader />
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div className='flex justify-end container mx-auto items-center gap-4'>
          <SwitchThemeButton />
          <GitHubButton />
          {isLoggedIn && <NotificationsButton />}
          <div className='flex gap-1 items-center relative'>
            <div className='w-3 h-3 rounded-full absolute -left-0.5 -top-0.5 bg-accent transition-all duration-300 flex items-center justify-center'>
              <div className='w-2 h-2 rounded-full bg-btn-primary transition-all duration-300' />
            </div>

            <HeaderElementContainer className='w-20 cursor-none'>
              {environment[0].toUpperCase() + environment.slice(1)}
            </HeaderElementContainer>
          </div>

          {isLoggedIn && (
            <HeaderElementContainer className='hidden lg:!flex !rounded-full gap-3 w-fit cursor-none pl-3.5 pr-3'>
              <div className='flex gap-2 items-center justify-center'>
                <FontAwesomeIcon
                  icon={faWallet}
                  className='text-accent transition-all duration-300'
                />

                <AddressComponent address={address} isHeader />
              </div>

              <Button
                onClick={handleLogout}
                className='text-center text-link transition-all duration-300'
                icon={faPowerOff}
                iconClassName='px-0'
              />
            </HeaderElementContainer>
          )}

          {!isLoggedIn && (
            <Button
              onClick={() => {
                navigate(RouteNamesEnum.unlock);
              }}
              label='Connect'
            />
          )}
        </div>
      </nav>
    </header>
  );
};
