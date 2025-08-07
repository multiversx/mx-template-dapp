import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { WithClassnameType } from 'types';

interface HeaderElementContainerPropsType
  extends PropsWithChildren,
    WithClassnameType {
  onClickFunction?: () => void;
}

export const HeaderElementContainer = ({
  children,
  className,
  onClickFunction
}: HeaderElementContainerPropsType) => (
  <div
    onClick={onClickFunction}
    className={classNames(
      'text-tertiary font-normal text-sm bg-btn-secondary transition-all duration-300 w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer',
      className
    )}
  >
    {children}
  </div>
);
