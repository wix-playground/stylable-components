import keycode = require('keycode');
import {autorun, computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import React = require('react');
import {root} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {OptionList, SelectionListItemValue, SelectionListModel} from './selection-list-model';
import {SelectionListView} from './selection-list-view';

export interface Props extends OptionList, FormInputProps<SelectionListItemValue> {
    className?: string;
    onChange?: (event: ChangeEvent<SelectionListItemValue>) => void;
    style?: React.CSSProperties;
    tabIndex?: number;
    value?: SelectionListItemValue;
}

@observer
export class SelectionList extends React.Component<Props> {
    public static defaultProps: Props = {
        onChange: noop,
        tabIndex: -1
    };

    // Wrapping props with @computed allows to observe them independently from other props.
    @computed public get children()   { return this.props.children; }
    @computed public get dataSource() { return this.props.dataSource; }
    @computed public get dataSchema() { return this.props.dataSchema; }
    @computed public get renderItem() { return this.props.renderItem; }
    @computed public get value()      { return this.props.value; }

    @computed public get list(): SelectionListModel {
        const list = new SelectionListModel();
        list.addChildren(this.children);
        list.addDataSource(this);
        return list;
    }

    @observable public focused: boolean = false;

    public componentDidMount() {
        this.list.selectValue(this.value);
        this.list.focusValue(this.focused ? this.value : undefined);
    }

    public componentDidUpdate() {
        this.list.selectValue(this.value);
        this.list.focusValue(this.focused ? this.value : undefined);
    }

    public render() {
        return (
            <SelectionListView
                {...root(this.props, {className: ''})}
                focused={this.focused}
                list={this.list}
                onBlur={this.handleBlur}
                onChange={this.props.onChange}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
                style={this.props.style}
                tabIndex={this.props.tabIndex}
            />
        );
    }

    private handleFocus: React.FocusEventHandler<HTMLElement> = () => {
        this.focused = true;
    }

    private handleBlur: React.FocusEventHandler<HTMLElement> = () => {
        this.focused = false;
    }

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
        switch (event.keyCode) {
            case keycode('enter'):
            case keycode('space'):
                event.preventDefault();
                const focusedValue = this.list.getFocusedValue();
                if (focusedValue !== undefined) {
                    this.props.onChange!({value: focusedValue});
                }
                break;

            case keycode('up'):
                event.preventDefault();
                this.list.focusPrevious();
                break;

            case keycode('down'):
                event.preventDefault();
                this.list.focusNext();
                break;

            case keycode('home'):
                event.preventDefault();
                this.list.focusFirst();
                break;

            case keycode('end'):
                event.preventDefault();
                this.list.focusLast();
                break;
        }
    }
}
