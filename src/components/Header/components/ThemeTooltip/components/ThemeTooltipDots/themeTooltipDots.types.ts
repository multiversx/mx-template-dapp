import { WithClassnameType } from 'types';

export interface ThemeTooltipDotsPropsType extends WithClassnameType {
  dotColors: string[];
  size?: `${ThemeTooltipDotsSizeEnum}`;
}

export enum ThemeTooltipDotsSizeEnum {
  medium = 'medium',
  large = 'large'
}
