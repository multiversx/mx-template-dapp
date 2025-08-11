import { faPowerOff, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddressComponent, Button, Logo } from 'components';
import { environment } from 'config';
import { getAccountProvider, useGetAccountInfo, useGetIsLoggedIn } from 'lib';
import { RouteNamesEnum } from 'localConstants';

import {
  GitHubButton,
  HeaderElementContainer,
  NotificationsButton,
  SwitchThemeButton
} from './components';
import './header.scss';

// prettier-ignore
const styles = {
  header: 'header flex items-center justify-between px-4 h-16 md:h-20 md:px-10',
  headerLogo: 'header-logo cursor-pointer transition-opacity duration-200 hover:opacity-75',
  nav: 'h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent',
  navContainer: 'flex justify-end container mx-auto items-center gap-4',
  envIndicator: 'flex gap-1 items-center relative',
  envDot: 'w-3 h-3 rounded-full absolute -left-0.5 -top-0.5 bg-accent transition-all duration-300 flex items-center justify-center',
  envDotInner: 'w-2 h-2 rounded-full bg-btn-primary transition-all duration-300',
  envContainer: 'w-20 cursor-none',
  walletContainer: 'hidden lg:!flex !rounded-full gap-3 w-fit cursor-none pl-3.5 pr-3',
  walletInfo: 'flex gap-2 items-center justify-center',
  walletIcon: 'text-accent transition-all duration-300',
  logoutButton: 'text-center text-link transition-all duration-300',
  logoutIcon: 'px-0'
} satisfies Record<string, string>;

export const Header = () => {
  const { address } = useGetAccountInfo();

  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const provider = getAccountProvider();

  const handleLogout = async () => {
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  const handleLogoClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    navigate(isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home);
  };

  return (
    <header className={styles.header}>
      <div onClick={handleLogoClick} className={styles.headerLogo}>
        <Logo hideTextOnMobile={true} />
      </div>

      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <SwitchThemeButton />
          <GitHubButton />
          {isLoggedIn && <NotificationsButton />}
          <div className={styles.envIndicator}>
            <div className={styles.envDot}>
              <div className={styles.envDotInner} />
            </div>

            <HeaderElementContainer className={styles.envContainer}>
              {environment[0].toUpperCase() + environment.slice(1)}
            </HeaderElementContainer>
          </div>

          {isLoggedIn && (
            <HeaderElementContainer className={styles.walletContainer}>
              <div className={styles.walletInfo}>
                <FontAwesomeIcon
                  icon={faWallet}
                  className={styles.walletIcon}
                />

                <AddressComponent address={address} isHeader />
              </div>

              <Button
                onClick={handleLogout}
                className={styles.logoutButton}
                icon={faPowerOff}
                iconClassName={styles.logoutIcon}
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
