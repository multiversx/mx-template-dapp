import { useNavigate } from 'react-router-dom';
import { Button, MxLink } from 'components';
import { environment } from 'config';
import {
  getAccountProvider,
  ProviderFactory,
  ProviderTypeEnum,
  useGetIsLoggedIn,
  UnlockButtonSDK,
  UnlockPanelSDK
} from 'lib';
import { RouteNamesEnum } from 'localConstants';
import MultiversXLogo from '../../../assets/img/multiversx-logo.svg?react';
import { useState } from 'react';
import { ExtendedProviders } from 'initConfig';

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const provider = getAccountProvider();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await provider.logout();
    navigate(RouteNamesEnum.home);
  };

  const handleLogin = async (type: ProviderTypeEnum, anchor: HTMLElement) => {
    const provider = await ProviderFactory.create({
      type,
      anchor
    });
    await provider?.login();
    navigate(RouteNamesEnum.dashboard);
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
            <Button onClick={() => setOpen(true)}>Connect</Button>
          )}
          <UnlockPanelSDK
            open={open}
            onLogin={(options) =>
              handleLogin(options.detail.provider, options.detail.anchor)
            }
            onClose={() => {
              setOpen(false);
            }}
          >
            <UnlockButtonSDK
              label='In Memory Provider'
              onClick={async () => {
                const provider = await ProviderFactory.create({
                  type: ExtendedProviders.inMemoryProvider
                });
                await provider?.login();
                navigate(RouteNamesEnum.dashboard);
              }}
            />
          </UnlockPanelSDK>
        </div>
      </nav>
    </header>
  );
};
