import { useEffect } from 'react';
import { OutputContainer } from 'components/OutputContainer';
import { TransactionRow } from 'components/sdkDappComponents';
import { useGetActiveTransactionsStatus } from 'hooks';
import { useGetTransactions } from './hooks';
import { TransactionsPropsType } from './types';

const COLUMNS = ['TxHash', 'Age', 'Shard', 'From', 'To', 'Method', 'Value'];

export const Transactions = (payload: TransactionsPropsType) => {
  const { success } = useGetActiveTransactionsStatus();
  const { isLoading, getTransactions, transactions } =
    useGetTransactions(payload);

  useEffect(() => {
    if (success) {
      getTransactions();
    }
  }, [success]);

  useEffect(() => {
    getTransactions();
  }, []);

  if (!isLoading && !transactions) {
    return (
      <OutputContainer>
        <p>No transactions found</p>
      </OutputContainer>
    );
  }

  return (
    <div className='flex flex-col'>
      <OutputContainer isLoading={isLoading} className='p-0'>
        <div className='w-full h-full bg-gray-100 overflow-x-auto bg-white shadow rounded-lg'>
          <table className='w-full divide-y divide-gray-200 overflow-auto table-auto'>
            <thead className='bg-gray-50'>
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    scope='col'
                    className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6'
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {transactions.map((transaction) => (
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
