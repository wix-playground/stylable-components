import keycode = require('keycode');
import React = require('react');
import {properties, stylable} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils';
import {Popup} from '../popup';
import {OptionList, SelectionListItemValue, SelectionListModel, SelectionListView} from '../selection-list';
import style from './multiselect.st.css';
import {Tag} from './tag';

export interface Props extends OptionList, FormInputProps<SelectionListItemValue[]> {
    allowFreeText?: boolean;
    filter?: (text: string) => boolean;
    maxSearchResults?: number;
    maxSelected?: number;
    minCharacters?: number;
    name?: string;
    noSuggestionsNotice?: string | JSX.Element;
    onChange?: (event: ChangeEvent<SelectionListItemValue[]>) => void;
    value?: SelectionListItemValue[];
    tabIndex?: number;
}

export interface State {
    focused: boolean;
    input: HTMLInputElement | null;
    inputValue: string;
    list: SelectionListModel;
    open: boolean;
    root: HTMLElement | null;
    popup: Popup | null;
}

@stylable(style)
export class Multiselect extends React.Component<Props, State> {
    public defaultProps = {
        value: [],
        maxSelected: Infinity,
        allowFreeText: true,
        noSuggestionsNotice: '',
        filter: () => true,
        minCharacters: 0,
        maxSearchResults: Infinity,
        onChange: noop
    };

    public state: State = {
        focused: false,
        open: false,
        root: null,
        input: null,
        popup: null,
        inputValue: '',
        list: new SelectionListModel()
    };

    public componentWillMount() {
        this.state.list.addDataSource({dataSource: this.props.dataSource});
    }

    public componentDidUpdate() {
        if (this.state.open && this.state.popup) {
            this.state.popup.forceUpdate();
        }
    }

    public render() {
        return (
            <div ref={root => this.state.root || this.setState({root})} style-state={{focused: this.state.focused}}>
                {this.props.value!.map((label, i) =>
                    <input key={i} type="hidden" value={label} />
                )}

                {this.props.value!.map((label, i) =>
                    <Tag key={i} id={i} onDelete={this.handleTagDeleteClick}>{label}</Tag>
                )}

                <input
                    ref={input => this.state.input || this.setState({input})}
                    className="input"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeydown}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />

                <Popup
                    ref={popup => this.state.popup || this.setState({popup})}
                    open={this.state.open}
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
            </div>
        );
    }

    public focus() {
        this.state.input!.focus();
    }

    public blur() {
        this.state.input!.blur();
    }

    protected addTag = (tag: string) => {
        const value = this.props.value!;
        this.props.onChange!({
            value: [...value, tag]
        });
    }

    protected deleteTag = (i: number) => {
        const value = this.props.value!;
        this.props.onChange!({
            value: [...value.slice(0, i), ...value.slice(i + 1)]
        });
    }

    protected deleteLastTag = () => {
        if (this.props.value!.length) {
            this.deleteTag(this.props.value!.length - 1);
        }
    }

    protected handleFocus = () => {
        this.setState({focused: true, open: true});
    }

    protected handleBlur = () => {
        this.setState({focused: false, open: false});
    }

    protected handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        const inputValue = event.currentTarget.value;
        this.state.list.focusValue(undefined);
        this.setState({inputValue, open: true});
    }

    protected handleInputKeydown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        switch (event.keyCode) {
            case keycode('escape'): {
                this.state.list.focusValue(undefined);
                this.setState({open: false});
                break;
            }

            case keycode('enter'): {
                event.preventDefault(); // Prevent form submit
                const inputValue = this.state.inputValue;
                if (inputValue) {
                    this.state.list.focusValue(undefined);
                    this.setState({inputValue: ''});
                    this.addTag(inputValue);
                }
                break;
            }

            case keycode('backspace'): {
                if (this.state.inputValue === '' && !event.repeat) {
                    this.deleteLastTag();
                }
                break;
            }

            case keycode('down'): {
                event.preventDefault(); // Prevent cursor from moving to the beginning
                this.state.list.focusNext();
                const itemValue = this.state.list.getFocusedValue();
                if (itemValue !== undefined) {
                    this.setState({inputValue: itemValue});
                }
                break;
            }

            case keycode('up'): {
                event.preventDefault(); // Prevent cursor from moving to the end
                this.state.list.focusPrevious();
                const itemValue = this.state.list.getFocusedValue();
                if (itemValue !== undefined) {
                    this.setState({inputValue: itemValue});
                }
                break;
            }
        }
    }

    protected handleTagDeleteClick = (i: number) => {
        this.deleteTag(i);
    }

    protected handleListItemClick = ({value: itemValue}: {value: string}) => {
        this.state.list.focusValue(undefined);
        this.addTag(itemValue);
    }
}
