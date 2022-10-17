import React from 'react';
import { getTransactions } from '@elrondnetwork/dapp-core/apiCalls/transactions';
import {
  useGetNetworkConfig,
  useGetActiveTransactionsStatus,
  useGetAccount
} from '@elrondnetwork/dapp-core/hooks';
import { PageState } from '@elrondnetwork/dapp-core/UI';
import { refreshAccount } from '@elrondnetwork/dapp-core/utils';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { contractAddress } from 'config';
import TransactionsList from './TransactionsList';
import { StateType } from './types';

const Transactions = () => {
  const {
    network: { apiAddress }
  } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const { success, fail } = useGetActiveTransactionsStatus();

  const [state, setState] = React.useState<StateType>({
    transactions: [],
    transactionsFetched: undefined
  });
  const fetchData = async () => {
    try {
      const { data } = await getTransactions({
        apiAddress,
        sender: address,
        receiver: contractAddress,
        condition: 'must',
        transactionSize: 25,
        apiTimeout: 3000
      });
      refreshAccount();
      setState({
        transactions: data,
        transactionsFetched: true
      });
    } catch (err) {
      setState({
        transactions: [],
        transactionsFetched: false
      });
    }
  };

  React.useEffect(() => {
    if (success || fail) {
      fetchData();
    }
  }, [success, fail]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const { transactions } = state;

  return transactions?.length > 0 ? (
    <TransactionsList transactions={transactions} />
  ) : (
    <div className='my-5'>
      <PageState
        icon={faExchangeAlt}
        className='text-muted'
        title='No Transactions'
      />
    </div>
  );
};

export default Transactions;
