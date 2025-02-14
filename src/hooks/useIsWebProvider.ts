import { getAccountProvider, ProviderTypeEnum } from 'lib';

export const useIsWebProvider = () => {
  const provider = getAccountProvider();
  const isWebProvider = provider.getType() === ProviderTypeEnum.iframe;

  return { isWebProvider };
};
