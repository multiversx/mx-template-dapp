import { PropsWithChildren } from 'react';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { AuthRedirectWrapper } from 'wrappers';

// prettier-ignore
const styles = {
  layoutContainer: 'layout-container flex min-h-screen flex-col bg-accent transition-all duration-300',
  mainContainer: 'main-container flex flex-grow items-stretch justify-center'
} satisfies Record<string, string>;

export const Layout = ({ children }: PropsWithChildren) => (
  <div className={styles.layoutContainer}>
    <Header />

    <main className={styles.mainContainer}>
      <AuthRedirectWrapper>{children}</AuthRedirectWrapper>
    </main>
    <Footer />
  </div>
);
