import { PingPongComponent } from 'components';
import { useSendPingPongTransaction } from 'hooks';
import { useGetLoginInfo } from 'lib';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

import {
  useGetPingTransaction,
  useGetPongTransaction,
  useGetTimeToPong
} from './hooks';

// The transactions are being done by directly requesting to template-dapp service
export const PingPongService = () => {
  const { sendPingTransactionFromService, sendPongTransactionFromService } =
    useSendPingPongTransaction();
  const getTimeToPong = useGetTimeToPong();
  const getPingTransaction = useGetPingTransaction();
  const getPongTransaction = useGetPongTransaction();

  const { tokenLogin } = useGetLoginInfo();

  return (
    <PingPongComponent
      id={ItemsIdentifiersEnum.pingPongService}
      sendPingTransaction={sendPingTransactionFromService}
      sendPongTransaction={sendPongTransactionFromService}
      getTimeToPong={getTimeToPong}
      getPingTransaction={getPingTransaction}
      getPongTransaction={getPongTransaction}
      tokenLogin={tokenLogin}
    />
  );
};
