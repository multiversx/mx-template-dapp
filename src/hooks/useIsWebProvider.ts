import { ProviderTypeEnum } from 'types/sdkDappCoreTypes';
import { getAccountProvider } from '../utils/sdkDappCore';

export const useIsWebProvider = () => {
  const provider = getAccountProvider();
  const isWebProvider = provider.getType() === ProviderTypeEnum.iframe;

  return { isWebProvider };
};
