import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Button,
  ContractAddress,
  Label,
  OutputContainer,
  PingPongOutput
} from 'components';
import { getCountdownSeconds, setTimeRemaining } from 'helpers';
import { useSendPingPongTransaction } from 'hooks';
import { useGetPendingTransactions } from 'lib';
import { SignedTransactionType } from 'lib';
import { SessionEnum } from 'localConstants';
import { WidgetProps } from 'types';
import { useGetPingAmount, useGetTimeToPong } from './hooks';

// Raw transaction are being done by directly requesting to API instead of calling the smartcontract
export const PingPongRaw = ({ callbackRoute }: WidgetProps) => {
  const getTimeToPong = useGetTimeToPong();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { sendPingTransaction, sendPongTransaction, transactionStatus } =
    useSendPingPongTransaction({
      type: SessionEnum.rawPingPongSessionId
    });
  const pingAmount = useGetPingAmount();

  const [stateTransactions, setStateTransactions] = useState<
    SignedTransactionType[] | null
  >(null);
  const [hasPing, setHasPing] = useState<boolean>(true);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const setSecondsRemaining = async () => {
    const secondsRemaining = await getTimeToPong();
    const { canPing, timeRemaining } = setTimeRemaining(secondsRemaining);

    setHasPing(canPing);
    if (timeRemaining && timeRemaining >= 0) {
      setSecondsLeft(timeRemaining);
    }
  };

  const onSendPingTransaction = async () => {
    await sendPingTransaction({ amount: pingAmount, callbackRoute });
  };

  const onSendPongTransaction = async () => {
    await sendPongTransaction({ callbackRoute });
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

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-start gap-2'>
          <Button
            disabled={!hasPing || hasPendingTransactions}
            onClick={onSendPingTransaction}
            data-testid='btnPingRaw'
            data-cy='transactionBtn'
          >
            <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
            Ping
          </Button>

          <Button
            disabled={!pongAllowed || hasPing || hasPendingTransactions}
            data-testid='btnPongRaw'
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
