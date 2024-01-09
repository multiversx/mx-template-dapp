import { useEffect, useState } from 'react';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountProvider } from '@multiversx/sdk-dapp/hooks/account/useGetAccountProvider';
import { newTransaction } from '@multiversx/sdk-dapp/models/newTransaction';
import { transformTransactionsToSign } from './transformTransactionsToSign';
import axios from 'axios';
import moment from 'moment';
import { Button } from 'components/Button';
import { ContractAddress } from 'components/ContractAddress';
import { Label } from 'components/Label';
import { OutputContainer, PingPongOutput } from 'components/OutputContainer';
import {
  getCountdownSeconds,
  sendTransactions,
  setTimeRemaining
} from 'helpers';
import {
  useGetAccount,
  useGetPendingTransactions,
  useSendPingPongTransaction
} from 'hooks';
import { SessionEnum } from 'localConstants';
import { SignedTransactionType } from 'types';
import { useGetTimeToPong, useGetPingAmount } from './hooks';
import { SimpleTransactionType } from '@multiversx/sdk-dapp/types';
//@ts-ignore
import { buildAxiosFetch }  from "axios-fetch";

//@ts-ignore
const axiosInstance = axios.create();
axiosInstance.defaults.headers.common['BASIC'] = 'AUTH_TOKEN';


const fetch = buildAxiosFetch(axiosInstance);

// Raw transaction are being done by directly requesting to API instead of calling the smartcontract
export const PingPongRaw = () => {
  const getTimeToPong = useGetTimeToPong();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { sendPingTransaction, sendPongTransaction, transactionStatus } =
    useSendPingPongTransaction(SessionEnum.rawPingPongSessionId);
  const pingAmount = useGetPingAmount();
  const { address } = useGetAccount();

  const [stateTransactions, setStateTransactions] = useState<
    SignedTransactionType[] | null
  >(null);
  const [hasPing, setHasPing] = useState<boolean>(true);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const { provider } = useGetAccountProvider();
  const [triggerCall, setTriggerCall] = useState(0);

  const setSecondsRemaining = async () => {
    const secondsRemaining = await getTimeToPong();
    const { canPing, timeRemaining } = setTimeRemaining(secondsRemaining);

    setHasPing(canPing);
    if (timeRemaining && timeRemaining >= 0) {
      setSecondsLeft(timeRemaining);
    }
  };

  const onSendPingTransaction = async () => {
    await sendPingTransaction(pingAmount);
  };

  const onSendPongTransaction = async () => {
    await sendPongTransaction();
  };

  const timeRemaining = moment()
    .startOf('day')
    .seconds(secondsLeft ?? 0)
    .format('mm:ss');

  const pongAllowed = secondsLeft === 0;

  const sendToSelf = async () => {
    const pingTransaction = {
      value: '0',
      receiver: address,
      data: 'self',
      gas: 1000000
    };

    const { sessionId } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      }
    });
  };

  const sendToMySelfOK = async () => {
    const pingTransaction = {
      value: '0',
      nonce: 0,
      gasLimit: 1000000,
      gasPrice: 1000000000000,
      chainID: 'D',
      receiver: address,
      data: 'self',
      gas: 1000000
    };

    const tx = newTransaction(pingTransaction);

    const signed = await provider.signTransactions([tx]);

    console.log(signed);
  };

  const sendToMySelfNotOK = async () => {
    const pingTransaction = {
      value: '0',
      receiver: address,
      data: 'self',
      gas: 1000000
    };

    const transactionsPayload = Array.isArray(pingTransaction)
      ? pingTransaction
      : [pingTransaction];

    const transactionsToSign: any = await transformTransactionsToSign({
      transactions: transactionsPayload as SimpleTransactionType[],
      minGasLimit: undefined
    });

    console.log(transactionsToSign);

    const signed = await provider.signTransactions(transactionsToSign);

    console.log(signed);
  };

  const makeCall = async () => {
    const url =
      'https://devnet-api.multiversx.com/accounts/erd1c26jzneqwlfcddqre05jh53lnmyj5n8925k0r7gcqkaphr23nnpss0j540?withGuardianInfo=true';



    const account: any = (await fetch(url));
    const asd = await account.json();
    console.log(asd);
    
    setTriggerCall(Date.now());
  };

  useEffect(() => {
    if (triggerCall !== 0) {
      setTimeout(() => {
        sendToMySelfNotOK();
      }, 1000);
    }
  }, [triggerCall]);

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
          <Button onClick={sendToSelf}>
            <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
            Send to self
          </Button>
          <Button onClick={sendToMySelfOK}>
            <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
            Send to myself ✅
          </Button>
          <Button onClick={makeCall}>
            <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
            Send to myself 🚫
          </Button>
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
