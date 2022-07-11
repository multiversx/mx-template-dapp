import React from 'react';
import Transition, { TransitionProps, TransitionStatus } from 'react-transition-group/Transition';
export declare type TransitionWrapperProps = TransitionProps & {
    childRef?: React.Ref<unknown>;
    children: React.ReactElement | ((status: TransitionStatus, props: Record<string, unknown>) => React.ReactNode);
};
declare const TransitionWrapper: React.ForwardRefExoticComponent<Pick<TransitionWrapperProps, string | number> & React.RefAttributes<Transition<any>>>;
export default TransitionWrapper;
