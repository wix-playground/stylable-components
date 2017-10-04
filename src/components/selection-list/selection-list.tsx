import keycode = require('keycode');
import {autorun, computed, observable, untracked} from 'mobx';
import {observer} from 'mobx-react';
import React = require('react');
import {Disposers, properties} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {OptionList, SelectionListItem, SelectionListItemValue, SelectionListModel} from './selection-list-model';
import {SelectionListView} from './selection-list-view';

export interface Props extends OptionList, FormInputProps<SelectionListItemValue> {
    children?: React.ReactNode;
    className?: string;
    onChange?: (event: ChangeEvent<SelectionListItemValue>) => void;
    style?: React.CSSProperties;
    tabIndex?: number;
    value?: SelectionListItemValue;
}

export interface State {
    focused: boolean;
    focusedIndex: number;
    items: SelectionListItem[];
    selectedIndex: number;
}

@properties
export class SelectionList extends React.Component<Props, State> {
    public static defaultProps: Props = {
        onChange: noop,
        tabIndex: -1
    };

    public state: State = {
        focused: false,
        focusedIndex: -1,
        items: [],
        selectedIndex: -1
    };

    public componentWillMount() {
        this.updateItems(this.props);
    }

    public componentWillReceiveProps(nextProps: Props) {
        this.updateItems(nextProps);
    }

    public render() {
        return (
            <SelectionListView
                focused={this.state.focused}
                focusedIndex={this.state.focusedIndex}
                items={this.state.items}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
                onMouseDown={this.handleMouseDown}
                selectedIndex={this.state.selectedIndex}
                style={this.props.style}
                tabIndex={this.props.tabIndex}
            />
        );
    }

    private updateItems(props: Props) {
        const list = new SelectionListModel();
        list.addChildren(props.children);
        list.addDataSource(props);
        const items = list.items;

        const selectedIndex = (props.value === undefined) ?
            -1 : items.findIndex(item => item.value === props.value);

        const focusedIndex = this.state.focused && selectedIndex > -1 && items[selectedIndex].selectable ?
            selectedIndex : -1;

        this.setState({items, selectedIndex, focusedIndex});
    }

    private handleFocus: React.FocusEventHandler<HTMLElement> = () => {
        const {items, selectedIndex} = this.state;
        const focusedIndex = this.state.focusedIndex > -1 ?
            this.state.focusedIndex :
            (selectedIndex > -1 && items[selectedIndex].selectable ? selectedIndex : -1);
        this.setState({focused: true, focusedIndex});
    }

    private handleBlur: React.FocusEventHandler<HTMLElement> = () => {
        this.setState({
            focused: false,
            focusedIndex: -1
        });
    }

    private handleMouseDown = (event: React.MouseEvent<HTMLElement>, itemIndex: number) => {
        if (itemIndex > -1) {
            this.setState({focusedIndex: itemIndex});
        }
    }

    private handleClick = (event: React.MouseEvent<HTMLElement>, itemIndex: number) => {
        if (itemIndex > -1 && itemIndex !== this.state.selectedIndex) {
            this.triggerChange(itemIndex);
        }
    }

    private triggerChange(itemIndex: number) {
        this.props.onChange!({value: this.state.items[itemIndex].value});
    }

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
        switch (event.keyCode) {
            case keycode('enter'):
            case keycode('space'):
                event.preventDefault();
                if (this.state.focusedIndex > -1) {
                    this.triggerChange(this.state.focusedIndex);
                }
                break;

            case keycode('up'):
                event.preventDefault();
                this.setState({focusedIndex: this.state.focusedIndex - 1});
                break;

            case keycode('down'):
                event.preventDefault();
                this.setState({focusedIndex: this.state.focusedIndex + 1});
                break;

            case keycode('home'):
                event.preventDefault();
                this.setState({focusedIndex: 0});
                break;

            case keycode('end'):
                event.preventDefault();
                this.setState({focusedIndex: this.state.items.length - 1});
                break;
        }
    }
}

function scan<T>(
    arr: T[],
    match: (item: T) => boolean,
    direction: number,
    startIndex: number,
    stopAfter: number = Infinity
) {
    const index = -1;
    const maxIndex = arr.length - 1;
    for (let i = startIndex; 0 <= i && i <= maxIndex; i += direction < 0 ? -1 : 1) {
        if (match(arr[i])) {
            return i;
        }
    }
    return -1;
}

// class SelectionListNav {
//     private index = -1;

//     constructor(private items: SelectionListItem[]) {}

//     public moveToValue(value: SelectionListItemValue): void {
//         this.index = scan(this.items, item => item.value === value);
//     }

//     public moveToIndex(index: number): void {
//         this.index = index;
//     }

//     public moveToBeginning(): void {
//         this.index = scan(this.items, item => item.selectable);
//     }

//     public moveToEnd(): void {
//         this.index = scan(this.items, item => item.selectable, this.items.length - 1, -1);
//     }

//     public moveToPrevious(): void {
//         if (this.index === -1) {
//             this.moveToEnd();
//         } else {
//             const index = scan(this.items, item => item.selectable, this.index + 1);
//         }
//     }

//     public moveToNext(): void {

//     }
// }
