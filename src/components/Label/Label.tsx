import { PropsWithChildren } from 'react';

export const Label = ({ children }: PropsWithChildren) => {
  return (
    <label className='text-secondary transition-all duration-300 text-sm font-normal'>
      {children}
    </label>
  );
};
