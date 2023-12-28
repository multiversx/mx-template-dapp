type GetCallbackRouteProps = {
  anchor?: string;
  isWebProvider?: boolean;
};

export const getCallbackRoute = ({
  anchor,
  isWebProvider
}: GetCallbackRouteProps) => {
  if (!isWebProvider) {
    return '';
  }

  const basePath = `${window.location.pathname}`;

  if (anchor) {
    return `${basePath}#${anchor}`;
  }

  return basePath;
};
