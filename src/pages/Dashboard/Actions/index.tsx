import * as React from 'react';
import * as Dapp from '@elrondnetwork/dapp';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contractAddress } from 'config';
import { routeNames } from 'routes';
import useNewTransaction from 'pages/Transaction/useNewTransaction';
import { RawTransactionType } from 'helpers/types';
import { network } from 'config';

const Actions = () => {
  const sendTransaction = Dapp.useSendTransaction();
  const { address } = Dapp.useContext();
  const newTransaction = useNewTransaction();

  const send = (transaction: RawTransactionType) => (e: React.MouseEvent) => {
    e.preventDefault();
    sendTransaction({
      transaction: newTransaction(transaction),
      callbackRoute: routeNames.transaction,
    });
  };

  const basicTransaction: RawTransactionType = {
    receiver: address,
    value: '1',
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
        <button className="btn" onClick={send(basicTransaction)}>
          <FontAwesomeIcon icon={faArrowUp} className="text-primary" />
        </button>
        <a
          href={routeNames.home}
          onClick={send(basicTransaction)}
          className="text-white text-decoration-none"
        >
          Send {network.egldLabel}
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
