import * as React from 'react';
import {SBComponent, SBStateless} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {Popup} from '../../';
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
}

export const AutoCompleteList: React.SFC<AutoCompleteListProps> = SBStateless(props => {
    return (
        <div data-automation-id="AUTO_COMPLETE_LIST">
            <SelectionList
                className="auto-complete-list"
                dataSource={props.items}
                onChange={props.onChange!}
            />
        </div>
    );
}, style);

export interface AutoCompleteProps extends FormInputProps<string>, Partial<OptionList> {
    open?: boolean;
    filter?: FilterPredicate;
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
        onChange: noop
    };
    public state = {input: null, isOpen: this.props.open!};

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'AUTO_COMPLETE',
            'className': ''
        }) as React.HTMLAttributes<HTMLDivElement>;
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
                    ref={this.refCallback}
                />
                <CaretDown onClick={this.onCaretClick} className="caret" data-automation-id="AUTO_COMPLETE_CARET"/>
                <Popup anchor={this.state.input} open={this.state.isOpen}>
                    <AutoCompleteList
                        items={filteredItems as string[]}
                        onChange={this.onClick}
                    />
                </Popup>
            </div>
        );
    }

    private refCallback = (ref: HTMLInputElement) => {
        this.setState({input: ref});
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
}
