/// <reference types="react" />
import * as React from 'react';
import { DatePickerProps } from '../../src';
export interface DatePickerDemoState {
    value: Date;
    startingDay?: number;
}
export declare class DatePickerDemo extends React.Component<DatePickerProps, Partial<DatePickerDemoState>> {
    state: DatePickerDemoState;
    render(): JSX.Element;
    private setStartingDay;
    private onChange;
}
