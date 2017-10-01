/// <reference types="react" />
import * as React from 'react';
import { properties } from 'wix-react-tools';
import { ChangeEvent } from '../../types/events';
import { FormInputProps } from '../../types/forms';
import { OptionList } from '../selection-list';
export interface DropDownProps extends OptionList, FormInputProps<string>, properties.Props {
    open?: boolean;
    disabled?: boolean;
    openOnFocus?: boolean;
    children?: React.ReactNode;
    toggleIcon?: React.ComponentType;
    tabIndex?: number;
}
export interface DropDownState {
    dropdown: HTMLDivElement | null;
    open: boolean;
}
export declare class DropDown extends React.PureComponent<DropDownProps, DropDownState> {
    static defaultProps: DropDownProps;
    state: DropDownState;
    onItemClick: (e: ChangeEvent<string>) => void;
    render(): JSX.Element;
    private onFocus;
    private toggleDropdown;
    private openDropdown();
    private closeDropdown();
    private onKeyDown;
}
