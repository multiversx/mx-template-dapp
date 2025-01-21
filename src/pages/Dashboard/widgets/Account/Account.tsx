import { Label } from 'components/Label';
import { OutputContainer, FormatAmount } from 'components';
import { Username } from './components';
import { DataTestIdsEnum } from 'localConstants';
import { useGetAccount } from 'lib/sdkDappCore';

export const Account = () => {
  const account = useGetAccount();

  if (!account.address) {
    return <></>;
  }

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
            <FormatAmount input={account.balance} />
          </span>
        </p>
      </div>
    </OutputContainer>
  );
};
