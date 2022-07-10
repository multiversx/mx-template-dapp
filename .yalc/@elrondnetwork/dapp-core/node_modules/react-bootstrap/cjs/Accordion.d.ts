import * as React from 'react';
import { SelectCallback } from '@restart/ui/types';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>, BsPrefixProps {
    activeKey?: string;
    defaultActiveKey?: string;
    onSelect?: SelectCallback;
    flush?: boolean;
}
declare const _default: BsPrefixRefForwardingComponent<"div", AccordionProps> & {
    Button: BsPrefixRefForwardingComponent<"div", import("./AccordionButton").AccordionButtonProps>;
    Collapse: BsPrefixRefForwardingComponent<"div", import("./AccordionCollapse").AccordionCollapseProps>;
    Item: BsPrefixRefForwardingComponent<"div", import("./AccordionItem").AccordionItemProps>;
    Header: BsPrefixRefForwardingComponent<"h2", import("./AccordionHeader").AccordionHeaderProps>;
    Body: BsPrefixRefForwardingComponent<"div", import("./AccordionBody").AccordionBodyProps>;
};
export default _default;
