import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faCreditCard,
  faPowerOff,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo, Tooltip } from 'components';
import { GITHUB_REPO_URL } from 'config';
import {
  ACCOUNTS_ENDPOINT,
  getAccountProvider,
  MvxButton,
  MvxDataWithExplorerLink,
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
  headerNavigationButton: 'header-navigation-button flex justify-center items-center w-8 lg:w-10 h-8 lg:h-10 rounded-xl cursor-pointer relative after:rounded-xl after:absolute after:bg-btn-variant hover:after:bg-btn-hover  after:transition-all after:duration-200 after:ease-out after:left-0 after:right-0 after:top-0 after:bottom-0 after:pointer-events-none hover:after:opacity-100',
  headerNavigationButtonIcon: 'header-navigation-button-icon flex justify-center relative text-xs lg:text-base z-1 items-center text-tertiary',
  headerNavigationTooltip: 'header-navigation-tooltip p-1 leading-none whitespace-nowrap text-tertiary',
  headerNavigationNetwork: 'header-navigation-network h-8 border border-secondary rounded-xl lg:h-10 relative w-22 flex items-center justify-center leading-none capitalize text-tertiary before:absolute before:rounded-full before:w-2 before:lg:w-2.5 before:h-2 before:lg:h-2.5 before:bg-btn-primary before:z-2 before:-top-0.25 before:lg:-top-0.5 before:-left-0.25 before:lg:-left-0.5 after:absolute after:bg-primary after:rounded-lg after:opacity-40 after:left-0 after:right-0 after:top-0 after:bottom-0 after:pointer-events-none',
  headerNavigationNetworkLabel: 'header-navigation-network-label relative z-1',
  headerNavigationConnectDesktop: 'header-navigation-connect-desktop h-8 lg:h-10 hidden sm:block!',
  headerNavigationConnectMobile: 'header-navigation-connect-mobile w-8 h-8 bg-btn-tertiary cursor-pointer flex justify-center items-center sm:hidden text-xs rounded-xl',
  headerNavigationConnectIcon: 'header-navigation-connect-icon text-accent',
  headerNavigationAddress: 'header-navigation-address h-8 lg:h-10 w-8 lg:w-full text-primary justify-center text-xs rounded-xl lg:text-base lg:pr-4 lg:pl-5 max-w-100 flex relative lg:border lg:border-secondary lg:rounded-full items-center gap-3 after:absolute after:bg-btn-tertiary after:rounded-xl lg:after:rounded-full after:opacity-40 after:left-0 after:right-0 after:top-0 after:bottom-0 after:pointer-events-none',
  headerNavigationAddressWallet: 'header-navigation-address-wallet relative z-1 text-accent hidden lg:flex!',
  headerNavigationAddressExplorer: 'header-navigation-address-explorer min-w-0 relative z-1 hidden lg:block!',
  headerNavigationAddressLogout: 'header-navigation-address-logout text-tertiary cursor-pointer relative z-1 transition-all duration-200 ease-out hover:text-accent',
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

  const handleLogout = async (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  const handleGitHubBrowsing = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.open(GITHUB_REPO_URL);
  };

  const handleLogIn = (event: MouseEvent<HTMLElement>) => {
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
              identifier={`header-${headerBrowseButton.label}-button`}
              key={`header-${headerBrowseButton.label}-button`}
              content={headerBrowseButton.label}
              place='bottom'
            >
              {() => (
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
            </Tooltip>
          ))}
        </div>

        <div className={styles.headerNavigationNetwork}>
          <div className={styles.headerNavigationNetworkLabel}>
            {network.id}
          </div>
        </div>

        {isLoggedIn && (
          <div className={styles.headerNavigationAddress}>
            <FontAwesomeIcon
              icon={faCreditCard}
              className={styles.headerNavigationAddressWallet}
            />

            <div className={styles.headerNavigationAddressExplorer}>
              <MvxDataWithExplorerLink
                data={address}
                withTooltip={true}
                explorerLink={`/${ACCOUNTS_ENDPOINT}/${address}`}
                className='test'
              />
            </div>

            <Tooltip
              place='bottom'
              identifier='disconnect-tooltip-identifier'
              content='Disconnect'
            >
              {() => (
                <div
                  onClick={handleLogout}
                  className={styles.headerNavigationAddressLogout}
                >
                  <FontAwesomeIcon icon={faPowerOff} />
                </div>
              )}
            </Tooltip>
          </div>
        )}

        {!isLoggedIn && (
          <MvxButton
            onClick={handleLogIn}
            className={styles.headerNavigationConnectDesktop}
          >
            Connect
          </MvxButton>
        )}

        {!isLoggedIn && (
          <div
            onClick={handleLogIn}
            className={styles.headerNavigationConnectMobile}
          >
            <FontAwesomeIcon
              icon={faPowerOff}
              className={styles.headerNavigationConnectIcon}
            />
          </div>
        )}
      </nav>
    </header>
  );
};
