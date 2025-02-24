import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { ExtendedProviders } from 'initConfig';
import {
  ProviderFactory,
  UnlockButton,
  UnlockPanel,
  IProviderFactory
} from 'lib';
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
        onLogin={({ detail }) =>
          handleLogin({
            type: detail.provider,
            anchor: detail.anchor
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
