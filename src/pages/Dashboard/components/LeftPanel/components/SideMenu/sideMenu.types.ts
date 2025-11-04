import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent, SVGProps } from 'react';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

export interface SideMenuPropsType {
  setIsOpen: (isOpen: boolean) => void;
}

export interface MenuItemsType {
  title: string;
  icon?: IconDefinition | FunctionComponent<SVGProps<SVGSVGElement>>;
  id: ItemsIdentifiersEnum;
}
