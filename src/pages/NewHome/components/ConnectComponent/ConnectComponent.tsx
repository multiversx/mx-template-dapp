import LedgerIcon from 'assets/img/ledger-icon.svg?react';
import MetamaskIcon from 'assets/img/metamask-icon.svg?react';
import PasskeyIcon from 'assets/img/passkey-icon.svg?react';
import WebWalletIcon from 'assets/img/web-wallet-icon.svg?react';
import XAliasIcon from 'assets/img/xalias-icon.svg?react';
import XPortalIcon from 'assets/img/xportal-icon.svg?react';
import { ConnectCard } from 'components/ConnectCard';
import { ExtensionConnect } from '../ExtensionConnect';

const connectCards = [
  {
    icon: MetamaskIcon,
    title: 'Metamask Snap',
    description:
      'Explore the entire MultiversX ecosystem with Metamask! Securely manage, swap and transfer your assets.',
    linkTitle: 'Get Metamask',
    linkDownloadAddress: ''
  },
  {
    icon: PasskeyIcon,
    title: 'Passkey',
    description:
      'Passkeys offer a more secure and user-friendly way to authenticate and sign transactions.',
    linkTitle: 'Get Passkey',
    linkDownloadAddress: ''
  },
  {
    icon: XPortalIcon,
    title: 'xPortal Wallet',
    description:
      'The easiest way to invest, spend globally with a crypto card and earn yield across DeFi and stablecoins.',
    linkTitle: 'Get xPortal',
    linkDownloadAddress: ''
  },
  {
    icon: LedgerIcon,
    title: 'Ledger',
    description:
      'You can safely store your EGLD by installing the MultiversX EGLD app on your Ledger Nano S or Ledger Nano X device',
    linkTitle: 'Get Started',
    linkDownloadAddress: ''
  },
  {
    icon: WebWalletIcon,
    title: 'MultiversX Web Wallet',
    description:
      'Store, swap, and transfer tokens or NFTs. Connect to Web3 apps on MultiversX blockchain.',
    linkTitle: 'Get MultiversX Wallet',
    linkDownloadAddress: ''
  },
  {
    icon: XAliasIcon,
    title: 'xAlias',
    description:
      'xAlias offers one-click login and wallet creation using your Google email.',
    linkTitle: 'Get xAlias',
    linkDownloadAddress: ''
  }
];

export const ConnectComponent = () => {
  return (
    <div className='flex flex-col gap-20 px-6 pb-6 pt-32 bg-primary rounded-4xl'>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className='text-primary text-6xl font-medium leading-[1] tracking-[-1.92px]'>
          How can you connect
        </h1>

        <p className='text-secondary text-xl leading-[1.5] tracking-[-0.21px]'>
          Choose your path, you must.
        </p>
      </div>

      <div className='flex flex-col gap-6'>
        <ExtensionConnect />

        <div className='grid grid-cols-3 gap-6'>
          {connectCards.map((card, index) => (
            <ConnectCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              linkTitle={card.linkTitle}
              linkDownloadAddress={card.linkTitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
