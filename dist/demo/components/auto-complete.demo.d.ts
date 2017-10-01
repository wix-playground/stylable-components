/// <reference types="react" />
import * as React from 'react';
import { ChangeEvent } from '../../src/types/events';
export interface AutoCompleteDemoState {
    open: boolean;
    inputText: string;
}
export declare class AutoCompleteDemo extends React.Component<{}, AutoCompleteDemoState> {
    state: {
        open: boolean;
        inputText: string;
    };
    onChange: (e: ChangeEvent<string>) => void;
    updateOpenState: (e: ChangeEvent<boolean>) => void;
    render(): JSX.Element;
}
