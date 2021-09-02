import * as React from 'react';
import axios from 'axios';
import * as Dapp from '@elrondnetwork/dapp';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contractAddress } from 'config';
import { routeNames } from 'routes';
import useNewTransaction from 'pages/Transaction/useNewTransaction';
import { RawTransactionType } from 'helpers/types';
import { network } from 'config';
import { Address } from '@elrondnetwork/erdjs';
import moment from 'moment';

const Actions = () => {
  const sendTransaction = Dapp.useSendTransaction();
  const { address } = Dapp.useContext();
  const newTransaction = useNewTransaction();
  const [secondsLeft, setSecondsLeft] = React.useState<number>();
  const [hasPing, setHasPing] = React.useState<boolean>();

  const mount = () => {
    if (secondsLeft) {
      const interval = setInterval(() => {
        setSecondsLeft((existing) => {
          if (existing) {
            return existing - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(mount, [hasPing]);

  React.useEffect(() => {
    axios
      .post(`${network.apiAddress}/vm-values/query`, {
        scAddress: contractAddress,
        funcName: 'getTimeToPong',
        args: [Address.fromBech32(address).hex()],
      })
      .then(({ data: { data } }) => {
        const [encoded] = data.data.returnData;

        switch (encoded) {
          case undefined:
            setHasPing(true);
            break;
          case '':
            setSecondsLeft(0);
            setHasPing(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setSecondsLeft(parseInt(decoded, 16));
            setHasPing(false);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = (transaction: RawTransactionType) => (e: React.MouseEvent) => {
    e.preventDefault();
    sendTransaction({
      transaction: newTransaction(transaction),
      callbackRoute: routeNames.transaction,
    });
  };

  const pongTransaction: RawTransactionType = {
    receiver: contractAddress,
    data: 'pong',
    value: '0',
    gasLimit: 10000000,
  };

  const pingTransaction: RawTransactionType = {
    receiver: contractAddress,
    data: 'ping',
    value: '1',
    gasLimit: 10000000,
  };

  const pongAllowed = secondsLeft === 0;
  const style = {
    ...(pongAllowed ? {} : { cursor: 'not-allowed' }),
  };

  const timeRemaining = moment()
    .startOf('day')
    .seconds(secondsLeft || 0)
    .format('mm:ss');

  return (
    <div className="d-flex mt-4 justify-content-center">
      {hasPing !== undefined && (
        <>
          {hasPing ? (
            <div className="action-btn" onClick={send(pingTransaction)}>
              <button className="btn">
                <FontAwesomeIcon icon={faArrowUp} className="text-primary" />
              </button>
              <a href="/" className="text-white text-decoration-none">
                Ping
              </a>
            </div>
          ) : (
            <>
              <div className="d-flex flex-column">
                <div
                  className="action-btn"
                  onClick={pongAllowed ? send(pongTransaction) : () => {}}
                  style={style}
                >
                  <button className={`btn ${!pongAllowed ? 'disabled' : ''}`} style={style}>
                    <FontAwesomeIcon icon={faArrowDown} className="text-primary" />
                  </button>
                  <span className="text-white">
                    {pongAllowed ? (
                      <a href="/" className="text-white text-decoration-none">
                        Pong
                      </a>
                    ) : (
                      <>Pong</>
                    )}
                  </span>
                </div>
                {!pongAllowed && (
                  <span className="text-white">{timeRemaining} until able to Pong</span>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Actions;
