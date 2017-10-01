/// <reference types="react" />
import * as React from 'react';
export interface StepperProps extends React.HTMLProps<HTMLElement> {
    disableUp?: boolean;
    disableDown?: boolean;
    dragStep?: number;
    onUp(modifiers: Modifiers): void;
    onDown(modifiers: Modifiers): void;
}
export interface State {
    dragged: boolean;
}
export interface Modifiers {
    altKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
}
export declare class Stepper extends React.Component<StepperProps, State> {
    static defaultProps: {
        disableUp: boolean;
        disableDown: boolean;
    };
    state: State;
    private dragRefPoint;
    render(): JSX.Element;
    private handlerClickUp;
    private handlerClickDown;
    private handleDragStart;
    private handleDragStop;
    private updateDragRefPoint({clientX, clientY});
    private resetDragRefPoint();
    private handleDrag;
}
