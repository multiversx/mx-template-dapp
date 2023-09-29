import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TRANSACTIONS_ENDPOINT } from '@multiversx/sdk-dapp/apiCalls/endpoints';
import { Label } from 'components/Label';
import { ExplorerLink } from 'components/sdkDappComponents';
import { useGetNetworkConfig } from 'hooks';
import { getTransactionUrl, useTransactionOutcome } from './helpers';

export const Transaction = () => {
  const { network } = useGetNetworkConfig();

  const transactionUrl = getTransactionUrl(network.walletAddress);

  const txData = useTransactionOutcome();

  return (
    <div className='flex flex-col gap-2 text-sm'>
      <a
        href={transactionUrl}
        className='inline-block self-start rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
      >
        <FontAwesomeIcon icon={faPaperPlane} className='mr-1' />
        Send transaction
      </a>

      {txData.status && (
        <p>
          <Label>Transaction status:</Label> {txData.status}
        </p>
      )}
      {txData.address && (
        <p>
          <Label>Sender:</Label> {txData.address}
        </p>
      )}
      {txData.txHash && (
        <p>
          <Label>Hash:</Label>
          <ExplorerLink
            page={`/${TRANSACTIONS_ENDPOINT}/${txData.txHash}`}
            className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
          >
            {txData.txHash}
          </ExplorerLink>
        </p>
      )}
    </div>
  );
};
