/// <reference types="react" />
import * as React from 'react';
export interface ModalDemoState {
    isOpen: boolean;
}
export declare class ModalDemo extends React.Component<{}, ModalDemoState> {
    state: ModalDemoState;
    render(): JSX.Element;
    private toggleOpen;
    private onModalClick;
}
