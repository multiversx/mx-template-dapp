import classNames from 'classnames';
import { AssetType } from 'types/sdkDappCoreTypes';

export interface AccountNamePropsType {
  address: string;
  assets?: AssetType;
  color?: 'muted' | 'secondary' | string;
  ['data-testid']?: string;
}

export const AccountName = ({
  address,
  assets,
  color,
  ...rest // data-testid
}: AccountNamePropsType) => {
  if (assets && assets.name) {
    const name = assets.name.replace(/\p{Emoji}/gu, '');
    const description = `${name} (${address})`;
    return (
      <span
        className={classNames('textTruncate', {
          [`text-${color}`]: color
        })}
        {...rest}
        title={description}
      >
        {name}
      </span>
    );
  }

  return <span className='trim'>{address}</span>;
};
