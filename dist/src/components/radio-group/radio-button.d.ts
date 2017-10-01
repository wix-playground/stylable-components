/// <reference types="react" />
import * as React from 'react';
import { FormInputProps } from '../../types/forms';
export interface RadioButtonProps extends FormInputProps<string> {
    checked?: boolean;
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    tabIndex?: number;
    className?: string;
}
export interface RadioButtonState {
    isFocused: boolean;
}
export declare class RadioButton extends React.Component<RadioButtonProps, RadioButtonState> {
    static defaultProps: Partial<RadioButtonProps>;
    state: RadioButtonState;
    render(): JSX.Element;
    private onChange;
    private onInputFocus;
    private onInputBlur;
}
