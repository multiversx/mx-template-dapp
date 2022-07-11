/// <reference types="react" />
import { Options } from '@restart/ui/usePopper';
export default function useOverlayOffset(): [
    React.RefObject<HTMLElement>,
    Options['modifiers']
];
