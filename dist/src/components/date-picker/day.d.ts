/// <reference types="react" />
import * as React from 'react';
import { properties } from 'wix-react-tools';
export interface DayProps extends properties.Props {
    day: number;
    selected?: boolean;
    currentDay?: boolean;
    focused?: boolean;
    partOfPrevMonth?: boolean;
    partOfNextMonth?: boolean;
    onSelect?(day: number): void;
}
export declare class Day extends React.Component<DayProps> {
    render(): JSX.Element;
    private onMouseDown;
}
