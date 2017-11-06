import {observer} from 'mobx-react';
import React = require('react');
import ReactDOM = require('react-dom');
import {globalId, properties, stylable} from 'wix-react-tools';
import {noop} from '../../utils';
import {SelectionListItem, SelectionListModel} from './selection-list-model';
import listStyle from './selection-list.st.css';

function closestElementMatching(predicate: (element: Element) => boolean, startAt: Element): Element | null {
    let current: Element | null = startAt;
    while (current && !predicate(current)) {
        current = current.parentElement;
    }
    return current;
}

export interface SelectionListViewProps extends properties.Props {
    // Standard props
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onClick?: (event: React.MouseEvent<HTMLElement>, itemIndex: number) => void;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onMouseDown?: (event: React.MouseEvent<HTMLElement>, itemIndex: number) => void;
    tabIndex?: number;

    // Component-specific props
    focused?: boolean;
    list?: SelectionListModel;
}

@stylable(listStyle)
@properties
@observer
export class SelectionListView extends React.Component<SelectionListViewProps> {
    public static defaultProps: Partial<SelectionListViewProps> = {
        onBlur: noop,
        onClick: noop,
        onFocus: noop,
        onKeyDown: noop,
        onMouseDown: noop,
        focused: false,
        list: new SelectionListModel([])
    };

    public render() {
        const list = this.props.list!;
        const items = list.items;
        const focused = this.props.focused;
        const focusedIndex = list.focusedIndex;
        const hasSelection = list.hasSelection();

        return (
            <div
                data-automation-id="LIST"
                role="listbox"
                aria-orientation="vertical"
                aria-activedescendant={
                    focusedIndex > -1 ? this.itemId(focusedIndex) : undefined
                }
                style-state={{focused, hasSelection}}
                onBlur={this.props.onBlur}
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onFocus={this.props.onFocus}
                onKeyDown={this.props.onKeyDown}
                tabIndex={this.props.tabIndex}
            >
                {items.map((item, index) =>
                    <ItemWrapper key={index} id={this.itemId(index)} item={item} />
                )}
            </div>
        );
    }

    public componentDidMount() {
        // The native component automatically scrolls to the selected value on initialization.
        this.scrollToItem(this.props.list!.selectedIndex);
    }

    public componentDidUpdate() {
        this.scrollToItem(this.props.list!.focusedIndex);
    }

    protected scrollToItem(index: number) {
        if (index === -1) {
            return;
        }

        const listNode = ReactDOM.findDOMNode(this);
        if (listNode.clientHeight >= listNode.scrollHeight) {
            return;
        }

        const itemNode = document.getElementById(this.itemId(index));
        if (!itemNode) {
            return;
        }

        const listBox = listNode.getBoundingClientRect();
        const itemBox = itemNode.getBoundingClientRect();

        if (itemBox.top < listBox.top) {
            listNode.scrollTop += itemBox.top - listBox.top;
        } else if (itemBox.bottom > listBox.bottom) {
            listNode.scrollTop += itemBox.bottom - listBox.bottom;
        }
    }

    // The id attribute serves dual purpose: it's used for accessibility in combination with aria-activedescendant,
    // and for finding an item corresponding to the DOM node on click or touch.
    protected itemId(index: number): string {
        return globalId.getRootId(this) + '-' + index;
    }

    protected itemIndexFromElement(element: Element): number {
        const rootElement = ReactDOM.findDOMNode(this);
        const itemElement = closestElementMatching(el => el.parentElement === rootElement, element);
        return itemElement ? Number(itemElement.id.replace(/.*(\d+)$/, '$1')) : -1;
    }

    protected handleClick: React.MouseEventHandler<HTMLElement> = event => {
        const index = this.itemIndexFromElement(event.target as Element);
        const item = index > -1 ? this.props.list!.items[index] : null;
        this.props.onClick!(event, item && item.selectable ? index : -1);
    }

    protected handleMouseDown: React.MouseEventHandler<HTMLElement> = event => {
        const index = this.itemIndexFromElement(event.target as Element);
        const item = index > -1 ? this.props.list!.items[index] : null;
        if (item && item.disabled) {
            // Prevent the component from gaining focus when a disabled item is clicked.
            // This replicates the native <select multiple /> behaviour.
            event.preventDefault();
        }
        this.props.onMouseDown!(event, item && item.selectable ? index : -1);
    }
}

// Since we don't require item components to be observers, we need to wrap them.
@observer
class ItemWrapper extends React.Component<{item: SelectionListItem, id: string}> {
    public render() {
        return this.props.item.render(this.props.id);
    }
}
