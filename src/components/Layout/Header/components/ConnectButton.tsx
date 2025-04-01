import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { ExtendedProviders } from 'initConfig';
import {
  IProviderFactory,
  MvxUnlockButton,
  MvxUnlockPanel,
  ProviderFactory
} from 'lib';
import { RouteNamesEnum } from 'localConstants';

const SHOW_ADVANCED_LOGIN_METHOD = true;

export const ConnectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async ({ type, anchor }: IProviderFactory) => {
    const provider = await ProviderFactory.create({
      type,
      anchor
    });
    await provider?.login();
    navigate(RouteNamesEnum.dashboard);
  };

  const handleOpenUnlockPanel = () => {
    setIsOpen(true);
  };

  const handleCloseUnlockPanel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpenUnlockPanel}>Connect</Button>
      <MvxUnlockPanel
        isOpen={isOpen}
        onLogin={({ detail }) =>
          handleLogin({
            type: detail.provider,
            anchor: detail.anchor
          })
        }
        onClose={handleCloseUnlockPanel}
      >
        {
          // you can safely remove this if you don't need to implement a custom provider
          SHOW_ADVANCED_LOGIN_METHOD && (
            <MvxUnlockButton
              buttonLabel='In Memory Provider'
              onClick={() =>
                handleLogin({
                  type: ExtendedProviders.inMemoryProvider
                })
              }
            />
          )
        }
      </MvxUnlockPanel>
    </>
  );
};
