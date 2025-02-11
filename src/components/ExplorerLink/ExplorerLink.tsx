import { PropsWithChildren } from 'react';
import { useGetNetworkConfig } from 'lib/sdkDappCore';
import { ExplorerLinkSDK } from 'lib/sdkDappCoreUI';

export interface ExplorerLinkPropsType extends PropsWithChildren {
  className?: string;
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
