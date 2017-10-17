import {extendShallowObservable} from 'mobx';
import React = require('react');
import {clamp} from '../../utils/clamp';
import {divider, Divider} from './divider';
import {Option} from './option';

export type SelectionListItemValue = string;

export interface SelectionListItem {
    item: DataSourceItem | React.ReactChild;
    isOption: boolean;
    selectable: boolean;
    render: (id: string, selected: boolean, focused: boolean) => JSX.Element | null;
    value?: SelectionListItemValue;
    disabled?: boolean;
    label?: string;
}

export type DataSourceItem = string | object | symbol;

export type DataSourceItemResolved = null | {
    value?: SelectionListItemValue;
    label?: string;
    disabled?: boolean;
};

export interface OptionList {
    dataSource?: DataSourceItem[];
    resolveItem?: (item: DataSourceItem) => DataSourceItemResolved;
    renderItem?: (props: {item: DataSourceItem, id: string, selected: boolean, focused: boolean}) => JSX.Element | null;
}

type DataSourceItemDefaultFormat = string | symbol | {
    value: SelectionListItemValue;
    label: string;
    disabled: boolean;
};

const defaultResolveItem = (item: DataSourceItem): DataSourceItemResolved => {
    if (typeof item === 'string') {
        return {value: item, label: item};
    }

    if (typeof item === 'object') {
        return item;
    }

    return null;
};

const defaultRenderItem = (
    {item, id, selected, focused}:
    {item: DataSourceItemDefaultFormat, id: string, selected: boolean, focused: boolean}
): JSX.Element | null => {
    if (item === divider) {
        return <Divider />;
    }

    if (typeof item === 'string') {
        item = {value: item, label: item, disabled: false};
    }

    if (typeof item === 'object') {
        return (
            <Option
                id={id}
                disabled={item.disabled}
                selected={selected}
                focused={focused}
            >
                {item.label}
            </Option>
        );
    }

    return null;
};

class SelectionListItemBasedOnDataSource implements SelectionListItem {
    public isOption: boolean = false;
    public selectable: boolean = false;
    public value?: SelectionListItemValue;
    public disabled?: boolean;
    public label?: string;

    constructor(
        public item: DataSourceItem,
        private resolveItem: OptionList['resolveItem'] = defaultResolveItem,
        private renderItem: OptionList['renderItem'] = defaultRenderItem
    ) {
        const resolved = resolveItem(item);
        if (resolved) {
            this.isOption = true;
            this.value = resolved.value;
            this.disabled = Boolean(resolved.disabled);
            this.label = resolved.label || '';
            this.selectable = !this.disabled;
        }
    }

    public render(id: string, selected: boolean, focused: boolean) {
        return this.renderItem!({item: this.item, id, selected, focused});
    }
}

class SelectionListItemBasedOnChild implements SelectionListItem {
    public isOption: boolean = false;
    public selectable: boolean = false;
    public value?: SelectionListItemValue;
    public disabled?: boolean;
    public label?: string;

    constructor(public item: React.ReactChild) {
        // We have no way of knowing if the child component supports selected and focused props. Let's assume that it
        // supports them if it has the value attribute, and otherwise treat it as a divider.
        if (typeof item === 'object' && item.props.value !== undefined) {
            this.isOption = true;
            this.value = item.props.value;
            this.disabled = Boolean(item.props.disabled);
            this.label = item.props.label || '';
            this.selectable = !this.disabled;
        }
    }

    public render(id: string, selected: boolean, focused: boolean) {
        return this.isOption && typeof this.item === 'object' ?
            React.cloneElement(this.item, {id, selected, focused}) : null;
    }
}

export function selectionListItemsFromDataSource(
    dataSource: OptionList['dataSource'] = [],
    resolveItem: OptionList['resolveItem'] = defaultResolveItem,
    renderItem: OptionList['renderItem'] = defaultRenderItem
): SelectionListItem[] {
    return dataSource.map(item => new SelectionListItemBasedOnDataSource(item, resolveItem, renderItem));
}

export function selectionListItemsFromChildren(children: React.ReactNode): SelectionListItem[] {
    return React.Children.map(children, item => new SelectionListItemBasedOnChild(item));
}

export function selectionListItemsFromProps(props: OptionList & {children?: React.ReactNode}): SelectionListItem[] {
    return selectionListItemsFromChildren(props.children || []).concat(
        selectionListItemsFromDataSource(props.dataSource, props.resolveItem, props.renderItem)
    );
}

export class SelectionListNav {
    public selectedIndex: number = -1;
    public focusedIndex: number = -1;

    constructor(private items: SelectionListItem[]) {}

    public selectValue(value: SelectionListItemValue | undefined) {
        this.selectedIndex = (value === undefined) ? -1 : this.items.findIndex(item => item.value === value);
    }

    public focusSelected() {
        this.focusedIndex =
            (this.selectedIndex > -1 && this.items[this.selectedIndex].selectable) ? this.selectedIndex : -1;
    }

    public blur() {
        this.focusedIndex = -1;
    }

    public typeAhead(character: string) {
        // not implemented
    }

    public focusFirst() {
        this.focusedIndex = this.findSelectable(0, 1);
    }

    public focusLast() {
        this.focusedIndex = this.findSelectable(this.items.length - 1, -1);
    }

    public focusPrevious() {
        if (this.focusedIndex === -1) {
            this.focusLast();
        } else {
            const index = this.findSelectable(this.focusedIndex - 1, -1);
            if (index !== -1) {
                this.focusedIndex = index;
            }
        }
    }

    public focusNext() {
        if (this.focusedIndex === -1) {
            this.focusFirst();
        } else {
            const index = this.findSelectable(this.focusedIndex + 1, 1);
            if (index !== -1) {
                this.focusedIndex = index;
            }
        }
    }

    private findSelectable(startIndex: number, step: number) {
        for (let i = startIndex; 0 <= i && i < this.items.length; i += step) {
            if (this.items[i].selectable) {
                return i;
            }
        }
        return -1;
    }
}
