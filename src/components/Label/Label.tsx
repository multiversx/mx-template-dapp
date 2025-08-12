import { PropsWithChildren } from 'react';

export const Label = ({ children }: PropsWithChildren) => (
  <label className='text-secondary transition-all duration-300 text-sm font-normal'>
    {children}
  </label>
);
