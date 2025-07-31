import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { contractAddress } from 'config';
import { WidgetType } from 'types/widget.types';
import { DashboardHeader, LeftPanel } from './components';
import { Widget } from './components/Widget/Widget';
import {
  BatchTransactions,
  NativeAuth,
  PingPongAbi,
  PingPongRaw,
  PingPongService,
  SignMessage,
  Transactions
} from './widgets';

const WIDGETS: WidgetType[] = [
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
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTransactions'
  },
  {
    title: 'Transactions (Ping & Pong)',
    widget: Transactions,
    props: { receiver: contractAddress },
    description: 'List transactions filtered for a given Smart Contract',
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTransactions'
  }
];

export const Dashboard = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex w-screen min-h-screen relative border-t border-primary'>
      <div
        className={classNames(
          {
            'fixed bottom-0 left-0 right-0 z-50 max-h-full overflow-y-auto':
              !isDesktop
          },
          { flex: isDesktop }
        )}
      >
        <LeftPanel />
      </div>

      <div className='flex flex-col gap-6 justify-center items-center flex-1 w-full overflow-auto border-l border-primary p-4 lg:p-6'>
        <DashboardHeader />

        <div className='flex flex-col gap-6  w-full'>
          {WIDGETS.map((element) => (
            <Widget key={element.title} {...element} />
          ))}
        </div>
      </div>
    </div>
  );
};
