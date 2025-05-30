import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { Loader } from 'components';
import { WithClassnameType } from 'types';

interface OutputContainerPropsType
  extends PropsWithChildren,
    WithClassnameType {
  isLoading?: boolean;
}

export const OutputContainer = ({
  children,
  isLoading = false,
  className = 'p-4',
  'data-testid': dataTestId
}: OutputContainerPropsType) => (
  <div
    data-testid={dataTestId}
    className={classNames(
      'text-sm border border-gray-200 rounded overflow-auto',
      className
    )}
  >
    {isLoading ? <Loader /> : children}
  </div>
);
