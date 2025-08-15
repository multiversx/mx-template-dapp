import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// prettier-ignore
const styles = {
  footer: 'footer mx-auto w-full max-w-prose py-4 text-center',
  footerContainer: 'footer-container flex flex-col font-medium items-center text-sm text-[#989898]',
  disclaimer: 'disclaimer text-neutral-500 text-sm py-3 px-4 hover:cursor-pointer hover:underline',
  footerDescription: 'footer-description flex items-center gap-1 text-sm hover:underline'
} satisfies Record<string, string>;

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContainer}>
      <a className={styles.disclaimer} href='/disclaimer'>
        Disclaimer
      </a>

      <div className={styles.footerDescription}>
        <FontAwesomeIcon icon={faCopyright} />

        <span> 2025 MultiversX. All rights reserved</span>
      </div>
    </div>
  </footer>
);
