import React = require('react');
import ReactDOM  = require('react-dom');
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {clamp} from '../../utils';
import listStyle from './selection-list.st.css';

export type ItemValue = string;

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

export interface BasicListProps {
    value?: ItemValue;
    focusedValue?: ItemValue;
    focused?: boolean;
    style?: any;
    className?: string;
    tabIndex?: number;
    onChange?: (value: ItemValue) => void;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
}

@SBComponent(listStyle)
export class BasicList extends React.Component<BasicListProps, {}> {
    private focusableItemValues: ItemValue[] = [];

    public render() {
        const mergedProps = root(this.props, {
            className: 'list',
            cssStates: {
                focused: this.props.focused
            }
        }) as React.HtmlHTMLAttributes<HTMLDivElement>;

        const children = React.Children.map(this.props.children, child => this.augmentChild(child));
        this.focusableItemValues = this.getFocusableItemValuesFromChildren(children);

        return (
            <div
                className={mergedProps.className}
                cssStates={mergedProps.cssStates}
                style={this.props.style}
                tabIndex={this.props.tabIndex}
                onClick={this.handleClick}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onKeyDown={this.props.onKeyDown}
                data-automation-id="LIST"
            >
                {children}
            </div>
        );
    }

    public getFirstFocusableValue() {
        return this.focusableItemValues[0];
    }

    public getLastFocusableValue() {
        return this.focusableItemValues[this.focusableItemValues.length - 1];
    }

    public getPreviousFocusableValue() {
        return this.getAdjacentFocusable(-1);
    }

    public getNextFocusableValue() {
        return this.getAdjacentFocusable(1);
    }

    public getAdjacentFocusable(distance: number) {
        const values = this.focusableItemValues;
        const focusedValue = this.props.focusedValue;
        const focusedIndex = (focusedValue === undefined) ? -1 : values.indexOf(focusedValue);
        if (focusedIndex === -1) {
            return distance > 0 ? this.getFirstFocusableValue() : this.getLastFocusableValue();
        } else {
            return values[clamp(focusedIndex + distance, 0, values.length - 1)];
        }
    }

    private augmentChild(node: React.ReactNode): React.ReactNode {
        if (node && typeof node === 'object') {
            const element = node as React.ReactElement<any>;
            const value = element.props.value;
            if (value !== undefined) {
                const selected = value === this.props.value;
                const focused = value === this.props.focusedValue && this.props.focused;
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

    private selectValue(value: ItemValue) {
        this.props.onChange && this.props.onChange(value);
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
}
