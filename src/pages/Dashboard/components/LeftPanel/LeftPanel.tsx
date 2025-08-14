import {
  faClose,
  faPowerOff,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import IconExpand from 'assets/img/expand-up-down.svg?react';
import { AddressComponent, Logo } from 'components';
import { getAccountProvider, useGetAccountInfo, useGetIsLoggedIn } from 'lib';
import { RouteNamesEnum } from 'localConstants';

import { Account, SideMenu } from './components';

// prettier-ignore
const styles = {
  leftPanelContainer: 'left-panel-container flex flex-col w-screen lg:w-80 gap-8 lg:gap-0 py-4 p-6 sticky lg:h-screen top-0 bg-primary lg:bg-accent transition-all duration-300 overflow-y-scroll',
  leftPanelContainerOpen: 'left-panel-container-open rounded-t-2xl lg:rounded-t-none p-6',
  leftPanelMobileHeader: 'left-panel-mobile-header flex lg:hidden justify-between items-center pt-2 pb-1 transition-all duration-300',
  leftPanelMobileHeaderIconClose: 'left-panel-mobile-header-icon-close text-link', 
  leftPanelMobileHeaderIconOpen: 'left-panel-mobile-header-icon-open fill-primary', 
  leftPanel: 'left-panel flex flex-col gap-4',
  leftPanelHidden: 'hidden',
  leftPanelMobileAddressSection: 'left-panel-mobile-address-section lg:hidden bg-accent transition-all duration-300 h-8 flex items-center justify-between rounded-full border border-secondary px-6 py-4',
  leftPanelMobileAddress: 'left-panel-mobile-address flex gap-2 items-center justify-center',
  leftPanelMobileAddressIcon: 'left-panel-mobile-address-icon text-accent',
  logoutButton: 'text-center text-link hover:text-primary transition-all duration-300 cursor-pointer',
  leftPanelComponents: 'flex flex-col gap-4 bg-accent p-6 lg:p-0 rounded-2xl transition-all duration-300',
  leftPanelBar: 'w-full h-0.25 bg-neutral-700 opacity-40 transition-all duration-300'
} satisfies Record<string, string>;

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
  const isDesktop = window.innerWidth >= 1024;

  const { address } = useGetAccountInfo();

  const isLoggedIn = useGetIsLoggedIn();

  const provider = getAccountProvider();
  const navigate = useNavigate();

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
          [styles.leftPanelHidden]: !isOpen && !isDesktop
        })}
      >
        <div className={styles.leftPanelMobileAddressSection}>
          <div className={styles.leftPanelMobileAddress}>
            <FontAwesomeIcon
              icon={faWallet}
              className={styles.leftPanelMobileAddressIcon}
            />

            <AddressComponent address={address} isHeader />
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
