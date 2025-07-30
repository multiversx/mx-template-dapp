import { PropsWithChildren } from 'react';
import { AuthRedirectWrapper } from 'wrappers';
import { Footer } from './Footer';
import { Header } from './Header';

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
