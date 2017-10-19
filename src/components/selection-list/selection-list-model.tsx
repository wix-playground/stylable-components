import {extendShallowObservable} from 'mobx';
import React = require('react');
import {clamp} from '../../utils/clamp';
import {SelectionListDivider, SelectionListDividerSymbol} from './divider';
import {SelectionListOption} from './option';

export type DataSourceItem = string | object | symbol;

export interface OptionList {
    dataSource?: DataSourceItem[];
    dataSchema?: {};
    renderItem?: (item: DataSourceItem) => JSX.Element | null;
}

export type SelectionListItemValue = string;
export type SelectionListItemData = DataSourceItem | JSX.Element;

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

type DataSourceItemDefaultFormat = string | {
    value?: SelectionListItemValue;
    label?: string | JSX.Element;
    disabled?: boolean;
    hidden?: boolean;
};

interface Dict<TValue> { [index: string]: TValue; }

function renameKeys(data: Dict<any>, schema: Dict<string>): Dict<any> {
    const result: Dict<any> = {};
    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            result[key] = data[schema[key]];
        }
    }
    return result;
}

function defaultRenderItem(item: DataSourceItemDefaultFormat): JSX.Element | null {
    if (typeof item === 'string') {
        item = {value: item, label: item};
    }

    if (item === SelectionListDividerSymbol) {
        return <SelectionListDivider />;
    } else if (item.hidden) {
        return null;
    }
    return (
        <SelectionListOption
            value={item.value}
            disabled={item.disabled}
        >
            {item.label}
        </SelectionListOption>
    );
}

export class SelectionListModel {
    public items: SelectionListItem[] = [];

    private selectableValues: SelectionListItemValue[] = [];
    private selectedValue: SelectionListItemValue | undefined = undefined;
    private focusedValue: SelectionListItemValue | undefined = undefined;

    public addDataSource({dataSource = [], dataSchema, renderItem = defaultRenderItem}: OptionList) {
        dataSource.forEach(data => {
            const element = renderItem(dataSchema && typeof data === 'object' ? renameKeys(data, dataSchema) : data);
            if (element) {
                this.addItem(data, element);
            }
        });
    }

    public addChildren(children: React.ReactNode) {
        React.Children.forEach(children, element => {
            if (typeof element === 'object') {
                this.addItem(element, element);
            }
        });
    }

    public focusFirst() {
        this.focusIndex(0);
    }

    public focusLast() {
        this.focusIndex(Infinity);
    }

    public focusPrevious() {
        const currentIndex = this.getFocusedIndex();
        this.focusIndex(currentIndex === -1 ? Infinity : currentIndex - 1);
    }

    public focusNext() {
        const currentIndex = this.getFocusedIndex();
        this.focusIndex(currentIndex === -1 ? 0 : currentIndex + 1);
    }

    public findItemByValue(value: SelectionListItemValue): SelectionListItem | undefined {
        return this.items.find(item => item.value === value);
    }

    public getSelectedValue(): SelectionListItemValue | undefined {
        return this.selectedValue;
    }

    public getFocusedValue(): SelectionListItemValue | undefined {
        return this.focusedValue;
    }

    public selectValue(value: SelectionListItemValue | undefined) {
        this.selectedValue = value;
        for (const item of this.items) {
            item.selected = (value !== undefined && item.value === value);
        }
    }

    public focusValue(value: SelectionListItemValue | undefined) {
        this.focusedValue = value;
        for (const item of this.items) {
            item.focused = (value !== undefined && item.value === value);
        }
    }

    private addItem(data: SelectionListItemData, element: JSX.Element) {
        const value = element.props.value;
        const disabled = Boolean(element.props.disabled);
        const item = extendShallowObservable(
            {
                data,
                disabled,
                element,
                isOption: value !== undefined,
                selectable: value !== undefined && !disabled,
                value
            }, {
                focused: false,
                selected: false
            }
        );

        this.items.push(item);
        if (item.selectable) {
            this.selectableValues.push(item.value);
        }
    }

    private getFocusedIndex() {
        return this.focusedValue === undefined ? -1 : this.selectableValues.indexOf(this.focusedValue);
    }

    private focusIndex(index: number) {
        this.focusValue(this.selectableValues[clamp(index, 0, this.selectableValues.length - 1)]);
    }
}
