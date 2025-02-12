import { PropsWithChildren } from 'react';
import { useGetNetworkConfig } from 'lib/sdkDappCore';
import { ExplorerLinkSDK } from 'lib/sdkDappCoreUI';
import { WithClassnameType } from 'types';

export interface ExplorerLinkPropsType
  extends PropsWithChildren,
    WithClassnameType {
  dataTestId?: string;
  icon?: any;
  page: string;
  text?: any;
}

export const ExplorerLink = ({
  children,
  page,
  ...rest
}: ExplorerLinkPropsType) => {
  const { network } = useGetNetworkConfig();

  return (
    <ExplorerLinkSDK link={`${network.explorerAddress}${page}`} {...rest}>
      {children ? <div slot='content'>{children}</div> : null}
    </ExplorerLinkSDK>
  );
};
