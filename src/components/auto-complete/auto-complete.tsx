import * as React from 'react';
import {SBComponent, SBStateless} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {Popup} from '../../';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {CaretDown} from '../drop-down/drop-down-icons';
import {OptionList, SelectionList} from '../selection-list/selection-list';
import style from './auto-complete.st.css';

// Selected item is a string because of selection list's constraints
// i would love to implement it like the TreeView where the reference to an object
// was the way to point at the selected item

export type FilterPredicate = (item: string, filterString: string) => boolean;

export interface AutoCompleteListProps {
    items?: string[];
    onChange?: (item: string) => void;
    children?: any;
    className?: string;
}

export const AutoCompleteList: React.SFC<AutoCompleteListProps> = SBStateless(props => {
    return (
        <div data-automation-id="AUTO_COMPLETE_LIST" className="auto-complete-container">
            <SelectionList
                className="auto-complete-list"
                dataSource={props.items}
                onChange={props.onChange!}
                children={props.children}
            />
        </div>
    );
}, style);

export interface AutoCompleteProps extends FormInputProps<string>, Partial<OptionList> {
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

const prefixFilter: FilterPredicate = (item: string, prefix: string) => item.startsWith(prefix);

@SBComponent(style)
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
        const rootProps = root(this.props, {
            'data-automation-id': 'AUTO_COMPLETE',
            'className': ''
        }) as React.HTMLAttributes<HTMLDivElement>;
        const ariaProps = {
            'aria-haspopup': true,
            'aria-expanded': this.props.open ? true : false
        };
        const items = this.getItems();
        const children = !items.length && this.props.showNoSuggestions ?
            this.addToChildren(this.addNoSuggestionsMsg()) :
            this.props.children;
        return (
            <div
                {...rootProps}
                {...ariaProps}
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
                <Popup
                    anchor={this.state.input}
                    open={this.props.open && this.props.value!.length >= this.props.maxCharacters!}
                >
                    <AutoCompleteList
                        items={items}
                        onChange={this.onClick}
                        children={children}
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
                this.props.onOpenStateChange!({value: this.props.open!});
            }
        }
    }

    private onClick = (item: string) => {
        this.props.onChange!({value: item});
        this.props.onOpenStateChange!({value: this.props.open!});
    }

    private onCaretClick = () => {
        this.props.onOpenStateChange!({value: this.props.open!});
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
