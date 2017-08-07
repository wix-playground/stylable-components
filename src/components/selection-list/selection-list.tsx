import React = require('react');
import ReactDOM = require('react-dom');
import {SBComponent, SBStateless} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import style from './selection-list.st.css';

export const divider = {};

function renameKeys(data: {[index: string]: any}, schema: {[index: string]: string}) {
    const result: {[index: string]: any} = {};
    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            result[key] = data[schema[key]];
        }
    }
    return result;
}

function closestElementMatching(predicate: (element: HTMLElement) => boolean, startAt: HTMLElement) {
    let current: HTMLElement | null = startAt;
    while (current && !predicate(current)) {
        current = current.parentElement;
    }
    return current;
}

export interface ItemRendererProps {
    focused: boolean;
    selected: boolean;
    item: any;
}

export interface DefaultItemRendererProps extends ItemRendererProps {
    item: {
        value?: string;
        label?: string;
        hidden?: boolean;
        disabled?: boolean;
    };
}

const DefaultItemRenderer: React.SFC<DefaultItemRendererProps> = SBStateless(props => {
    if (props.item === divider) {
        return <div className="divider" data-automation-id="DIVIDER" />;
    }

    if (props.item.hidden) {
        return null;
    }

    return (
        <div
            className="list-item"
            data-value={props.item.disabled! ? null : props.item.value}
            cssStates={{
                focused: props.focused,
                selected: props.selected,
                disabled: props.item.disabled!
            }}
        >
            {props.item.label}
        </div>
    );
}, style);

export type SelectionItem = string | object;

export interface OptionList {
    dataSource?: SelectionItem[];
    dataSchema?: {};
    itemRenderer?: React.ComponentType<ItemRendererProps>;
}

export interface SelectionListProps extends OptionList {
    value?: string;
    onChange?: (value: string) => void;
    style?: any;
    className?: string;
}

@SBComponent(style)
export class SelectionList extends React.Component<SelectionListProps, {}> {
    public static defaultProps: SelectionListProps = {
        dataSource: [],
        itemRenderer: DefaultItemRenderer,
        onChange: () => {}
    };

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'LIST',
            'className': 'list',
            'onClick': this.handleClick
        });

        const dataItems = this.props.dataSource!.map((item, index) =>
            this.renderDataItem(item, index)
        );

        const childItems = React.Children.map(this.props.children, child => this.renderChild(child));

        return (
            <div {...rootProps}>
                {dataItems}
                {childItems}
            </div>
        );
    }

    private normalizeItem(item: SelectionItem): {[index: string]: any} {
        if (item === divider) {
            return divider;
        }

        if (typeof item === 'string') {
            item = {value: item, label: item};
        }

        return this.props.dataSchema ?
            renameKeys(item, this.props.dataSchema) : item;
    }

    private renderDataItem(item: SelectionItem, index: number) {
        const ItemRenderer = this.props.itemRenderer!;
        const normalized = this.normalizeItem(item);
        return (
            <ItemRenderer
                key={index}
                focused={false}
                selected={normalized.value === this.props.value}
                item={normalized}
            />
        );
    }

    private readValueFromChild(child: React.ReactNode) {
        return child && typeof child === 'object' ?
            (child as React.ReactElement<any>).props['data-value'] :
            undefined;
    }

    private renderChild(child: React.ReactNode) {
        if (this.props.value !== undefined &&
            this.readValueFromChild(child) === this.props.value
        ) {
            return React.cloneElement(
                child as React.ReactElement<any>,
                {'data-selected': true}
            );
        }
        return child;
    }

    private handleClick: React.EventHandler<React.MouseEvent<HTMLElement>> = event => {
        const listRoot = ReactDOM.findDOMNode(this);
        const item = closestElementMatching(
            el => el.parentElement === listRoot,
            event.target as HTMLElement
        );
        if (!item) {
            return;
        }
        const value = item.dataset.value;
        if (value === undefined || value === this.props.value) {
            return;
        }
        this.props.onChange!(value);
    }
}
