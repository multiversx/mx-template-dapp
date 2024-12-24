import { AuthRedirectWrapper } from 'wrappers';
import { ProviderTypeEnum } from 'types';
import { Button } from 'components';
import { useNavigate } from 'react-router-dom';
import {
  accountSelector,
  networkSelector,
  ProviderFactory,
  setCustomWalletAddress
} from 'lib/sdkDappCore';
import { useSelector } from 'hooks/useSelector';
import { RouteNamesEnum } from 'localConstants/routes';
import { useEffect } from 'react';

export const Unlock = () => {
  // In React it can be done like this
  const CWA = useSelector(networkSelector);
  const account = useSelector(accountSelector);

  const navigate = useNavigate();

  useEffect(() => {
    debugger;
    console.log(112, account);
  }, [account]);

  const handleLogin = (type: ProviderTypeEnum) => async () => {
    const config = {
      type
    };

    const provider = await ProviderFactory.create(config);
    const data = await provider?.login();
    console.log('data', data);
    debugger;
    navigate(RouteNamesEnum.dashboard);
  };

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <>
        <h1>Demo</h1>
        <div className='card'>
          <Button onClick={() => setCustomWalletAddress(Date.now().toString())}>
            setCustomWalletAddress: {CWA.customWalletAddress}
          </Button>
        </div>

        <p className='read-the-docs'>
          Click on the Vite and React logos to learn more
        </p>
      </>
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
          </div>
        </div>
      </div>
    </AuthRedirectWrapper>
  );
};
