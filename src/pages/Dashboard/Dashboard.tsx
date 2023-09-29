import { Card } from 'components/Card';
import { contractAddress } from 'config';
import { AuthRedirectWrapper } from 'wrappers';
import {
  Account,
  PingPongAbi,
  SignMessage,
  NativeAuth,
  BatchTransactions,
  PingPongRaw,
  PingPongService,
  Transactions
} from './widgets';

type WidgetsType = {
  title: string;
  widget: (props: any) => JSX.Element;
  description?: string;
  props?: { receiver?: string };
  reference: string;
};

const WIDGETS: WidgetsType[] = [
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
      'https://docs.multiversx.com/sdk-and-tools/indices/es-index-transactions/'
  },
  {
    title: 'Ping & Pong (ABI)',
    widget: PingPongAbi,
    description:
      'Smart Contract interactions using the ABI generated transactions',
    reference:
      'https://docs.multiversx.com/sdk-and-tools/sdk-js/sdk-js-cookbook/#using-interaction-when-the-abi-is-available'
  },
  {
    title: 'Ping & Pong (Backend)',
    widget: PingPongService,
    description:
      'Smart Contract interactions using the backend generated transactions',
    reference: 'https://github.com/multiversx/mx-ping-pong-service'
  },
  {
    title: 'Sign message',
    widget: SignMessage,
    description: 'Message signing using the connected account',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account-1'
  },
  {
    title: 'Native auth',
    widget: NativeAuth,
    description:
      'A secure authentication token can be used to interact with the backend',
    reference: 'https://github.com/multiversx/mx-sdk-js-native-auth-server'
  },
  {
    title: 'Batch Transactions',
    widget: BatchTransactions,
    description:
      'For complex scenarios transactions can be sent in the desired group/sequence',
    reference:
      'https://github.com/multiversx/mx-sdk-dapp#sending-transactions-synchronously-in-batches'
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

export const Dashboard = () => (
  <AuthRedirectWrapper>
    <div className='flex flex-col gap-6 max-w-3xl w-full'>
      {WIDGETS.map((element) => {
        const {
          title,
          widget: MxWidget,
          description,
          props = {},
          reference
        } = element;

        return (
          <Card
            key={title}
            title={title}
            description={description}
            reference={reference}
          >
            <MxWidget {...props} />
          </Card>
        );
      })}
    </div>
  </AuthRedirectWrapper>
);
