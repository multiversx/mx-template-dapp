import type { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { AuthRedirectWrapper } from 'wrappers';

export const Layout = ({ children }: PropsWithChildren) => {
  const { search } = useLocation();
  return (
    <div className='flex min-h-screen flex-col bg-slate-200'>
      <Header />
      <main className='flex flex-grow items-stretch justify-center p-6'>
        <AuthRedirectWrapper>{children}</AuthRedirectWrapper>
      </main>
      <Footer />
    </div>
  );
};
