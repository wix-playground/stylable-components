/// <reference types="react" />
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { properties } from 'wix-react-tools';
import { FormInputProps } from './../../types/forms';
export declare const AXISES: {
    [name: string]: AxisOptions;
};
export declare type PointerEvent = MouseEvent | TouchEvent;
export declare type Step = number | 'any';
export declare type AxisOptions = 'x' | 'y' | 'x-reverse' | 'y-reverse';
export interface PointerPosition {
    clientX: number;
    clientY: number;
}
export interface SliderProps extends FormInputProps<number, string>, properties.Props {
    tooltip?: React.ReactNode;
    min?: number;
    max?: number;
    step?: Step;
    axis?: AxisOptions;
    name?: string;
    label?: string;
    marks?: boolean;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    RTL?: boolean;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onDragStart?(event: PointerEvent): void;
    onDrag?(event: PointerEvent): void;
    onDragStop?(event: PointerEvent): void;
}
export interface SliderState {
    relativeValue: number;
    relativeStep: Step;
    isActive: boolean;
    isVertical: boolean;
    isReverse: boolean;
}
export declare class Slider extends React.Component<SliderProps, SliderState> {
    static defaultProps: Partial<SliderProps>;
    static contextTypes: {
        contextProvider: PropTypes.Requireable<any>;
    };
    private focusableElement;
    private sliderArea;
    private isSliderMounted;
    private isActive;
    constructor(props: SliderProps, context?: any);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: SliderProps): void;
    private getDefaultValue();
    private getTooltip();
    private getMarks();
    private getProgressStyles();
    private getHandleStyles();
    private getMarkStyles(position);
    private getMarkClass(position);
    private onSliderFocus;
    private onSliderBlur;
    private isVertical(axis);
    private isReverse(axis);
    private isRTL();
    private increaseValue(toEdge?, multiplier?);
    private decreaseValue(toEdge?, multiplier?);
    private changeValue(dirrection, multiplier?, toEdge?);
    private callInput(value);
    private callChange(value);
    private getRelativeStep(step, min, max);
    private getRelativeValue(value, min, max, step?);
    private getAbsoluteValue(relativeValue);
    private getValueInRange(value, min, max);
    private getValueFromElementAndPointer(element, {clientX, clientY});
    private onSliderAreaMouseDown;
    private onSliderAreaMouseMove;
    private onSliderAreaMouseUp;
    private onSliderAreaTouchStart;
    private onSliderAreaTouchMove;
    private onSliderAreaTouchEnd;
    private onSliderAreaKeyDown;
    private onDragStart(event);
    private onDrag(event);
    private onDragStop(event);
}
