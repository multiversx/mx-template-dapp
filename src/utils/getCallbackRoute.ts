type GetCallbackRouteProps = {
  anchor?: string;
  isWebWallet?: boolean;
};

export const getCallbackRoute = ({
  anchor,
  isWebWallet
}: GetCallbackRouteProps) => {
  if (!isWebWallet) {
    return '';
  }

  const basePath = `${window.location.pathname}`;

  if (anchor) {
    return `${basePath}#${anchor}`;
  }

  return basePath;
};
