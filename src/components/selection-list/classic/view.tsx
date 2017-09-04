import React = require('react');
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {noop} from '../../../utils';
import listStyle from '../selection-list.st.css';
import {Item, ItemValue, Model} from './model';

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

export interface ViewProps {
    className?: string;
    focused?: boolean;
    list: Model;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onChange?: (value: ItemValue) => void;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    style?: React.CSSProperties;
    tabIndex?: number;
}

@SBComponent(listStyle)
export class View extends React.Component<ViewProps, {}> {
    public static defaultProps = {
        onChange: noop,
        onBlur: noop,
        onFocus: noop,
        onKeyDown: noop
    };

    public render() {
        const mergedProps = root(this.props, {
            className: 'list',
            cssStates: {
                focused: this.props.focused
            }
        }) as React.HtmlHTMLAttributes<HTMLDivElement>;

        return (
            <div
                className={mergedProps.className}
                cssStates={mergedProps.cssStates}
                data-automation-id="LIST"
                onBlur={this.props.onBlur}
                onClick={this.handleClick}
                onFocus={this.props.onFocus}
                onKeyDown={this.props.onKeyDown}
                style={this.props.style}
                tabIndex={this.props.tabIndex}
            >
                {this.props.list.items.map((item, index) => this.renderItem(item, index))}
            </div>
        );
    }

    private renderItem({element, selectable, value}: Item, index: number) {
        return selectable ?
            React.cloneElement(element, {
                key: index,
                selected: selectable && value === this.props.list.selectedValue,
                focused:  selectable && value === this.props.list.focusedValue
            }) :
            React.cloneElement(element, {key: index});
    }

    private handleClick: React.MouseEventHandler<HTMLElement> = event => {
        const item = closestElementMatching(
            el => el.parentElement === event.currentTarget,
            event.target as HTMLElement
        );
        if (!item) {
            return;
        }
        const value = item.dataset.value;
        const disabled = item.dataset.disabled;
        if (!disabled && value !== undefined && value !== this.props.list.selectedValue) {
            this.props.onChange!(value);
        }
    }
}
