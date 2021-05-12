import * as Dapp from "@elrondnetwork/dapp";

export const decimals = 2;
export const denomination = 18;
export const gasPrice = 1000000000;
export const version = 1;

export const walletConnectBridge = "https://bridge.walletconnect.org";
export const walletConnectDeepLink =
  "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/";

export const contractAddress =
  "erd1qqqqqqqqqqqqqpgqp699jngundfqw07d8jzkepucvpzush6k3wvqyc44rx";

export const network: Dapp.NetworkType = {
  id: "testnet",
  name: "Testnet",
  egldLabel: "xEGLD",
  walletAddress: "https://testnet-wallet.elrond.com/dapp/init",
  apiAddress: "https://testnet-api.elrond.com",
  gatewayAddress: "https://testnet-gateway.elrond.com",
  explorerAddress: "http://testnet-explorer.elrond.com/",
};
