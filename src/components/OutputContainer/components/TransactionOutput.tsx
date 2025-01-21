import { Label } from 'components/Label';
import { SignedTransactionType } from 'types';
import { ExplorerLink } from '../../ExplorerLink';
import {
  ACCOUNTS_ENDPOINT,
  DataTestIdsEnum,
  TRANSACTIONS_ENDPOINT
} from 'localConstants';
import { useGetNetworkConfig } from 'lib/sdkDappCore';
import { FormatAmount } from '../../FormatAmount';
import React from 'react';

export const TransactionOutput = ({
  transaction
}: {
  transaction: SignedTransactionType;
}) => {
  const {
    network: { egldLabel }
  } = useGetNetworkConfig();
  const decodedData = transaction.data
    ? Buffer.from(transaction.data, 'base64').toString('ascii')
    : 'N/A';

  return (
    <div className='flex flex-col'>
      <p>
        <Label>Hash:</Label>
        <ExplorerLink
          page={`/${TRANSACTIONS_ENDPOINT}/${transaction.hash}`}
          className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
        >
          {transaction.hash}
        </ExplorerLink>
      </p>
      <p>
        <Label>Receiver:</Label>
        <ExplorerLink
          page={`/${ACCOUNTS_ENDPOINT}/${transaction.receiver}`}
          className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
        >
          {transaction.receiver}
        </ExplorerLink>
      </p>

      <p>
        <Label>Amount: </Label>
        <FormatAmount
          input={transaction.value}
          showLabel={transaction.value !== '0'}
          egldLabel={egldLabel}
          data-testid={DataTestIdsEnum.balance}
        />
      </p>
      <p>
        <Label>Gas price: </Label>
        {transaction.gasPrice}
      </p>
      <p>
        <Label>Gas limit: </Label>
        {transaction.gasLimit}
      </p>
      <p className='whitespace-nowrap'>
        <Label>Data: </Label> {decodedData}
      </p>
    </div>
  );
};
