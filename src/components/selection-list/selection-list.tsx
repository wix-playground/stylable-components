import keycode = require('keycode');
import React = require('react');
import {noop} from '../../utils';
import {BasicList, BasicListProps, ItemValue} from './basic-list';
import {OptionList, renderDataSource} from './data-source';
import {ListNavigation} from './list-navigation';
import listStyle from './selection-list.st.css';

export {divider, Divider} from './divider';
export {Option} from './option';

export interface SelectionListProps extends OptionList, BasicListProps {}

export interface SelectionListState {
    focused: boolean;
    focusedValue?: ItemValue;
}

export class SelectionList extends React.Component<SelectionListProps, {}> {
    public static defaultProps: SelectionListProps = {
        onChange: noop,
        tabIndex: -1
    };

    public state: SelectionListState = {
        focused: false,
        focusedValue: undefined
    };

    private itemNodes: React.ReactNode[] = [];
    private navigation: ListNavigation;

    public componentWillMount() {
        this.populateItemsFromProps(this.props);
        this.setState({focusedValue: this.props.value});
    }

    public componentWillReceiveProps(nextProps: SelectionListProps) {
        this.populateItemsFromProps(nextProps);
        this.setState({focusedValue: nextProps.value});
    }

    public render() {
        const {dataSource, dataSchema, renderItem, children, ...passThroughProps} = this.props;

        return (
            <BasicList
                {...passThroughProps}
                focused={this.state.focused}
                focusedValue={this.state.focusedValue}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
            >
                {this.itemNodes}
            </BasicList>
        );
    }

    public populateItemsFromProps(props: SelectionListProps & {children?: React.ReactNode}) {
        this.itemNodes = [props.children, renderDataSource(props)];
        this.navigation = new ListNavigation(this.itemNodes);
    }

    private handleFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.setState({focused: true});
    }

    private handleBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.setState({focused: false});
    }

    private handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
        this.navigation.focusValue(this.state.focusedValue || this.props.value);

        switch (event.keyCode) {
            case keycode('enter'):
            case keycode('space'):
                event.preventDefault();
                if (this.navigation.getFocusedValue() !== undefined) {
                    this.props.onChange!(this.navigation.getFocusedValue());
                }
                break;

            case keycode('up'):
                event.preventDefault();
                this.navigation.focusPrevious();
                this.setState({focusedValue: this.navigation.getFocusedValue()});
                break;

            case keycode('down'):
                event.preventDefault();
                this.navigation.focusNext();
                this.setState({focusedValue: this.navigation.getFocusedValue()});
                break;

            case keycode('home'):
                event.preventDefault();
                this.navigation.focusFirst();
                this.setState({focusedValue: this.navigation.getFocusedValue()});
                break;

            case keycode('end'):
                event.preventDefault();
                this.navigation.focusLast();
                this.setState({focusedValue: this.navigation.getFocusedValue()});
                break;
        }
    }
}
