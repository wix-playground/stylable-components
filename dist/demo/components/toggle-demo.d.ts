/// <reference types="react" />
import * as React from 'react';
export interface State {
    checked: boolean;
}
export declare class ToggleDemo extends React.Component<{}, State> {
    state: {
        checked: boolean;
    };
    render(): JSX.Element;
}
