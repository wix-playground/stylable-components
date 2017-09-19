import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {Popup} from '../../';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {CaretDown} from '../drop-down/drop-down-icons';
import {OptionList, SelectionListItemValue, SelectionListModel} from '../selection-list/selection-list-model';
import {SelectionListView} from '../selection-list/selection-list-view';
import style from './auto-complete.st.css';

export type FilterPredicate = (item: string, filterString: string) => boolean;

export interface AutoCompleteProps extends FormInputProps<string>, Partial<OptionList>, properties.Props {
    open?: boolean;
    filter?: FilterPredicate;
    onOpenStateChange?: (e: ChangeEvent<boolean>) => void;
    maxCharacters?: number;
    maxSearchResults?: number;
    showNoSuggestions?: boolean;
    noSuggestionsNotice?: string | React.ReactElement<any>;
    allowFreeText?: boolean;
    disabled?: boolean;
}

export interface AutoCompleteState {
    input: HTMLInputElement | null;
}

const prefixFilter: FilterPredicate = (item: string, prefix: string) => {
    return item.toLowerCase().startsWith(prefix.toLowerCase());
};

@stylable(style)
@properties
export class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {
    public static defaultProps: AutoCompleteProps = {
        open: false,
        dataSource: [],
        value: '',
        filter: prefixFilter,
        onChange: noop,
        onOpenStateChange: noop,
        maxCharacters: 0,
        maxSearchResults: 0,
        showNoSuggestions: false,
        noSuggestionsNotice: 'No Results',
        allowFreeText: true,
        disabled: false
    };
    public state = {input: null, isOpen: this.props.open!};

    public render() {
        const ariaProps = {
            'aria-haspopup': true,
            'aria-expanded': this.props.open ? true : false
        };
        const items = this.getItems();
        const children = !items.length && this.props.showNoSuggestions ?
            this.addToChildren(this.addNoSuggestionsMsg()) :
            this.props.children;
        const list = new SelectionListModel();
        list.addChildren(children);
        list.addDataSource({dataSource: items});
        return (
            <div
                {...ariaProps}
                data-automation-id="AUTO_COMPLETE"
                role="combobox"
            >
                <input
                    className="input"
                    data-automation-id="AUTO_COMPLETE_INPUT"
                    type="text"
                    onChange={this.onChange}
                    value={this.props.value}
                    ref={this.refCallback}
                    disabled={this.props.disabled}
                    role="textbox"
                    {...{'aria-autocomplete': 'list'}}
                />
                <CaretDown onClick={this.onCaretClick} className="caret" data-automation-id="AUTO_COMPLETE_CARET"/>
                <Popup anchor={this.state.input} open={this.props.open && items!.length > 0}>
                    <SelectionListView
                        className="root auto-complete-list"
                        list={list}
                        onChange={this.onClick}
                    />
                </Popup>
            </div>
        );
    }

    private refCallback = (ref: HTMLInputElement) => {
        if (!this.state.input) {
            this.setState({input: ref});
        }
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.allowFreeText || this.getFilteredItems(e.target.value).length) {
            this.props.onChange!({value: e.target.value || ''});
            if (!this.props.value && !this.props.open) {
                this.props.onOpenStateChange!({value: !this.props.open!});
            }
        }
    }

    private onClick = (e: ChangeEvent<SelectionListItemValue>) => {
        this.props.onChange!(e);
        this.props.onOpenStateChange!({value: !this.props.open});
    }

    private onCaretClick = () => {
        this.props.onOpenStateChange!({value: !this.props.open});
    }

    private getFilteredItems(value: string): string[] {
        const items = this.props.dataSource!
            .filter((item: string) => this.props.filter!(item, value)) as string[];
        return this.props.maxSearchResults ? items.slice(0, this.props.maxSearchResults) : items;
    }

    private getItems(): string [] {
        const items = this.getFilteredItems(this.props.value!);
        return this.props.maxSearchResults ? items.slice(0, this.props.maxSearchResults) : items;
    }

    private addToChildren(elem: React.ReactElement<any>) {
        if (!this.props.children) {
            return elem;
        } else {
            const children = React.Children.toArray(this.props.children);
            children.unshift(elem);
            return children;
        }
    }

    private addNoSuggestionsMsg(): React.ReactElement<any> {
        if (typeof this.props.noSuggestionsNotice === 'string') {
            return <span>{this.props.noSuggestionsNotice}</span>;
        } else {
            return this.props.noSuggestionsNotice!;
        }
    }
}
