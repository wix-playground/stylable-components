import React = require('react');
import ReactDOM  = require('react-dom');
import keycode = require('keycode');
import {BasicList, ItemValue} from './basic-list';

export interface SelectableChildrenListProps {
    value?: ItemValue;
    onChange?: (value: ItemValue) => void;
    style?: any;
    className?: string;
    tabIndex?: number;
}

export interface SelectableChildrenListState {
    focused: boolean;
    focusedValue?: ItemValue;
}

export class SelectableChildrenList extends React.Component<SelectableChildrenListProps, SelectableChildrenListState> {
    public static defaultProps: SelectableChildrenListProps = {
        tabIndex: -1
    };

    public state: SelectableChildrenListState = {
        focused: false,
        focusedValue: undefined
    };

    private list: BasicList | null;

    public componentWillMount() {
        this.setState({focusedValue: this.props.value});
    }

    public componentWillReceiveProps(nextProps: SelectableChildrenListProps) {
        this.setState({focusedValue: nextProps.value});
    }

    public render() {
        return (
            <BasicList
                {...this.props}
                ref={ref => this.list = ref}
                focused={this.state.focused}
                focusedValue={this.state.focusedValue}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
            />
        );
    }

    private handleFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.setState({focused: true});
    }

    private handleBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.setState({focused: false});
    }

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
        if (!this.list) {
            return;
        }

        switch (event.keyCode) {
            case keycode('enter'):
            case keycode('space'):
                event.preventDefault();
                if (this.state.focusedValue !== undefined && this.props.onChange) {
                    this.props.onChange(this.state.focusedValue);
                }
                break;

            case keycode('up'):
                event.preventDefault();
                this.setState({focusedValue: this.list.getPreviousFocusableValue()});
                break;

            case keycode('down'):
                event.preventDefault();
                this.setState({focusedValue: this.list.getNextFocusableValue()});
                break;

            case keycode('home'):
                event.preventDefault();
                this.setState({focusedValue: this.list.getFirstFocusableValue()});
                break;

            case keycode('end'):
                event.preventDefault();
                this.setState({focusedValue: this.list.getLastFocusableValue()});
                break;
        }
    }
}
