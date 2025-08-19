import { useEffect, useState } from 'react';
import {
  MvxTransactionsTable,
  ServerTransactionType,
  TransactionsRowType,
  TransactionsTableController,
  useGetAccount,
  useGetNetworkConfig
} from 'lib';

interface TransactionsTablePropsType {
  transactions?: ServerTransactionType[];
}

export const TransactionsTable = ({
  transactions = []
}: TransactionsTablePropsType) => {
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const [processedTransactions, setProcessedTransactions] = useState<
    TransactionsRowType[]
  >([]);

  useEffect(() => {
    processTransactions();
  }, [transactions]);

  const processTransactions = async () => {
    const transactionsData =
      await TransactionsTableController.processTransactions({
        address,
        egldLabel: network.egldLabel,
        explorerAddress: network.explorerAddress,
        transactions
      });

    setProcessedTransactions(transactionsData);
  };

  return <MvxTransactionsTable transactions={processedTransactions} />;
};
