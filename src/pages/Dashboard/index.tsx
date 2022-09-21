import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core/hooks';
import {
  ServerTransactionType,
  InterpretedTransactionType
} from '@elrondnetwork/dapp-core/types';
import { TransactionsTable } from '@elrondnetwork/dapp-core/UI';
import { getInterpretedTransaction } from '@elrondnetwork/dapp-core/utils/transactions/getInterpretedTransaction/getInterpretedTransaction';

interface TransactionsFetchType {
  data: ServerTransactionType[];
  loading: boolean;
  fetched: boolean;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<TransactionsFetchType>({
    data: [],
    loading: false,
    fetched: false
  });

  const { account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();

  const fetchTransactions = useCallback(() => {
    const fetchData = async () => {
      const endpoint = `${network.apiAddress}/accounts/${account.address}/transactions`;
      const { data } = await axios.get<ServerTransactionType[]>(endpoint, {
        params: { size: 150 }
      });

      setTransactions({
        data,
        loading: false,
        fetched: true
      });
    };

    if (!transactions.fetched) {
      setTransactions((transactions) => ({ ...transactions, loading: true }));
      fetchData();
    }
  }, [
    account.address,
    network.apiAddress,
    transactions.fetched,
    network.explorerAddress
  ]);

  useEffect(fetchTransactions, [fetchTransactions]);

  return (
    <div className='container'>
      <TransactionsTable
        transactions={transactions.data as InterpretedTransactionType[]}
        address={account.address}
      />
    </div>
  );
};

export default Dashboard;
