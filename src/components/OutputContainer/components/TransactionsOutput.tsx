import { SignedTransactionType } from 'lib';
import { TransactionOutput } from './TransactionOutput';

export const TransactionsOutput = ({
  transactions
}: {
  transactions: SignedTransactionType[];
}) => {
  return (
    <div className='flex flex-col gap-4'>
      {transactions?.map((transaction) => {
        return (
          <TransactionOutput
            key={transaction.nonce}
            transaction={transaction}
          />
        );
      })}
    </div>
  );
};
