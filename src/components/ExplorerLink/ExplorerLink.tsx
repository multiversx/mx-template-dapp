import { PropsWithChildren } from 'react';
import {
  ExplorerLinkSDK,
  ExplorerLinkSDKPropsType,
  useGetNetworkConfig
} from 'lib';
import { WithClassnameType } from 'types';

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
