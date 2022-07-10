import * as React from 'react';
import { SelectCallback } from '@restart/ui/types';
export interface AccordionContextValue {
    activeEventKey?: string;
    onSelect?: SelectCallback;
}
declare const context: React.Context<AccordionContextValue>;
export default context;
