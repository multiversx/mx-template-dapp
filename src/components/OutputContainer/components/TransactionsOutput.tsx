import { SignedTransactionType } from 'lib';

import { TransactionOutput } from './TransactionOutput';

// prettier-ignore
const styles = {
  transactionsContainer: 'transactions-container flex flex-col gap-4'
} satisfies Record<string, string>;

export const TransactionsOutput = ({
  transactions
}: {
  transactions: SignedTransactionType[];
}) => {
  return (
    <div className={styles.transactionsContainer}>
      {transactions?.map((transaction) => {
        return (
          <TransactionOutput key={transaction.hash} transaction={transaction} />
        );
      })}
    </div>
  );
};
