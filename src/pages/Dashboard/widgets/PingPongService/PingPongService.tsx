import { useEffect, useState } from 'react';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Button } from 'components/Button';
import { ContractAddress } from 'components/ContractAddress';
import { MissingNativeAuthError } from 'components/MissingNativeAuthError';
import { Label } from 'components/Label';
import { OutputContainer, PingPongOutput } from 'components/OutputContainer';
import { getCountdownSeconds, setTimeRemaining } from 'helpers';
import { useGetPendingTransactions, useSendPingPongTransaction } from 'hooks';
import { useGetLoginInfo } from 'hooks/sdkDappHooks';
import { SessionEnum } from 'localConstants';
import { SignedTransactionType } from 'types';
import {
  useGetTimeToPong,
  useGetPingTransaction,
  useGetPongTransaction
} from './hooks';

// The transactions are being done by directly requesting to template-dapp service
export const PingPongService = () => {
  const [stateTransactions, setStateTransactions] = useState<
    SignedTransactionType[] | null
  >(null);
  const [hasPing, setHasPing] = useState<boolean>(true);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const {
    sendPingTransactionFromService,
    sendPongTransactionFromService,
    transactionStatus
  } = useSendPingPongTransaction(SessionEnum.abiPingPongServiceSessionId);
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

    await sendPingTransactionFromService(pingTransaction);
  };

  const onSendPongTransaction = async () => {
    const pongTransaction = await getPongTransaction();

    if (!pongTransaction) {
      return;
    }

    await sendPongTransactionFromService(pongTransaction);
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
            data-testid='btnPing'
            data-cy='transactionBtn'
          >
            <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
            Ping
          </Button>

          <Button
            disabled={!pongAllowed || hasPing || hasPendingTransactions}
            data-testid='btnPong'
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
