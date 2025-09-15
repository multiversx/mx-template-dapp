import { Fragment, MouseEvent, ReactNode } from 'react';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import {
  useHandleThemeManagement,
  ThemeOptionType
} from 'hooks/useHandleThemeManagement';
import { ReactComponent as HomeLightThemeIcon } from 'assets/img/bright-light-icon.svg';
import { ReactComponent as HomeVibeThemeIcon } from 'assets/img/vibe-mode-icon.svg';
import { ReactComponent as HomeDarkThemeIcon } from 'assets/icons/home-dark-theme-icon.svg';
import { Button } from 'components';
import { DOCUMENTATION_LINK, RouteNamesEnum } from 'localConstants';

// prettier-ignore
const styles = {
  heroContainer: 'hero-container shadow-xl shadow-secondary/15 flex flex-col items-center justify-between w-full lg:h-160 rounded-3xl bg-cover bg-no-repeat bg-center p-8 lg:p-20 border border-secondary backdrop-blur-md transition-all duration-200 ease-out',
  heroSectionTop: 'hero-section-top flex flex-col items-start lg:items-center justify-center gap-10',
  heroSectionTopContent: 'hero-section-top-content flex flex-col lg:items-center justify-center gap-6',
  heroTitle: 'hero-title !text-primary text-[42px] lg:text-[84px] font-medium leading-[1] tracking-[-2.52px] transition-all duration-200 ease-out',
  heroDescription: 'hero-description text-secondary text-xl lg:text-2xl lg:text-center leading-[1.5] tracking-[-0.24px] max-w-138 transition-all duration-200 ease-out',
  heroSectionTopButtons: 'hero-section-top-buttons flex flex-col lg:flex-row items-start lg:items-center justify-start gap-6',
  heroSectionTopDocButton: 'hero-section-top-doc-button flex items-center px-3 text-btn-secondary bg-btn-secondary hover:bg-btn-primary hover:text-btn-primary font-bold rounded-xl h-8 lg:h-10 transition-all duration-200 ease-out',
  heroSectionTopDocButtonText: 'hero-section-top-doc-button-text px-4',
  heroSectionTopDocButtonIcon: 'hero-section-top-doc-button-icon px-3',
  heroSectionBottom: 'hero-section-bottom hidden lg:!flex gap-6',
  heroSectionBottomThemeOptions: 'hero-section-bottom-theme-options text-btn opacity-60 hover:opacity-100 flex flex-col items-center gap-2 w-20 relative cursor-pointer transition-all duration-200 ease-out',
  heroSectionBottomThemeOptionsOpacityFull: 'opacity-100',
  heroSectionBottomThemeOption: 'hero-section-bottom-theme-option flex flex-col items-center gap-1 relative',
  themeOptionIcon: 'theme-option-icon fill-primary transition-all duration-200 ease-out',
  themeOptionTitle: 'theme-option-title text-primary transition-all duration-200 ease-out',
  themeOptionActiveDot: 'theme-option-active-dot w-2 h-2 rounded-full bg-tertiary transition-all duration-200 ease-out',
  themeOptionActiveLabel: 'theme-option-active-label flex items-center justify-center px-1 absolute -top-1.5 left-10 z-10 text-xs text-accent uppercase bg-accent border border-accent rounded-md transition-all duration-200 ease-out'
} satisfies Record<string, string>;

interface HomeThemeOptionType extends ThemeOptionType {
  icon: ReactNode;
  backgroundClass: string;
  title: string;
}

export const HomeHero = () => {
  const navigate = useNavigate();
  const { allThemeOptions, activeTheme, handleThemeSwitch } =
    useHandleThemeManagement();

  const handleLogIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(RouteNamesEnum.unlock);
  };

  const themeExtraProperties: Record<
    string,
    Omit<HomeThemeOptionType, keyof ThemeOptionType>
  > = {
    'mvx:dark-theme': {
      icon: <HomeDarkThemeIcon />,
      title: 'Customizable',
      backgroundClass: 'bg-dark-theme'
    },
    'mvx:vibe-theme': {
      icon: <HomeVibeThemeIcon />,
      title: 'Vibrant',
      backgroundClass: 'bg-vibe-theme'
    },
    'mvx:light-theme': {
      icon: <HomeLightThemeIcon />,
      title: 'Ownable',
      backgroundClass: 'bg-light-theme'
    }
  };

  const homeThemeOptions: HomeThemeOptionType[] = allThemeOptions.map(
    (option) => ({
      ...option,
      ...themeExtraProperties[option.identifier]
    })
  );

  const activeHomeTheme = activeTheme
    ? { ...activeTheme, ...themeExtraProperties[activeTheme.identifier] }
    : null;

  const heroContainerClasses = activeHomeTheme
    ? classNames(styles.heroContainer, activeHomeTheme.backgroundClass)
    : styles.heroContainer;

  return (
    <div className={heroContainerClasses}>
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

          <a
            target='_blank'
            rel='noreferrer'
            href={DOCUMENTATION_LINK}
            className={styles.heroSectionTopDocButton}
          >
            <span className={styles.heroSectionTopDocButtonText}>
              See Documentation
            </span>

            <FontAwesomeIcon
              icon={faArrowRightLong}
              className={styles.heroSectionTopDocButtonIcon}
            />
          </a>
        </div>
      </div>

      {activeHomeTheme && (
        <div className={styles.heroSectionBottom}>
          {homeThemeOptions.map((themeOption) => (
            <div
              key={themeOption.identifier}
              onClick={handleThemeSwitch(themeOption.identifier)}
              className={classNames(styles.heroSectionBottomThemeOptions, {
                [styles.heroSectionBottomThemeOptionsOpacityFull]:
                  themeOption.identifier === activeHomeTheme.identifier
              })}
            >
              <div className={styles.heroSectionBottomThemeOption}>
                <div className={styles.themeOptionIcon}>{themeOption.icon}</div>
                <span className={styles.themeOptionTitle}>
                  {themeOption.title}
                </span>
              </div>

              {themeOption.identifier === activeHomeTheme.identifier && (
                <Fragment>
                  <span className={styles.themeOptionActiveDot} />

                  <div className={styles.themeOptionActiveLabel}>
                    {themeOption.label}
                  </div>
                </Fragment>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
