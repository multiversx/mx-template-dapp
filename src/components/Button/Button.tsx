import type { PropsWithChildren, MouseEvent } from 'react';
import { WithClassnameType } from 'types';

interface ButtonType extends WithClassnameType, PropsWithChildren {
  onClick: (e: MouseEvent) => void;
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
  dataTestId,
  dataCy,
  type = 'button',
  id,
  className = 'inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
}: ButtonType) => {
  return (
    <button
      id={id}
      data-cy={dataCy}
      data-test-id={dataTestId}
      disabled={disabled}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </button>
  );
};
