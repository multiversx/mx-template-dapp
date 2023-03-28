import * as React from 'react';
import { FormatAmount } from 'components';
import { contractAddress } from 'config';
import { useGetAccountInfo } from 'hooks';

export const TopInfo = () => {
  const { address, account } = useGetAccountInfo();

  return (
    <div className='text-white' data-testid='topInfo'>
      <div className='mb-1'>
        <span className='opacity-6 mr-1'>Your address:</span>
        <span data-testid='accountAddress'> {address}</span>
      </div>
      <div className='mb-4'>
        <span className='opacity-6 mr-1'>Contract address:</span>
        <span data-testid='contractAddress'> {contractAddress}</span>
      </div>
      <div>
        <h3 className='py-2'>
          <FormatAmount value={account.balance} data-testid='balance' />
        </h3>
      </div>
    </div>
  );
};
