import * as React from 'react';
import {SBComponent, SBStateless} from 'stylable-react-component/dist/stylable-react';
import {root} from 'wix-react-tools';
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

export interface AutoCompleteProps extends React.InputHTMLAttributes<HTMLInputElement>, OptionList {
    open?: boolean;
    value?: string;
    onChange?: (event: Partial<AutoCompleteChangeEvent>) => void;
    filter?: FilterPredicate;
}

const prefixFilter: FilterPredicate = (item: string, prefix: string) => item.startsWith(prefix);

@SBComponent(style)
export class AutoComplete extends React.Component<AutoCompleteProps, {}> {
    public static defaultProps: AutoCompleteProps = {
        open: false,
        dataSource: [],
        value: '',
        filter: prefixFilter,
        onChange: () => {}
    };

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'AUTO_COMPLETE',
            'className': 'auto-complete'
        }) as React.HtmlHTMLAttributes<HTMLDivElement>;
        const filteredItems = this.props.value ?
            this.props.dataSource!.filter((item: string) => this.props.filter!(item, this.props.value!)) :
            this.props.dataSource;
        return (
            <div {...rootProps}>
                <input
                    className="auto-complete-input"
                    data-automation-id="AUTO_COMPLETE_INPUT"
                    type="text"
                    onChange={this.onChange}
                    value={this.props.value}
                />
                <AutoCompleteList
                    open={this.props.open!}
                    items={filteredItems as string[]}
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
}
