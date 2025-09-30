import classNames from 'classnames';

import { ThemeTooltipDotsPropsType } from './themeTooltipDots.types';

// prettier-ignore
const styles = {
  themeTooltipDots: 'theme-tooltip-dots flex w-4 h-4 lg:w-5 gap-1 min-w-4 lg:min-w-5 lg:h-5 justify-between flex-wrap',
  themeTooltipDot: 'theme-tooltip-dot rounded-full transition-all duration-200 ease-out w-1.5 h-1.5 min-w-1.5 lg:w-2 lg:h-2 lg:min-w-2',
  themeTooltipMedium: 'theme-tooltip-medium',
  themeTooltipLarge: 'theme-tooltip-large max-md:w-2.5 max-md:h-2.5 max-md:min-w-2.5'
} satisfies Record<string, string>;

export const ThemeTooltipDots = ({
  size = 'medium',
  dotColors,
  className
}: ThemeTooltipDotsPropsType) => (
  <div className={classNames(styles.themeTooltipDots, className)}>
    {dotColors.map((dotColor, dotColorIndex) => (
      <div
        style={{ backgroundColor: dotColor }}
        key={`header-${dotColorIndex}-navigation-${dotColor}-dot`}
        className={classNames(styles.themeTooltipDot, {
          [styles.themeTooltipMedium]: size === 'medium',
          [styles.themeTooltipLarge]: size === 'large'
        })}
      />
    ))}
  </div>
);
