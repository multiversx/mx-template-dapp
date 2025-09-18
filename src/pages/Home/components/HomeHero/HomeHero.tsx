import { Fragment, FunctionComponent, MouseEvent, SVGProps } from 'react';
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

import { styles } from './homeHero.styles';

interface HomeThemeOptionType extends ThemeOptionType {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  backgroundClass: string;
  title: string;
}

const themeExtraProperties: Record<
  string,
  Omit<HomeThemeOptionType, keyof ThemeOptionType>
> = {
  'mvx:dark-theme': {
    icon: HomeDarkThemeIcon,
    title: 'Customizable',
    backgroundClass: 'bg-dark-theme'
  },
  'mvx:vibe-theme': {
    icon: HomeVibeThemeIcon,
    title: 'Vibrant',
    backgroundClass: 'bg-vibe-theme'
  },
  'mvx:light-theme': {
    icon: HomeLightThemeIcon,
    title: 'Ownable',
    backgroundClass: 'bg-light-theme'
  }
};

export const HomeHero = () => {
  const navigate = useNavigate();
  const { allThemeOptions, activeTheme, handleThemeSwitch } =
    useHandleThemeManagement();

  const handleLogIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(RouteNamesEnum.unlock);
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
                <themeOption.icon className={styles.themeOptionIcon} />

                <span className={styles.themeOptionTitle}>
                  {themeOption.label}
                </span>
              </div>

              {themeOption.identifier === activeHomeTheme.identifier && (
                <Fragment>
                  <span className={styles.themeOptionActiveDot} />

                  <div className={styles.themeOptionActiveLabel}>
                    {themeOption.title}
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
