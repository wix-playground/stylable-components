import keycode = require('keycode');
import {action, computed, observable, reaction} from 'mobx';
import {observer} from 'mobx-react';
import React = require('react');
import {properties, stylable} from 'wix-react-tools';
import {Popup} from '../../';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {
    OptionList,
    selectionListItemsFromProps,
    SelectionListModel,
    SelectionListView
} from '../selection-list';
import style from './auto-complete.st.css';

export type AutocompleteFilterPredicate = (itemLabel: string, filterString: string) => boolean;

export interface AutoCompleteProps extends OptionList, FormInputProps<string>, properties.Props {
    // Standard props
    autoFocus?: boolean;
    disabled?: boolean;
    onChange?: (event: ChangeEvent<string>) => void;
    readOnly?: boolean;
    tabIndex?: number;
    value?: string;

    // Component-specific props
    filter?: AutocompleteFilterPredicate;
    maxShownSuggestions?: number;
    minCharacters?: number;
    noSuggestionsNotice?: React.ReactChild;
    onOpenStateChange?: (e: ChangeEvent<boolean>) => void;
    open?: boolean;
    openOnFocus?: boolean;
}

const prefixFilter: AutocompleteFilterPredicate = (itemLabel: string, filterString: string) => {
    return itemLabel.toLowerCase().startsWith(filterString.toLowerCase());
};

@stylable(style)
@properties
@observer
export class AutoComplete extends React.Component<AutoCompleteProps> {
    public static defaultProps: AutoCompleteProps = {
        autoFocus: false,
        disabled: false,
        onChange: noop,
        readOnly: false,

        filter: prefixFilter,
        maxShownSuggestions: Infinity,
        minCharacters: 0,
        onOpenStateChange: noop,
        open: false,
        openOnFocus: false,
        value: ''
    };

    // Wrapping props with @computed allows to observe them independently from other props.
    @computed private get children()            { return this.props.children; }
    @computed private get dataMapper()          { return this.props.dataMapper; }
    @computed private get dataSource()          { return this.props.dataSource; }
    @computed private get filter()              { return this.props.filter!; }
    @computed private get maxShownSuggestions() { return this.props.maxShownSuggestions!; }
    @computed private get minCharacters()       { return this.props.minCharacters!; }
    @computed private get noSuggestionsNotice() { return this.props.noSuggestionsNotice; }
    @computed private get open()                { return this.props.open!; }
    @computed private get openOnFocus()         { return this.props.openOnFocus!; }
    @computed private get renderItem()          { return this.props.renderItem; }
    @computed private get value()               { return this.props.value!; }

    @computed private get isEditable(): boolean {
        return !this.props.disabled && !this.props.readOnly;
    }

    @computed private get items() {
        return selectionListItemsFromProps({
            dataSource: this.dataSource,
            dataMapper: this.dataMapper,
            renderItem: this.renderItem,
            children: this.children
        });
    }

    @computed private get filteredItems() {
        const items = this.value ?
            this.items.filter(item => this.filter(item.label, this.value)) :
            this.items;

        return items.length <= this.maxShownSuggestions ?
            items :
            items.slice(0, this.maxShownSuggestions);
    }

    @computed private get list() {
        return new SelectionListModel(this.filteredItems);
    }

    @computed private get isPopupOpen(): boolean {
        return this.open && this.possibleToShowPopup;
    }

    @computed private get wantToShowPopup() {
        return (
            this.focused &&
            this.popupTriggered &&
            this.isEditable &&
            this.value.length >= this.minCharacters &&
            this.possibleToShowPopup
        );
    }

    @computed private get possibleToShowPopup() {
        return this.filteredItems.length > 0 || this.noSuggestionsNotice !== undefined;
    }

    @observable private input: HTMLInputElement | null = null;
    @observable private focused: boolean = false;
    @observable private popupTriggered: boolean = false;

    public componentWillMount() {
        reaction(
            () => this.wantToShowPopup,
            (open: boolean) => this.props.onOpenStateChange!({value: open})
        );
    }

    public render() {
        return (
            <div
                data-automation-id="AUTOCOMPLETE"
                style-state={{
                    focused: this.focused,
                    disabled: this.props.disabled,
                    readOnly: this.props.readOnly
                }}
            >
                <input
                    ref={input => this.input || (this.input = input)}
                    aria-autocomplete="list"
                    aria-expanded={this.isPopupOpen}
                    aria-haspopup="true"
                    autoComplete="off"
                    autoFocus={this.props.autoFocus}
                    className="input"
                    data-automation-id="AUTOCOMPLETE_INPUT"
                    disabled={this.props.disabled}
                    onBlur={this.handleBlur}
                    onChange={this.isEditable ? this.handleInputChange : noop}
                    onFocus={this.handleFocus}
                    onKeyDown={this.isEditable ? this.handleInputKeydown : noop}
                    readOnly={this.props.readOnly}
                    role="textbox"
                    tabIndex={this.props.tabIndex}
                    type="text"
                    value={this.props.value}
                />
                {this.isPopupOpen && this.renderPopup()}
            </div>
        );
    }

    public focus(): void {
        this.input!.focus();
    }

    public blur(): void {
        this.input!.blur();
    }

    protected renderPopup() {
        const popupContents = this.filteredItems.length ?
            (
                <SelectionListView
                    className="list"
                    focused
                    list={this.list}
                    onClick={this.handleListClick}
                    onMouseDown={this.handleListMouseDown}
                />
            ) :
            this.noSuggestionsNotice;

        return popupContents;
    }

    @action protected handleFocus = (): void => {
        this.focused = true;
        this.popupTriggered = this.openOnFocus && this.isEditable;
    }

    @action protected handleBlur = (): void => {
        this.focused = false;
        this.popupTriggered = false;
    }

    @action protected handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        this.popupTriggered = true;
        this.props.onChange!({value: this.input!.value});
    }

    @action protected handleInputKeydown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        const isPopupOpen = this.isPopupOpen;

        switch (event.keyCode) {
            case keycode('escape'):
                this.popupTriggered = false;
                this.list.focusIndex(-1);
                break;

            case keycode('enter'):
                if (isPopupOpen && this.list.focusedIndex > -1) {
                    event.preventDefault();
                    this.popupTriggered = false;
                    const itemIndex = this.list.focusedIndex;
                    this.list.focusIndex(-1);
                    this.props.onChange!({value: this.list.items[itemIndex].label});
                }
                break;

            case keycode('down'):
                if (isPopupOpen) {
                    event.preventDefault();
                    this.list.focusNext();
                }
                break;

            case keycode('up'):
                if (isPopupOpen) {
                    event.preventDefault();
                    this.list.focusPrevious();
                }
                break;
        }
    }

    @action protected handleListMouseDown = (event: React.MouseEvent<HTMLElement>, itemIndex: number) => {
        // Don't steal focus from the input.
        event.preventDefault();

        if (event.button === 0 && itemIndex > -1) {
            this.list.focusIndex(itemIndex);
        }
    }

    @action protected handleListClick = (event: React.MouseEvent<HTMLElement>, itemIndex: number) => {
        if (event.button === 0 && itemIndex > -1) {
            this.popupTriggered = false;
            this.list.focusIndex(-1);
            this.props.onChange!({value: this.list.items[itemIndex].label});
        }
    }
}
