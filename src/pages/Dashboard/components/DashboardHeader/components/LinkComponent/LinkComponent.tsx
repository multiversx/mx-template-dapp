import { PropsWithChildren } from 'react';

// prettier-ignore
const styles = {
  linkAddress: 'link-address underline hover:text-primary transition-all duration-200 ease-out'
} satisfies Record<string, string>;

interface LinkComponentPropsType extends PropsWithChildren {
  linkAddress: string;
}

export const LinkComponent = ({
  linkAddress,
  children
}: LinkComponentPropsType) => (
  <a
    href={linkAddress}
    target='_blank'
    rel='noreferrer'
    className={styles.linkAddress}
  >
    {children}
  </a>
);
