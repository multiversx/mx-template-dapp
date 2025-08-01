import {
  faChevronDown,
  faClose,
  faPowerOff,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AddressComponent, Button } from 'components';
import { TemplateLogo } from 'components/Layout/Header/components';
import { getAccountProvider, useGetAccountInfo, useGetIsLoggedIn } from 'lib';
import { RouteNamesEnum } from 'localConstants';
import { Account, SideMenu } from './components';

interface LeftPanelPropsType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const LeftPanel = ({ isOpen, setIsOpen }: LeftPanelPropsType) => {
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
      className={classNames(
        'flex flex-col w-screen lg:w-80 gap-8 lg:gap-0 p-4 lg:p-6 sticky lg:h-screen top-0 bg-primary lg:bg-accent transition-all duration-300',
        { 'rounded-t-2xl lg:rounded-t-none p-6': isOpen }
      )}
    >
      <div
        className='flex lg:hidden justify-between items-center pt-2 pb-1'
        onClick={handleOpenPanel}
      >
        <TemplateLogo />

        <FontAwesomeIcon
          icon={isOpen ? faClose : faChevronDown}
          className={classNames('text-primary transition-all duration-300', {
            '!text-link': isOpen
          })}
          size={isOpen ? 'xl' : 'sm'}
        />
      </div>

      <div
        className={classNames('flex flex-col gap-4', {
          hidden: !isOpen && !isDesktop
        })}
      >
        <div className='lg:hidden bg-accent transition-all duration-300 h-8 flex items-center justify-between rounded-full border border-secondary px-6 py-4'>
          <div className='flex gap-2 items-center justify-center'>
            <FontAwesomeIcon icon={faWallet} className='text-accent' />

            <AddressComponent address={address} isHeader />
          </div>

          {isLoggedIn && (
            <>
              <Button
                onClick={handleLogout}
                className='text-center text-link transition-all duration-300'
                icon={faPowerOff}
                iconClassName='px-0'
              />
            </>
          )}
        </div>

        <div className='flex flex-col gap-4 bg-accent p-6 lg:p-0 rounded-2xl transition-all duration-300'>
          <Account />

          <div className='w-full h-0.25 bg-neutral-700 opacity-40 transition-all duration-300' />

          <SideMenu setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};
