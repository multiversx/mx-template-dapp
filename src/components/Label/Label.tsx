import { PropsWithChildren } from 'react';

export const Label = ({ children }: PropsWithChildren) => {
  return (
    <label className='text-secondary text-sm font-normal'>{children}</label>
  );
};
