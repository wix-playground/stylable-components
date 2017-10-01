/// <reference types="react" />
import * as React from 'react';
export declare const demoCheckBoxText: string;
export declare class CheckBoxDemo extends React.Component<{}, {}> {
    render(): JSX.Element;
}
export declare class BasicDemo extends React.Component<{}, {
    value: boolean;
}> {
    state: {
        value: boolean;
    };
    render(): JSX.Element;
    private handleChange;
}
export declare class DisabledDemo extends React.Component<{}, {
    value: boolean;
}> {
    state: {
        value: boolean;
    };
    render(): JSX.Element;
    private handleChange;
}
export declare class IndeterminateDemo extends React.Component<{}, {
    value1: boolean;
    value2: boolean;
}> {
    state: {
        value1: boolean;
        value2: boolean;
    };
    render(): JSX.Element;
    private onChangeParent;
    private onChangeChild1;
    private onChangeChild2;
}
