import {expr} from 'mobx';
import {observer} from 'mobx-react';
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

@observer
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
                {this.props.list.items.map((item, index) =>
                    <ItemWrapper key={index} list={this.props.list} item={item} />
                )}
            </div>
        );
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

@observer
class ItemWrapper extends React.Component<{item: Item, list: Model}, {}> {
    public render() {
        const {item, list} = this.props;
        if (item.selectable) {
            return React.cloneElement(item.element, {
                selected: expr(() => item.value === list.selectedValue),
                focused:  expr(() => item.value === list.focusedValue)
            });
        }
        return item.element;
    }
}
