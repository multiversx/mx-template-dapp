import React, { useCallback, useEffect, useState } from 'react';

import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core/hooks';

import {
  ACCOUNTS_ENDPOINT,
  TRANSACTIONS_ENDPOINT
} from '@elrondnetwork/dapp-core/apiCalls/endpoints';

import { ServerTransactionType } from '@elrondnetwork/dapp-core/types';
import { TransactionsTable, Loader } from '@elrondnetwork/dapp-core/UI';
import axios from 'axios';

import styles from './dashboard.module.scss';

interface TransactionsFetchType {
  data: ServerTransactionType[];
  loading: boolean;
  fetched: boolean;
  error: unknown;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<TransactionsFetchType>({
    data: [],
    loading: false,
    fetched: false,
    error: false
  });

  const { account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();

  const fetchTransactions = useCallback(() => {
    const fetchData = async () => {
      try {
        const endpoint = `${network.apiAddress}/${ACCOUNTS_ENDPOINT}/${account.address}/${TRANSACTIONS_ENDPOINT}`;
        const { data } = await axios.get<ServerTransactionType[]>(endpoint, {
          params: { size: 15 }
        });

        setTransactions({
          data,
          loading: false,
          error: false,
          fetched: true
        });
      } catch (error) {
        setTransactions((payload) => ({
          ...payload,
          error
        }));
      }
    };

    if (!transactions.fetched) {
      setTransactions((payload) => ({ ...payload, loading: true }));
      fetchData();
    }
  }, [
    account,
    network.apiAddress,
    transactions.fetched,
    network.explorerAddress
  ]);

  useEffect(fetchTransactions, [fetchTransactions]);

  if (transactions.loading) {
    return <Loader />;
  }

  return (
    <div className={`container ${styles.transactions}`}>
      <TransactionsTable transactions={transactions.data} />
    </div>
  );
};

export default Dashboard;
