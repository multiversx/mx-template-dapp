import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
  FunctionComponent,
  MouseEvent,
  SVGProps,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';

import brightLightIcon from 'assets/img/bright-light-icon.svg?react';
import tealLabIcon from 'assets/img/teal-lab-icon.svg?react';
import vibeModeIcon from 'assets/img/vibe-mode-icon.svg?react';
import { Button } from 'components';
import { RouteNamesEnum } from 'localConstants';

// prettier-ignore
const styles = {
  heroContainer: 'hero-container flex flex-col items-center justify-between w-full lg:h-160 rounded-3xl bg-cover bg-no-repeat bg-center p-8 lg:p-20 border border-secondary backdrop-blur-md transition-all duration-200 ease-out',
  heroSectionTop: 'hero-section-top flex flex-col items-start lg:items-center justify-center gap-10',
  heroSectionTopContent: 'hero-section-top-content flex flex-col lg:items-center justify-center gap-6',
  heroTitle: 'hero-title !text-primary text-[42px] lg:text-[84px] font-medium leading-[1] tracking-[-2.52px] transition-all duration-200 ease-out',
  heroDescription: 'hero-description text-secondary text-xl lg:text-2xl lg:text-center leading-[1.5] tracking-[-0.24px] max-w-138 transition-all duration-200 ease-out',
  heroSectionTopButtons: 'hero-section-top-buttons flex flex-col lg:flex-row items-start lg:items-center justify-start gap-6',
  heroSectionTopDocButton: 'hero-section-top-doc-button bg-btn-secondary hover:bg-btn-primary rounded-xl transition-all duration-200 ease-out',
  heroSectionBottom: 'hero-section-bottom hidden lg:!flex gap-6',
  heroSectionBottomThemeOptions: 'hero-section-bottom-theme-options text-primary opacity-60 hover:opacity-100 flex flex-col items-center gap-2 w-20 relative cursor-pointer transition-all duration-200 ease-out',
  heroSectionBottomThemeOptionsOpacityFull: 'opacity-100',
  heroSectionBottomThemeOption: 'hero-section-bottom-theme-option flex flex-col items-center gap-1 relative',
  themeOptionIcon: 'theme-option-icon fill-primary',
  themeOptionTitle: 'theme-option-title text-primary transition-all duration-200 ease-out',
  themeOptionActiveDot: 'theme-option-active-dot w-2 h-2 rounded-full bg-tertiary transition-all duration-200 ease-out',
  themeOptionActiveLabel: 'theme-option-active-label flex items-center justify-center px-1 absolute -top-1.5 left-10 z-10 text-xs text-accent uppercase bg-accent border border-accent rounded-md transition-all duration-200 ease-out'
} satisfies Record<string, string>;

interface ThemeOptionType {
  identifier: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
  label: string;
  backgroundClass: string;
}

const themeOptions: ThemeOptionType[] = [
  {
    identifier: 'mvx:dark-theme',
    icon: tealLabIcon,
    title: 'TealLab',
    label: 'Customizable',
    backgroundClass: 'bg-dark-theme'
  },
  {
    identifier: 'mvx:vibe-theme',
    icon: vibeModeIcon,
    title: 'VibeMode',
    label: 'Vibrant',
    backgroundClass: 'bg-vibe-theme'
  },
  {
    identifier: 'mvx:light-theme',
    icon: brightLightIcon,
    title: 'BrightLight',
    label: 'Ownable',
    backgroundClass: 'bg-light-theme'
  }
];

export const HeroComponent = () => {
  const [rootTheme, setRootTheme] = useState(
    document.documentElement.getAttribute('data-mvx-theme')
  );

  const navigate = useNavigate();

  const handleLogIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(RouteNamesEnum.unlock);
  };

  const activeTheme = themeOptions.find(
    (themeOption) => themeOption.identifier === rootTheme
  );

  const handleThemeSwitch =
    (themeOption: ThemeOptionType) => (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setRootTheme(themeOption.identifier);

      document.documentElement.setAttribute(
        'data-mvx-theme',
        themeOption.identifier
      );
    };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-mvx-theme');
      setRootTheme(theme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mvx-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={classNames(styles.heroContainer, activeTheme?.backgroundClass)}
    >
      <div className={styles.heroSectionTop}>
        <div className={styles.heroSectionTopContent}>
          <h1 className={styles.heroTitle}>dApp Template</h1>

          <p className={styles.heroDescription}>
            The sdk-dapp starter project for any dApp built on the MultiversX
            blockchain.
          </p>
        </div>

        <div className={styles.heroSectionTopButtons}>
          <Button onClick={handleLogIn}>Connect Wallet</Button>

          <Button
            onClick={handleLogIn}
            variant='secondary'
            className={styles.heroSectionTopDocButton}
          >
            See Documentation
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </div>

      <div className={styles.heroSectionBottom}>
        {themeOptions.map((themeOption) => {
          const Icon = themeOption.icon;
          return (
            <div
              key={themeOption.identifier}
              onClick={handleThemeSwitch(themeOption)}
              className={classNames(styles.heroSectionBottomThemeOptions, {
                [styles.heroSectionBottomThemeOptionsOpacityFull]:
                  themeOption.identifier === activeTheme?.identifier
              })}
            >
              <div className={styles.heroSectionBottomThemeOption}>
                <Icon className={styles.themeOptionIcon} />

                <span className={styles.themeOptionTitle}>
                  {themeOption.title}
                </span>
              </div>

              {themeOption.identifier === activeTheme?.identifier && (
                <>
                  <span className={styles.themeOptionActiveDot} />

                  <div className={styles.themeOptionActiveLabel}>
                    {themeOption.label}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
