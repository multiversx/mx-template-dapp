import { ComponentProps } from 'react';

import { MvxButton } from 'lib';

// prettier-ignore
const styles = {
  button: 'button h-8 lg:h-10'
} satisfies Record<string, string>;

export const Button = ({
  children,
  ...props
}: ComponentProps<typeof MvxButton>) => (
  <MvxButton {...props} className={styles.button}>
    {children}
  </MvxButton>
);
