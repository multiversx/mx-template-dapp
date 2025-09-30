import classNames from 'classnames';
import { CSSProperties, MouseEvent, useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { Drawer } from 'components';

import { TooltipPlaceEnum, TooltipPropsType } from './tooltip.types';

// prettier-ignore
const styles = {
  tooltipWrapper: 'tooltip-wrapper relative',
  tooltipDrawer: 'tooltip-drawer md:hidden ',
  tooltip: 'tooltip bg-primary! border! border-secondary! z-1 rounded-xl! p-0! visible! pointer-events-all! z-60! before:absolute before:inset-0 before:bg-primary before:rounded-xl before:z-1',
  tooltipMobile: 'tooltip-mobile hidden md:flex!',
  tooltipContent: 'tooltip-content p-2 leading-tight text-neutral-500 text-xs text-center z-2 relative',
  tooltipArrow: 'tooltip-arrow bg-primary! border! border-secondary! w-2! h-2!',
  tooltipTrigger: 'tooltip-trigger'
} satisfies Record<string, string>;

const tooltipWrapperStyle = {
  '--rt-transition-show-delay': '200ms',
  '--rt-transition-closing-delay': '200ms',
  '--rt-opacity': 1
} as CSSProperties;

export const Tooltip = ({
  identifier,
  children,
  className,
  content,
  skipTooltip,
  hasDrawer,
  drawerTitle,
  place = TooltipPlaceEnum.bottom,
  ...props
}: TooltipPropsType) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleTriggerClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!hasDrawer) {
      return;
    }

    event.preventDefault();
    setIsDrawerOpen(true);
  };

  const handleTooltipToggle = (isOpen: boolean) => {
    setIsTooltipOpen(isOpen);
    setIsDrawerOpen(isOpen);
  };

  return (
    <div
      style={tooltipWrapperStyle}
      className={classNames(styles.tooltipWrapper, className)}
    >
      {hasDrawer && (
        <Drawer
          title={drawerTitle}
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
          className={styles.tooltipDrawer}
        >
          {content}
        </Drawer>
      )}

      {!skipTooltip && (
        <ReactTooltip
          place={place}
          classNameArrow={styles.tooltipArrow}
          setIsOpen={handleTooltipToggle}
          anchorSelect={`#${identifier}`}
          className={classNames(styles.tooltip, {
            [styles.tooltipMobile]: hasDrawer
          })}
          {...props}
        >
          <div className={styles.tooltipContent}>{content}</div>
        </ReactTooltip>
      )}

      <div
        id={identifier}
        data-testid={identifier}
        onClick={handleTriggerClick}
        className={styles.tooltipTrigger}
      >
        {children(isDrawerOpen || isTooltipOpen)}
      </div>
    </div>
  );
};
