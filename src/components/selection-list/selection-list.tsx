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
    SelectionListModel
} from './selection-list-model';
import {SelectionListView} from './selection-list-view';

export interface SelectionListProps extends OptionList, FormInputProps<SelectionListItemValue>, properties.Props {
    onChange?: (event: ChangeEvent<SelectionListItemValue>) => void;
    tabIndex?: number;
    value?: SelectionListItemValue;
}

@properties
@observer
export class SelectionList extends React.Component<SelectionListProps> {
    public static defaultProps: SelectionListProps = {
        onChange: noop,
        tabIndex: -1
    };

    @observable private focused: boolean = false;
    private disposers = new Disposers();

    // Wrapping props with @computed allows to observe them independently from other props.
    @computed private get children()   { return this.props.children; }
    @computed private get dataSource() { return this.props.dataSource; }
    @computed private get dataMapper() { return this.props.dataMapper; }
    @computed private get renderItem() { return this.props.renderItem; }
    @computed private get value()      { return this.props.value; }

    @computed private get items() {
        return selectionListItemsFromProps({
            dataSource: this.dataSource,
            dataMapper: this.dataMapper,
            renderItem: this.renderItem,
            children: this.children
        });
    }

    @computed private get list() {
        return new SelectionListModel(this.items);
    }

    public componentWillMount() {
        this.disposers.set(autorun(() => {
            this.list.selectValue(this.value);
            untracked(() => {
                if (this.focused) {
                    this.list.focusSelected();
                }
            });
        }));

        // Autorun will not run during SSR
        this.list.selectValue(this.value);
    }

    public componentWillUnmount() {
        this.disposers.disposeAll();
    }

    public render() {
        return (
            <SelectionListView
                list={this.list}
                focused={this.focused}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
                onMouseDown={this.handleMouseDown}
                style={this.props.style}
                tabIndex={this.props.tabIndex}
            />
        );
    }

    private handleFocus: React.FocusEventHandler<HTMLElement> = () => {
        this.focused = true;
        if (this.list.focusedIndex === -1) {
            this.list.focusSelected();
        }
    }

    private handleBlur: React.FocusEventHandler<HTMLElement> = () => {
        this.focused = false;
        this.list.focusIndex(-1);
    }

    private handleMouseDown = (event: React.MouseEvent<HTMLElement>, itemIndex: number) => {
        if (!event.defaultPrevented) {
            if (event.button === 0 && itemIndex > -1) {
                this.list.focusIndex(itemIndex);
            }
            this.focused = true;
        }
    }

    private handleClick = (event: React.MouseEvent<HTMLElement>, itemIndex: number) => {
        if (event.button === 0 && itemIndex > -1) {
            this.triggerChange(itemIndex);
        }
    }

    private triggerChange(itemIndex: number) {
        if (itemIndex > -1) {
            const item = this.list.items[itemIndex];
            if (item.selectable && !item.selected) {
                this.props.onChange!({value: item.value});
            }
        }
    }

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
        // It's important to not prevent default on Up/Down press if the focus didn't actually change,
        // because we want to be able to scroll to the very end even when the list has a bunch of disabled items at
        // the bottom.
        // At the same time, pressing PgUp/PgDown while the list is focused shouldn't cause page scroll - this is how
        // the native component works.

        switch (event.keyCode) {
            case keycode('enter'):
            case keycode('space'):
                event.preventDefault();
                this.triggerChange(this.list.focusedIndex);
                break;

            case keycode('up'):
                if (this.list.focusPrevious()) {
                    event.preventDefault();
                }
                break;

            case keycode('down'):
                if (this.list.focusNext()) {
                    event.preventDefault();
                }
                break;

            case keycode('home'):
                event.preventDefault();
                this.list.focusFirst();
                break;

            case keycode('end'):
                event.preventDefault();
                this.list.focusLast();
                break;

            default:
                this.list.focusUsingTypeAhead(event);
        }
    }
}
