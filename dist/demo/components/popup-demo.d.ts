/// <reference types="react" />
import React = require('react');
import { PopupHorizontalPosition, PopupVerticalPosition } from '../../src/';
export interface DemoState {
    div: HTMLElement | null;
    isOpen: boolean;
    pVertical: PopupVerticalPosition;
    pHorizontal: PopupHorizontalPosition;
    aVertical: PopupVerticalPosition;
    aHorizontal: PopupHorizontalPosition;
}
export declare class PopupDemo extends React.Component<{}, DemoState> {
    state: {
        div: null;
        isOpen: boolean;
        pVertical: PopupVerticalPosition;
        pHorizontal: PopupHorizontalPosition;
        aVertical: PopupVerticalPosition;
        aHorizontal: PopupHorizontalPosition;
    };
    render(): JSX.Element;
    private onClick;
    private updateState;
    private changePVertical;
    private changePHorizontal;
    private changeAVertical;
    private changeAHorizontal;
}
