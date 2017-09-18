import * as keycode from 'keycode';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils/noop';
import {Popup} from '../popup/';
import {OptionList, SelectionList} from '../selection-list';
import {CaretDown} from './drop-down-icons';
import style from './drop-down.st.css';

const KeyCodes: any = {
    ENTER: keycode('enter'),
    UP: keycode('up'),
    DOWN: keycode('down'),
    SPACE: keycode('space'),
    ESC: keycode('escape')
};

export interface DropDownProps extends OptionList, FormInputProps<string>, properties.Props {
    open?: boolean;
    disabled?: boolean;
    openOnFocus?: boolean;
    children?: React.ReactNode;
    toggleIcon?: React.ComponentType;
    tabIndex?: number;
    onOpenStateChange?: (e: ChangeEvent<boolean>) => void;
}

export interface DropDownState {
    dropdown: HTMLDivElement | null;
}

@stylable(style)
@properties
export class DropDown extends React.PureComponent<DropDownProps, DropDownState> {
    public static defaultProps: DropDownProps = {
        children: [],
        onChange: noop,
        tabIndex: 0,
        toggleIcon: CaretDown,
        disabled: false
    };

    public state: DropDownState = {
        dropdown: null
    };

    public onItemClick = (e: ChangeEvent<string>) => {
        this.closeDropdown();
        this.props.onChange!({value: e.value});
    }

    public render() {
        const ToggleIcon = this.props.toggleIcon!;

        return (
            <div
                data-automation-id="DROP_DOWN"
                className="drop-down"
                onKeyDown={this.onKeyDown}
                onFocus={this.onFocus}
                tabIndex={this.props.tabIndex}
                ref={dropdown => this.setState({dropdown})}
            >
                <div data-automation-id="DROP_DOWN_INPUT" onClick={this.toggleDropdown} className="drop-down-input">
                    <span className="label">{this.props.value!}</span>
                    <div className="caret" data-automation-id="ICON">
                        <ToggleIcon />
                    </div>
                </div>
                <Popup open={this.props.open && !this.props.disabled} anchor={this.state.dropdown}>
                    <div className="root">
                        <SelectionList
                            data-automation-id="DROP_DOWN_LIST"
                            className="drop-down-list"
                            value={this.props.value}
                            onChange={this.onItemClick!}
                            dataSource={this.props.dataSource}
                        >
                            {this.props.children}
                        </SelectionList>
                    </div>
                </Popup>
            </div>
        );
    }

    private onFocus = () => {
        if (this.props.openOnFocus) {
            this.openDropdown();
        }
    }

    private toggleDropdown = () => {
        if (!this.props.disabled) {
            this.props.onOpenStateChange && this.props.onOpenStateChange({value: !this.props.open});
        }
    }

    private openDropdown() {
        if (!this.props.disabled && !this.props.open) {
            this.toggleDropdown();
        }
    }

    private closeDropdown() {
        if (!this.props.disabled && this.props.open) {
            this.toggleDropdown();
        }
    }

    private onKeyDown: React.EventHandler<React.KeyboardEvent<HTMLDivElement>> = e => {
        switch (e.keyCode) {
            case KeyCodes.SPACE:
                e.preventDefault();
                this.toggleDropdown();
                break;
            case KeyCodes.ESC:
                e.preventDefault();
                this.closeDropdown();
                break;
            case KeyCodes.DOWN:
                e.preventDefault();
                this.openDropdown();
                break;
        }
    }
}
