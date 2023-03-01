import React, { ReactNode } from 'react';

interface SignMessageWrapperProps {
  children: ReactNode;
}

export const SignMessageWrapper = ({ children }: SignMessageWrapperProps) => {
  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='container py-4'>
        <div className='row'>
          <div className='col-12 col-md-10 mx-auto'>
            <div className='card p-3 shadow-sm border-0'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
