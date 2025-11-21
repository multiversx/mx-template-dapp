import {
  PingPongComponent,
  PingTransactionPayloadType
} from 'components/PingPongComponent';
import { useSendPingPongTransaction } from 'hooks';
import { getTimeToPong } from '../PingPongService/helpers/getTimeToPong';
import { useGetPingAmount } from './hooks';

export const PingPongAbi = () => {
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
