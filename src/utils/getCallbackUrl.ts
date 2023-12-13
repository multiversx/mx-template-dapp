import { getIsProviderEqualTo } from 'utils/sdkDappUtils';
import { LoginMethodsEnum } from 'types/sdkDappTypes';

/**
 * the relative path for the callbackUrl
 * signMessage it is necessary to send the full url Ex: https:localhost:3002/dashboard#sign-message
 */
type GetCallbackUrlProps = {
  anchor?: string;
  relative?: boolean;
};

export const getCallbackUrl = ({
  anchor,
  relative = true
}: GetCallbackUrlProps) => {
  const isWebWallet = getIsProviderEqualTo(LoginMethodsEnum.wallet);

  if (!isWebWallet) {
    return '';
  }

  const basePath = relative
    ? `${window.location.pathname}`
    : `${window.location.origin}${window.location.pathname}`;

  if (anchor) {
    return `${basePath}#${anchor}`;
  }

  return basePath;
};
