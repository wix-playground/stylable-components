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
    openOnFocus?: boolean;
}

export interface State {
    focused: boolean;
    input: HTMLInputElement | null;
    inputValue: string;
    list: SelectionListModel;
    open: boolean;
    popup: Popup | null;
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
        openOnFocus: false,
        readOnly: false,
        value: []
    };

    public state: State = {
        focused: false,
        input: null,
        inputValue: '',
        list: new SelectionListModel(),
        open: false,
        popup: null,
        root: null
    };

    public componentWillMount() {
        this.state.list.addDataSource({dataSource: this.props.dataSource});
    }

    public componentDidUpdate() {
        // FIXME: popup gets outdated dimensions of the anchor because it queries DOM in render() prior
        // to the DOM update. It should query in componentDidUpdate() instead.
        if (this.state.open && this.state.popup) {
            this.state.popup.forceUpdate();
        }
    }

    public render() {
        if (5 > 1) {
            return <PopupTest />;
        }
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
                    <Tag key={i} id={i} className="tag" onRequestDelete={this.handleTagDeleteRequest}>{label}</Tag>
                )}

                <input
                    ref={input => this.state.input || this.setState({input})}
                    className="input"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeydown}
                    onFocus={this.props.readOnly ? noop : this.handleFocus}
                    onBlur={this.props.readOnly ? noop : this.handleBlur}
                    tabIndex={this.props.tabIndex}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    autoFocus={this.props.autoFocus}
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

    protected handleMouseDown: React.MouseEventHandler<HTMLElement> = event => {
        // Clicking on a blank space within the component should definitely focus the input.
        // Clicking on a tag should probably focus the input.
        if (event.button === 0 && event.target !== this.state.input) {
            event.preventDefault();
            this.focus();
        }
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
                event.preventDefault(); // Prevent cursor from jumping to the start
                this.state.list.focusNext();
                const itemValue = this.state.list.getFocusedValue();
                if (itemValue !== undefined) {
                    this.setState({inputValue: itemValue});
                }
                break;
            }

            case keycode('up'): {
                event.preventDefault(); // Prevent cursor from jumping to the end
                this.state.list.focusPrevious();
                const itemValue = this.state.list.getFocusedValue();
                if (itemValue !== undefined) {
                    this.setState({inputValue: itemValue});
                }
                break;
            }
        }
    }

    protected handleTagDeleteRequest = (i: number) => {
        this.deleteTag(i);
    }

    protected handleListItemClick = ({value: itemValue}: {value: string}) => {
        this.state.list.focusValue(undefined);
        this.addTag(itemValue);
    }
}

class PopupTest extends React.Component {
    public state = {
        root: null,
        count: 4
    };

    public render() {
        return (
            <div>
                <div
                    ref={ref => this.state.root || this.setState({root: ref})}
                    style={{display: 'inline-block', background: '#29B6F6'}}
                >
                    <button onClick={this.expand}>Expand</button>
                    {Array(this.state.count).fill(0).map((v, i) => <span key={i}>*</span>)}
                </div>
                <Popup open={true} anchor={this.state.root}>
                        <div style={{background: '#ef5350'}}>Popup</div>
                </Popup>
            </div>
        );
    }

    public expand = () => {
        this.setState({count: this.state.count + 1});
    }
}
