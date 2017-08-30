import keycode = require('keycode');
import {autorun, computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import React = require('react');
import {noop} from '../../utils';
import {ItemValue, Model, OptionList} from './model';
import {View} from './view';

export interface Props extends OptionList {
    className?: string;
    onChange?: (value: ItemValue) => void;
    style?: React.CSSProperties;
    tabIndex?: number;
    value?: ItemValue;
}

@observer
export class Standalone extends React.Component<Props, {}> {
    public static defaultProps: Props = {
        onChange: noop,
        tabIndex: -1
    };

    @computed public get children()   { return this.props.children; }
    @computed public get dataSource() { return this.props.dataSource; }
    @computed public get dataSchema() { return this.props.dataSchema; }
    @computed public get renderItem() { return this.props.renderItem; }
    @computed public get value()      { return this.props.value; }

    @observable private focused: boolean = false;
    @observable private list: Model;

    public componentWillMount() {
        autorun(() => {
            const list = new Model();
            list.addChildren(this.children);
            list.addDataSource(this);
            this.list = list;
        });
        autorun(() => this.list.selectedValue = this.value);
        autorun(() => this.list.focusedValue = this.focused ? this.value : undefined);
    }

    public render() {
        return (
            <View
                className={this.props.className}
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

    private handleFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.focused = true;
    }

    private handleBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.focused = false;
    }

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
        switch (event.keyCode) {
            case keycode('enter'):
            case keycode('space'):
                event.preventDefault();
                if (this.list.focusedValue !== undefined) {
                    this.props.onChange!(this.list.focusedValue);
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
