import React = require('react');
import {divider, Divider} from './divider';
import {Option} from './option';

function renameKeys(data: {[index: string]: any}, schema: {[index: string]: string}): {[index: string]: any} {
    const result: {[index: string]: any} = {};
    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            result[key] = data[schema[key]];
        }
    }
    return result;
}

export type DataSourceItem = string | object;

export interface OptionList {
    dataSource?: DataSourceItem[];
    dataSchema?: {};
    renderItem?: (item: DataSourceItem) => React.ReactNode;
}

type DataSourceItemDefaultFormat = string | {
    value?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    hidden?: boolean;
};

function defaultRender(item: DataSourceItemDefaultFormat): React.ReactNode {
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

export function renderDataSource({dataSource = [], dataSchema, renderItem = defaultRender}: OptionList) {
    return dataSource.map(item =>
        renderItem(dataSchema && typeof item === 'object' ? renameKeys(item, dataSchema) : item)
    );
}
