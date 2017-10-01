/// <reference types="react" />
import * as React from 'react';
export interface SliderDemoState {
    value: number;
    rawValue: string;
}
export declare class SliderDemo extends React.Component<{}, SliderDemoState> {
    constructor(props: {});
    render(): JSX.Element;
    private onSliderChange;
    private onSliderInput;
}
