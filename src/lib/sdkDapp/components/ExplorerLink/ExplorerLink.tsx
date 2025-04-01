import { PropsWithChildren } from 'react';
import { useGetNetworkConfig } from 'lib/sdkDapp/sdkDapp.hooks';
import { MvxExplorerLink } from 'lib/sdkDappCoreUI/sdkDappCoreUI.components';
import { WithClassnameType } from 'types/componentsTypes';

export const ExplorerLink = ({
  children,
  page,
  className,
  'data-testid': dataTestId
}: ExplorerLinkPropsType) => {
  const { network } = useGetNetworkConfig();

  return (
    <MvxExplorerLink
      link={`${network.explorerAddress}${page}`}
      class={className}
      dataTestId={dataTestId}
    >
      {children ? <span slot='content'>{children}</span> : null}
    </MvxExplorerLink>
  );
};

export interface ExplorerLinkPropsType
  extends WithClassnameType,
    PropsWithChildren {
  page: string;
}
