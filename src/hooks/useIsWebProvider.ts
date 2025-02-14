import { getAccountProvider } from 'lib/sdkDapp/sdkDappCore';
import { ProviderTypeEnum } from 'lib/sdkDapp/sdkDappCore.types';

export const useIsWebProvider = () => {
  const provider = getAccountProvider();
  const isWebProvider = provider.getType() === ProviderTypeEnum.iframe;

  return { isWebProvider };
};
