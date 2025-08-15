import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, SVGProps } from 'react';

import ArcLogo from 'assets/img/arc-logo.svg?react';
import BraveLogo from 'assets/img/brave-logo.svg?react';
import ChromeLogo from 'assets/img/chrome-logo.svg?react';
import extensionImage from 'assets/img/extension-image.png';
import FirefoxLogo from 'assets/img/firefox-logo.svg?react';
import WalletIcon from 'assets/img/web-wallet-icon.svg?react';

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
    <div className='bg-secondary p-8 lg:p-10 rounded-3xl flex flex-col lg:flex-row justify-between gap-10 w-full'>
      <div className='flex flex-col gap-10'>
        <IconComponent />

        <div className='flex flex-col gap-4'>
          <h2 className='text-3xl text-primary font-medium tracking-[-0.96px] leading-[1]'>
            MultiversX Wallet Extension
          </h2>

          <p className='text-secondary text-xl tracking-[-0.21px] leading-[1.5]'>
            The MultiversX DeFi Wallet can be installed on Firefox, Chrome,
            Brave, and other chromium-based browsers. This extension is free and
            secure.
          </p>
        </div>

        <div className='flex items-center justify-between max-w-80'>
          <a
            href=''
            target='_blank'
            className='text-accent text-sm xxs:text-lg font-semibold'
          >
            <span className='p-2 xxs::p-3'>Get Extension</span>

            <FontAwesomeIcon icon={faArrowRight} />
          </a>

          <div className='flex gap-2.5'>
            {browserLogos.map(({ icon: Icon }, index) => (
              <Icon key={index} />
            ))}
          </div>
        </div>
      </div>

      <img src={extensionImage} className='max-w-83 lg:max-w-117' />
    </div>
  );
};
