import { PingPongComponent } from 'components';
import { useSendPingPongTransaction } from 'hooks';

import { useGetPingAmount, useGetTimeToPong } from './hooks';

// Raw transaction are being done by directly requesting to API instead of calling the smartcontract
export const PingPongRaw = () => {
  const pingAmount = useGetPingAmount();
  const getTimeToPong = useGetTimeToPong();

  const { sendPingTransaction, sendPongTransaction } =
    useSendPingPongTransaction();

  return (
    <PingPongComponent
      identifier='ping-pong-raw'
      sendPingTransaction={sendPingTransaction}
      sendPongTransaction={sendPongTransaction}
      getTimeToPong={getTimeToPong}
      pingAmount={pingAmount}
    />
  );
};
