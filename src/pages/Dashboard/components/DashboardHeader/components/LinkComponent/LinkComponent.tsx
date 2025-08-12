import { PropsWithChildren } from 'react';

interface LinkComponentPropsType extends PropsWithChildren {
  linkAddress: string;
}

export const LinkComponent = ({
  linkAddress,
  children
}: LinkComponentPropsType) => (
  <a
    href={linkAddress}
    target='_blank'
    rel='noreferrer'
    className='underline hover:text-primary transition-all duration-300'
  >
    {children}
  </a>
);
