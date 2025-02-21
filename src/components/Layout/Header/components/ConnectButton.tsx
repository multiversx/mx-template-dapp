import { Button } from 'components';
import { useState } from 'react';
import { UnlockPanelSDK, UnlockButtonSDK, ProviderFactory } from 'lib';
import { ExtendedProviders } from 'initConfig';
import { IProviderFactory } from '@multiversx/sdk-dapp-core/out/core/providers/types/providerFactory.types';
import { useNavigate } from 'react-router-dom';
import { RouteNamesEnum } from 'localConstants';

const ConnectButton = () => {
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
      <UnlockPanelSDK
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
        <UnlockButtonSDK
          label='In Memory Provider'
          onClick={() =>
            handleLogin({
              type: ExtendedProviders.inMemoryProvider
            })
          }
        />
      </UnlockPanelSDK>
    </>
  );
};

export default ConnectButton;
