import { PropsWithChildren } from 'react';

// prettier-ignore
const styles = {
  labelContainer: 'label-container text-secondary transition-all duration-300 text-sm font-normal'
} satisfies Record<string, string>;

export const Label = ({ children }: PropsWithChildren) => (
  <label className={styles.labelContainer}>{children}</label>
);
