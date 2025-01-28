import { ServerTransactionType } from 'types/sdkDappCoreTypes';
import { TransactionsTableController } from 'lib/sdkDappCore';

interface TransactionsTablePropsType {
  transactions?: ServerTransactionType[];
}

export const TransactionsTable = ({
  transactions = []
}: TransactionsTablePropsType) => {
  const transactionsData =
    TransactionsTableController.processTransactions(transactions);

  return (
    <transactions-table
      data={JSON.stringify(transactionsData)}
    ></transactions-table>
  );
};
