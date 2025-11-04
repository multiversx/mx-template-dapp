export const DEFAULT_METAMASK_VERSION = '13.6.0';

export const resolveMetamaskVersion = () =>
  process.env.METAMASK_VERSION?.trim() || DEFAULT_METAMASK_VERSION;

export const buildMetamaskZipUrl = (version: string) =>
  `https://github.com/MetaMask/metamask-extension/releases/download/v${version}/metamask-chrome-${version}.zip`;
