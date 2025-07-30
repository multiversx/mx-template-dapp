import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren } from 'react';
import { WithClassnameType } from 'types';

interface CardType extends PropsWithChildren, WithClassnameType {
  title: string;
  description?: string;
  reference: string;
  anchor?: string;
}

export const Card = (props: CardType) => {
  const { title, children, description, reference, anchor } = props;

  return (
    <div
      className='flex flex-col flex-1 rounded-xl bg-primary transition-all duration-300 p-6 justify-center border border-primary'
      data-testid={props['data-testid']}
      id={anchor}
    >
      <h2 className='flex justify-between items-center text-2xl font-medium group text-primary transition-all duration-300'>
        {title}
        <a
          href={reference}
          target='_blank'
          className='text-secondary transition-all duration-300'
        >
          <FontAwesomeIcon icon={faInfoCircle} className='w-3.5 h-3.5' />
        </a>
      </h2>
      {description && (
        <p className='text-secondary transition-all duration-300 mb-6 text-lg font-medium'>
          {description}
        </p>
      )}
      {children}
    </div>
  );
};
