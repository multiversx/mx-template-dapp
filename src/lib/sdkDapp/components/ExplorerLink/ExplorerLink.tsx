import { useGetNetworkConfig } from 'lib/sdkDapp/sdkDappCore';
import { ExplorerLinkSDK } from 'lib/sdkDappCoreUI/sdkDappCoreUI.components';
import { ExplorerLinkSDKPropsType } from 'lib/sdkDappCoreUI/sdkDappCoreUI.types';
import { PropsWithChildren } from 'react';
import { WithClassnameType } from 'types/componentsTypes';

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

export interface ExplorerLinkPropsType
  extends Partial<ExplorerLinkSDKPropsType>,
    PropsWithChildren,
    WithClassnameType {
  page: string;
}
