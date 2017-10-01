import keycode = require('keycode');
import React = require('react');
import {properties, stylable} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {Popup} from '../popup';
import {OptionList, SelectionListItemValue, SelectionListModel, SelectionListView} from '../selection-list';
import styles from './multiselect.st.css';
import {Tag} from './tag';

export interface Props extends OptionList, FormInputProps<SelectionListItemValue[]> {
    // Standard props
    autoFocus?: boolean;
    disabled?: boolean;
    name?: string;
    onChange?: (event: ChangeEvent<SelectionListItemValue[]>) => void;
    readOnly?: boolean;
    tabIndex?: number;
    value?: SelectionListItemValue[];

    // Component-specific props
    allowFreeText?: boolean;
    filter?: (text: string) => boolean;
    maxSearchResults?: number;
    maxSelected?: number;
    minCharacters?: number;
    noSuggestionsNotice?: string | JSX.Element;
}

export interface State {
    focused: boolean;
    input: HTMLInputElement | null;
    inputValue: string;
    list: SelectionListModel;
    popup: Popup | null;
    popupDismissed: boolean;
    root: HTMLElement | null;
}

@stylable(styles)
export class Multiselect extends React.Component<Props, State> {
    public static defaultProps: Props = {
        allowFreeText: true,
        autoFocus: false,
        disabled: false,
        filter: () => true,
        maxSearchResults: Infinity,
        maxSelected: Infinity,
        minCharacters: 0,
        noSuggestionsNotice: '',
        onChange: noop,
        readOnly: false,
        value: []
    };

    public state: State = {
        focused: false,
        input: null,
        inputValue: '',
        list: new SelectionListModel(),
        popup: null,
        popupDismissed: false,
        root: null
    };

    public componentWillMount() {
        this.state.list.addDataSource({dataSource: this.props.dataSource});
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (nextProps.disabled || nextProps.readOnly || nextProps.value!.length >= nextProps.maxSelected!) {
            this.setState({inputValue: ''});
        }
    }

    public componentDidUpdate() {
        // FIXME: popup gets outdated dimensions of the anchor because it queries DOM in render() prior
        // to the DOM update. It should query in componentDidUpdate() instead.
        if (this.state.popup && this.isPopupOpen()) {
            this.state.popup.forceUpdate();
        }
    }

    public render() {
        return (
            <div
                ref={root => this.state.root || this.setState({root})}
                style-state={{
                    focused: this.state.focused,
                    disabled: this.props.disabled,
                    readOnly: this.props.readOnly
                }}
                onMouseDown={this.handleMouseDown}
            >
                {this.props.name && this.props.value!.map((label, i) =>
                    <input key={i} name={this.props.name + '[]'} type="hidden" value={label} />
                )}

                {this.props.value!.map((label, i) =>
                    <Tag
                        key={i}
                        id={i}
                        className="tag"
                        onRequestDelete={this.isEditable() ? this.handleTagDeleteRequest : noop}
                    >
                        {label}
                    </Tag>
                )}

                <input
                    ref={input => this.state.input || this.setState({input})}
                    className="input"
                    value={this.state.inputValue}
                    onBlur={this.handleBlur}
                    onChange={this.isEditable() ? this.handleInputChange : noop}
                    onFocus={this.handleFocus}
                    onKeyDown={this.isEditable() ? this.handleInputKeydown : noop}
                    autoFocus={this.props.autoFocus}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    tabIndex={this.props.tabIndex}
                />

                {this.isPopupOpen() &&
                    <Popup
                        ref={popup => this.state.popup || this.setState({popup})}
                        open={true}
                        anchor={this.state.root}
                        className="fixme-multiselect-portal"
                    >
                        <SelectionListView
                            focused={true}
                            className="drop-down-list"
                            list={this.state.list}
                            onChange={this.handleListItemClick}
                        />
                    </Popup>
                }
            </div>
        );
    }

    public focus(): void {
        this.state.input!.focus();
    }

    public blur(): void {
        this.state.input!.blur();
    }

    protected isEditable(): boolean {
        return !this.props.disabled && !this.props.readOnly;
    }

    protected canAddTag(): boolean {
        return this.isEditable() && this.props.value!.length < this.props.maxSelected!;
    }

    protected isPopupOpen(): boolean {
        return (
            this.canAddTag() &&
            this.state.focused &&
            !this.state.popupDismissed &&
            this.state.inputValue.length >= this.props.minCharacters!
        );
    }

    protected addTag = (tag: string): void => {
        const value = this.props.value!;
        this.props.onChange!({
            value: [...value, tag]
        });
    }

    protected deleteTag = (i: number): void => {
        const value = this.props.value!;
        this.props.onChange!({
            value: [...value.slice(0, i), ...value.slice(i + 1)]
        });
    }

    protected deleteLastTag = (): void => {
        if (this.props.value!.length) {
            this.deleteTag(this.props.value!.length - 1);
        }
    }

    protected handleFocus = (): void => {
        this.setState({focused: true, popupDismissed: false});
    }

    protected handleBlur = (): void => {
        this.setState({focused: false, popupDismissed: false});
    }

    protected handleMouseDown: React.MouseEventHandler<HTMLElement> = event => {
        // Clicking on a blank space within the component should definitely focus the input,
        // and clicking on a tag should _probably_ focus the input.
        if (event.button === 0 && event.target !== this.state.input) {
            event.preventDefault();
            this.focus();
        }
    }

    protected handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        const inputValue = event.currentTarget.value;
        this.state.list.focusValue(undefined);
        this.setState({
            inputValue: this.canAddTag() ? inputValue : '',
            popupDismissed: false
        });
    }

    protected handleInputKeydown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        switch (event.keyCode) {
            case keycode('escape'): {
                this.setState({popupDismissed: true});
                this.state.list.focusValue(undefined);
                break;
            }

            case keycode('enter'): {
                event.preventDefault(); // Prevent form submit
                if (this.canAddTag()) {
                    const inputValue = this.state.inputValue;
                    if (inputValue) {
                        this.state.list.focusValue(undefined);
                        this.setState({
                            inputValue: '',
                            popupDismissed: false
                        });
                        this.addTag(inputValue);
                    }
                }
                break;
            }

            case keycode('backspace'): {
                if (this.isEditable() && this.state.inputValue === '' && !event.repeat) {
                    this.setState({popupDismissed: false});
                    this.deleteLastTag();
                }
                break;
            }

            case keycode('up'): {
                event.preventDefault(); // Prevent cursor from jumping to the end
                if (this.isPopupOpen()) {
                    this.state.list.focusPrevious();
                    const value = this.state.list.getFocusedValue();
                    if (value !== undefined) {
                        this.setState({inputValue: value});
                    }
                }
                break;
            }

            case keycode('down'): {
                event.preventDefault(); // Prevent cursor from jumping to the start
                if (this.isPopupOpen()) {
                    this.state.list.focusNext();
                    const value = this.state.list.getFocusedValue();
                    if (value !== undefined) {
                        this.setState({inputValue: value});
                    }
                }
                break;
            }
        }
    }

    protected handleTagDeleteRequest = (i: number): void => {
        this.deleteTag(i);
    }

    protected handleListItemClick = ({value: itemValue}: {value: string}): void => {
        this.state.list.focusValue(undefined);
        this.addTag(itemValue);
    }
}
