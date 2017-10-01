/// <reference types="react" />
import * as React from 'react';
import { properties } from 'wix-react-tools';
import { Point } from '../../types';
export declare type PopupVerticalPosition = 'top' | 'center' | 'bottom';
export declare type PopupHorizontalPosition = 'left' | 'center' | 'right';
export interface PopupPositionPoint {
    vertical: PopupVerticalPosition;
    horizontal: PopupHorizontalPosition;
}
export interface PopupProps extends properties.Props {
    open?: boolean;
    anchorPosition?: PopupPositionPoint;
    popupPosition?: PopupPositionPoint;
    syncWidth?: boolean;
    maxHeight?: number;
    children?: React.ReactNode;
}
export interface PopupCompProps extends PopupProps {
    anchor: Element | Point | null;
}
export declare class Popup extends React.Component<PopupCompProps> {
    static defaultProps: Partial<PopupCompProps>;
    render(): JSX.Element | null;
    private createStyle();
}
