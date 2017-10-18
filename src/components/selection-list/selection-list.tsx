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
    items: SelectionListItem[];
    nav: SelectionListNav;
}

@properties
export class SelectionList extends React.Component<Props, State> {
    public static defaultProps: Props = {
        onChange: noop,
        tabIndex: -1
    };

    public state: State = {
        focused: false,
        items: [],
        nav: new SelectionListNav([])
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
                focusedIndex={this.state.nav.focusedIndex}
                items={this.state.items}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
                onMouseDown={this.handleMouseDown}
                selectedIndex={this.state.nav.selectedIndex}
                style={this.props.style}
                tabIndex={this.props.tabIndex}
            />
        );
    }

    private updateItems(props: Props) {
        const items = selectionListItemsFromProps(props);
        const nav = new SelectionListNav(items);
        nav.selectValue(props.value);
        if (this.state.focused) {
            nav.focusSelected();
        }
        this.setState({items, nav});
    }

    private handleFocus: React.FocusEventHandler<HTMLElement> = () => {
        const nav = this.state.nav;
        // mouseDown fires before focus, so we may already have a focused item by now, in which case the focus
        // shouldn't move to the selected item.
        if (nav.focusedIndex === -1) {
            nav.focusSelected();
        }
        this.setState({focused: true, nav});
    }

    private handleBlur: React.FocusEventHandler<HTMLElement> = () => {
        const nav = this.state.nav;
        nav.blur();
        this.setState({focused: false, nav});
    }

    private handleMouseDown = (event: React.MouseEvent<HTMLElement>, itemIndex: number) => {
        if (itemIndex > -1) {
            this.state.nav.focusedIndex = itemIndex;
            this.setState({nav: this.state.nav});
        }
    }

    private handleClick = (event: React.MouseEvent<HTMLElement>, itemIndex: number) => {
        if (itemIndex > -1 && itemIndex !== this.state.nav.selectedIndex) {
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
        const nav = this.state.nav;

        switch (event.keyCode) {
            case keycode('enter'):
            case keycode('space'):
                event.preventDefault();
                if (nav.focusedIndex > -1) {
                    this.triggerChange(nav.focusedIndex);
                }
                break;

            case keycode('up'):
                event.preventDefault();
                nav.focusPrevious();
                this.setState({nav});
                break;

            case keycode('down'):
                event.preventDefault();
                nav.focusNext();
                this.setState({nav});
                break;

            case keycode('home'):
                event.preventDefault();
                nav.focusFirst();
                this.setState({nav});
                break;

            case keycode('end'):
                event.preventDefault();
                nav.focusLast();
                this.setState({nav});
                break;
        }
    }
}
