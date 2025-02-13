import { PropsWithChildren } from 'react';
import { ExplorerLinkSDK } from 'components/sdkDappCoreUI';
import { WithClassnameType } from 'types';
import { useGetNetworkConfig } from 'utils/sdkDappCore';

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
