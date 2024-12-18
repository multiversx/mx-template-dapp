import { PropsWithChildren } from 'react';
import {
  faArrowUpRightFromSquare,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { getState, networkSelector } from 'lib/sdkDappCore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WithClassnameType } from '../../types';

export interface ExplorerLinkPropsType
  extends WithClassnameType,
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
  const network = networkSelector(getState());

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
