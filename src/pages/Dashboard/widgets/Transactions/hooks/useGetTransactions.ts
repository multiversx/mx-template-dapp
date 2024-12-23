import { useState } from 'react';
import { apiTimeout, transactionSize } from 'config';
import { ServerTransactionType } from 'types';
import { accountSelector, getInterpretedTransaction } from 'lib/sdkDappCore';
import { TransactionsPropsType } from '../types';
import {
  getAccount,
  getState,
  networkSelector,
  getTransactions
} from 'lib/sdkDappCore';
import { useStore } from 'hooks/useStore';

export const useGetTransactions = (payload?: TransactionsPropsType) => {
  const state = useStore();
  const { address } = accountSelector(state);
  const { apiAddress, explorerAddress } = networkSelector(state);

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
