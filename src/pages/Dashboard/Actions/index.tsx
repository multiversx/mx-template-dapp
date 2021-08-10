import * as React from 'react';
import * as Dapp from '@elrondnetwork/dapp';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contractAddress } from 'config';
import { routeNames } from 'routes';
import useNewTransaction from 'pages/Transaction/useNewTransaction';
import { RawTransactionType } from 'helpers/types';

const Actions = () => {
  const sendTransaction = Dapp.useSendTransaction();
  const newTransaction = useNewTransaction();

  const send = (transaction: RawTransactionType) => (e: React.MouseEvent) => {
    e.preventDefault();
    sendTransaction({
      transaction: newTransaction(transaction),
      callbackRoute: routeNames.transaction,
    });
  };

  /* TIP: for basic transactions, only receiver and value are mandatory */
  const stakeTransaction: RawTransactionType = {
    receiver: contractAddress,
    data: 'stake',
    value: '10',
    gasLimit: 250000000,
  };

  const claimRewardsTransaction: RawTransactionType = {
    receiver: contractAddress,
    data: 'claimRewards',
    value: '0',
    gasLimit: 250000000,
  };

  return (
    <div className="d-flex mt-4 justify-content-center">
      <div className="action-btn">
        <button className="btn" onClick={send(stakeTransaction)}>
          <FontAwesomeIcon icon={faArrowUp} className="text-primary" />
        </button>
        <a
          href={routeNames.home}
          onClick={send(stakeTransaction)}
          className="text-white text-decoration-none"
        >
          Stake
        </a>
      </div>

      <div className="action-btn">
        <button className="btn" onClick={send(claimRewardsTransaction)}>
          <FontAwesomeIcon icon={faArrowDown} className="text-primary" />
        </button>
        <a
          href="/"
          onClick={send(claimRewardsTransaction)}
          className="text-white text-decoration-none"
        >
          Claim rewards
        </a>
      </div>
    </div>
  );
};

export default Actions;
