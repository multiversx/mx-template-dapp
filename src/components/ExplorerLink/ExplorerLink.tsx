import { PropsWithChildren } from 'react';
import { useGetNetworkConfig } from 'lib/sdkDappCore';
import { ExplorerLinkSDK } from 'lib/sdkDappCoreUI';

export interface ExplorerLinkPropsType extends PropsWithChildren {
  className?: string;
  dataTestId?: string;
  icon?: any;
  pathname: string;
  text?: any;
}

export const ExplorerLink = ({
  children,
  pathname,
  ...rest
}: ExplorerLinkPropsType) => {
  const { network } = useGetNetworkConfig();

  return (
    <ExplorerLinkSDK link={`${network.explorerAddress}${pathname}`} {...rest}>
      {children ? <div slot='content'>{children}</div> : null}
    </ExplorerLinkSDK>
  );
};
