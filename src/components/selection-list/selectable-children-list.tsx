import React = require('react');
import ReactDOM  = require('react-dom');
import keycode = require('keycode');
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {clamp} from '../../utils';
import listStyle from './selection-list.st.css';

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

export interface SelectableChildrenListProps {
    value?: string;
    onChange?: (value: string) => void;
    style?: any;
    className?: string;
    tabIndex?: number;
}

export interface SelectableChildrenListState {
    focused: boolean;
    focusedValue?: string;
}

@SBComponent(listStyle)
export class SelectableChildrenList extends React.Component<SelectableChildrenListProps, SelectableChildrenListState> {
    public static defaultProps: SelectableChildrenListProps = {
        tabIndex: -1,
        onChange: () => {}
    };

    public state: SelectableChildrenListState = {
        focused: false,
        focusedValue: undefined
    };

    private focusableItemValues: string[] = [];

    public componentWillReceiveProps(nextProps: SelectableChildrenListProps) {
        if (this.state.focused) {
            this.setState({focusedValue: nextProps.value});
        }
    }

    public render() {
        const children = React.Children.map(this.props.children, child => this.augmentChild(child));
        this.focusableItemValues = this.getFocusableItemValuesFromChildren(children);

        const rootProps = root(this.props, {
            className: 'list',
            cssStates: {
                focused: this.state.focused
            }
        }) as React.HtmlHTMLAttributes<HTMLDivElement>;

        return (
            <div
                {...rootProps}
                data-automation-id="LIST"
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                tabIndex={this.props.tabIndex}
            >
                {children}
            </div>
        );
    }

    private augmentChild(node: React.ReactNode): React.ReactNode {
        if (node && typeof node === 'object') {
            const element = node as React.ReactElement<any>;
            const value = element.props.value;
            if (value !== undefined) {
                const selected = value === this.props.value;
                const focused = value === this.state.focusedValue;
                if (focused || selected) {
                    return React.cloneElement(element, {selected, focused});
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
                const value = element.props.value;
                const disabled = element.props.disabled;
                if (value !== undefined && !disabled) {
                    result.push(value);
                }
            }
        }
        return result;
    }

    private selectValue = (value: string) => {
        this.props.onChange!(value);
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
