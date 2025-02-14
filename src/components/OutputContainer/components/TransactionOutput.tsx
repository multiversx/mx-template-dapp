import { Label, ExplorerLink, FormatAmount } from 'components';
import {
  TRANSACTIONS_ENDPOINT,
  useGetNetworkConfig,
  ACCOUNTS_ENDPOINT,
  SignedTransactionType
} from 'lib';
import { DataTestIdsEnum } from 'localConstants';

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
          value={transaction.value}
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
