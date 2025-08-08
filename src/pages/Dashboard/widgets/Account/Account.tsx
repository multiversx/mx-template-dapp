import { Label, OutputContainer } from 'components';
import { FormatAmount, useGetAccountInfo } from 'lib';
import { Username } from './components';

export const Account = () => {
  const { address, account } = useGetAccountInfo();

  return (
    <OutputContainer>
      <div className='flex flex-col text-black' data-testid='topInfo'>
        <p className='truncate'>
          <Label>Address: </Label>
          <span data-testid='accountAddress'> {address}</span>
        </p>

        <Username account={account} />
        <p>
          <Label>Shard: </Label> {account.shard}
        </p>

        <p>
          <Label>Balance: </Label>

          <FormatAmount value={account.balance} />
        </p>
      </div>
    </OutputContainer>
  );
};
