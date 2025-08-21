import { MvxTrim } from 'lib';
import {
  REACT_LINK,
  SDK_DAPP_PACKAGE_LINK,
  TYPESCRIPT_LINK
} from 'localConstants';

import { LinkComponent } from './components';

// prettier-ignore
const styles = {
  dashboardHeaderContainer: 'dashboard-header-container flex flex-col p-8 lg:p-10 justify-center items-center gap-6 self-stretch',
  dashboardHeaderTitle: 'dashboard-header-title text-primary transition-all duration-200 ease-out text-center text-3xl xs:text-5xl lg:text-6xl font-medium',
  dashboardHeaderDescription: 'dashboard-header-description text-secondary transition-all duration-200 ease-out text-center text-base xs:text-lg lg:text-xl font-medium'
} satisfies Record<string, string>;

export const DashboardHeader = () => (
  <div className={styles.dashboardHeaderContainer}>
    <div className={styles.dashboardHeaderTitle}>Welcome to dApp Template</div>

    <div
      className='text-xs sm:text-base'
      style={{
        padding: 24,
        border: '1px solid white',
        maxWidth: '100%',
        width: '100%',
        color: 'red'
      }}
    >
      <MvxTrim text='erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex' />
    </div>

    <div className={styles.dashboardHeaderDescription}>
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
