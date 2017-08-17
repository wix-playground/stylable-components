import keycode = require('keycode');
import React = require('react');
import {noop} from '../../utils';
import {BasicList, BasicListProps, getFocusableItemValues, ItemValue} from './basic-list';
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

    private items: React.ReactNode[] = [];
    private focusableItemValues: ItemValue[] = [];

    public componentWillMount() {
        this.populateItems(this.props);
        this.setState({focusedValue: this.props.value});
    }

    public componentWillReceiveProps(nextProps: SelectionListProps) {
        this.populateItems(nextProps);
        this.setState({focusedValue: nextProps.value});
    }

    public render() {
        const {dataSource, dataSchema, renderItem, children, ...rest} = this.props;

        return (
            <BasicList
                {...rest}
                focused={this.state.focused}
                focusedValue={this.state.focusedValue}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
            >
                {this.items}
            </BasicList>
        );
    }

    // TODO: fix any here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    public populateItems(props: any) {
        this.items = [props.children, renderDataSource(props)];
        this.focusableItemValues = getFocusableItemValues(this.items);
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
                if (this.state.focusedValue !== undefined) {
                    this.props.onChange!(this.state.focusedValue);
                }
                break;
            default:
                const nav = new ListNavigation(this.focusableItemValues);
                nav.focusValue(this.state.focusedValue || this.props.value);
                if (nav.handleKeydown(event)) {
                    event.preventDefault();
                    this.setState({focusedValue: nav.getFocusedValue()});
                }
        }
    }
}
