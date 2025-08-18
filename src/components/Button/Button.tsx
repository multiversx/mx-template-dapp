import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { MouseEvent, PropsWithChildren } from 'react';

// prettier-ignore
const styles = {
  button: 'button h-8 lg:h-10'
} satisfies Record<string, string>;

interface ButtonType extends PropsWithChildren {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
export const Button = ({ onClick, children }: ButtonType) => (
  <MvxButton onClick={onClick} className={styles.button}>
    {children}
  </MvxButton>
);
