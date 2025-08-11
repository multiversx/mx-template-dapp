import { PropsWithChildren } from 'react';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { AuthRedirectWrapper } from 'wrappers';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-screen flex-col bg-accent transition-all duration-300'>
      <Header />

      <main className='flex flex-grow items-stretch justify-center'>
        <AuthRedirectWrapper>{children}</AuthRedirectWrapper>
      </main>
      <Footer />
    </div>
  );
};
