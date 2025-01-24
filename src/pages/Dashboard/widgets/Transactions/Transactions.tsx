import { useEffect } from 'react';
import { OutputContainer } from 'components/OutputContainer';
import { useGetTransactions } from './hooks';
import {
  getActiveTransactionsStatus,
  TransactionsTableController
} from 'lib/sdkDappCore';
import { TransactionsPropsType } from './types';

export const Transactions = (props: TransactionsPropsType) => {
  const { isLoading, getTransactions, transactions } =
    useGetTransactions(props);

  const processedTransactions = TransactionsTableController.processTransactions(
    transactions || []
  );

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
          <transactions-table
            transactions={processedTransactions}
          ></transactions-table>
        </div>
      </OutputContainer>
    </div>
  );
};
