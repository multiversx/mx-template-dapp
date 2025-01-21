import { Label } from 'components/Label';
import { OutputContainer, FormatAmount } from 'components';
import { Username } from './components';
import { DataTestIdsEnum } from 'localConstants';
import { useGetAccount, useGetNetworkConfig } from 'lib/sdkDappCore';

export const Account = () => {
  const account = useGetAccount();
  const {
    network: { egldLabel }
  } = useGetNetworkConfig();

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
          <FormatAmount
            input={account.balance}
            egldLabel={egldLabel}
            data-testid={DataTestIdsEnum.balance}
          />
        </p>
      </div>
    </OutputContainer>
  );
};
