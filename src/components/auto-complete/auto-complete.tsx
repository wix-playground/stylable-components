import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {root} from 'wix-react-tools';
import {Popup} from '../../';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {CaretDown} from '../drop-down/drop-down-icons';
import {SelectionListView} from '../selection-list/selection-list-view';
import {OptionList, SelectionListItemValue, SelectionListModel} from '../selection-list/selection-list-model';
import style from './auto-complete.st.css';

export type FilterPredicate = (item: string, filterString: string) => boolean;

export interface AutoCompleteProps extends FormInputProps<string>, Partial<OptionList> {
    open?: boolean;
    filter?: FilterPredicate;
    onOpenStateChange?: (e: ChangeEvent<boolean>) => void;
}

export interface AutoCompleteState {
    input: HTMLInputElement | null;
}

const prefixFilter: FilterPredicate = (item: string, prefix: string) => {
    return item.toLowerCase().startsWith(prefix.toLowerCase());
};

@stylable(style)
export class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {
    public static defaultProps: AutoCompleteProps = {
        open: false,
        dataSource: [],
        value: '',
        filter: prefixFilter,
        onChange: noop,
        onOpenStateChange: noop
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
        const list = new SelectionListModel();
        list.addDataSource({dataSource: filteredItems});
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
                <Popup anchor={this.state.input} open={this.props.open && filteredItems!.length > 0}>
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
        this.setState({input: ref});
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange!({value: e.target.value || ''});
        if (!this.props.value && !this.props.open) {
            this.props.onOpenStateChange!({value: !this.props.open});
        }
    }

    private onClick = (e: ChangeEvent<SelectionListItemValue>) => {
        this.props.onChange!(e);
        this.props.onOpenStateChange!({value: !this.props.open});
    }

    private onCaretClick = () => {
        this.props.onOpenStateChange!({value: !this.props.open});
    }
}
