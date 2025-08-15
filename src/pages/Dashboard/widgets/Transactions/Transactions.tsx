import { useEffect } from 'react';

import { OutputContainer, TransactionsTable } from 'components';
import { getActiveTransactionsStatus } from 'lib';

import { useGetTransactions } from './hooks';
import { TransactionsPropsType } from './types';

// prettier-ignore
const styles = {
  transactionsContainer: 'transactions-container flex flex-col border border-secondary rounded-xl transition-all duration-200 ease-out',
  transactionsTable: 'transactions-table w-full h-full overflow-x-auto shadow rounded-lg'
} satisfies Record<string, string>;

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
    <div id={props.id} className={styles.transactionsContainer}>
      <OutputContainer isLoading={isLoading} className='p-0'>
        <div className={styles.transactionsTable}>
          <TransactionsTable transactions={transactions} />
        </div>
      </OutputContainer>
    </div>
  );
};
