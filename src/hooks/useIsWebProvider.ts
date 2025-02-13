import { LoginMethodsEnum } from 'types/sdkDapp.types';
import { useGetAccountProvider } from 'utils/sdkDapp';

export const useIsWebProvider = () => {
  const { providerType } = useGetAccountProvider();
  const isWebProvider = providerType === LoginMethodsEnum.wallet;

  return { isWebProvider };
};
