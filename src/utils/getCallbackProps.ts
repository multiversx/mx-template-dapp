import { getIsProviderEqualTo } from 'utils/sdkDappUtils';
import { LoginMethodsEnum } from 'types/sdkDappTypes';

type GetCallbackProps = {
  anchor?: string;
  relative?: boolean;
};

export const getCallbackProps = ({
  anchor,
  relative = true
}: GetCallbackProps) => {
  const isWebWallet = getIsProviderEqualTo(LoginMethodsEnum.wallet);

  if (!isWebWallet) {
    return {};
  }

  const basePath = relative
    ? `${window.location.pathname}`
    : `${window.location.origin}${window.location.pathname}`;

  if (anchor) {
    return { callbackRoute: `${basePath}#${anchor}` };
  }

  return { callbackRoute: basePath };
};
