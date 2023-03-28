import React, { useEffect, useState } from 'react';
import { faBan, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

import { AxiosError } from 'axios';
import { Loader, PageState, TransactionsTable } from 'components';

import { apiTimeout, contractAddress, transactionSize } from 'config';
import { getTransactions } from 'helpers';
import {
  useGetAccount,
  useGetActiveTransactionsStatus,
  useGetNetworkConfig
} from 'hooks';
import { ServerTransactionType } from 'types';
import { DashboardLayout } from './components';

const DashboardPage = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const { success, fail } = useGetActiveTransactionsStatus();

  const [transactions, setTransactions] = useState<ServerTransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const { data } = await getTransactions({
        apiAddress,
        sender: address,
        receiver: contractAddress,
        condition: 'must',
        transactionSize,
        apiTimeout
      });
      setTransactions(data);
    } catch (err) {
      const { message } = err as AxiosError;
      setError(message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (success || fail) {
      fetchTransactions();
    }
  }, [success, fail]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className='my-5'>
        <PageState
          icon={faBan}
          className='text-muted'
          title='Error fetching transactions.'
        />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className='my-5'>
        <PageState
          icon={faExchangeAlt}
          className='text-muted'
          title='No Transactions'
        />
      </div>
    );
  }

  return <TransactionsTable transactions={transactions} />;
};

export const Dashboard = () => (
  <DashboardLayout>
    <DashboardPage />
  </DashboardLayout>
);
