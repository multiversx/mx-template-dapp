import { WithClassnamePropsType } from 'types';
import classNames from 'classnames';

export interface NftBadgePropsType extends WithClassnamePropsType {
  text: string;
}

export const NftBadge = ({
  text,
  className,
  'data-testid': dataTestId = 'nftBadge'
}: NftBadgePropsType) => (
  <div
    data-testid={dataTestId}
    className={classNames(
      'badge badge-secondary badge-pill font-weight-light',
      className
    )}
  >
    {text}
  </div>
);
