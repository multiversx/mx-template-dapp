import { PingPongComponent, PingTransactionPayloadType } from 'components';
import { useSendPingPongTransaction } from 'hooks';

import { useGetPingAmount, useGetTimeToPong } from './hooks';

// Raw transaction are being done by directly requesting to API instead of calling the smartcontract
export const PingPongRaw = () => {
  const pingAmount = useGetPingAmount();
  const getTimeToPong = useGetTimeToPong();

  const { sendPingTransaction, sendPongTransaction } =
    useSendPingPongTransaction();

  const handlePingTransaction = async (payload: PingTransactionPayloadType) => {
    if (payload.amount) {
      const sessionId = await sendPingTransaction(payload.amount);
      return sessionId;
    }
  };

  return (
    <PingPongComponent
      identifier='ping-pong-raw'
      sendPingTransaction={handlePingTransaction}
      sendPongTransaction={sendPongTransaction}
      getTimeToPong={getTimeToPong}
      pingAmount={pingAmount}
    />
  );
};
