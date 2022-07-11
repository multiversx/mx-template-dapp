import * as React from 'react';
import { BsPrefixProps } from './helpers';
export interface PaginationProps extends BsPrefixProps, React.HTMLAttributes<HTMLUListElement> {
    size?: 'sm' | 'lg';
}
declare const _default: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLUListElement>> & {
    First: {
        ({ children, ...props }: import("./PageItem").PageItemProps): JSX.Element;
        displayName: string;
    };
    Prev: {
        ({ children, ...props }: import("./PageItem").PageItemProps): JSX.Element;
        displayName: string;
    };
    Ellipsis: {
        ({ children, ...props }: import("./PageItem").PageItemProps): JSX.Element;
        displayName: string;
    };
    Item: import("./helpers").BsPrefixRefForwardingComponent<"li", import("./PageItem").PageItemProps>;
    Next: {
        ({ children, ...props }: import("./PageItem").PageItemProps): JSX.Element;
        displayName: string;
    };
    Last: {
        ({ children, ...props }: import("./PageItem").PageItemProps): JSX.Element;
        displayName: string;
    };
};
export default _default;
