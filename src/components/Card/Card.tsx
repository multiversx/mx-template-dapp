import type { PropsWithChildren } from 'react';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      className='flex flex-col flex-1 rounded-xl bg-white p-6 justify-center'
      data-testid={props['data-testid']}
      id={anchor}
    >
      <h2 className='flex text-xl font-medium group'>
        {title}
        <a
          href={reference}
          target='_blank'
          className='hidden group-hover:block ml-2 text-blue-600'
        >
          <FontAwesomeIcon icon={faInfoCircle} size='sm' />
        </a>
      </h2>
      {description && <p className='text-gray-400 mb-6'>{description}</p>}
      {children}
    </div>
  );
};
