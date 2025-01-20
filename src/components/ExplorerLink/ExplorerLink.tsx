import { PropsWithChildren } from 'react';
import {
  faArrowUpRightFromSquare,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { getState, useGetNetworkConfig } from 'lib/sdkDappCore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WithClassnamePropsType } from 'types';

export interface ExplorerLinkPropsType
  extends WithClassnamePropsType,
    PropsWithChildren {
  page: string;
  text?: any;
  customExplorerIcon?: IconDefinition;
  title?: string;
  onClick?: () => void;
}

export const ExplorerLink = ({
  page,
  text,
  className = 'dapp-explorer-link',
  children,
  customExplorerIcon,
  ...rest
}: ExplorerLinkPropsType) => {
  const { network } = useGetNetworkConfig();

  const defaultContent = text ?? (
    <FontAwesomeIcon icon={customExplorerIcon ?? faArrowUpRightFromSquare} />
  );

  return (
    <a
      href={`${network.explorerAddress}${page}`}
      target='_blank'
      className={className}
      rel='noreferrer'
      {...rest}
    >
      {children ?? defaultContent}
    </a>
  );
};
