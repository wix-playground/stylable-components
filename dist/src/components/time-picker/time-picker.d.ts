/// <reference types="react" />
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { FormInputProps } from '../../types/forms';
import { Ampm, Format, Segment } from './utils';
export interface Props extends FormInputProps<string> {
    format?: Format;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    required?: boolean;
    error?: boolean;
    rtl?: boolean;
}
export interface State {
    focus: boolean;
    hh?: string;
    mm?: string;
    format: Format;
    ampm: Ampm;
    currentSegment: Segment;
    notification?: string;
}
export declare class TimePicker extends React.Component<Props, State> {
    static defaultProps: Partial<Props>;
    static contextTypes: {
        contextProvider: PropTypes.Requireable<any>;
    };
    private nativeInput;
    private segments;
    private lastValue;
    constructor(props: Props);
    componentWillReceiveProps(props: Props, state: State): void;
    render(): JSX.Element;
    private getValue();
    private select(segment);
    private moveSelection(step);
    private updateSegmentValue(name, value);
    private toggleAmpm(shouldSelect);
    private changeValue(step, multiplier?);
    private onRootMouseDown;
    private onStepperMouseDown;
    private onStepperUp;
    private onStepperDown;
    private onAmpmMouseDown;
    private onAmpmFocus;
    private onInputMouseDown;
    private onInputChange;
    private onNativeInputChange;
    private onNantiveInputFocus;
    private onInputFocus;
    private onBlur;
    private onKeyDown;
    private commit;
}
