import { useState } from 'react';
import { apiTimeout, transactionSize } from 'config';
import { ServerTransactionType } from 'types';
import { getInterpretedTransaction } from 'utils';
import { TransactionsPropsType } from '../types';
import {
  getAccount,
  getState,
  networkSelector,
  getTransactions
} from 'lib/sdkDappCore';

export const useGetTransactions = (payload?: TransactionsPropsType) => {
  const { address } = getAccount();
  const {
    network: { apiAddress, explorerAddress }
  } = networkSelector(getState());

  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<ServerTransactionType[]>([]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);

      const { data } = await getTransactions({
        apiAddress,
        sender: address,
        condition: 'must',
        transactionSize,
        apiTimeout,
        ...(payload ?? {})
      });

      const interpretedTransactions = data.map(
        (transaction: ServerTransactionType) =>
          getInterpretedTransaction({ transaction, address, explorerAddress })
      );

      setTransactions(interpretedTransactions);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, transactions, getTransactions: fetchTransactions };
};
