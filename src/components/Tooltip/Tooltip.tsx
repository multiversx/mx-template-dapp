import classNames from 'classnames';
import { CSSProperties } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { TooltipPlaceEnum, TooltipPropsType } from './tooltip.types';

// prettier-ignore
const styles = {
  tooltipWrapper: 'tooltip-wrapper relative',
  tooltip: 'tooltip bg-primary! border! border-secondary! z-1 rounded-xl! p-0! visible! pointer-events-all! before:absolute before:inset-0 before:bg-primary before:rounded-xl before:z-1',
  tooltipContent: 'tooltip-content p-2 leading-tight text-neutral-500 text-xs text-center z-2 relative',
  tooltipArrow: 'tooltip-arrow bg-primary! border! border-secondary! w-2! h-2!',
  tooltipTrigger: 'tooltip-trigger'
} satisfies Record<string, string>;

export const Tooltip = ({
  identifier,
  children,
  className,
  content,
  skipTooltip,
  place = TooltipPlaceEnum.bottom,
  ...props
}: TooltipPropsType) => {
  const tooltipWrapperStyle = {
    '--rt-transition-show-delay': '200ms',
    '--rt-transition-closing-delay': '200ms',
    '--rt-opacity': 1
  } as CSSProperties;

  return (
    <div
      className={classNames(styles.tooltipWrapper, className)}
      style={tooltipWrapperStyle}
    >
      {!skipTooltip && (
        <ReactTooltip
          classNameArrow={styles.tooltipArrow}
          anchorSelect={`#${identifier}`}
          className={styles.tooltip}
          place={place}
          {...props}
        >
          <div className={styles.tooltipContent}>{content}</div>
        </ReactTooltip>
      )}

      <div
        id={identifier}
        data-testid={identifier}
        className={styles.tooltipTrigger}
      >
        {children}
      </div>
    </div>
  );
};
