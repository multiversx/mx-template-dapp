import { TransactionsTableSDK } from 'lib/sdkDappCoreUI';
import { ServerTransactionType } from 'types/sdkDappCoreTypes';

interface TransactionsTablePropsType {
  transactions?: ServerTransactionType[];
}

export const TransactionsTable = ({
  transactions = []
}: TransactionsTablePropsType) => {
  return <TransactionsTableSDK transactions={[]} />;
};
