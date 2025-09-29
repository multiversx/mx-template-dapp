import {
  faClose,
  faPowerOff,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconExpand } from 'assets/img/expand-up-down.svg';
import { Logo } from 'components';
import {
  ACCOUNTS_ENDPOINT,
  getAccountProvider,
  MvxDataWithExplorerLink,
  useGetAccount,
  useGetIsLoggedIn,
  useGetNetworkConfig
} from 'lib';
import { RouteNamesEnum } from 'localConstants';

import { Account, SideMenu } from './components';
import styles from './leftPanel.styles';

interface LeftPanelPropsType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const LeftPanel = ({
  isOpen = false,
  setIsOpen
}: LeftPanelPropsType) => {
  const handleOpenPanel = () => {
    setIsOpen(!isOpen);
  };

  const { address } = useGetAccount();

  const { network } = useGetNetworkConfig();

  const isLoggedIn = useGetIsLoggedIn();

  const provider = getAccountProvider();
  const navigate = useNavigate();

  const explorerAddress = network.explorerAddress;

  const handleLogout = async () => {
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  return (
    <div
      className={classNames(styles.leftPanelContainer, {
        [styles.leftPanelContainerOpen]: isOpen
      })}
    >
      <div className={styles.leftPanelMobileHeader} onClick={handleOpenPanel}>
        <Logo />

        {isOpen ? (
          <FontAwesomeIcon
            icon={faClose}
            className={styles.leftPanelMobileHeaderIconClose}
            size='xl'
          />
        ) : (
          <IconExpand className={styles.leftPanelMobileHeaderIconOpen} />
        )}
      </div>

      <div
        className={classNames(styles.leftPanel, {
          [styles.leftPanelHidden]: !isOpen
        })}
      >
        <div className={styles.leftPanelMobileAddressSection}>
          <div className={styles.leftPanelMobileAddress}>
            <FontAwesomeIcon
              icon={faWallet}
              className={styles.leftPanelMobileAddressIcon}
            />

            <div className={styles.leftPanelMobileAddressWithExplorerLink}>
              <MvxDataWithExplorerLink
                data={address}
                withTooltip={true}
                explorerLink={`${explorerAddress}/${ACCOUNTS_ENDPOINT}/${address}`}
              />
            </div>
          </div>

          {isLoggedIn && (
            <button onClick={handleLogout} className={styles.logoutButton}>
              <FontAwesomeIcon icon={faPowerOff} />
            </button>
          )}
        </div>

        <div className={styles.leftPanelComponents}>
          <Account />

          <div className={styles.leftPanelBar} />

          <SideMenu setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};
