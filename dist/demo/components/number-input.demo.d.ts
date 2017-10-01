/// <reference types="react" />
import * as React from 'react';
export interface State {
    sharedValue?: number;
    basicValue?: number;
}
export declare class NumberInputDemo extends React.Component<{}, State> {
    constructor();
    render(): JSX.Element;
    private handleSharedValueChange;
    private handleBasicValueChange;
}
