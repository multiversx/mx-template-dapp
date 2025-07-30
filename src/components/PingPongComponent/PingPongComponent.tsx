import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TokenLoginType } from '@multiversx/sdk-dapp/out/types/login.types';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Button,
  Label,
  MissingNativeAuthError,
  OutputContainer,
  PingPongOutput
} from 'components';
import { contractAddress } from 'config';
import { getCountdownSeconds, setTimeRemaining } from 'helpers';
import {
  ACCOUNTS_ENDPOINT,
  CopyButton,
  getExplorerLink,
  MvxExplorerLink,
  Transaction,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'lib';
import { ItemsIdEnum } from 'pages/Dashboard/dashboard.types';

interface PingPongComponentPropsType {
  id: ItemsIdEnum;
  sendPingTransaction: (amount: any) => Promise<any>;
  sendPongTransaction: (transaction?: any) => Promise<any>;
  getTimeToPong: () => Promise<number | null | undefined>;
  pingAmount?: string;
  getPingTransaction?: () => Promise<Transaction | null>;
  getPongTransaction?: () => Promise<Transaction | null>;
  tokenLogin?: TokenLoginType | null;
}

export const PingPongComponent = ({
  id,
  sendPingTransaction,
  sendPongTransaction,
  getTimeToPong,
  pingAmount,
  getPingTransaction,
  getPongTransaction,
  tokenLogin
}: PingPongComponentPropsType) => {
  const { network } = useGetNetworkConfig();

  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const [hasPing, setHasPing] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const setSecondsRemaining = async () => {
    if (tokenLogin && !tokenLogin?.nativeAuthToken) {
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
    if (pingAmount) {
      await sendPingTransaction(pingAmount);
    } else if (getPingTransaction) {
      const pingTransaction = await getPingTransaction();

      if (!pingTransaction) {
        return;
      }

      await sendPingTransaction([pingTransaction]);
    }
  };

  const onSendPongTransaction = async () => {
    if (pingAmount) {
      await sendPongTransaction();
    } else if (getPongTransaction) {
      const pongTransaction = await getPongTransaction();

      if (!pongTransaction) {
        return;
      }

      await sendPongTransaction([pongTransaction]);
    }
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

  const explorerAddress = network.explorerAddress;
  const explorerLink = getExplorerLink({
    to: `/${ACCOUNTS_ENDPOINT}/${contractAddress}`,
    explorerAddress
  });

  if (tokenLogin && !tokenLogin?.nativeAuthToken) {
    return <MissingNativeAuthError />;
  }

  return (
    <div id={id} className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Label>Contract: </Label>

        <OutputContainer>
          {!hasPendingTransactions && (
            <>
              <div className='flex justify-between items-center'>
                {contractAddress}

                <div className='flex gap-1 text-primary transition-all duration-300'>
                  <CopyButton />

                  <MvxExplorerLink link={explorerLink} />
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
            data-cy='transactionBtn'
          >
            <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
            Ping
          </Button>

          <Button
            disabled={!pongAllowed || hasPing || hasPendingTransactions}
            data-cy='transactionBtn'
            onClick={onSendPongTransaction}
          >
            <FontAwesomeIcon icon={faArrowDown} className='mr-1' />
            Pong
          </Button>
        </div>
      </div>
    </div>
  );
};
