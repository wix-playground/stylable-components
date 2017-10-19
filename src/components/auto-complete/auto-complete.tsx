import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {Popup} from '../../';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {
    OptionList,
    SelectionListItemValue,
    SelectionListModel
} from '../selection-list/selection-list-model';
import {SelectionListView} from '../selection-list/selection-list-view';
import style from './auto-complete.st.css';

export type FilterPredicate = (item: string, filterString: string) => boolean;

export interface AutoCompleteProps extends OptionList, FormInputProps<string>, properties.Props {
    open?: boolean;
    filter?: FilterPredicate;
    onOpenStateChange?: (e: ChangeEvent<boolean>) => void;
}

export interface AutoCompleteState {
    self: HTMLDivElement | null;
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
        onOpenStateChange: noop
    };
    public state = {self: null, isOpen: this.props.open!};

    public render() {
        const filteredItems = this.props.value ?
            this.props.dataSource!.filter((item: string) => this.props.filter!(item, this.props.value!)) :
            this.props.dataSource;
        const list = new SelectionListModel();
        list.addDataSource({dataSource: filteredItems});
        return (
            <div
                data-automation-id="AUTO_COMPLETE"
                ref={this.refCallback}
            >
                <input
                    className="input"
                    data-automation-id="AUTO_COMPLETE_INPUT"
                    type="text"
                    onChange={this.onChange}
                    value={this.props.value}

                />
                <button
                    onClick={this.onCaretClick}
                    className="caret"
                    data-automation-id="AUTO_COMPLETE_CARET"
                />
                <Popup
                    className="root"
                    anchor={this.state.self}
                    open={this.props.open && filteredItems!.length > 0}
                >
                    <SelectionListView
                        className="list"
                        list={list}
                        onChange={this.onClick}
                    />
                </Popup>
            </div>
        );
    }

    private refCallback = (ref: HTMLDivElement) => {
        this.setState({self: ref});
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange!({value: e.target.value || ''});
        if (!this.props.value) {
            this.openPopup();
        }
    }

    private onClick = (e: ChangeEvent<SelectionListItemValue>) => {
        this.props.onChange!(e);
        this.togglePopup();
    }

    private onCaretClick = () => {
        this.togglePopup();
    }

    private openPopup() {
        this.props.onOpenStateChange!({value: true});
    }

    private togglePopup() {
        this.props.onOpenStateChange!({value: !this.props.open});
    }
}
