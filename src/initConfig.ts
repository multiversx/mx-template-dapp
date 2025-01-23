import './styles/globals.css';

import { CrossWindowProviderStrategy, InitAppType } from 'lib/sdkDappCore';
import { EnvironmentsEnum, ProviderTypeEnum } from './types';
import { InMemoryProvider } from 'provider/InMemoryProvider';

const ADDITIONAL_PROVIDERS = {
  customWallet: 'customWallet',
  inMemoryProvider: 'inMemoryProvider'
} as const;

export const ExtendedProviders = {
  ...ProviderTypeEnum,
  ...ADDITIONAL_PROVIDERS
} as const;

(window as any).multiversx = {};
(window as any).multiversx.providers = [
  {
    name: ADDITIONAL_PROVIDERS.customWallet,
    type: ExtendedProviders.customWallet,
    icon: '',
    constructor: async (_address?: string) => {
      const providerInstance = new CrossWindowProviderStrategy();
      const provider = await providerInstance.createProvider();
      return provider;
    }
  },
  {
    name: ADDITIONAL_PROVIDERS.inMemoryProvider,
    type: ExtendedProviders.inMemoryProvider,
    icon: '',
    constructor: async (_address?: string) => new InMemoryProvider()
  }
];

export const config: InitAppType = {
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    environment: EnvironmentsEnum.devnet,
    network: {
      walletAddress: 'https://devnet-wallet.multiversx.com'
    }
  }
};
