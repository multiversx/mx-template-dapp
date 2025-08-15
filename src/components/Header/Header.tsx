import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faPowerOff,
  faWallet,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MvxButton,
  MvxCopyButton
  // MvxDataWithExplorerLink
} from '@multiversx/sdk-dapp-ui/react';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddressComponent, Logo, Tooltip } from 'components';
import { GITHUB_REPO_URL } from 'config';
import {
  // ACCOUNTS_ENDPOINT,
  getAccountProvider,
  NotificationsFeedManager,
  useGetAccountInfo,
  useGetIsLoggedIn,
  useGetNetworkConfig
} from 'lib';
import { RouteNamesEnum } from 'localConstants';

import { ThemeTooltip } from './components';

// prettier-ignore
const styles = {
  header: 'header flex items-center justify-between px-4 h-16 md:h-20 md:px-10',
  headerLogo: 'header-logo cursor-pointer transition-opacity duration-200 hover:opacity-75',
  headerNavigation: 'header-navigation flex items-center gap-2 lg:gap-4',
  headerNavigationButtons: 'header-navigation-buttons flex gap-2 lg:gap-4',
  headerNavigationButton: 'header-navigation-button flex justify-center items-center w-8 lg:w-10 h-8 lg:h-10 rounded-xl cursor-pointer relative after:rounded-xl after:absolute after:bg-btn-variant after:transition-all after:duration-200 after:ease-out after:left-0 after:right-0 after:top-0 after:bottom-0 after:pointer-events-none hover:after:opacity-100',
  headerNavigationButtonIcon: 'header-navigation-button-icon flex justify-center relative text-xs lg:text-base z-1 items-center text-tertiary transition-all duration-200 ease-out',
  headerNavigationButtonTooltip: 'header-navigation-button-tooltip p-1 leading-none whitespace-nowrap text-tertiary transition-all duration-200 ease-out',
  headerNavigationNetwork: 'header-navigation-network h-8 border border-secondary rounded-xl lg:h-10 relative w-22 flex items-center justify-center leading-none capitalize text-tertiary before:absolute before:rounded-full before:w-2 before:lg:w-2.5 before:h-2 before:lg:h-2.5 before:bg-btn-primary before:z-2 before:-top-0.25 before:lg:-top-0.5 before:-left-0.25 before:lg:-left-0.5 after:absolute after:bg-primary after:rounded-lg after:opacity-40 after:left-0 after:right-0 after:top-0 after:bottom-0 after:pointer-events-none transition-all duration-200 ease-out',
  headerNavigationNetworkLabel: 'header-navigation-network-label relative z-1',
  headerNavigationConnect: 'header-navigation-connect h-8 lg:h-10',
  walletContainer: 'hidden lg:!flex !rounded-full gap-3 w-fit pl-3.5 pr-3 py-1.5 bg-primary border border-secondary text-primary transition-all duration-200 ease-out',
  walletInfo: 'flex gap-2 items-center justify-center',
  walletIcon: 'text-accent transition-all duration-200 ease-out',
  logoutButton: 'text-center text-link hover:text-primary transition-all duration-200 ease-out cursor-pointer'
} satisfies Record<string, string>;

interface HeaderBrowseButtonType {
  handleClick: (event: MouseEvent<HTMLDivElement>) => void;
  icon: IconDefinition;
  isVisible: boolean;
  label: string;
}

export const Header = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();

  const isLoggedIn = useGetIsLoggedIn();
  const provider = getAccountProvider();
  const navigate = useNavigate();

  const handleLogout = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  const handleGitHubBrowsing = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.open(GITHUB_REPO_URL);
  };

  const handleLogIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(RouteNamesEnum.unlock);
  };

  const handleNotificationsBrowsing = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    NotificationsFeedManager.getInstance().openNotificationsFeed();
  };

  const headerBrowseButtons: HeaderBrowseButtonType[] = [
    {
      label: 'GitHub',
      handleClick: handleGitHubBrowsing,
      icon: faGithub as IconDefinition,
      isVisible: true
    },
    {
      label: 'Notifications',
      handleClick: handleNotificationsBrowsing,
      icon: faBell,
      isVisible: isLoggedIn
    }
  ];

  const handleLogoClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    navigate(isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home);
  };

  return (
    <header className={styles.header}>
      <div onClick={handleLogoClick} className={styles.headerLogo}>
        <Logo hideTextOnMobile={true} />
      </div>

      <nav className={styles.headerNavigation}>
        <ThemeTooltip />

        <div className={styles.headerNavigationButtons}>
          {headerBrowseButtons.map((headerBrowseButton) => (
            <Tooltip
              key={`header-${headerBrowseButton.label}-button`}
              position='bottom'
              trigger={() => (
                <div
                  onClick={headerBrowseButton.handleClick}
                  className={styles.headerNavigationButton}
                >
                  <FontAwesomeIcon
                    className={styles.headerNavigationButtonIcon}
                    icon={headerBrowseButton.icon}
                  />
                </div>
              )}
            >
              <div className={styles.headerNavigationButtonTooltip}>
                {headerBrowseButton.label}
              </div>
            </Tooltip>
          ))}
        </div>

        <div className={styles.headerNavigationNetwork}>
          <div className={styles.headerNavigationNetworkLabel}>
            {network.id}
          </div>
        </div>

        <MvxCopyButton text={address} iconClass='w-8 h-8' />

        {/* <MvxDataWithExplorerLink
          data={address}
          explorerLink={`/${ACCOUNTS_ENDPOINT}/${address}`}
        /> */}

        {isLoggedIn && (
          <div className={styles.walletContainer}>
            <div className={styles.walletInfo}>
              <FontAwesomeIcon icon={faWallet} className={styles.walletIcon} />
              <AddressComponent address={address} isHeader />
            </div>

            <button onClick={handleLogout} className={styles.logoutButton}>
              <FontAwesomeIcon icon={faPowerOff} />
            </button>
          </div>
        )}

        {!isLoggedIn && (
          <MvxButton
            onClick={handleLogIn}
            // className={styles.headerNavigationConnect}
            size='small'
          >
            Connect
          </MvxButton>
        )}
      </nav>
    </header>
  );
};
