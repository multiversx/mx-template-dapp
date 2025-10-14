import './styles/tailwind.css';
import './styles/style.css';

import { walletConnectV2ProjectId } from 'config';
import { EnvironmentsEnum, ICustomProvider, InitAppType } from './lib';
import { InMemoryProvider } from './provider/inMemoryProvider';

const providers: ICustomProvider[] = [
  {
    name: 'In Memory Provider',
    type: 'inMemoryProvider',
    iconUrl: `${window.location.origin}/multiversx-white.svg`,
    constructor: async (options) => new InMemoryProvider(options)
  }
];

(window as any).multiversx = {};
// Option 1: Add providers using the `window.providers` array
(window as any).multiversx.providers = providers;

export const config: InitAppType = {
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    environment: EnvironmentsEnum.devnet,
    theme: 'mvx:dark-theme',
    providers: {
      walletConnect: {
        walletConnectV2ProjectId
      }
    }
  }

  // Option 2: Add providers using the config `customProviders` array
  // customProviders: [providers]
};
