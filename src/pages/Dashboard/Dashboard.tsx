import { contractAddress } from 'config';
import { AuthRedirectWrapper } from 'wrappers';
import {
  Account,
  SignMessage,
  BatchTransactions,
  PingPongRaw,
  Transactions
} from './widgets';
import { useScrollToElement } from 'hooks';
import { Widget } from './components';
import { WidgetType } from 'types/widget.types';

const WIDGETS: WidgetType[] = [
  {
    title: 'Account',
    widget: Account,
    description: 'Connected account details',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account'
  },
  {
    title: 'Ping & Pong (Manual)',
    widget: PingPongRaw,
    description:
      'Smart Contract interactions using manually formulated transactions',
    reference:
      'https://docs.multiversx.com/sdk-and-tools/indices/es-index-transactions/',
    anchor: 'ping-pong-manual'
  },
  {
    title: 'Sign message',
    widget: SignMessage,
    description: 'Message signing using the connected account',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account-1',
    anchor: 'sign-message'
  },
  {
    title: 'Batch Transactions',
    widget: BatchTransactions,
    description:
      'For complex scenarios transactions can be sent in the desired group/sequence',
    reference:
      'https://github.com/multiversx/mx-sdk-dapp#sending-transactions-synchronously-in-batches',
    anchor: 'batch-transactions'
  },
  {
    title: 'Transactions (All)',
    widget: Transactions,
    description: 'List transactions for the connected account',
    reference:
      'https://api.elrond.com/#/accounts/AccountController_getAccountTransactions'
  },
  {
    title: 'Transactions (Ping & Pong)',
    widget: Transactions,
    props: { receiver: contractAddress },
    description: 'List transactions filtered for a given Smart Contract',
    reference:
      'https://api.elrond.com/#/accounts/AccountController_getAccountTransactions'
  }
];

export const Dashboard = () => {
  useScrollToElement();

  return (
    <AuthRedirectWrapper>
      <div className='flex flex-col gap-6 max-w-3xl w-full'>
        {WIDGETS.map((element) => (
          <Widget key={element.title} {...element} />
        ))}
      </div>
    </AuthRedirectWrapper>
  );
};
