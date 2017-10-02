import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React = require('react');
import ReactDOM = require('react-dom');
import {properties, stylable} from 'wix-react-tools';
import {noop} from '../../utils';
import {SelectionListItem, SelectionListItemValue, SelectionListModel} from './selection-list-model';
import listStyle from './selection-list.st.css';

function closestElementMatching(
    predicate: (element: Element) => boolean,
    startAt: Element
): Element | null {
    let current: Element | null = startAt;
    while (current && !predicate(current)) {
        current = current.parentElement;
    }
    return current;
}

function getChildIndex(child: Node) {
    let i = 0;
    while (child.previousSibling) {
        child = child.previousSibling;
        i += 1;
    }
    return i;
}

export interface ViewProps extends properties.Props {
    // Standard props
    name?: string;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onChange?: (index: number) => void;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onMouseDown?: React.MouseEventHandler<HTMLElement>;
    tabIndex?: number;

    // Component-specific props
    focused?: boolean;
    focusedIndex?: number;
    items?: SelectionListItem[];
    selectedIndex?: number;
}

export interface ItemState {
    focused: boolean;
    selected: boolean;
}

@observer
@stylable(listStyle)
@properties
export class SelectionListView extends React.Component<ViewProps> {
    public static defaultProps: ViewProps = {
        onBlur: noop,
        onChange: noop,
        onFocus: noop,
        onKeyDown: noop,
        onMouseDown: noop,

        focused: false,
        focusedIndex: -1,
        items: [],
        selectedIndex: -1
    };

    public render() {
        const itemStates = this.props.items!.map((item, index) => ({
            selected: item.isOption && index === this.props.selectedIndex,
            focused: item.isOption && index === this.props.focusedIndex
        }));

        return (
            <div
                className="list"
                data-automation-id="LIST"
                style-state={{focused: this.props.focused!}}
                onBlur={this.props.onBlur}
                onClick={this.handleClick}
                onMouseDown={this.props.onMouseDown}
                onFocus={this.props.onFocus}
                onKeyDown={this.props.onKeyDown}
                tabIndex={this.props.tabIndex}
            >
                {this.props.items!.map((item, index) =>
                    <ItemWrapper key={index} item={item} state={itemStates[index]} />
                )}
            </div>
        );
    }

    protected itemIndexFromElement(element: Element): number {
        const rootElement = ReactDOM.findDOMNode(this);
        const itemElement = closestElementMatching(el => el.parentElement === rootElement, element);
        return itemElement ? getChildIndex(itemElement) : -1;
    }

    protected handleClick: React.MouseEventHandler<HTMLElement> = event => {
        const index = this.itemIndexFromElement(event.target as Element);
        if (index > -1 && index !== this.props.selectedIndex && this.props.items![index].selectable) {
            this.props.onChange!(index);
        }
    }
}

class ItemWrapper extends React.Component<{item: SelectionListItem, state: ItemState}> {
    public componentDidUpdate() {
        if (this.props.state.focused) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollIntoView({behavior: 'instant', block: 'nearest', inline: 'nearest'});
        }
    }

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
