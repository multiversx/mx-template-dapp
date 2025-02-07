import { useState, useEffect } from 'react';
import { TransactionsTableSDK, ITransactionsTableRow } from 'lib/sdkDappCoreUI';
import { ServerTransactionType } from 'types/sdkDappCoreTypes';
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
    ITransactionsTableRow[]
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

    setProcessedTransactions(
      transactionsData as unknown as ITransactionsTableRow[]
    );
  };

  return <TransactionsTableSDK transactions={processedTransaction} />;
};
