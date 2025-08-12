import { PingPongComponent } from 'components';
import { useSendPingPongTransaction } from 'hooks';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

import { useGetPingAmount, useGetTimeToPong } from './hooks';

// Raw transaction are being done by directly requesting to API instead of calling the smartcontract
export const PingPongRaw = () => {
  const getTimeToPong = useGetTimeToPong();

  const { sendPingTransaction, sendPongTransaction } =
    useSendPingPongTransaction();

  const pingAmount = useGetPingAmount();

  return (
    <PingPongComponent
      id={ItemsIdentifiersEnum.pingPongRaw}
      sendPingTransaction={sendPingTransaction}
      sendPongTransaction={sendPongTransaction}
      getTimeToPong={getTimeToPong}
      pingAmount={pingAmount}
    />
  );
};
