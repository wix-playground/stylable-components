import * as React from 'react';
import { SelectionList, OptionList, SelectionItem } from '../selection-list/selection-list';
import { SBComponent, SBStateless } from 'stylable-react-component/dist/stylable-react';
import { root } from 'wix-react-tools';
import style from './auto-complete.st.css';

// Selected item is a string because of selection list's constraints
// i would love to implement it like the TreeView where the reference to an object
// was the way to point at the selected item

export type FilterPredicate = (item: string, filterString: string) => boolean;

export interface AutoCompleteListProps {
    open: boolean;
    items?: string[];
    selectedItem?: string;
    onItemClick?: (item: string) => void;
}

export const AutoCompleteList: React.SFC<AutoCompleteListProps> = SBStateless(props => {
    if (!props.open) { return null; }

    return (
        <div data-automation-id="AUTO_COMPLETE_LIST">
            <SelectionList
                className="auto-complete-list"
                dataSource={props.items}
                value={props.selectedItem}
                onChange={props.onItemClick!}
            />
        </div>
    );
}, style);

export interface AutoCompleteProps extends OptionList {
    value?: string;
    onChange?: (value: string) => void;
    style?: any;
    className?: string;
    onItemClick?: (item: string) => void;
    open?: boolean;
    selectedItem?: string;
    filter?: FilterPredicate;
}

export interface AutoCompleteState {
    filteredItems: SelectionItem[];
}

const prefixFilter: FilterPredicate = (item: string, prefix: string) => item.startsWith(prefix);

@SBComponent(style)
export class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {

    public static defaultProps:
        AutoCompleteProps = { dataSource: [], value: '', filter: prefixFilter, onChange: () => {}, onItemClick: () => {} };

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'AUTO_COMPLETE',
            className: 'auto-complete',
        }) as React.HtmlHTMLAttributes<HTMLDivElement>;

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
                    selectedItem={this.props.selectedItem as string}
                    items={this.props.value ? this.state.filteredItems as string[]: this.props.dataSource as string[]}
                    open={!!this.props.open}
                    onItemClick={this.onItemClick}
                />
            </div>
        );
    }

    private onChange = (e: any) => {
        this.props.onChange!(e.target.value || '');
        this.setState({
           filteredItems: this.props.dataSource!.filter((item: string) => this.props.filter!(item, e.target.value))
        });
    };

    private onItemClick = (item: string) => {
        this.props.onItemClick!(item);
    }
}
