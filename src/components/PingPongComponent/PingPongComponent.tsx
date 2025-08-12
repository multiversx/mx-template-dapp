import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { TokenLoginType } from '@multiversx/sdk-dapp/out/types/login.types';
import moment from 'moment';
import { useEffect, useState } from 'react';

import {
  AddressComponent,
  Button,
  Label,
  MissingNativeAuthError,
  OutputContainer,
  PingPongOutput
} from 'components';
import { contractAddress } from 'config';
import { getCountdownSeconds, setTimeRemaining } from 'helpers';
import { Transaction, useGetPendingTransactions } from 'lib';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

// prettier-ignore
const styles = {
  pingPongContainer: 'ping-pong-container flex flex-col gap-6',
  infosContainer: 'infos-container flex flex-col gap-2',
  addressComponent: 'address-component flex justify-between items-center gap-3',
  timeRemaining: 'text-red-600',
  buttonsContainer: 'buttons-container flex flex-col gap-2',
  buttons: 'buttons flex justify-start gap-2'
} satisfies Record<string, string>;

interface PingPongComponentPropsType {
  id: ItemsIdentifiersEnum;
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

  if (tokenLogin && !tokenLogin?.nativeAuthToken) {
    return <MissingNativeAuthError />;
  }

  return (
    <div id={id} className={styles.pingPongContainer}>
      <div className={styles.infosContainer}>
        <Label>Contract: </Label>

        <OutputContainer>
          {!hasPendingTransactions && (
            <>
              <div className={styles.addressComponent}>
                <AddressComponent address={contractAddress} />
              </div>

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
            transactions={transactions}
            pongAllowed={pongAllowed}
            timeRemaining={timeRemaining}
          />
        </OutputContainer>
      </div>

      <div className={styles.buttonsContainer}>
        <div className={styles.buttons}>
          <Button
            disabled={!hasPing || hasPendingTransactions}
            onClick={onSendPingTransaction}
            data-cy='transactionBtn'
            icon={faArrowUp}
            label='Ping'
          />

          <Button
            disabled={!pongAllowed || hasPing || hasPendingTransactions}
            data-cy='transactionBtn'
            onClick={onSendPongTransaction}
            icon={faArrowDown}
            label='Pong'
          />
        </div>
      </div>
    </div>
  );
};
