import { AccountType, trimUsernameDomain } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { ProfileType } from 'types';

export const Username = (props: {
  account: AccountType | ProfileType | null;
}) => {
  const { account } = props;

  if (!account) {
    return null;
  }

  return (
    <p className='flex gap-0.5'>
      <span className='text-accent'>{account.username ? '@' : ''}</span>

      <span data-testid={DataTestIdsEnum.heroTag}>
        {account.username ? trimUsernameDomain(account.username) : 'N/A'}
      </span>
    </p>
  );
};
