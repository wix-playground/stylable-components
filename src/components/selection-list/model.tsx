import React = require('react');
import {clamp} from '../../utils/clamp';
import {divider, Divider} from './divider';
import {Option} from './option';

export type DataSourceItem = string | object;
export type ItemValue = string;
export type ItemData = DataSourceItem | React.ReactElement<any>;

export interface OptionList {
    dataSource?: DataSourceItem[];
    dataSchema?: {};
    renderItem?: (item: DataSourceItem) => React.ReactElement<any> | null;
}

export interface Item {
    data: ItemData;
    value: ItemValue;
    disabled: boolean;
    element: React.ReactElement<any>;
    selectable: boolean;
    isOption: boolean;
}

type DataSourceItemDefaultFormat = string | {
    value?: ItemValue;
    label?: string | React.ReactElement<any>;
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

function defaultRenderItem(item: DataSourceItemDefaultFormat): React.ReactElement<any> | null {
    if (typeof item === 'string') {
        item = {value: item, label: item};
    }

    if (item === divider) {
        return <Divider />;
    } else if (item.hidden) {
        return null;
    }
    return <Option value={item.value} disabled={item.disabled}>{item.label}</Option>;
}

export class Model {
    public items: Item[] = [];

    public selectedValue: ItemValue | undefined = undefined;
    public focusedValue: ItemValue | undefined = undefined;

    private selectableValues: ItemValue[] = [];

    public addDataSource({dataSource = [], dataSchema, renderItem = defaultRenderItem}: OptionList) {
        dataSource.forEach(data => {
            const element = renderItem(dataSchema && typeof data === 'object' ? renameKeys(data, dataSchema) : data);
            if (element) {
                const {value, disabled} = element.props;
                this.addItem({
                    data,
                    value,
                    disabled: Boolean(disabled),
                    element,
                    selectable: value !== undefined && !disabled,
                    isOption: value !== undefined
                });
            }
        });
    }

    public addChildren(children: React.ReactNode) {
        React.Children.forEach(children, element => {
            if (typeof element === 'object') {
                const {value, disabled} = element.props;
                this.addItem({
                    data: element,
                    value,
                    disabled: Boolean(disabled),
                    element,
                    selectable: value !== undefined && !disabled,
                    isOption: value !== undefined
                });
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

    private getFocusedIndex() {
        return this.focusedValue === undefined ? -1 : this.selectableValues.indexOf(this.focusedValue);
    }

    private focusIndex(index: number) {
        this.focusedValue = this.selectableValues[clamp(index, 0, this.selectableValues.length - 1)];
    }

    private addItem(item: Item) {
        this.items.push(item);
        if (item.selectable) {
            this.selectableValues.push(item.value);
        }
    }

    private findItemByValue(value: ItemValue): Item | undefined {
        return this.items.find(item => item.value === value);
    }
}
