import { PingPongComponent } from 'components';
import { useSendPingPongTransaction } from 'hooks';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

import { useGetPingAmount, useGetTimeToPong } from './hooks';

export const PingPongAbi = () => {
  const getTimeToPong = useGetTimeToPong();
  const { sendPingTransactionFromAbi, sendPongTransactionFromAbi } =
    useSendPingPongTransaction();
  const pingAmount = useGetPingAmount();

  return (
    <PingPongComponent
      id={ItemsIdentifiersEnum.pingPongAbi}
      sendPingTransaction={sendPingTransactionFromAbi}
      sendPongTransaction={sendPongTransactionFromAbi}
      getTimeToPong={getTimeToPong}
      pingAmount={pingAmount}
    />
  );
};
