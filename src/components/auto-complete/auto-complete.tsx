import * as React from 'react';
import {SBComponent, SBStateless} from 'stylable-react-component/dist/stylable-react';
import {root} from 'wix-react-tools';
import {noop} from '../../utils';
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
}

export interface AutoCompleteChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    value: string;
}

export const AutoCompleteList: React.SFC<AutoCompleteListProps> = SBStateless(props => {
    if (props.open) {
        return (
            <div data-automation-id="AUTO_COMPLETE_LIST">
                <SelectionList
                    className="auto-complete-list"
                    dataSource={props.items}
                    onChange={props.onChange!}
                />
            </div>
        );
    }
    return null;
}, style);

export interface AutoCompleteProps extends React.InputHTMLAttributes<HTMLInputElement>, Partial<OptionList> {
    open?: boolean;
    value?: string;
    onChange?: (event: Partial<AutoCompleteChangeEvent>) => void;
    filter?: FilterPredicate;
    maxCharacters?: number;
    maxSearchResults?: number;
}

const prefixFilter: FilterPredicate = (item: string, prefix: string) => item.startsWith(prefix);

@SBComponent(style)
export class AutoComplete extends React.Component<AutoCompleteProps, {}> {
    public static defaultProps: AutoCompleteProps = {
        open: false,
        dataSource: [],
        value: '',
        filter: prefixFilter,
        onChange: noop,
        maxCharacters: 0,
        maxSearchResults: 0,
        disabled: false
    };

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'AUTO_COMPLETE',
            'className': 'auto-complete'
        }) as React.HtmlHTMLAttributes<HTMLDivElement>;
        return (
            <div {...rootProps}>
                <input
                    className="auto-complete-input"
                    data-automation-id="AUTO_COMPLETE_INPUT"
                    type="text"
                    onChange={this.onChange}
                    value={this.props.value}
                    disabled={this.props.disabled}
                />
                <AutoCompleteList
                    open={this.props.open! && this.props.value!.length >= this.props.maxCharacters!}
                    items={this.getFilteredItems()}
                    onChange={this.onClick}
                />
            </div>
        );
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange!({value: e.target.value || ''});
    }

    private onClick = (item: string) => {
        this.props.onChange!({value: item});
    }

    private getFilteredItems(): string[] {
        const items = this.props.dataSource!
            .filter((item: string) => this.props.filter!(item, this.props.value!)) as string[];

        return this.props.maxSearchResults ? items.slice(0, this.props.maxSearchResults) : items;
    }
}
