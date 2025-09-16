import { ReactNode } from 'react';
import { ITooltip as ReactTooltipPropsType } from 'react-tooltip';

import { WithClassnameType } from 'types';

export enum TooltipPlaceEnum {
  top = 'top',
  left = 'left',
  right = 'right',
  bottom = 'bottom'
}

export interface TooltipPropsType extends WithClassnameType {
  children: (isTooltipOrDrawerOpen: boolean) => ReactNode;
  openOnClick?: ReactTooltipPropsType['openOnClick'];
  afterHide?: ReactTooltipPropsType['afterHide'];
  afterShow?: ReactTooltipPropsType['afterShow'];
  setIsOpen?: ReactTooltipPropsType['setIsOpen'];
  clickable?: ReactTooltipPropsType['clickable'];
  isOpen?: ReactTooltipPropsType['isOpen'];
  identifier: string;
  content: ReactNode;
  skipTooltip?: boolean;
  place?: `${TooltipPlaceEnum}`;
  hasDrawer?: boolean;
  drawerTitle?: ReactNode;
}
