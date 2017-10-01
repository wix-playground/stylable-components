/// <reference types="react" />
import * as React from 'react';
import { ChangeEvent } from '../../src/types/events';
export interface DropDownDemoState {
    selectedItem: string | undefined;
}
export declare class DropDownDemo extends React.Component<{}, DropDownDemoState> {
    state: {
        selectedItem: undefined;
    };
    onItemClick: (e: ChangeEvent<string>) => void;
    render(): JSX.Element;
}
