import { useEffect, useMemo } from 'react';
import { OutputContainer } from 'components/OutputContainer';
import { useGetTransactions } from './hooks';
import {
  getActiveTransactionsStatus,
  getInterpretedTransaction,
  getState,
  useGetAccount,
  useGetNetworkConfig
} from 'lib/sdkDappCore';
import { TransactionsPropsType } from './types';
import { TransactionRow } from './components/TransactionRow';

const COLUMNS = ['TxHash', 'Age', 'Shard', 'From', 'To', 'Method', 'Value'];

export const Transactions = (props: TransactionsPropsType) => {
  const { isLoading, getTransactions, transactions } =
    useGetTransactions(props);

  const { address } = useGetAccount();
  const {
    network: { explorerAddress }
  } = useGetNetworkConfig();

  const interpretedTransactions = useMemo(() => {
    if (!address) {
      return [];
    }

    return transactions.map((transaction) =>
      getInterpretedTransaction({ transaction, address, explorerAddress })
    );
  }, [transactions, explorerAddress, address]);

  const { success } = getActiveTransactionsStatus();

  useEffect(() => {
    if (success) {
      getTransactions();
    }
  }, [success]);

  useEffect(() => {
    getTransactions();
  }, []);

  if (!isLoading && transactions.length === 0) {
    return (
      <OutputContainer>
        <p className='text-gray-400'>No transactions found</p>
      </OutputContainer>
    );
  }

  return (
    <div className='flex flex-col'>
      <OutputContainer isLoading={isLoading} className='p-0'>
        <div className='w-full h-full overflow-x-auto bg-white shadow rounded-lg'>
          <table className='w-full divide-y divide-gray-200 overflow-auto table-auto'>
            <thead className='bg-gray-50'>
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    scope='
                    col'
                    className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6'
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {interpretedTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.txHash}
                  className='mx-transactions text-gray-500'
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      </OutputContainer>
    </div>
  );
};
