import {computed} from 'mobx';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {Popup} from '../../';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {StylableProps} from '../../types/props';
import {noop} from '../../utils';
import {
    OptionList,
    selectionListItemsFromProps,
    SelectionListModel
} from '../selection-list/selection-list-model';
import {SelectionListView} from '../selection-list/selection-list-view';
import style from './auto-complete.st.css';

export type FilterPredicate = (item: string, filterString: string) => boolean;

export interface AutoCompleteProps extends OptionList, FormInputProps<string>, StylableProps {
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

    // Wrapping props with @computed allows to observe them independently from other props.
    @computed private get children()    { return this.props.children; }
    @computed private get dataSource()  { return this.props.dataSource; }
    @computed private get dataMapper() { return this.props.dataMapper; }
    @computed private get renderItem()  { return this.props.renderItem; }
    @computed private get value()       { return this.props.value; }
    @computed private get filter()      { return this.props.filter; }

    @computed private get items() {
        const items = selectionListItemsFromProps({
            dataSource: this.dataSource,
            dataMapper: this.dataMapper,
            renderItem: this.renderItem,
            children: this.children
        });
        return this.value ? items.filter(item => this.filter!(item.label, this.value!)) : items;
    }

    @computed private get list() {
        return new SelectionListModel(this.items);
    }

    public render() {
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
                    open={this.props.open && this.items.length > 0}
                >
                    <SelectionListView
                        className="list"
                        list={this.list}
                        onClick={this.onClick}
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

    private onClick = (e: React.MouseEvent<HTMLElement>, itemIndex: number) => {
        if (itemIndex > -1) {
            this.props.onChange!({value: this.list.items[itemIndex].value});
        }
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
