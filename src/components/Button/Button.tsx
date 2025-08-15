import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, PropsWithChildren } from 'react';

import { WithClassnameType } from 'types';

interface ButtonType extends WithClassnameType, PropsWithChildren {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  dataTestId?: string;
  dataCy?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: IconDefinition;
  iconClassName?: string;
  label?: string;
}

export const Button = ({
  onClick,
  disabled = false,
  type = 'button',
  id,
  className = 'inline-block rounded-lg px-2 py-1.5 text-center text-sm font-medium hover:no-underline my-0 bg-btn-primary transition-all duration-200 ease-out text-btn-primary hover:bg-btn-tertiary hover:text-black mr-0 disabled:bg-btn-tertiary cursor-pointer disabled:cursor-not-allowed disabled:text-black',
  icon,
  iconClassName = 'px-1.5',
  label,
  ...otherProps
}: ButtonType) => (
  <button
    id={id}
    {...otherProps}
    disabled={disabled}
    onClick={onClick}
    className={className}
    type={type}
  >
    {icon && <FontAwesomeIcon icon={icon} className={iconClassName} />}

    {label && <span className='px-1.5'>{label}</span>}
  </button>
);
