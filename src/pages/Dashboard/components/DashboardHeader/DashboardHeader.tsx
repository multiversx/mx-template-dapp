import {
  REACT_LINK,
  SDK_DAPP_PACKAGE_LINK,
  TYPESCRIPT_LINK
} from 'localConstants';

import { LinkComponent } from './components';

export const DashboardHeader = () => (
  <div className='flex flex-col p-8 lg:p-10 justify-center items-center gap-6 self-stretch'>
    <div className='text-primary transition-all duration-300 text-center text-3xl xs:text-5xl lg:text-6xl font-medium'>
      Welcome to dApp Template
    </div>

    <div className='text-secondary transition-all duration-300 text-center text-base xs:text-lg lg:text-xl font-medium'>
      <span>The MultiversX dApp Template, built using </span>
      <LinkComponent linkAddress={REACT_LINK}>React.js</LinkComponent>
      <span> and </span>
      <LinkComponent linkAddress={TYPESCRIPT_LINK}>Typescript</LinkComponent>.
      <span> It's a basic implementation of </span>
      <LinkComponent linkAddress={SDK_DAPP_PACKAGE_LINK}>
        @multiversx/sdk-dapp
      </LinkComponent>
      <span>
        , providing the basics for MultiversX authentication and TX signing.
      </span>
    </div>
  </div>
);
