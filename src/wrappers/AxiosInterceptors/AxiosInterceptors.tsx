import { PropsWithChildren, useMemo } from 'react';
import { sampleAuthenticatedDomains } from 'config';
import { setAxiosInterceptors, useGetLoginInfo } from 'lib';

export const AxiosInterceptors = ({ children }: PropsWithChildren) => {
  const { tokenLogin } = useGetLoginInfo();

  useMemo(() => {
    setAxiosInterceptors({
      authenticatedDomains: sampleAuthenticatedDomains,
      bearerToken: tokenLogin?.nativeAuthToken
    });
  }, [tokenLogin?.nativeAuthToken]);

  return <>{children}</>;
};
