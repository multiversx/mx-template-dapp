import { ProviderTypeEnum } from 'types/sdkDappCore.types';
import { getAccountProvider } from '../utils/sdkDappCore';

export const useIsWebProvider = () => {
  const provider = getAccountProvider();
  const isWebProvider = provider.getType() === ProviderTypeEnum.iframe;

  return { isWebProvider };
};
