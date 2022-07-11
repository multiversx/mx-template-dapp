import PropTypes from 'prop-types';
export declare type ResponsiveUtilityValue<T> = T | {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    xxl?: T;
};
export declare function responsivePropType(propType: any): PropTypes.Requireable<any>;
export declare const DEVICE_SIZES: readonly ["xxl", "xl", "lg", "md", "sm", "xs"];
export default function createUtilityClassName(utilityValues: Record<string, ResponsiveUtilityValue<unknown>>): string[];
