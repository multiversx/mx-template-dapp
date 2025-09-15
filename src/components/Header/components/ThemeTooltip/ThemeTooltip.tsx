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

interface ThemeTooltipOptionType extends ThemeOptionType {
  dotColors: string[];
}

// prettier-ignore
const styles = {
  themeTooltip: 'theme-tooltip',
  themeTooltipTrigger: 'theme-tooltip-trigger flex h-8 lg:h-10 cursor-pointer gap-1 lg:gap-2 items-center justify-center w-12 min-w-12 max-w-12 lg:min-w-16 lg:max-w-16 lg:w-16 relative after:absolute after:opacity-40 after:bg-btn-tertiary after:left-0 after:right-0 after:top-0 after:bottom-0 after:pointer-events-none after:rounded-xl after:duration-200 after:ease-out after:transition-all hover:after:opacity-100',
  themeTooltipTriggerToggled: 'after:opacity-100',
  themeTooltipTriggerDots: 'theme-tooltip-trigger-dots relative z-1',
  themeTooltipTriggerIcon: 'theme-tooltip-trigger-icon transition-all text-xs relative z-1 duration-200 ease-out text-tertiary',
  themeTooltipTriggerIconRotated: 'rotate-180',
  themeTooltipOptionsWrapper: 'theme-tooltip-options-wrapper flex-col gap-1 flex md:-m-1',
  themeTooltipOptionsTitle: 'theme-tooltip-options-title md:hidden leading-none mb-3 text-secondary',
  themeTooltipOptions: 'theme-tooltip-options rounded-lg overflow-hidden flex-col flex gap-0.5 md:gap-1',
  themeTooltipOption: 'theme-tooltip-option h-15 md:h-auto w-full md:w-60 flex p-3 flex group text-primary font-medium gap-3 items-center transition-all duration-200 ease-out cursor-pointer relative after:transition-all after:duration-200 after:ease-out after:absolute md:after:opacity-0 hover:after:opacity-40 after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-secondary md:after:bg-accent after:pointer-events-none md:after:rounded-lg',
  themeTooltipOptionActive: 'after:bg-accent md:after:opacity-100 md:hover:after:opacity-100 !text-accent',
  themeTooltipOptionDots: 'theme-tooltip-option-dots flex w-10 h-10 p-2 md:p-0 md:w-4 md:h-4 justify-between relative z-1',
  themeTooltipOptionLabel: 'theme-tooltip-option-label leading-none relative z-1 text-base',
  themeTooltipOptionArrow: 'theme-tooltip-option-arrow ml-auto duration-200 transition-all ease-out opacity-0 text-link group-hover:opacity-100'
} satisfies Record<string, string>;

export const ThemeTooltip = () => {
  const { allThemeOptions, activeTheme, handleThemeSwitch } =
    useHandleThemeManagement();

  const themeDotColors: Record<string, string[]> = {
    'mvx:dark-theme': ['#23F7DD', '#262626', '#B6B3AF', '#FFFFFF'],
    'mvx:vibe-theme': ['#471150', '#5A2A62', '#D200FA', '#FFFFFF'],
    'mvx:light-theme': ['#000000', '#A5A5A5', '#E2DEDC', '#F3EFED']
  };

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
