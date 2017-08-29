import keycode = require('keycode');
import React = require('react');
import {noop} from '../../utils';
import {ItemValue, Model, OptionList} from './model';
import {View, ViewProps} from './view';

export interface Props extends OptionList {
    className?: string;
    onChange?: (value: ItemValue) => void;
    style?: React.CSSProperties;
    tabIndex?: number;
    value?: ItemValue;
}

export interface State {
    focused: boolean;
}

export class Standalone extends React.Component<Props, State> {
    public static defaultProps: Props = {
        onChange: noop,
        tabIndex: -1
    };

    public state: State = {
        focused: false
    };

    private list: Model;

    public componentWillMount() {
        this.list = this.createList(this.props);
    }

    public componentWillReceiveProps(nextProps: Props) {
        this.list = this.createList(nextProps);
    }

    public render() {
        return (
            <View
                className={this.props.className}
                focused={this.state.focused}
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

    public createList(props: Props & {children?: React.ReactNode}) {
        const list = new Model();
        list.addChildren(props.children);
        list.addDataSource(props);
        list.selectedValue = props.value;
        list.focusedValue = props.value;
        return list;
    }

    private handleFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.setState({focused: true});
    }

    private handleBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.setState({focused: false});
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
                this.forceUpdate();
                break;

            case keycode('down'):
                event.preventDefault();
                this.list.focusNext();
                this.forceUpdate();
                break;

            case keycode('home'):
                event.preventDefault();
                this.list.focusFirst();
                this.forceUpdate();
                break;

            case keycode('end'):
                event.preventDefault();
                this.list.focusLast();
                this.forceUpdate();
                break;
        }
    }
}
