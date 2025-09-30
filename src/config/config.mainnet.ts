import { EnvironmentsEnum } from 'lib';

export * from './sharedConfig';

export const API_URL = 'https://template-api.multiversx.com';
export const ID_API_URL = 'https://id-api.multiversx.com';
export const USERS_API_URL = '/users/api/v1/users/';
export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqtmcuh307t6kky677ernjj9ulk64zq74w9l5qxyhdn7';
export const environment = EnvironmentsEnum.mainnet;
export const sampleAuthenticatedDomains = [API_URL];
