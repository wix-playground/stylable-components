/// <reference types="react" />
import React = require('react');
export declare type DataSourceItem = string | object | symbol;
export interface OptionList {
    dataSource?: DataSourceItem[];
    dataSchema?: {};
    renderItem?: (item: DataSourceItem) => JSX.Element | null;
}
export declare type SelectionListItemValue = string;
export declare type SelectionListItemData = DataSourceItem | JSX.Element;
export interface SelectionListItem {
    data: SelectionListItemData;
    disabled: boolean;
    element: JSX.Element;
    focused: boolean;
    isOption: boolean;
    selectable: boolean;
    selected: boolean;
    value: SelectionListItemValue;
}
export declare class SelectionListModel {
    items: SelectionListItem[];
    private selectableValues;
    private selectedValue;
    private focusedValue;
    addDataSource({dataSource, dataSchema, renderItem}: OptionList): void;
    addChildren(children: React.ReactNode): void;
    focusFirst(): void;
    focusLast(): void;
    focusPrevious(): void;
    focusNext(): void;
    findItemByValue(value: SelectionListItemValue): SelectionListItem | undefined;
    getSelectedValue(): SelectionListItemValue | undefined;
    getFocusedValue(): SelectionListItemValue | undefined;
    selectValue(value: SelectionListItemValue | undefined): void;
    focusValue(value: SelectionListItemValue | undefined): void;
    private addItem(data, element);
    private getFocusedIndex();
    private focusIndex(index);
}
