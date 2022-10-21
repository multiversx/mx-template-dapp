import React, { useCallback, useEffect, useState } from 'react';

import { getTransactions } from '@elrondnetwork/dapp-core/apiCalls';
import {
  ACCOUNTS_ENDPOINT,
  TRANSACTIONS_ENDPOINT
} from '@elrondnetwork/dapp-core/apiCalls/endpoints';
import {
  useGetAccount,
  useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core/hooks';

import { ServerTransactionType } from '@elrondnetwork/dapp-core/types';
import { TransactionsTable, Loader } from '@elrondnetwork/dapp-core/UI';
import axios from 'axios';

import { Actions } from './Actions';
import styles from './dashboard.module.scss';
import { TopInfo } from './TopInfo';

interface TransactionsFetchType {
  data: ServerTransactionType[];
  loading: boolean;
  fetched: boolean;
  error: unknown;
}

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<TransactionsFetchType>({
    data: [],
    loading: false,
    fetched: false,
    error: false
  });

  const { address } = useGetAccount();

  const { network } = useGetNetworkConfig();

  const fetchTransactions = () => {
    const fetchData = async () => {
      try {
        const endpoint = `${network.apiAddress}/${ACCOUNTS_ENDPOINT}/${account.address}/${TRANSACTIONS_ENDPOINT}`;
        const { data } = await getTransactions({
          // sender: address,
          // receiver: con
          // page = 1,
          // transactionSize = 15,
          // condition = 'should',
          // withScResults = true,
          // after,
          // before
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
  };

  useEffect(fetchTransactions, [fetchTransactions]);

  if (transactions.loading) {
    return <Loader />;
  }

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm border-0'>
            <div className='card-body p-1'>
              <div className='card border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                  <Actions />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.transactions}>
            <TransactionsTable transactions={transactions.data} />
          </div>
        </div>
      </div>
    </div>
  );
};
