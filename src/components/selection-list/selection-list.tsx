import React = require('react');
import ReactDOM  = require('react-dom');
import {SBComponent, SBStateless} from 'stylable-react-component';
import {SelectableChildrenList, SelectableChildrenListProps} from './selectable-children-list';
import listStyle from './selection-list.st.css';

export type SelectionItem = string | object;

export type SelectionItemDefaultFormat = string | {
    value?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    hidden?: boolean;
};

export interface OptionProps {
    value?: string;
    disabled?: boolean;
    selected?: boolean;
    focused?: boolean;
}

export interface OptionList {
    dataSource?: SelectionItem[];
    dataSchema?: {};
    renderItem?: (item: SelectionItem) => React.ReactNode;
}

export interface SelectionListProps extends OptionList, SelectableChildrenListProps {}

function renameKeys(data: {[index: string]: any}, schema: {[index: string]: string}): {[index: string]: any} {
    const result: {[index: string]: any} = {};
    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            result[key] = data[schema[key]];
        }
    }
    return result;
}

export const divider = {};

export const Divider: React.SFC<{}> = SBStateless(
    () => <div className="divider" data-automation-id="DIVIDER" />,
    listStyle
);

@SBComponent(listStyle)
export class Option extends React.Component<OptionProps, {}> {
    public render() {
        const props = {
            cssStates: {
                disabled: this.props.disabled,
                selected: this.props.selected,
                focused:  this.props.focused
            }
        };

        return (
            <div
                className="item"
                data-value={this.props.value}
                data-disabled={this.props.disabled || undefined}
                {...props as React.HtmlHTMLAttributes<HTMLDivElement>}
            >
                {this.props.children}
            </div>
        );
    }
}

function defaultRenderItem(item: SelectionItemDefaultFormat): React.ReactNode {
    if (item === divider) {
        return <Divider />;
    }

    if (typeof item === 'string') {
        item = {value: item, label: item};
    }

    return item.hidden ?
        null :
        <Option value={item.value} disabled={item.disabled}>{item.label}</Option>;
}

function renderDataSource({dataSource = [], dataSchema, renderItem = defaultRenderItem}: OptionList) {
    return dataSource.map(item =>
        renderItem(dataSchema && typeof item === 'object' ? renameKeys(item, dataSchema) : item)
    );
}

export class SelectionList extends React.Component<SelectionListProps, {}> {
    public render() {
        const {dataSource, dataSchema, renderItem, children, ...attrs} = this.props;
        return (
            <SelectableChildrenList {...attrs}>
                {[children, renderDataSource({dataSource, dataSchema, renderItem})]}
            </SelectableChildrenList>
        );
    }
}
