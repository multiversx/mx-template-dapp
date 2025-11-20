import {
  PingPongComponent,
  PingTransactionPayloadType
} from 'components/PingPongComponent';
import { useSendPingPongTransaction } from 'hooks';
import { useGetLoginInfo } from 'lib';
import { useGetTimeToPong } from '../PingPongAbi/hooks';
import { getPingTransaction } from './helpers/getPingTransaction';
import { getPongTransaction } from './helpers/getPongTransaction';

// The transactions are being done by directly requesting to template-dapp service
export const PingPongService = () => {
  const getTimeToPong = useGetTimeToPong();

  const { tokenLogin } = useGetLoginInfo();
  const { sendPingTransactionFromService, sendPongTransactionFromService } =
    useSendPingPongTransaction();

  const handlePingTransaction = async (payload: PingTransactionPayloadType) => {
    if (payload.transactions) {
      const sessionId = await sendPingTransactionFromService(
        payload.transactions
      );
      return sessionId;
    }
  };

  return (
    <PingPongComponent
      identifier='ping-pong-service'
      sendPingTransaction={handlePingTransaction}
      sendPongTransaction={sendPongTransactionFromService}
      getTimeToPong={getTimeToPong}
      getPingTransaction={getPingTransaction}
      getPongTransaction={getPongTransaction}
      tokenLogin={tokenLogin}
    />
  );
};
