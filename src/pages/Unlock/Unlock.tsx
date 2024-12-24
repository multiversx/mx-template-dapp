import { AuthRedirectWrapper } from 'wrappers';
import { ProviderTypeEnum } from 'types';
import { Button } from 'components';
// here
import { createStore, StateCreator } from 'zustand/vanilla';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useStore } from 'zustand';
import { StoreApi } from 'zustand/vanilla';
import { useNavigate } from 'react-router-dom';
import { useSelector as useDappSelector } from 'hooks/useSelector';
import {
  networkSelector,
  ProviderFactory,
  setCustomWalletAddress
} from 'lib/sdkDappCore';
import { RouteNamesEnum } from 'localConstants/routes';

type ExtractStateA<S> = S extends { getState: () => infer X } ? X : never;

/**
 *
 * @param store
 * @returns a hook that can be used to access the store in ReactJS context
 * */
export const createBoundedUseStore = ((store) => (selector) =>
  useStore(store, selector)) as <S extends StoreApi<unknown>>(
  store: S
) => {
  (): ExtractStateA<S>;
  <T>(selector: (state: ExtractStateA<S>) => T): T;
};

export type NetworkConfigState = {
  count: number;
};

export type DAppStoreState = {
  network: NetworkConfigState;
  // other: OtherState;
  // another: AnotherState;
};

export type NetworkConfigSlice = NetworkConfigState;

const defaultInitState: NetworkConfigState = {
  count: 0
};

function getNetworkConfigSlice(): StateCreator<
  DAppStoreState,
  MutatorsIn,
  [],
  NetworkConfigSlice
> {
  return () => ({
    ...defaultInitState
  });
}

export const networkConfigSlice = getNetworkConfigSlice();

export const setNetworkCount = (count: number) =>
  dAppStore.setState((state) => {
    state.network.count = count;
  });

export const countSelector = (state: DAppStoreState) => state.network.count;

export type MutatorsIn = [
  ['zustand/devtools', never],
  ['zustand/persist', unknown],
  ['zustand/immer', never]
];

export type MutatorsOut = [
  ['zustand/devtools', never],
  ['zustand/persist', DAppStoreState],
  ['zustand/immer', never]
];

export const dAppStore = createStore<DAppStoreState, MutatorsOut>(
  devtools(
    persist(
      immer((...args) => ({
        network: networkConfigSlice(...args)
        // other: otherSlice(...args),
        // another: anotherSlice(...args),
      })),
      {
        name: 'dAppStore',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
);

export const getState = () => dAppStore.getState();

// eg. useDAppStore(state => state.network.name)
export const useDAppStore = createBoundedUseStore(dAppStore);
// or
// export function useDAppStore<T>(selector?: (state: DAppStoreState) => T) {
//     return useStore(dAppStore, selector!)
// }
type ExtractState<S> = S extends { getState: () => infer X }
  ? X
  : DAppStoreState;

function useSelector<T>(selector: (state: ExtractState<DAppStoreState>) => T) {
  return useDAppStore(selector);
}

export const Unlock = () => {
  // In React it can be done like this
  const countReact = useSelector(countSelector);
  const CWA = useDappSelector(networkSelector).customWalletAddress;

  const countVanilla = countSelector(getState());

  const navigate = useNavigate();

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
        <h4>Count React = {countReact}</h4>
        <h4>Count Vanilla = {countVanilla}</h4>
        <div className='card'>
          <Button onClick={() => setNetworkCount(countReact + 1)}>
            count React is {countReact}
          </Button>
          <Button onClick={() => setNetworkCount(countVanilla + 1)}>
            count vanilla is {countVanilla}
          </Button>
          <Button onClick={() => setCustomWalletAddress('ABC')}>
            setCustomWalletAddress: {CWA}
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
