import './styles/globals.css';

import { CrossWindowProviderStrategy, InitAppType } from 'lib/sdkDappCore';
import { EnvironmentsEnum, ProviderTypeEnum } from './types';

const ADDITIONAL_PROVIDERS = {
  customWallet: 'customWallet'
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
