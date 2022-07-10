import * as React from 'react';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
export interface PageItemProps extends React.HTMLAttributes<HTMLElement>, BsPrefixProps {
    disabled?: boolean;
    active?: boolean;
    activeLabel?: string;
    href?: string;
}
declare const PageItem: BsPrefixRefForwardingComponent<'li', PageItemProps>;
export default PageItem;
export declare const First: {
    ({ children, ...props }: PageItemProps): JSX.Element;
    displayName: string;
};
export declare const Prev: {
    ({ children, ...props }: PageItemProps): JSX.Element;
    displayName: string;
};
export declare const Ellipsis: {
    ({ children, ...props }: PageItemProps): JSX.Element;
    displayName: string;
};
export declare const Next: {
    ({ children, ...props }: PageItemProps): JSX.Element;
    displayName: string;
};
export declare const Last: {
    ({ children, ...props }: PageItemProps): JSX.Element;
    displayName: string;
};
