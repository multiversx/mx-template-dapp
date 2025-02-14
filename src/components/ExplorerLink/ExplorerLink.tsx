import { PropsWithChildren } from 'react';
import { ExplorerLinkSDK } from 'components/sdkDappCoreUI';
import { WithClassnameType } from 'types';
import { ExplorerLinkSDKPropsType } from 'lib/sdkDappCoreUI/sdkDappCoreUI.types';
import { useGetNetworkConfig } from 'lib/sdkDapp/sdkDappCore';

export interface ExplorerLinkPropsType
  extends Partial<ExplorerLinkSDKPropsType>,
    PropsWithChildren,
    WithClassnameType {
  page: string;
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
