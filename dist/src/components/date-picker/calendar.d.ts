/// <reference types="react" />
import * as React from 'react';
export interface CalendarProps {
    value: Date;
    selectedDate?: Date;
    focusedDate?: Date;
    startingDay?: number;
    highlightSelectedDate?: boolean;
    highlightFocusedDate?: boolean;
    onChange(date: Date): void;
    updateDropdownDate(date: Date): void;
}
export declare class Calendar extends React.Component<CalendarProps, {}> {
    render(): JSX.Element;
    private selectDay;
    readonly monthName: string;
    readonly year: number;
    readonly days: JSX.Element[];
    readonly dayNames: JSX.Element[];
    readonly previousDays: JSX.Element[];
    readonly followingDays: JSX.Element[];
    private isCurrentDay(day);
    private isSelected(day);
    private isFocused(day);
    private goToNextMonth;
    private goToPrevMonth;
}
