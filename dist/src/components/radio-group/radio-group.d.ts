/// <reference types="react" />
import * as React from 'react';
import { properties } from 'wix-react-tools';
import { FormInputProps } from '../../types/forms';
export interface RadioGroupDataSchemaProps {
    disabled?: boolean;
    readOnly?: boolean;
    value: string;
    labelText?: string;
}
export interface RadioGroupProps extends FormInputProps<string>, properties.Props {
    children?: any;
    dataSource?: RadioGroupDataSchemaProps[];
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    tabIndex?: number;
    className?: string;
}
export interface RadioState {
    checked: boolean;
}
export declare class RadioGroup extends React.Component<RadioGroupProps> {
    static defaultProps: Partial<RadioGroupProps>;
    private name;
    private checkedArray;
    constructor(props: RadioGroupProps);
    render(): JSX.Element;
    private initCheckedArray(dataArray, isChildren?);
    private childrenOnClick(index);
    private createChildrenFromDataSource();
    private createChildren(dataArray);
    readonly isGroupChecked: boolean;
    private getChildTabIndex;
}
