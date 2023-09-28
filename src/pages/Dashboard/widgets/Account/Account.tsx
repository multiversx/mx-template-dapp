import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer';
import { FormatAmount } from 'components/sdkDappComponents';
import { useGetAccountInfo, useGetNetworkConfig } from 'hooks';
import { Username } from './components';

export const Account = () => {
  const { network } = useGetNetworkConfig();
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
          <FormatAmount
            value={account.balance}
            egldLabel={network.egldLabel}
            data-testid='balance'
          />
        </p>
      </div>
    </OutputContainer>
  );
};
