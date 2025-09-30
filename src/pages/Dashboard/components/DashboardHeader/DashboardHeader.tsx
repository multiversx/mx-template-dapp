import {
  REACT_LINK,
  SDK_DAPP_PACKAGE_LINK,
  TYPESCRIPT_LINK
} from 'localConstants';

import { DashboardHeaderTextLink } from './components/DashboardHeaderTextLink';

// prettier-ignore
const styles = {
  dashboardHeaderContainer: 'dashboard-header-container flex flex-col p-8 lg:p-10 justify-center items-center gap-6 self-stretch',
  dashboardHeaderTitle: 'dashboard-header-title text-primary transition-all duration-300 text-center text-3xl xs:text-5xl lg:text-6xl font-medium',
  dashboardHeaderDescription: 'dashboard-header-description text-secondary transition-all duration-300 text-center text-base xs:text-lg lg:text-xl font-medium',
  dashboardHeaderDescriptionText: 'dashboard-header-description-text mx-1'
} satisfies Record<string, string>;

export const DashboardHeader = () => (
  <div className={styles.dashboardHeaderContainer}>
    <div className={styles.dashboardHeaderTitle}>Welcome to dApp Template</div>

    <div className={styles.dashboardHeaderDescription}>
      <span className={styles.dashboardHeaderDescriptionText}>
        The MultiversX dApp Template, built using the
      </span>

      <DashboardHeaderTextLink linkAddress={REACT_LINK}>
        React.js
      </DashboardHeaderTextLink>

      <span className={styles.dashboardHeaderDescriptionText}>and</span>
      <DashboardHeaderTextLink linkAddress={TYPESCRIPT_LINK}>
        TypeScript
      </DashboardHeaderTextLink>

      <span className={styles.dashboardHeaderDescriptionText}>
        technologies, is a basic implementation of
      </span>

      <DashboardHeaderTextLink linkAddress={SDK_DAPP_PACKAGE_LINK}>
        @multiversx/sdk-dapp
      </DashboardHeaderTextLink>

      <span className={styles.dashboardHeaderDescriptionText}>
        package, providing the basics for MultiversX authentication and TX
        signing.
      </span>
    </div>
  </div>
);
