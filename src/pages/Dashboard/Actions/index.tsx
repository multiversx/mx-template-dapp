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
            setHasPing(true);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setSecondsLeft(parseInt(decoded, 16));
            setHasPing(false);
            break;
          }
        }
      });
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
  const notAllowed = {
    ...(pongAllowed ? {} : { cursor: 'not-allowed' }),
  };

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
            <div
              className="action-btn"
              onClick={pongAllowed ? send(pongTransaction) : () => {}}
              style={notAllowed}
            >
              <button className={`btn ${!pongAllowed ? 'disabled' : ''}`} style={notAllowed}>
                <FontAwesomeIcon icon={faArrowDown} className="text-primary" />
              </button>
              <span className="text-white">
                {pongAllowed ? (
                  <a href="/" className="text-white text-decoration-none">
                    Pong
                  </a>
                ) : (
                  <>{secondsLeft}s until Pong</>
                )}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Actions;
