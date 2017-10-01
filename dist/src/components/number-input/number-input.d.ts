/// <reference types="react" />
import * as React from 'react';
import { FormInputProps } from '../../types';
export interface NumberInputProps extends FormInputProps<number | undefined, string> {
    className?: string;
    value?: number;
    defaultValue?: number;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
    error?: boolean;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}
export interface NumberInputState {
    value?: number;
    focus: boolean;
    error: boolean;
}
export declare class NumberInput extends React.Component<NumberInputProps, NumberInputState> {
    static defaultProps: {
        onChange: (value?: number | undefined) => void;
        onInput: (value: string) => void;
    };
    private committed;
    private inputRef;
    private readonly isUncontrolled;
    private readonly currentValue;
    constructor(props: NumberInputProps);
    componentWillReceiveProps({min, max, step, value, defaultValue}: NumberInputProps): void;
    render(): JSX.Element;
    private validate(value?);
    private commit(value?);
    private revert();
    private updateValue(next?);
    private stepValue(direction, multiplier?);
    private handleIncrement;
    private handleDecrement;
    private handleFocus;
    private handleBlur;
    private handleInputKeyDown;
    private handleInputBlur;
    private handleInputChange;
}
