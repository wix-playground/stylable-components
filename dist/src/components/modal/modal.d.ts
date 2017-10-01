/// <reference types="react" />
import * as React from 'react';
export interface RequestCloseEvent extends React.SyntheticEvent<Element> {
    source: string;
}
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onRequestClose?(event: RequestCloseEvent): void;
}
export declare class Modal extends React.PureComponent<ModalProps> {
    static defaultProps: ModalProps;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element | null;
    private onClick;
    private getDataFromNearestNode(target);
    private shouldEnableScrolling(shouldScroll);
}
