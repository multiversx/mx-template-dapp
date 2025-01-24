import './styles/globals.css';

import {
  EnvironmentsEnum,
  ICustomProvider,
  InitAppType,
  ProviderTypeEnum
} from './types';
import { InMemoryProvider } from 'provider/InMemoryProvider';

const ADDITIONAL_PROVIDERS = {
  inMemoryProvider: 'inMemoryProvider'
} as const;

export const ExtendedProviders = {
  ...ProviderTypeEnum,
  ...ADDITIONAL_PROVIDERS
} as const;

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
    }
  }
  // Option 2: Add providers using the config `customProviders` array
  // customProviders: [customWalletProvider]
};
