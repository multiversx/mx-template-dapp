import './styles/globals.css';

import { walletConnectV2ProjectId } from 'config';
import {
  EnvironmentsEnum,
  ICustomProvider,
  InitAppType,
  ProviderTypeEnum
} from './lib';
import { InMemoryProvider } from './provider/inMemoryProvider';

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
    name: 'In Memory Provider',
    type: ExtendedProviders.inMemoryProvider,
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
    providers: {
      walletConnect: {
        walletConnectV2ProjectId
      }
    },
    successfulToastLifetime: DEFAULT_TOAST_LIEFTIME
  }

  // Option 2: Add providers using the config `customProviders` array
  // customProviders: [providers]
};
