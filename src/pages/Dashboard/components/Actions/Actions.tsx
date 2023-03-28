import * as React from 'react';
import { useEffect, useState } from 'react';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import moment from 'moment';
import { contractAddress } from 'config';
import { refreshAccount, sendTransactions } from 'helpers';
import { useGetPendingTransactions } from 'hooks';
import { useGetTimeToPong, useGetPingAmount } from './helpers';

export const Actions = () => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const getTimeToPong = useGetTimeToPong();
  const pingAmount = useGetPingAmount();

  const [secondsLeft, setSecondsLeft] = useState<number>();
  const [hasPing, setHasPing] = useState<boolean>();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

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

  useEffect(mount, [hasPing]);

  const setSecondsRemaining = async () => {
    const secondsRemaining = await getTimeToPong();

    switch (secondsRemaining) {
      case undefined:
      case null:
        setHasPing(true);
        break;
      case 0:
        setSecondsLeft(0);
        setHasPing(false);
        break;
      default: {
        setSecondsLeft(secondsRemaining);
        setHasPing(false);
        break;
      }
    }
  };

  useEffect(() => {
    setSecondsRemaining();
  }, [hasPendingTransactions]);

  const sendPingTransaction = async () => {
    const pingTransaction = {
      value: pingAmount,
      data: 'ping',
      receiver: contractAddress,
      gasLimit: '60000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendPongTransaction = async () => {
    const pongTransaction = {
      value: '0',
      data: 'pong',
      receiver: contractAddress,
      gasLimit: '60000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: pongTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Pong transaction',
        errorMessage: 'An error has occured during Pong',
        successMessage: 'Pong transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const pongAllowed = secondsLeft === 0 && !hasPendingTransactions;
  const notAllowedClass = pongAllowed ? '' : 'not-allowed disabled';

  const timeRemaining = moment()
    .startOf('day')
    .seconds(secondsLeft || 0)
    .format('mm:ss');

  return (
    <div className='d-flex mt-4 justify-content-center'>
      {hasPing !== undefined && (
        <>
          {hasPing && !hasPendingTransactions ? (
            <div className='action-btn' onClick={sendPingTransaction}>
              <button className='btn'>
                <FontAwesomeIcon icon={faArrowUp} className='text-primary' />
              </button>
              <a href='/' className='text-white text-decoration-none'>
                Ping
              </a>
            </div>
          ) : (
            <>
              <div className='d-flex flex-column'>
                <div
                  {...{
                    className: `action-btn ${notAllowedClass}`,
                    ...(pongAllowed ? { onClick: sendPongTransaction } : {})
                  }}
                >
                  <button className={`btn ${notAllowedClass}`}>
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      className='text-primary'
                    />
                  </button>
                  <span className='text-white'>
                    {pongAllowed ? (
                      <a href='/' className='text-white text-decoration-none'>
                        Pong
                      </a>
                    ) : (
                      <>Pong</>
                    )}
                  </span>
                </div>
                {!pongAllowed && !hasPendingTransactions && (
                  <span className='opacity-6 text-white'>
                    {timeRemaining} until able to Pong
                  </span>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
