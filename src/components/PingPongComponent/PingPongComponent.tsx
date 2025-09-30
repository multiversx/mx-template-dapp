import { useEffect, useState } from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TokenLoginType } from '@multiversx/sdk-dapp/out/types/login.types';
import moment from 'moment';

import {
  Label,
  MissingNativeAuthError,
  OutputContainer,
  PingPongOutput
} from 'components';
import { contractAddress } from 'config';
import { getCountdownSeconds, setTimeRemaining } from 'helpers';
import {
  MvxButton,
  MvxDataWithExplorerLink,
  useGetNetworkConfig,
  useGetPendingTransactionsSessions
} from 'lib';
import { ACCOUNTS_ENDPOINT, Transaction, useGetPendingTransactions } from 'lib';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

// prettier-ignore
const styles = {
  pingPongContainer: 'ping-pong-container flex flex-col gap-6',
  infosContainer: 'infos-container flex flex-col gap-2',
  addressComponent: 'address-component flex w-full justify-between',
  timeRemaining: 'time-remaining text-red-600',
  buttonsContainer: 'buttons-container flex flex-col gap-2',
  buttons: 'buttons flex justify-start gap-2',
  buttonContent: 'button-content text-sm font-normal'
} satisfies Record<string, string>;

export interface PingTransactionPayloadType {
  amount?: string;
  transactions?: Transaction[];
}

interface PingPongComponentPropsType {
  identifier: `${ItemsIdentifiersEnum}`;
  sendPingTransaction: (
    payload: PingTransactionPayloadType
  ) => Promise<string | undefined>;
  sendPongTransaction: (
    transactions?: Transaction[]
  ) => Promise<string | undefined>;
  getTimeToPong: () => Promise<number | null | undefined>;
  pingAmount?: string;
  getPingTransaction?: () => Promise<Transaction | null>;
  getPongTransaction?: () => Promise<Transaction | null>;
  tokenLogin?: TokenLoginType | null;
}

export const PingPongComponent = ({
  identifier,
  sendPingTransaction,
  sendPongTransaction,
  getTimeToPong,
  pingAmount,
  getPingTransaction,
  getPongTransaction,
  tokenLogin
}: PingPongComponentPropsType) => {
  const { network } = useGetNetworkConfig();
  const [currentSessionId, setCurrentSessionId] = useState<string>();
  const transactions = useGetPendingTransactions();
  const pendingSession = useGetPendingTransactionsSessions();
  const [sessionId] = Object.keys(pendingSession);
  const pingPongTransactions =
    currentSessionId === sessionId ? transactions : [];
  const hasPendingTransactions = pingPongTransactions.length > 0;
  const explorerAddress = network.explorerAddress;

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
      const sessionId = await sendPingTransaction({ amount: pingAmount });
      setCurrentSessionId(sessionId);
      return;
    }

    if (!getPingTransaction) {
      return;
    }

    const pingTransaction = await getPingTransaction();

    if (!pingTransaction) {
      return;
    }

    const sessionId = await sendPingTransaction({
      transactions: [pingTransaction]
    });
    setCurrentSessionId(sessionId);
  };

  const onSendPongTransaction = async () => {
    if (pingAmount) {
      const sessionId = await sendPongTransaction();
      setCurrentSessionId(sessionId);
      return;
    }

    if (!getPongTransaction) {
      return;
    }

    const pongTransaction = await getPongTransaction();

    if (!pongTransaction) {
      return;
    }

    const sessionId = await sendPongTransaction([pongTransaction]);
    setCurrentSessionId(sessionId);
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

  if (tokenLogin && !tokenLogin?.nativeAuthToken) {
    return <MissingNativeAuthError />;
  }

  return (
    <div id={identifier} className={styles.pingPongContainer}>
      <div className={styles.infosContainer}>
        <Label>Contract: </Label>

        <OutputContainer>
          {!hasPendingTransactions && (
            <>
              <MvxDataWithExplorerLink
                withTooltip={true}
                data={contractAddress}
                className={styles.addressComponent}
                explorerLink={`${explorerAddress}/${ACCOUNTS_ENDPOINT}/${contractAddress}`}
              />

              {!pongAllowed && (
                <p>
                  <Label>Time remaining: </Label>
                  <span className={styles.timeRemaining}>{timeRemaining}</span>

                  <span> until able to pong</span>
                </p>
              )}
            </>
          )}

          <PingPongOutput
            transactions={pingPongTransactions}
            pongAllowed={pongAllowed}
            timeRemaining={timeRemaining}
          />
        </OutputContainer>
      </div>

      <div className={styles.buttonsContainer}>
        <div className={styles.buttons}>
          <MvxButton
            data-testid='btnPing'
            disabled={!hasPing || hasPendingTransactions}
            onClick={onSendPingTransaction}
            size='small'
          >
            <FontAwesomeIcon
              icon={faArrowUp}
              className={styles.buttonContent}
            />

            <span className={styles.buttonContent}>Ping</span>
          </MvxButton>

          <MvxButton
            data-testid='btnPong'
            disabled={!pongAllowed || hasPing || hasPendingTransactions}
            onClick={onSendPongTransaction}
            size='small'
          >
            <FontAwesomeIcon
              icon={faArrowDown}
              className={styles.buttonContent}
            />

            <span className={styles.buttonContent}>Pong</span>
          </MvxButton>
        </div>
      </div>
    </div>
  );
};
