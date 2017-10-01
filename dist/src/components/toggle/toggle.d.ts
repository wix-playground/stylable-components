/// <reference types="react" />
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { FormInputProps } from '../../types/forms';
export interface Props extends FormInputProps<boolean> {
    className?: string;
    error?: boolean;
    disabled?: boolean;
    label?: string;
    tabIndex?: number;
    required?: boolean;
    name?: string;
}
export interface State {
    focus: boolean;
}
export default class Toggle extends React.Component<Props, State> {
    static defaultProps: {
        value: boolean;
        disabled: boolean;
        error: boolean;
        required: boolean;
    };
    static contextTypes: {
        contextProvider: PropTypes.Requireable<any>;
    };
    state: {
        focus: boolean;
    };
    private shouldResetFocus;
    render(): JSX.Element;
    private onInputFocus;
    private onInputBlur;
    private toggle;
    private onMouseDown;
}
