import { getIsProviderEqualTo } from 'utils/sdkDappUtils';
import { LoginMethodsEnum } from 'types/sdkDappTypes';

type GetCallbackRouteProps = {
  anchor?: string;
};

export const getCallbackRoute = ({ anchor }: GetCallbackRouteProps) => {
  const isWebWallet = getIsProviderEqualTo(LoginMethodsEnum.wallet);

  if (!isWebWallet) {
    return '';
  }

  const basePath = `${window.location.pathname}`;

  if (anchor) {
    return `${basePath}#${anchor}`;
  }

  return basePath;
};
