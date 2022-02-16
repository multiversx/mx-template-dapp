import React from 'react';
import {
  useGetAccountInfo,
  DappUI,
  transactionServices,
  refreshAccount,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { getTransactions } from 'apiRequests';
import { contractAddress } from 'config';
import TransactionsList from './TransactionsList';
import { StateType } from './types';

const Transactions = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const { success, fail, hasActiveTransactions } =
    transactionServices.useGetActiveTransactionsStatus();

  const [state, setState] = React.useState<StateType>({
    transactions: [],
    transactionsFetched: undefined
  });
  const account = useGetAccountInfo();

  const fetchData = () => {
    if (success || fail || !hasActiveTransactions) {
      getTransactions({
        apiAddress,
        address: account.address,
        timeout: 3000,
        contractAddress
      }).then(({ data, success: transactionsFetched }) => {
        refreshAccount();
        setState({
          transactions: data,
          transactionsFetched
        });
      });
    }
  };

  React.useEffect(fetchData, [success, fail, hasActiveTransactions]);

  const { transactions } = state;

  return transactions.length > 0 ? (
    <TransactionsList transactions={transactions} />
  ) : (
    <div className='my-5'>
      <DappUI.PageState
        icon={faExchangeAlt}
        className='text-muted fa-3x'
        title='No Transactions'
      />
    </div>
  );
};

export default Transactions;
