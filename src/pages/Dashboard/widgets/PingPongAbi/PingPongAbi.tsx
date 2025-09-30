import { PingPongComponent, PingTransactionPayloadType } from 'components';
import { useSendPingPongTransaction } from 'hooks';

import { useGetPingAmount, useGetTimeToPong } from './hooks';

export const PingPongAbi = () => {
  const getTimeToPong = useGetTimeToPong();
  const { sendPingTransactionFromAbi, sendPongTransactionFromAbi } =
    useSendPingPongTransaction();
  const pingAmount = useGetPingAmount();

  const handlePingTransaction = async (payload: PingTransactionPayloadType) => {
    if (payload.amount) {
      const sessionId = await sendPingTransactionFromAbi(payload.amount);
      return sessionId;
    }
  };

  return (
    <PingPongComponent
      identifier='ping-pong-abi'
      sendPingTransaction={handlePingTransaction}
      sendPongTransaction={sendPongTransactionFromAbi}
      getTimeToPong={getTimeToPong}
      pingAmount={pingAmount}
    />
  );
};
