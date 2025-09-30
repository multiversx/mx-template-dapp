import { PropsWithChildren } from 'react';

// prettier-ignore
const styles = {
  labelContainer: 'label-container text-secondary transition-all duration-200 ease-out text-sm font-normal'
} satisfies Record<string, string>;

export const Label = ({ children }: PropsWithChildren) => (
  <label className={styles.labelContainer}>{children}</label>
);
