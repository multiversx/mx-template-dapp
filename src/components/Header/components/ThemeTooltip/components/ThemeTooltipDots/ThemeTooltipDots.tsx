import classNames from 'classnames';

import { WithClassnameType } from 'types';

// prettier-ignore
const styles = {
  themeTooltipDots: 'theme-tooltip-dots flex w-4 h-4 lg:w-5 gap-1 min-w-4 lg:min-w-5 lg:h-5 justify-between flex-wrap',
  themeTooltipDot: 'theme-tooltip-dot w-1.5 h-1.5 lg:w-2 lg:h-2 lg:min-w-2 lg:min-h-2 min-w-1.5 lg:min-w-2 rounded-full transition-all duration-200 ease-out'
} satisfies Record<string, string>;

interface ThemeTooltipDotsPropsType extends WithClassnameType {
  dotColors: string[];
}

export const ThemeTooltipDots = ({
  dotColors,
  className
}: ThemeTooltipDotsPropsType) => (
  <div className={classNames(styles.themeTooltipDots, className)}>
    {dotColors.map((dotColor, dotColorIndex) => (
      <div
        className={styles.themeTooltipDot}
        style={{ backgroundColor: dotColor }}
        key={`header-${dotColorIndex}-navigation-${dotColor}-dot`}
      />
    ))}
  </div>
);
