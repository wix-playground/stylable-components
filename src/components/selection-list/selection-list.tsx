import keycode = require('keycode');
import {autorun, computed, observable, untracked} from 'mobx';
import {observer} from 'mobx-react';
import React = require('react');
import {Disposers, properties} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {
    OptionList,
    SelectionListItem,
    selectionListItemsFromProps,
    SelectionListItemValue,
    SelectionListNav
} from './selection-list-model';
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
        const items = selectionListItemsFromProps(props);

        const selectedIndex = (props.value === undefined) ?
            -1 : items.findIndex(item => item.value === props.value);

        const selectedIsFocusable = (
            selectedIndex > -1 &&
            items[selectedIndex].isOption &&
            !items[selectedIndex].disabled
        );

        const focusedIndex = this.state.focused && selectedIsFocusable ? selectedIndex : -1;

        this.setState({items, selectedIndex, focusedIndex});
    }

    private handleFocus: React.FocusEventHandler<HTMLElement> = () => {
        const {items, selectedIndex, focusedIndex} = this.state;

        const selectedIsFocusable = (
            selectedIndex > -1 &&
            items[selectedIndex].isOption &&
            !items[selectedIndex].disabled
        );

        this.setState({
            focused: true,
            focusedIndex: focusedIndex > -1 ? focusedIndex : (selectedIsFocusable ? selectedIndex : -1)
        });
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
        const value = this.state.items[itemIndex].value;
        if (value !== undefined) {
            this.props.onChange!({value});
        }
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
