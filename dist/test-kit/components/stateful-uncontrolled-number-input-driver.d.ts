/// <reference types="react" />
import * as React from 'react';
import { DriverBase } from 'test-drive-react';
export declare class StatefulUncontrolledNumberInput extends React.Component<{
    initialValue: number;
}, {
    defaultValue: number;
}> {
    constructor(props: {
        initialValue: number;
    });
    render(): JSX.Element;
    private handleClick;
}
export declare class StatefulUnctontrolledNumberInputDriver extends DriverBase {
    static ComponentClass: typeof StatefulUncontrolledNumberInput;
    readonly input: Element;
    click(): void;
}
