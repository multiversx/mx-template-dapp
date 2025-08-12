import { useEffect } from 'react';

import { OutputContainer, TransactionsTable } from 'components';
import { getActiveTransactionsStatus } from 'lib';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

import { useGetTransactions } from './hooks';
import { TransactionsPropsType } from './types';

export const Transactions = (props: TransactionsPropsType) => {
  const { isLoading, getTransactions, transactions } =
    useGetTransactions(props);

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
        <p>No transactions found</p>
      </OutputContainer>
    );
  }

  return (
    <div
      id={ItemsIdentifiersEnum.transactionsAll}
      className='flex flex-col border border-secondary rounded-xl'
    >
      <OutputContainer isLoading={isLoading} className='p-0'>
        <div className='w-full h-full overflow-x-auto shadow rounded-lg'>
          <TransactionsTable transactions={transactions} />
        </div>
      </OutputContainer>
    </div>
  );
};
