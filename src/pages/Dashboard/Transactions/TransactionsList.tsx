import React from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core/hooks';
import { FormatAmount } from '@elrondnetwork/dapp-core/UI/FormatAmount';
import { Trim } from '@elrondnetwork/dapp-core/UI/Trim';
import moment from 'moment';
import StatusIcon from './StatusIcon';
import txStatus from './txStatus';
import { TransactionType } from './types';

function sortByDate(a: TransactionType, b: TransactionType) {
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  return 0;
}

const fakeSender =
  'erd000000000000000000000000000000000000000000000000000000000a';

const TransactionList = ({
  transactions
}: {
  transactions: TransactionType[];
}) => {
  const { network } = useGetNetworkConfig();
  const account = useGetAccountInfo();
  const incoming = (sender: string) =>
    sender === account.address && sender !== fakeSender;

  // eslint-disable-next-line
  const doubleOwnTransactions = transactions
    .filter((tx) => tx.sender === tx.receiver && tx.blockHash !== '')
    .map((tx) => ({ ...tx, sender: fakeSender, timestamp: tx.timestamp + 1 }));

  const sortedTransactions: TransactionType[] = (
    [
      ...transactions,
      ...(doubleOwnTransactions.length > 0 ? doubleOwnTransactions : [])
    ].filter((el: any) => el !== undefined) as any
  ).sort(sortByDate);

  return (
    <div className='p-3 mt-3'>
      <h4 className='mb-3 font-weight-normal'>Smart Contract Transactions</h4>
      <div className='table-responsive'>
        <table className='transactions table pb-3'>
          <thead>
            <tr className='bg-light'>
              <th className='border-0 font-weight-normal'></th>
              <th className='border-0 font-weight-normal'>Tx hash</th>
              <th className='border-0 font-weight-normal'>Date</th>
              <th className='border-0 font-weight-normal'>Amount</th>
            </tr>
          </thead>
          <tbody data-testid='transactionsList'>
            {sortedTransactions.map((tx: TransactionType, i) => {
              const incomingTransaction = incoming(tx.sender);

              return (
                <tr key={tx.txHash + i}>
                  <td>
                    <div
                      className='transaction-icon bg-light d-flex align-items-center justify-content-center'
                      title={txStatus[tx.status]}
                    >
                      <StatusIcon
                        tx={tx}
                        incomingTransaction={incomingTransaction}
                      />
                    </div>
                  </td>
                  <td className='transaction-hash'>
                    <a
                      href={`${network.explorerAddress}/transactions/${tx.txHash}`}
                      {...{
                        target: '_blank'
                      }}
                      title='View in Explorer'
                    >
                      <Trim data-testid='txHash' text={tx.txHash} />
                    </a>
                  </td>
                  <td>
                    {moment.unix(tx.timestamp).format('MMM Do YYYY, h:mm A')}
                  </td>
                  <td className='text-right'>
                    {tx.value === '0' ? (
                      ''
                    ) : (
                      <>{tx.sender === account.address ? '-' : '+'}</>
                    )}
                    <FormatAmount value={tx.value} digits={2} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='d-flex justify-content-center'>
        <a
          href={`${network.explorerAddress}/address/${account.address}`}
          {...{
            target: '_blank'
          }}
        >
          See all transactions
        </a>
      </div>
    </div>
  );
};

export default TransactionList;
