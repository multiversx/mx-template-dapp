import { IProviderFactory } from '@multiversx/sdk-dapp-core/out/core/providers/types/providerFactory.types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { ExtendedProviders } from 'initConfig';
import { ProviderFactory, UnlockButton, UnlockPanel } from 'lib';
import { RouteNamesEnum } from 'localConstants';

const SHOW_ADVANCED_LOGIN_METHOD = false;

export const ConnectButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async ({ type, anchor }: IProviderFactory) => {
    const provider = await ProviderFactory.create({
      type,
      anchor
    });
    await provider?.login();
    navigate(RouteNamesEnum.dashboard);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Connect</Button>
      <UnlockPanel
        open={open}
        onLogin={(options) =>
          handleLogin({
            type: options.detail.provider,
            anchor: options.detail.anchor
          })
        }
        onClose={() => {
          setOpen(false);
        }}
      >
        {
          // you can safely remove this if you don't need to implement a custom provider
          SHOW_ADVANCED_LOGIN_METHOD && (
            <UnlockButton
              label='In Memory Provider'
              onClick={() =>
                handleLogin({
                  type: ExtendedProviders.inMemoryProvider
                })
              }
            />
          )
        }
      </UnlockPanel>
    </>
  );
};
