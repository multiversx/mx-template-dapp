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
import classNames from 'classnames';

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
import styles from './header.styles';

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
  const explorerAddress = network.explorerAddress;

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
              className={classNames({ hidden: !headerBrowseButton.isVisible })}
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

        {isLoggedIn ? (
          <div className={styles.headerNavigationAddress}>
            <FontAwesomeIcon
              icon={faCreditCard}
              className={styles.headerNavigationAddressWallet}
            />

            <div className={styles.headerNavigationAddressExplorer}>
              <MvxDataWithExplorerLink
                data={address}
                withTooltip={true}
                explorerLink={`${explorerAddress}/${ACCOUNTS_ENDPOINT}/${address}`}
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
        ) : (
          <div className={styles.headerNavigationConnect}>
            <MvxButton
              onClick={handleLogIn}
              className={styles.headerNavigationConnectDesktop}
            >
              Connect
            </MvxButton>

            <div
              onClick={handleLogIn}
              className={styles.headerNavigationConnectMobile}
            >
              <FontAwesomeIcon
                icon={faPowerOff}
                className={styles.headerNavigationConnectIcon}
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
