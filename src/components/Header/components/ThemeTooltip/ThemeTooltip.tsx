import {
  faArrowRightLong,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { Tooltip } from 'components/Tooltip/Tooltip';
import {
  useHandleThemeManagement,
  ThemeOptionType
} from 'hooks/useHandleThemeManagement';

import { ThemeTooltipDots } from './components';
import styles from './themeTooltip.styles';

interface ThemeTooltipOptionType extends ThemeOptionType {
  dotColors: string[];
}

const themeDotColors: Record<string, string[]> = {
  'mvx:dark-theme': ['#23F7DD', '#262626', '#B6B3AF', '#FFFFFF'],
  'mvx:vibe-theme': ['#471150', '#5A2A62', '#D200FA', '#FFFFFF'],
  'mvx:light-theme': ['#000000', '#A5A5A5', '#E2DEDC', '#F3EFED']
};

export const ThemeTooltip = () => {
  const { allThemeOptions, activeTheme, handleThemeSwitch } =
    useHandleThemeManagement();

  const tooltipThemeOptions = allThemeOptions.map(
    (option): ThemeTooltipOptionType => ({
      ...option,
      dotColors: themeDotColors[option.identifier]
    })
  );

  const activeTooltipTheme = activeTheme
    ? { ...activeTheme, dotColors: themeDotColors[activeTheme.identifier] }
    : null;

  if (!activeTooltipTheme) {
    return null;
  }

  return (
    <Tooltip
      place='bottom'
      clickable={true}
      hasDrawer={true}
      drawerTitle='Choose Theme'
      identifier='theme-tooltip-identifier'
      className={styles.themeTooltip}
      content={
        <div className={styles.themeTooltipOptionsWrapper}>
          <div className={styles.themeTooltipOptionsTitle}>Themes</div>

          <div className={styles.themeTooltipOptions}>
            {tooltipThemeOptions.map((themeOption) => (
              <div
                key={`theme-${themeOption.identifier}-option`}
                onClick={handleThemeSwitch(themeOption.identifier)}
                className={classNames(styles.themeTooltipOption, {
                  [styles.themeTooltipOptionActive]:
                    themeOption.identifier === activeTooltipTheme.identifier
                })}
              >
                <ThemeTooltipDots
                  dotColors={themeOption.dotColors}
                  className={styles.themeTooltipOptionDots}
                  size='large'
                />

                <div className={styles.themeTooltipOptionLabel}>
                  {themeOption.label}
                </div>

                {themeOption.identifier !== activeTooltipTheme.identifier && (
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    className={styles.themeTooltipOptionArrow}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      }
    >
      {(isDrawerOrTooltipOpen) => (
        <div
          className={classNames(styles.themeTooltipTrigger, {
            [styles.themeTooltipTriggerToggled]: isDrawerOrTooltipOpen
          })}
        >
          <ThemeTooltipDots
            dotColors={activeTooltipTheme.dotColors}
            className={styles.themeTooltipTriggerDots}
          />

          <FontAwesomeIcon
            icon={faChevronDown}
            className={classNames(styles.themeTooltipTriggerIcon, {
              [styles.themeTooltipTriggerIconRotated]: isDrawerOrTooltipOpen
            })}
          />
        </div>
      )}
    </Tooltip>
  );
};
