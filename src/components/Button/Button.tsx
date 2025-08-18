import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { ComponentProps } from 'react';

// prettier-ignore
const styles = {
  button: 'button h-8 lg:h-10'
} satisfies Record<string, string>;

type ButtonProps = ComponentProps<typeof MvxButton>;

export const Button = ({ children, ...props }: ButtonProps) => (
  <MvxButton {...props} className={styles.button}>
    {children}
  </MvxButton>
);
