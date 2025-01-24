import { AuthRedirectWrapper } from 'wrappers';
import { ProviderTypeEnum } from 'types';
import { Button } from 'components';
import { useNavigate } from 'react-router-dom';
import { ProviderFactory } from 'lib/sdkDappCore';
import { RouteNamesEnum } from 'localConstants/routes';
import { ExtendedProviders } from 'initConfig';

export const Unlock = () => {
  const navigate = useNavigate();

  const handleLogin = (type: ProviderTypeEnum) => async () => {
    const provider = await ProviderFactory.create({ type });
    await provider?.login();
    navigate(RouteNamesEnum.dashboard);
  };

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className='flex justify-center items-center'>
        <div
          className='flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]'
          data-testid='unlockPage'
        >
          <div className='flex flex-col items-center gap-1'>
            <h2 className='text-2xl'>Login</h2>

            <p className='text-center text-gray-400'>Choose a login method</p>
          </div>

          <div className='flex flex-col md:flex-row'>
            <Button onClick={handleLogin(ProviderTypeEnum.crossWindow)}>
              Web Wallet
            </Button>
            <div className='ml-2'>
              <Button onClick={handleLogin(ProviderTypeEnum.ledger)}>
                Ledger
              </Button>
            </div>
            <div className='ml-2'>
              <Button onClick={handleLogin(ProviderTypeEnum.extension)}>
                Extension
              </Button>
            </div>
            <div className='ml-2'>
              <Button onClick={handleLogin(ProviderTypeEnum.metamask)}>
                Metamask
              </Button>
            </div>
            <div className='ml-2'>
              <Button onClick={handleLogin(ProviderTypeEnum.passkey)}>
                Passkey
              </Button>
            </div>
            <div className='ml-2'>
              <Button onClick={handleLogin(ProviderTypeEnum.walletConnect)}>
                Walletconnect
              </Button>
            </div>
            <div className='ml-2 hidden'>
              <Button
                onClick={async () => {
                  const provider = await ProviderFactory.create({
                    type: ExtendedProviders.inMemoryProvider
                  });
                  await provider?.login();
                  navigate(RouteNamesEnum.dashboard);
                }}
              >
                In Memory Provider
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
