import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useEffect, useState } from 'react';

import {
  Button,
  ContractAddress,
  Label,
  MissingNativeAuthError,
  OutputContainer,
  PingPongOutput
} from 'components';
import { getCountdownSeconds, setTimeRemaining } from 'helpers';
import { useSendPingPongTransaction } from 'hooks';
import { useGetLoginInfo, useGetPendingTransactions } from 'lib';
import { SessionEnum } from 'localConstants';
import { SignedTransactionType, WidgetProps } from 'types';

import {
  useGetPingTransaction,
  useGetPongTransaction,
  useGetTimeToPong
} from './hooks';

// The transactions are being done by directly requesting to template-dapp service
export const PingPongService = ({ callbackRoute }: WidgetProps) => {
  const [stateTransactions, setStateTransactions] = useState<
    SignedTransactionType[] | null
  >(null);
  const [hasPing, setHasPing] = useState<boolean>(true);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const {
    sendPingTransactionFromService,
    sendPongTransactionFromService,
    transactionStatus
  } = useSendPingPongTransaction({
    type: SessionEnum.abiPingPongServiceSessionId
  });
  const getTimeToPong = useGetTimeToPong();
  const getPingTransaction = useGetPingTransaction();
  const getPongTransaction = useGetPongTransaction();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { tokenLogin } = useGetLoginInfo();

  const setSecondsRemaining = async () => {
    if (!tokenLogin?.nativeAuthToken) {
      return;
    }

    const secondsRemaining = await getTimeToPong();
    const { canPing, timeRemaining } = setTimeRemaining(secondsRemaining);

    setHasPing(canPing);
    if (timeRemaining && timeRemaining >= 0) {
      setSecondsLeft(timeRemaining);
    }
  };

  const onSendPingTransaction = async () => {
    const pingTransaction = await getPingTransaction();

    if (!pingTransaction) {
      return;
    }

    await sendPingTransactionFromService({
      transactions: [pingTransaction],
      callbackRoute
    });
  };

  const onSendPongTransaction = async () => {
    const pongTransaction = await getPongTransaction();

    if (!pongTransaction) {
      return;
    }

    await sendPongTransactionFromService({
      transactions: [pongTransaction],
      callbackRoute
    });
  };

  const timeRemaining = moment()
    .startOf('day')
    .seconds(secondsLeft ?? 0)
    .format('mm:ss');

  const pongAllowed = secondsLeft === 0;

  useEffect(() => {
    getCountdownSeconds({ secondsLeft, setSecondsLeft });
  }, [hasPing]);

  useEffect(() => {
    if (transactionStatus.transactions) {
      setStateTransactions(transactionStatus.transactions);
    }
  }, [transactionStatus]);

  useEffect(() => {
    setSecondsRemaining();
  }, [hasPendingTransactions]);

  if (!tokenLogin?.nativeAuthToken) {
    return <MissingNativeAuthError />;
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-start gap-2'>
          <Button
            disabled={!hasPing || hasPendingTransactions}
            onClick={onSendPingTransaction}
            data-testid='btnPingService'
            data-cy='transactionBtn'
          >
            <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
            Ping
          </Button>

          <Button
            disabled={!pongAllowed || hasPing || hasPendingTransactions}
            data-testid='btnPongService'
            data-cy='transactionBtn'
            onClick={onSendPongTransaction}
          >
            <FontAwesomeIcon icon={faArrowDown} className='mr-1' />
            Pong
          </Button>
        </div>
      </div>

      <OutputContainer>
        {!stateTransactions && (
          <>
            <ContractAddress />
            {!pongAllowed && (
              <p>
                <Label>Time remaining: </Label>
                <span className='text-red-600'>{timeRemaining}</span> until able
                to pong
              </p>
            )}
          </>
        )}
        <PingPongOutput
          transactions={stateTransactions}
          pongAllowed={pongAllowed}
          timeRemaining={timeRemaining}
        />
      </OutputContainer>
    </div>
  );
};
