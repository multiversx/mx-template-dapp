import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer';
import { Username } from './components';
import { getAccount } from 'lib/sdkDappCore';
import { DataTestIdsEnum } from 'localConstants';
import { formatAmount } from 'lib/sdkDappUtils';

export const Account = () => {
  const account = getAccount();

  return (
    <OutputContainer>
      <div className='flex flex-col text-black' data-testid='topInfo'>
        <p className='truncate'>
          <Label>Address: </Label>
          <span data-testid='accountAddress'> {account.address}</span>
        </p>

        <Username account={account} />
        <p>
          <Label>Shard: </Label> {account.shard}
        </p>

        <p>
          <Label>Balance: </Label>
          <span data-testid={DataTestIdsEnum.balance}>
            {formatAmount({
              input: account.balance
            })}
          </span>
        </p>
      </div>
    </OutputContainer>
  );
};
