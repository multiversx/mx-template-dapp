import { Button } from 'components';
import { useState } from 'react';
import { UnlockPanel, UnlockButton, ProviderFactory } from 'lib';
import { ExtendedProviders } from 'initConfig';
import { IProviderFactory } from '@multiversx/sdk-dapp-core/out/core/providers/types/providerFactory.types';
import { useNavigate } from 'react-router-dom';
import { RouteNamesEnum } from 'localConstants';

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
        <UnlockButton
          label='In Memory Provider'
          onClick={() =>
            handleLogin({
              type: ExtendedProviders.inMemoryProvider
            })
          }
        />
      </UnlockPanel>
    </>
  );
};
