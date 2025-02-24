import './styles/globals.css';

import {
  EnvironmentsEnum,
  ICustomProvider,
  InitAppType,
  ProviderTypeEnum
} from './lib';
import { InMemoryProvider } from './provider/inMemoryProvider';
import { walletConnectV2ProjectId } from 'config';

const ADDITIONAL_PROVIDERS = {
  inMemoryProvider: 'inMemoryProvider'
} as const;

export const ExtendedProviders = {
  ...ProviderTypeEnum,
  ...ADDITIONAL_PROVIDERS
} as const;

const DEFAULT_TOAST_LIEFTIME = 5000;

const providers: ICustomProvider<ProviderTypeEnum>[] = [
  {
    name: ADDITIONAL_PROVIDERS.inMemoryProvider,
    type: ExtendedProviders.inMemoryProvider,
    icon: '',
    constructor: async (_address?: string) => new InMemoryProvider()
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
    network: {
      walletAddress: 'https://devnet-wallet.multiversx.com'
    },
    providers: {
      walletConnect: {
        walletConnectV2ProjectId
      }
    },
    successfulToastLifetime: DEFAULT_TOAST_LIEFTIME
  }

  // Option 2: Add providers using the config `customProviders` array
  // customProviders: [customWalletProvider]
};
