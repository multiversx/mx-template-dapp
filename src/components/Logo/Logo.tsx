import classNames from 'classnames';

// prettier-ignore
const styles = {
  logo: 'logo flex items-center justify-center gap-3 cursor-pointer hover:opacity-75',
  logoIcon: 'logo-icon relative -bottom-0.75',
  logoIconEmpty: 'logo-icon-empty w-4 h-4 bg-accent border-2 border-logo z-1 relative transition-all duration-200 ease-in-out',
  logoIconFilled: 'logo-icon-filled w-4 h-4 bg-logo-primary absolute left-0.75 bottom-0.75 transition-all duration-200 ease-in-out',
  logoText: 'logo-text text-xl lg:text-2xl font-medium flex text-primary relative -top-0.5 leading-none transition-all duration-200 ease-in-out lg:top-0',
  logoTextHidden: 'logo-text-hidden hidden lg:!flex'
} satisfies Record<string, string>;

interface LogoPropsType {
  hideTextOnMobile?: boolean;
}

export const Logo = ({ hideTextOnMobile }: LogoPropsType) => (
  <div className={styles.logo}>
    <div className={styles.logoIcon}>
      <div className={styles.logoIconEmpty} />
      <div className={styles.logoIconFilled} />
    </div>

    <div
      className={classNames(styles.logoText, {
        [styles.logoTextHidden]: hideTextOnMobile
      })}
    >
      dApp Template
    </div>
  </div>
);
