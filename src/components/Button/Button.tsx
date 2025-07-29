import { MouseEvent, PropsWithChildren } from 'react';
import { WithClassnameType } from 'types';

interface ButtonType extends WithClassnameType, PropsWithChildren {
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  dataTestId?: string;
  dataCy?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  id,
  className = 'inline-block rounded-lg px-2 py-2 text-center text-sm hover:no-underline my-0 bg-btn-primary text-btn-primary hover:bg-btn-secondary hover:text-black mr-0 disabled:bg-btn-secondary cursor-pointer disabled:cursor-not-allowed disabled:text-black',
  ...otherProps
}: ButtonType) => {
  return (
    <button
      id={id}
      {...otherProps}
      disabled={disabled}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </button>
  );
};
