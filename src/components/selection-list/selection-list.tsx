import keycode = require('keycode');
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {SBComponent, SBStateless} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import clamp from '../../common/clamp';
import listStyle from './selection-list.st.css';

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

export type SelectionItem = string | object;

export type SelectionItemDefaultFormat = string | {
    value?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    hidden?: boolean;
};

const renderItem = (item: SelectionItemDefaultFormat): React.ReactNode => {
    if (item === divider) {
        return <div className="divider" data-automation-id="DIVIDER" />;
    }

    if (typeof item === 'string') {
        item = {value: item, label: item};
    }

    return item.hidden ?
        null :
        <div className="item" data-value={item.value} data-disabled={item.disabled}>{item.label}</div>;
};

export interface OptionList {
    dataSource?: SelectionItem[];
    dataSchema?: {};
    renderItem?: (item: SelectionItem) => React.ReactNode;
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

@SBComponent(listStyle)
export class SelectionList extends React.Component<SelectionListProps, SelectionListState> {
    public static defaultProps: SelectionListProps = {
        dataSource: [],
        renderItem,
        onChange: () => {}
    };

    public state: SelectionListState = {
        focused: false,
        focusedValue: undefined
    };

    private focusableItemValues: string[] = [];

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'LIST',
            'data-focused': this.state.focused || undefined,
            'className': 'list',
            'tabIndex': -1,
            'onClick': this.handleClick,
            'onKeyDown': this.handleKeyDown,
            'onFocus': this.handleFocus,
            'onBlur': this.handleBlur
        }) as React.HtmlHTMLAttributes<HTMLDivElement>;

        const children = React.Children.map(
            [this.props.children, this.renderDataSource()],
            child => this.augmentChild(child)
        );

        this.focusableItemValues = this.getFocusableItemValuesFromChildren(children);

        return <div {...rootProps}>{children}</div>;
    }

    private renderDataSource(): React.ReactNode[] {
        const schema = this.props.dataSchema;
        const render = this.props.renderItem!;
        return this.props.dataSource!.map(item =>
            render(schema && typeof item === 'object' ? renameKeys(item, schema) : item)
        );
    }

    private augmentChild(node: React.ReactNode): React.ReactNode {
        if (node && typeof node === 'object') {
            const element = node as React.ReactElement<any>;
            const value = element.props['data-value'];
            if (value !== undefined) {
                const selected = value === this.props.value;
                const focused = value === this.state.focusedValue;
                if (focused || selected) {
                    return React.cloneElement(element, {
                        'data-selected': selected || undefined,
                        'data-focused':  focused || undefined
                    });
                }
            }
        }
        return node;
    }

    private getFocusableItemValuesFromChildren(nodes: React.ReactNode[]): any[] {
        const result = [];
        for (const node of nodes) {
            if (node && typeof node === 'object') {
                const element = node as React.ReactElement<any>;
                const value = element.props['data-value'];
                const disabled = element.props['data-disabled'];
                if (value !== undefined && !disabled) {
                    result.push(value);
                }
            }
        }
        return result;
    }

    private selectValue = (value: string) => {
        this.props.onChange!(value);
        this.setState({focusedValue: undefined});
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
        const disabled = item.dataset.disabled;
        if (!disabled && value !== undefined && value !== this.props.value) {
            this.selectValue(value);
        }
    }

    private handleFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.setState({focused: true, focusedValue: this.props.value});
    }

    private handleBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.setState({focused: false, focusedValue: undefined});
    }

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
        const values = this.focusableItemValues;
        const focusedValue = this.state.focusedValue || this.props.value;
        const focusedIndex = (focusedValue === undefined) ? -1 : values.indexOf(focusedValue);
        const maxIndex = values.length - 1;

        switch (event.keyCode) {
            case keycode('enter'):
            case keycode('space'):
                event.preventDefault();
                if (focusedValue !== undefined) {
                    this.selectValue(focusedValue);
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
