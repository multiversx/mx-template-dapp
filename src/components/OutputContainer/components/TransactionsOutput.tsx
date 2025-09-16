import { SignedTransactionType } from 'lib';

import { TransactionOutput } from './TransactionOutput';

// prettier-ignore
const styles = {
  transactionsOutput: 'transactions-output flex flex-col gap-4'
} satisfies Record<string, string>;

interface TransactionsOutputPropsType {
  transactions: SignedTransactionType[];
}

export const TransactionsOutput = ({
  transactions
}: TransactionsOutputPropsType) => (
  <div className={styles.transactionsOutput}>
    {transactions.map((transaction) => (
      <TransactionOutput key={transaction.hash} transaction={transaction} />
    ))}
  </div>
);
