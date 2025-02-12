import { PropsWithChildren } from 'react';
import { useGetNetworkConfig } from 'hooks';
import { WithClassnameType } from 'types';
import { ExplorerLinkSDK } from 'utils';

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
