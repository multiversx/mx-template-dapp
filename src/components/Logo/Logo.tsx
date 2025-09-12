import classNames from 'classnames';

// prettier-ignore
const styles = {
  logo: 'logo flex items-center justify-center gap-3',
  logoIcon: 'logo-icon relative -bottom-0.75',
  logoIconEmpty: 'logo-icon-empty w-4 h-4 bg-logo-secondary border-2 border-logo z-1 relative',
  logoIconFilled: 'logo-icon-filled w-4 h-4 bg-logo-primary absolute left-0.75 bottom-0.75',
  logoText: 'logo-text text-xl lg:text-2xl font-medium flex text-primary relative -top-0.5 leading-none',
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
