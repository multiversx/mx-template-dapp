import { PropsWithChildren } from 'react';
import { ExplorerLinkSDK } from 'components/sdkDappCoreUI';
import { WithClassnameType } from 'types';
import { useGetNetworkConfig } from 'utils/sdkDappCore';
import { ExplorerLinkSDKPropsType } from 'types/sdkDappCoreUI.types';

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
