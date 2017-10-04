import React = require('react');
import ReactDOM = require('react-dom');
import {globalId, properties, stylable} from 'wix-react-tools';
import {noop} from '../../utils';
import {SelectionListItem} from './selection-list-model';
import listStyle from './selection-list.st.css';

function closestElementMatching(predicate: (element: Element) => boolean, startAt: Element): Element | null {
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
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onClick?: (event: React.MouseEvent<HTMLElement>, itemIndex: number) => void;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onMouseDown?: (event: React.MouseEvent<HTMLElement>, itemIndex: number) => void;
    tabIndex?: number;

    // Component-specific props
    focused?: boolean;
    focusedIndex?: number;
    items?: SelectionListItem[];
    selectedIndex?: number;
}

interface ItemWrapperProps {
    id: string;
    item: SelectionListItem;
    focused: boolean;
    selected: boolean;
}

@stylable(listStyle)
@properties
export class SelectionListView extends React.Component<ViewProps> {
    public static defaultProps: ViewProps = {
        onBlur: noop,
        onClick: noop,
        onFocus: noop,
        onKeyDown: noop,
        onMouseDown: noop,

        focused: false,
        focusedIndex: -1,
        items: [],
        selectedIndex: -1
    };

    public render() {
        return (
            <div
                className="list"
                data-automation-id="LIST"
                role="listbox"
                aria-orientation="vertical"
                aria-activedescendant={
                    this.props.focusedIndex! > -1 ? this.itemId(this.props.focusedIndex!) : undefined
                }
                style-state={{focused: this.props.focused!}}
                onBlur={this.props.onBlur}
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onFocus={this.props.onFocus}
                onKeyDown={this.props.onKeyDown}
                tabIndex={this.props.tabIndex}
            >
                {this.props.items!.map((item, index) =>
                    <ItemWrapper
                        key={index}
                        id={this.itemId(index)}
                        item={item}
                        focused={index === this.props.focusedIndex}
                        selected={index === this.props.selectedIndex}
                    />
                )}
            </div>
        );
    }

    protected itemId(index: number): string {
        return globalId.getLocalId(globalId.getRootId(this), String(index));
    }

    protected itemIndexFromElement(element: Element): number {
        const rootElement = ReactDOM.findDOMNode(this);
        const itemElement = closestElementMatching(el => el.parentElement === rootElement, element);
        return itemElement ? getChildIndex(itemElement) : -1;
    }

    protected handleClick: React.MouseEventHandler<HTMLElement> = event => {
        const index = this.itemIndexFromElement(event.target as Element);
        const item = index > -1 ? this.props.items![index] : null;
        this.props.onClick!(event, item && item.selectable ? index : -1);
    }

    protected handleMouseDown: React.MouseEventHandler<HTMLElement> = event => {
        const index = this.itemIndexFromElement(event.target as Element);
        const item = index > -1 ? this.props.items![index] : null;
        if (item && item.disabled) {
            event.preventDefault();
        }
        this.props.onMouseDown!(event, item && item.selectable ? index : -1);
    }
}

class ItemWrapper extends React.Component<ItemWrapperProps> {
    public componentDidUpdate() {
        if (this.props.focused) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollIntoView({behavior: 'instant', block: 'nearest', inline: 'nearest'});
        }
    }

    public render() {
        const item = this.props.item;
        if (item.isOption) {
            return React.cloneElement(item.element, {
                id: this.props.id,
                focused:  this.props.focused,
                selected: this.props.selected
            });
        }
        return item.element;
    }
}
