import { NetworkType } from '@elrondnetwork/dapp-core';

export const decimals = 4;
export const denomination = 18;
export const gasPerDataByte = 1500;
export const timeout = 10000; // 10 sec

export const walletConnectBridgeAddresses: string[] = [
  'https://bridge.walletconnect.org'
];
export const walletConnectBridge: string =
  walletConnectBridgeAddresses[
    Math.floor(Math.random() * walletConnectBridgeAddresses.length)
  ];

export const walletConnectDeepLink =
  'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/';

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgquvt728n40ssd8n2qns9jrlqpwq2jc4rj4cysfuj3ad';

export const dAppName = 'Dapp';

export const network: NetworkType & {
  graphQlAddress: string;
} = {
  id: 'mainnet',
  name: 'Mainnet',
  egldLabel: 'EGLD',
  walletAddress: 'https://wallet.elrond.com',
  apiAddress: 'https://internal-api.elrond.com',
  explorerAddress: 'https://explorer.elrond.com',
  graphQlAddress: 'https://graph.maiar.exchange/graphql'
};
