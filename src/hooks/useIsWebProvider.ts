import { LoginMethodsEnum } from 'types/sdkDappCoreTypes';
import { useGetAccountProvider } from './sdkDappHooks';

export const useIsWebProvider = () => {
  const { providerType } = useGetAccountProvider();
  const isWebProvider = providerType === LoginMethodsEnum.wallet;

  return { isWebProvider };
};
