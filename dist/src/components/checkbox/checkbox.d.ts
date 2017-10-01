/// <reference types="react" />
import * as React from 'react';
import { properties } from 'wix-react-tools';
import { FormInputProps } from '../../types/forms';
export interface CheckBoxProps extends FormInputProps<boolean>, properties.Props {
    children?: React.ReactNode;
    disabled?: boolean;
    readonly?: boolean;
    indeterminate?: boolean;
    tabIndex?: number;
    id?: string;
}
export interface CheckBoxIconProps {
    value?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    className?: string;
}
export interface CheckBoxState {
    isFocused: boolean;
}
export declare class CheckBox extends React.Component<CheckBoxProps, CheckBoxState> {
    static defaultProps: Partial<CheckBoxProps>;
    state: CheckBoxState;
    render(): JSX.Element;
    private handleChange;
    private handleInputFocus;
    private handleInputBlur;
}
