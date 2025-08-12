import HeartIcon from 'assets/img/heart.svg?react';

// prettier-ignore
const styles = {
  footer: 'footer mx-auto w-full max-w-prose py-4 text-center text-gray-400',
  footerContainer: 'footer-container flex flex-col items-center text sm text-gray-400',
  disclaimer: 'disclaimer text-gray-400 text-sm py-3 px-4 hover:cursor-pointer hover:underline',
  footerDescription: 'footer-description flex items-center text-sm hover:underline'
} satisfies Record<string, string>;

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContainer}>
      <a className={styles.disclaimer} href='/disclaimer'>
        Disclaimer
      </a>

      <a
        target='_blank'
        className={styles.footerDescription}
        href='https://multiversx.com/'
      >
        Made with <HeartIcon className='mx-1 fill-gray-400' /> by the MultiversX
        team
      </a>
    </div>
  </footer>
);
