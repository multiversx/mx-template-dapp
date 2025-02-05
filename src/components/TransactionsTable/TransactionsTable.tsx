import { useState, useEffect } from 'react';
import { TransactionsTableSDK } from 'lib/sdkDappCoreUI';
import {
  ServerTransactionType,
  TransactionsTableRowType
} from 'types/sdkDappCoreTypes';
import {
  TransactionsTableController,
  useGetAccount,
  useGetNetworkConfig
} from 'lib/sdkDappCore';

interface TransactionsTablePropsType {
  transactions?: ServerTransactionType[];
}

export const TransactionsTable = ({
  transactions = []
}: TransactionsTablePropsType) => {
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const [processedTransaction, setProcessedTransactions] = useState<
    TransactionsTableRowType[]
  >([]);

  useEffect(() => {
    processTransactions();
  }, []);

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

  return <TransactionsTableSDK transactions={processedTransaction} />;
};
