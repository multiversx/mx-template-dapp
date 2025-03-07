import { PropsWithChildren } from 'react';
import { useGetNetworkConfig } from 'lib/sdkDapp/sdkDapp.hooks';
import { ExplorerLinkSDK } from 'lib/sdkDappCoreUI/sdkDappCoreUI.components';
import { ExplorerLinkSDKPropsType } from 'lib/sdkDappCoreUI/sdkDappCoreUI.types';
import { WithClassnameType } from 'types/componentsTypes';

export const ExplorerLink = ({
  children,
  page,
  ...rest
}: ExplorerLinkPropsType) => {
  const { network } = useGetNetworkConfig();

  return (
    <ExplorerLinkSDK link={`${network.explorerAddress}${page}`} {...rest}>
      {children ? <span slot='content'>{children}</span> : null}
    </ExplorerLinkSDK>
  );
};

export interface ExplorerLinkPropsType
  extends Partial<ExplorerLinkSDKPropsType>,
    PropsWithChildren,
    WithClassnameType {
  page: string;
}
