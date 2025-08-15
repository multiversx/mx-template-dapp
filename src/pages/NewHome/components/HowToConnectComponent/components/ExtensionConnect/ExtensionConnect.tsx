import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, SVGProps } from 'react';

import ArcLogo from 'assets/img/arc-logo.svg?react';
import BraveLogo from 'assets/img/brave-logo.svg?react';
import ChromeLogo from 'assets/img/chrome-logo.svg?react';
import Circles from 'assets/img/circles.svg?react';
import extensionImage from 'assets/img/extension-image.png';
import FirefoxLogo from 'assets/img/firefox-logo.svg?react';
import WalletIcon from 'assets/img/web-wallet-icon.svg?react';

import { BrowserFrame } from './components';

// prettier-ignore
const styles = {
  extensionCardContainer: 'extension-card-container bg-secondary p-8 lg:p-10 lg:h-115 rounded-2xl lg:rounded-3xl flex flex-col lg:flex-row justify-between gap-10 w-full transition-all duration-200 ease-out',
  extensionCardContent: 'extension-card-content flex flex-col gap-10 max-w-120',
  extensionCardText: 'extension-card-text flex flex-col gap-4',
  extensionCardTitle: 'extension-card-title text-3xl text-primary font-medium tracking-[-0.96px] leading-[1] transition-all duration-200 ease-out',
  extensionCardDescription: 'extension-card-description text-secondary text-xl tracking-[-0.21px] leading-[1.5] transition-all duration-200 ease-out',
  extensionCardDownloadSection: 'extension-card-download-section flex items-center justify-between max-w-80',
  extensionCardLink: 'extension-card-link text-accent text-sm sm:text-lg font-semibold transition-all duration-200 ease-out',
  extensionCardLinkTitle: 'extension-card-link-title p-2 xs:p-3',
  extensionCardLogos: 'extension-card-logos flex gap-2.5 items-center',
  extensionCardImage: 'relative max-w-100 w-full',
  extensionCardCircles: 'extension-card-circles absolute -right-22 -top-10 z-50', 
  extensionCardScreen: 'extension-card-image absolute top-10 right-4'
} satisfies Record<string, string>;

interface BrowserLogo {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

const browserLogos: BrowserLogo[] = [
  { icon: ChromeLogo },
  { icon: FirefoxLogo },
  { icon: ArcLogo },
  { icon: BraveLogo }
];

export const ExtensionConnect = () => {
  const IconComponent = WalletIcon;
  return (
    <div className={styles.extensionCardContainer}>
      <div className={styles.extensionCardContent}>
        <IconComponent />

        <div className={styles.extensionCardText}>
          <h2 className={styles.extensionCardTitle}>
            MultiversX Wallet Extension
          </h2>

          <p className={styles.extensionCardDescription}>
            The MultiversX DeFi Wallet can be installed on Firefox, Chrome,
            Brave, and other chromium-based browsers. This extension is free and
            secure.
          </p>
        </div>

        <div className={styles.extensionCardDownloadSection}>
          <a href='' target='_blank' className={styles.extensionCardLink}>
            <span className={styles.extensionCardLinkTitle}>Get Extension</span>

            <FontAwesomeIcon icon={faArrowRight} />
          </a>

          <div className={styles.extensionCardLogos}>
            {browserLogos.map(({ icon: Icon }, index) => (
              <Icon key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.extensionCardImage}>
        <Circles className={styles.extensionCardCircles} />

        <BrowserFrame />

        <img src={extensionImage} className={styles.extensionCardScreen} />
      </div>
    </div>
  );
};
