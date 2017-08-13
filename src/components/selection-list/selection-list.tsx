import keycode = require('keycode');
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {SBComponent, SBStateless} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import clamp from '../../common/clamp';
import style from './selection-list.st.css';

export const divider = {};

function renameKeys(data: {[index: string]: any}, schema: {[index: string]: string}): {[index: string]: any} {
    const result: {[index: string]: any} = {};
    for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
            result[key] = data[schema[key]];
        }
    }
    return result;
}

function closestElementMatching(
    predicate: (element: HTMLElement) => boolean,
    startAt: HTMLElement
): HTMLElement | null {
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

export interface SelectionListState {
    focused: boolean;
    focusedValue?: string;
}

@SBComponent(style)
export class SelectionList extends React.Component<SelectionListProps, SelectionListState> {
    public static defaultProps: SelectionListProps = {
        dataSource: [],
        itemRenderer: DefaultItemRenderer,
        onChange: () => {}
    };

    public state: SelectionListState = {
        focused: false,
        focusedValue: undefined
    };

    private itemValues: string[] = [];

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'LIST',
            'className': 'list',
            'tabIndex': -1,
            'onClick': this.handleClick,
            'onKeyDown': this.handleKeyDown,
            'onFocus': this.handleFocus,
            'onBlur': this.handleBlur,
            'cssStates': {
                focused: this.state.focused
            }
        }) as React.HtmlHTMLAttributes<HTMLDivElement>;

        const dataSourceItems = this.props.dataSource!.map((item, index) =>
            this.renderDataSourceItem(item, index)
        );

        const childItems = React.Children.map(this.props.children, child => this.renderChildItem(child));

        return <div {...rootProps}>{dataSourceItems}{childItems}</div>;
    }

    private normalizeDataSourceItem(item: SelectionItem): {[index: string]: any} {
        if (item === divider) {
            return divider;
        }

        if (typeof item === 'string') {
            item = {value: item, label: item};
        }

        return this.props.dataSchema ?
            renameKeys(item, this.props.dataSchema) : item;
    }

    private renderDataSourceItem(item: SelectionItem, index: number): React.ReactNode {
        const ItemRenderer = this.props.itemRenderer!;
        const normalized = this.normalizeDataSourceItem(item);
        return (
            <ItemRenderer
                key={index}
                focused={normalized.value === this.state.focusedValue}
                selected={normalized.value === this.props.value}
                item={normalized}
            />
        );
    }

    private getValueFromChildItem(child: React.ReactNode): string | undefined {
        if (child && typeof child === 'object') {
            const value = (child as React.ReactElement<any>).props['data-value'];
            if (typeof value === 'string') {
                return value;
            }
        }
        return undefined;
    }

    private renderChildItem(child: React.ReactNode): React.ReactNode {
        if (this.props.value !== undefined &&
            this.getValueFromChildItem(child) === this.props.value
        ) {
            return React.cloneElement(
                child as React.ReactElement<any>,
                {
                    'data-selected': true
                }
            );
        }
        return child;
    }

    // The `data-value` attribute on the HTML element returned by the itemRenderer is the only source of truth
    // about the item's value, and we can only get it from DOM :(
    private getItemValuesFromDOM() {
        const rootNode = ReactDOM.findDOMNode(this);
        const children = Array.from(rootNode.children) as HTMLElement[];
        return children.map(elem => elem.dataset.value).filter(value => value !== undefined);
    }

    private handleFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.setState({focused: true, focusedValue: this.props.value});
    }

    private handleBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.setState({focused: false, focusedValue: undefined});
    }

    private handleClick: React.MouseEventHandler<HTMLElement> = event => {
        const rootNode = ReactDOM.findDOMNode(this);
        const item = closestElementMatching(
            el => el.parentElement === rootNode,
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
        this.setState({focusedValue: undefined});
    }

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
        const values = this.getItemValuesFromDOM();
        const focusedValue = this.state.focusedValue || this.props.value;
        const focusedIndex = (focusedValue === undefined) ? -1 : values.indexOf(focusedValue);
        const maxIndex = values.length - 1;

        switch (event.keyCode) {
            case keycode('enter'):
            case keycode('space'):
                event.preventDefault();
                if (focusedValue !== undefined) {
                    this.props.onChange!(focusedValue);
                }
                break;

            case keycode('up'):
                event.preventDefault();
                this.setState({
                    focusedValue:
                        focusedIndex > -1 ?
                            values[clamp(focusedIndex - 1, 0, maxIndex)] :
                            values[maxIndex]
                });
                break;

            case keycode('down'):
                event.preventDefault();
                this.setState({
                    focusedValue:
                        focusedIndex > -1 ?
                            values[clamp(focusedIndex + 1, 0, maxIndex)] :
                            values[0]
                });
                break;

            case keycode('home'):
                event.preventDefault();
                this.setState({focusedValue: values[0]});
                break;

            case keycode('end'):
                event.preventDefault();
                this.setState({focusedValue: values[maxIndex]});
                break;
        }
    }
}
