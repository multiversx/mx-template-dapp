import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import { Loader } from 'components';
import { WithClassnameType } from 'types';

// prettier-ignore
const styles = {
  outputContainer: 'output-container text-sm text-primary font-normal bg-secondary transition-all duration-300 rounded-xl'
} satisfies Record<string, string>;

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
    className={classNames(styles.outputContainer, className)}
  >
    {isLoading ? <Loader /> : children}
  </div>
);
