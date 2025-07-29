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
import { CopyButton, MvxExplorerLink, useGetPendingTransactions } from 'lib';
import { useGetPingAmount, useGetTimeToPong } from './hooks';

export const PingPongAbi = () => {
  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const getTimeToPong = useGetTimeToPong();
  const { sendPingTransactionFromAbi, sendPongTransactionFromAbi } =
    useSendPingPongTransaction();
  const pingAmount = useGetPingAmount();

  const [hasPing, setHasPing] = useState(true);
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
    await sendPingTransactionFromAbi(pingAmount);
  };

  const onSendPongTransaction = async () => {
    await sendPongTransactionFromAbi();
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
    setSecondsRemaining();
  }, [hasPendingTransactions]);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Label>Contract: </Label>

        <OutputContainer>
          {!hasPendingTransactions && (
            <>
              <div className='flex justify-between items-center'>
                <ContractAddress />

                <div className='flex gap-1 text-primary'>
                  <CopyButton />

                  <MvxExplorerLink
                  // link={explorerLink}
                  // className=''
                  ></MvxExplorerLink>
                </div>
              </div>
              {!pongAllowed && (
                <p>
                  <Label>Time remaining: </Label>
                  <span className='text-red-600'>{timeRemaining}</span> until
                  able to pong
                </p>
              )}
            </>
          )}

          <PingPongOutput
            transactions={transactions}
            pongAllowed={pongAllowed}
            timeRemaining={timeRemaining}
          />
        </OutputContainer>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex justify-start gap-2'>
          <Button
            disabled={!hasPing || hasPendingTransactions}
            onClick={onSendPingTransaction}
            data-testid='btnPingAbi'
            data-cy='transactionBtn'
            className='inline-block rounded-lg px-2 py-2 text-center text-sm hover:no-underline my-0 bg-btn-primary text-btn-primary hover:bg-btn-hover mr-0 disabled:bg-btn-secondary cursor-pointer disabled:cursor-not-allowed disabled:text-black'
          >
            <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
            Ping
          </Button>

          <Button
            disabled={!pongAllowed || hasPing || hasPendingTransactions}
            data-testid='btnPongAbi'
            data-cy='transactionBtn'
            onClick={onSendPongTransaction}
            className='inline-block rounded-lg px-3 py-2 text-center text-sm hover:no-underline my-0 bg-btn-primary text-btn-primary hover:bg-btn-hover mr-0 disabled:bg-btn-secondary cursor-pointer disabled:cursor-not-allowed disabled:text-black'
          >
            <FontAwesomeIcon icon={faArrowDown} className='mr-1' />
            Pong
          </Button>
        </div>
      </div>
    </div>
  );
};
