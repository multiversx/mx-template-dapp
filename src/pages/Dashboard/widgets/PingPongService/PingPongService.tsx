import { PingPongComponent, PingTransactionPayloadType } from 'components';
import { useSendPingPongTransaction } from 'hooks';
import { useGetLoginInfo } from 'lib';

import {
  useGetPingTransaction,
  useGetPongTransaction,
  useGetTimeToPong
} from './hooks';

// The transactions are being done by directly requesting to template-dapp service
export const PingPongService = () => {
  const getTimeToPong = useGetTimeToPong();
  const getPingTransaction = useGetPingTransaction();
  const getPongTransaction = useGetPongTransaction();

  const { tokenLogin } = useGetLoginInfo();
  const { sendPingTransactionFromService, sendPongTransactionFromService } =
    useSendPingPongTransaction();

  const handlePingTransaction = (payload: PingTransactionPayloadType) => {
    if (payload.transactions) {
      sendPingTransactionFromService(payload.transactions);
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
