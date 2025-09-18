import { AccountType, trimUsernameDomain } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { ProfileType } from 'types';

import { useGetUserHerotag } from '../hooks/useGetUserHerotag';

// prettier-ignore
const styles = {
  usernameContainer: 'username-container flex gap-0.5',
  herotag: 'herotag text-accent transition-all duration-200 ease-out'
} satisfies Record<string, string>;

export const Username = (props: {
  account?: AccountType | ProfileType | null;
  address: string;
}) => {
  const { address } = props;

  const { herotag } = useGetUserHerotag(address);

  return (
    <div className={styles.usernameContainer}>
      <span className={styles.herotag}>{herotag ? '@' : ''}</span>

      <span data-testid={DataTestIdsEnum.heroTag}>
        {herotag ? trimUsernameDomain(herotag) : 'N/A'}
      </span>
    </div>
  );
};
