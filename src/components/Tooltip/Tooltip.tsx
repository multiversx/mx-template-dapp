import classNames from 'classnames';
import {
  FocusEvent,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  useState
} from 'react';

import { WithClassnameType } from 'types';

interface TooltipPropsType extends PropsWithChildren, WithClassnameType {
  trigger: (isTooltipVisible: boolean) => ReactNode;
  triggerOnClick?: boolean;
  position?: 'top' | 'bottom';
}

// prettier-ignore
const styles = {
  tooltip: 'tooltip flex relative',
  tooltipContentWrapper: 'tooltip-content-wrapper left-1/2 -translate-x-1/2 absolute z-10',
  tooltipContentWrapperTop: 'bottom-full pb-3',
  tooltipContentWrapperBottom: 'top-full pt-3',
  tooltipContent: 'tooltip-content flex-row text-left text-xs gap-1 cursor-default bg-primary rounded-xl border border-secondary p-1 relative after:w-2 after:h-2 after:border after:border-secondary after:bg-primary after:absolute after:left-1/2 after:origin-center after:-translate-x-1/2 after:-rotate-45',
  tooltipContentTop: 'after:-bottom-1 after:border-t-0 after:border-r-0',
  tooltipContentBottom: 'after:-top-1 after:border-b-0 after:border-l-0',
  tooltipTrigger: 'tooltip-trigger'
} satisfies Record<string, string>;

export const Tooltip = ({
  position = 'top',
  triggerOnClick = false,
  className,
  children,
  trigger
}: TooltipPropsType) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    if (!triggerOnClick) {
      return;
    }

    event.preventDefault();
    setIsTooltipVisible((isTooltipVisible) => !isTooltipVisible);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsTooltipVisible(false);
    }
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    if (triggerOnClick) {
      return;
    }

    event.preventDefault();
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (triggerOnClick) {
      return;
    }

    event.preventDefault();
    setIsTooltipVisible(false);
  };

  return (
    <div
      onClick={handleTriggerClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(styles.tooltip, className)}
    >
      {isTooltipVisible && (
        <div
          className={classNames(
            styles.tooltipContentWrapper,
            { [styles.tooltipContentWrapperTop]: position === 'top' },
            { [styles.tooltipContentWrapperBottom]: position === 'bottom' }
          )}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            onBlur={handleBlur}
            tabIndex={-1}
            className={classNames(
              styles.tooltipContent,
              { [styles.tooltipContentTop]: position === 'top' },
              { [styles.tooltipContentBottom]: position === 'bottom' }
            )}
          >
            {children}
          </div>
        </div>
      )}

      <span className={styles.tooltipTrigger}>{trigger(isTooltipVisible)}</span>
    </div>
  );
};
