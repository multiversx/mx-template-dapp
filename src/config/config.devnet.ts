import { EnvironmentsEnum } from 'lib/sdkDapp/sdkDapp.types';

export * from './sharedConfig';

export const API_URL = 'https://devnet-template-api.multiversx.com';
export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqg5aesu869nrjqw2fzq8ljj7wtsfd7cr7d8ss8zquav';
export const environment = EnvironmentsEnum.devnet;
export const sampleAuthenticatedDomains = [API_URL];
