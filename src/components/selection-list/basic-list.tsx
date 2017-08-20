import React = require('react');
import ReactDOM  = require('react-dom');
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {noop} from '../../utils';
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

export function getFocusableItemValues(nodes: React.ReactNode): ItemValue[] {
    const result: ItemValue[] = [];
    React.Children.forEach(nodes, node => {
        if (node && typeof node === 'object') {
            const element = node as React.ReactElement<any>;
            const value = element.props.value;
            const disabled = element.props.disabled;
            if (value !== undefined && !disabled) {
                result.push(value);
            }
        }
    });
    return result;
}

export interface BasicListProps {
    className?: string;
    focused?: boolean;
    focusedValue?: ItemValue;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onChange?: (value: ItemValue) => void;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    style?: React.CSSProperties;
    tabIndex?: number;
    value?: ItemValue;
}

@SBComponent(listStyle)
export class BasicList extends React.Component<BasicListProps, {}> {
    public static defaultProps = {
        onChange: noop
    };

    public render() {
        const mergedProps = root(this.props, {
            className: 'list',
            cssStates: {
                focused: this.props.focused
            }
        }) as React.HtmlHTMLAttributes<HTMLDivElement>;

        const children = React.Children.map(this.props.children, child => this.renderChild(child));

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

    private renderChild(node: React.ReactNode): React.ReactNode {
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
            this.props.onChange!(value);
        }
    }
}
