import { PropsWithChildren } from 'react';

// prettier-ignore
const styles = {
  linkAddress: 'dashboard-header-text-link underline hover:text-primary transition-all duration-200'
} satisfies Record<string, string>;

interface DashboardHeaderTextLinkPropsType extends PropsWithChildren {
  linkAddress: string;
}

export const DashboardHeaderTextLink = ({
  linkAddress,
  children
}: DashboardHeaderTextLinkPropsType) => (
  <a
    href={linkAddress}
    target='_blank'
    rel='noreferrer'
    className={styles.linkAddress}
  >
    {children}
  </a>
);
