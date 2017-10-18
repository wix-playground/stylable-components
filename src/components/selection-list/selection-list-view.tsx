import {observer} from 'mobx-react';
import React = require('react');
import {properties, stylable} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {SelectionListItem, SelectionListItemValue, SelectionListModel} from './selection-list-model';
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

export interface SelectionListViewProps extends FormInputProps<SelectionListItemValue> {
    className?: string;
    focused?: boolean;
    list: SelectionListModel;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onChange?: (event: ChangeEvent<SelectionListItemValue>) => void;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    style?: React.CSSProperties;
    tabIndex?: number;
}

@observer
@stylable(listStyle)
@properties
export class SelectionListView extends React.Component<SelectionListViewProps> {
    public static defaultProps: Partial<SelectionListViewProps> = {
        onChange: noop,
        onBlur: noop,
        onFocus: noop,
        onKeyDown: noop
    };

    public render() {
        return (
            <div
                data-automation-id="LIST"
                style-state={{focused: Boolean(this.props.focused)}}
                onBlur={this.props.onBlur}
                onClick={this.handleClick}
                onFocus={this.props.onFocus}
                onKeyDown={this.props.onKeyDown}
                tabIndex={this.props.tabIndex}
            >
                {this.props.list && this.props.list.items.map((item, index) =>
                    <ItemWrapper key={index} item={item} />
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
        if (value !== undefined && value !== this.props.list.getSelectedValue()) {
            this.props.onChange!({value});
        }
    }
}

@observer
class ItemWrapper extends React.Component<{item: SelectionListItem}> {
    public render() {
        const item = this.props.item;
        if (item.isOption) {
            return React.cloneElement(item.element, {
                focused:  item.focused,
                selected: item.selected
            });
        }
        return item.element;
    }
}
