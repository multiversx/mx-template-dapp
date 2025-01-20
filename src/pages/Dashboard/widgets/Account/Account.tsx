import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer';
import { Username } from './components';
import { DataTestIdsEnum } from 'localConstants';
import { useGetAccount, useGetNetworkConfig } from 'lib/sdkDappCore';

export const Account = () => {
  const {
    network: { egldLabel }
  } = useGetNetworkConfig();
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
            {/* TODO: Define component types */}
            {/* @ts-ignore */}
            <format-amount value={account.balance} egld-label={egldLabel} />
          </span>
        </p>
      </div>
    </OutputContainer>
  );
};
