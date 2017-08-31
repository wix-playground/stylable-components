import * as React from 'react';
import {SBComponent, SBStateless} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {Popup} from '../../';
import {noop} from '../../utils';
import {CaretDown} from '../drop-down/drop-down-icons';
import {OptionList, SelectionList} from '../selection-list/selection-list';
import style from './auto-complete.st.css';

// Selected item is a string because of selection list's constraints
// i would love to implement it like the TreeView where the reference to an object
// was the way to point at the selected item

export type FilterPredicate = (item: string, filterString: string) => boolean;

export interface AutoCompleteListProps {
    open: boolean;
    items?: string[];
    onChange?: (item: string) => void;
    children?: any;
}

export interface AutoCompleteChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    value: string;
}

export const AutoCompleteList: React.SFC<AutoCompleteListProps> = SBStateless(props => {
    if (!props.open) {
        return null;
    }
    return (
        <div data-automation-id="AUTO_COMPLETE_LIST">
            <SelectionList
                className="auto-complete-list"
                dataSource={props.items}
                onChange={props.onChange!}
                children={props.children}
            />
        </div>
    );
}, style);

export interface AutoCompleteProps extends React.InputHTMLAttributes<HTMLInputElement>, Partial<OptionList> {
    open?: boolean;
    value?: string;
    onChange?: (event: Partial<AutoCompleteChangeEvent>) => void;
    filter?: FilterPredicate;
    maxCharacters?: number;
    maxSearchResults?: number;
    showNoSuggestions?: boolean;
    noSuggestionsNotice?: string | React.ReactElement<any>;
}

export interface AutoCompleteState {
    isOpen: boolean;
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
        maxCharacters: 0,
        maxSearchResults: 0,
        showNoSuggestions: false,
        noSuggestionsNotice: 'No Results',
    };
    public state = {input: null, isOpen: this.props.open!};

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'AUTO_COMPLETE',
            'className': 'auto-complete'
        }) as React.HTMLAttributes<HTMLDivElement>;
        const items = this.getFilteredItems();
        const children = !items.length && this.props.showNoSuggestions ?
            this.addToChildren(this.addNoSuggestionsMsg()) :
            this.props.children;
        return (
            <div {...rootProps}>
                <input
                    className="auto-complete-input"
                    data-automation-id="AUTO_COMPLETE_INPUT"
                    type="text"
                    onChange={this.onChange}
                    value={this.props.value}
                    ref={this.refCallback}
                    disabled={this.props.disabled}
                />
                <CaretDown onClick={this.onCaretClick} className="caret" data-automation-id="AUTO_COMPLETE_CARET"/>
                <Popup
                    anchor={this.state.input}
                    open={this.state.isOpen && this.props.value!.length >= this.props.maxCharacters!}
                >
                    <AutoCompleteList
                        open={true}
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
        this.props.onChange!({value: e.target.value || ''});
    }

    private onClick = (item: string) => {
        this.setState({isOpen: false});
        this.props.onChange!({value: item});
    }

    private onCaretClick = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    private getFilteredItems(): string[] {
        const items = this.props.dataSource!
            .filter((item: string) => this.props.filter!(item, this.props.value!)) as string[];
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
