import { EnvironmentsEnum } from 'lib/sdkDapp/sdkDapp.types';

export * from './sharedConfig';

export const API_URL = 'https://testnet-template-api.multiversx.com';
export const contractAddress =
  'erd1qqqqqqqqqqqqqpgq8tq5rulzxzje29v8kzmcxx9pgx6kmevmep6qckwthl';
export const environment = EnvironmentsEnum.testnet;
export const sampleAuthenticatedDomains = [API_URL];
