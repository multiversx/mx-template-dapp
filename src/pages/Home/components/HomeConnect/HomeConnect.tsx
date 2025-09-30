// import { ReactComponent as PasskeyIcon } from 'assets/img/passkey-icon.svg';
import { ReactComponent as LedgerIcon } from 'assets/img/ledger-icon.svg';
import { ReactComponent as MetamaskIcon } from 'assets/img/metamask-icon.svg';
import { ReactComponent as WebWalletIcon } from 'assets/img/web-wallet-icon.svg';
import { ReactComponent as XPortalIcon } from 'assets/img/xportal-icon.svg';
import {
  CHROME_METAMASK_EXTENSION_LINK,
  FIREFOX_METAMASK_ADDON_LINK,
  GET_LEDGER,
  GET_XPORTAL
} from 'localConstants';
import { BrowserEnum, getDetectedBrowser, getNetworkConfig } from 'lib';
import { ConnectCard, ExtensionConnect } from './components';

// prettier-ignore
const styles = {
  howToConnectContainer: 'how-to-connect-container flex flex-col items-center w-full justify-center gap-16 lg:gap-20 px-2 lg:px-6 pb-2 lg:pb-6 pt-20 lg:pt-32 bg-primary rounded-4xl transition-all duration-200 ease-out',
  howToConnectHeader: 'how-to-connect-header flex flex-col gap-4 items-center justify-center',
  howToConnectTitle: 'how-to-connect-title text-primary text-center text-4xl xxs:text-5xl xs:text-6xl font-medium leading-[1] tracking-[-1.92px] transition-all duration-200 ease-out',
  howToConnectDescription: 'how-to-connect-description text-secondary text-xl leading-[1.5] tracking-[-0.21px] transition-all duration-200 ease-out',
  howToConnectContent: 'how-to-connect-content flex flex-col gap-6 items-center justify-center w-full',
  howToConnectContentCards: 'how-to-connect-content-cards grid grid-cols-1 items-stretch justify-center lg:grid-cols-3 gap-2 lg:gap-6'
} satisfies Record<string, string>;

const walletAddress = getNetworkConfig().network.walletAddress;
const detectedBrowser = getDetectedBrowser();
const isFirefox = detectedBrowser === BrowserEnum.Firefox;

const connectCards = [
  {
    icon: MetamaskIcon,
    title: 'Metamask Snap',
    description:
      'Explore the entire MultiversX ecosystem with Metamask! Securely manage, swap and transfer your assets.',
    linkTitle: 'Get Metamask',
    linkDownloadAddress: isFirefox
      ? FIREFOX_METAMASK_ADDON_LINK
      : CHROME_METAMASK_EXTENSION_LINK
  },
  // {
  //   icon: PasskeyIcon,
  //   title: 'Passkey',
  //   description:
  //     'Passkeys offer a more secure and user-friendly way to authenticate and sign transactions.',
  //   linkTitle: 'Get Passkey',
  //   linkDownloadAddress: walletAddress
  // },
  {
    icon: XPortalIcon,
    title: 'xPortal Wallet',
    description:
      'The easiest way to invest, spend globally with a crypto card and earn yield across DeFi and stablecoins.',
    linkTitle: 'Get xPortal',
    linkDownloadAddress: GET_XPORTAL
  },
  {
    icon: LedgerIcon,
    title: 'Ledger',
    description:
      'You can safely store your EGLD by installing the MultiversX EGLD app on your Ledger Nano S or Ledger Nano X device',
    linkTitle: 'Get Started',
    linkDownloadAddress: GET_LEDGER
  },
  {
    icon: WebWalletIcon,
    title: 'MultiversX Web Wallet',
    description:
      'Store, swap, and transfer tokens or NFTs. Connect to Web3 apps on MultiversX blockchain.',
    linkTitle: 'Get MultiversX Wallet',
    linkDownloadAddress: walletAddress
  }
];

export const HomeConnect = () => (
  <div className={styles.howToConnectContainer}>
    <div className={styles.howToConnectHeader}>
      <h1 className={styles.howToConnectTitle}>How can you connect</h1>

      <p className={styles.howToConnectDescription}>
        Choose your path, you must.
      </p>
    </div>

    <div className={styles.howToConnectContent}>
      <ExtensionConnect />

      <div className={styles.howToConnectContentCards}>
        {connectCards.map((card, index) => (
          <ConnectCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            linkTitle={card.linkTitle}
            linkDownloadAddress={card.linkDownloadAddress}
          />
        ))}
      </div>
    </div>
  </div>
);
