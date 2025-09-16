import { PingPongComponent } from 'components';
import { useSendPingPongTransaction } from 'hooks';

import { useGetPingAmount, useGetTimeToPong } from './hooks';

export const PingPongAbi = () => {
  const getTimeToPong = useGetTimeToPong();
  const { sendPingTransactionFromAbi, sendPongTransactionFromAbi } =
    useSendPingPongTransaction();
  const pingAmount = useGetPingAmount();

  return (
    <PingPongComponent
      identifier='ping-pong-abi'
      sendPingTransaction={sendPingTransactionFromAbi}
      sendPongTransaction={sendPongTransactionFromAbi}
      getTimeToPong={getTimeToPong}
      pingAmount={pingAmount}
    />
  );
};
