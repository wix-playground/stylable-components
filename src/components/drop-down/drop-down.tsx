import * as keycode from 'keycode';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils/noop';
import {Popup} from '../popup/';
import {SelectionList, SelectionListOptionList} from '../selection-list';
import {CaretDown} from './drop-down-icons';
import style from './drop-down.st.css';

const KeyCodes: any = {
    ENTER: keycode('enter'),
    UP: keycode('up'),
    DOWN: keycode('down'),
    SPACE: keycode('space'),
    ESC: keycode('escape')
};

export interface DropDownProps extends SelectionListOptionList, FormInputProps<string>, properties.Props {
    open?: boolean;
    disabled?: boolean;
    openOnFocus?: boolean;
    children?: React.ReactNode;
    // toggleIcon?: React.ReactNode;
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
        // toggleIcon: <CaretDown className="caret" data-automation-id="ICON" />,
        disabled: false,
        onOpenStateChange: noop
    };

    public state: DropDownState = {
        dropdown: null
    };

    public onItemClick = (e: ChangeEvent<string>) => {
        this.closeDropdown();
        this.props.onChange!({value: e.value});
    }

    public render() {
        return (
            <div
                data-automation-id="DROP_DOWN"
                onKeyDown={this.onKeyDown}
                onFocus={this.onFocus}
                tabIndex={this.props.tabIndex}
                ref={dropdown => this.setState({dropdown})}
            >
                <div data-automation-id="DROP_DOWN_INPUT" onClick={this.toggleDropdown} className="input">
                    <span className="label">{this.props.value!}</span>
                </div>
                <button onClick={this.toggleDropdown} className="caret" data-automation-id="AUTO_COMPLETE_CARET"/>
                <Popup
                    clas
                    open={this.props.open && !this.props.disabled}
                    anchor={this.state.dropdown}
                >
                    <SelectionList
                        data-automation-id="DROP_DOWN_LIST"
                        className="list"
                        value={this.props.value}
                        onChange={this.onItemClick!}
                        dataSource={this.props.dataSource}
                    >
                        {this.props.children}
                    </SelectionList>
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
            this.props.onOpenStateChange!({value: !this.props.open});
        }
    }

    private openDropdown() {
        if (!this.props.disabled && !this.props.open) {
            this.props.onOpenStateChange!({value: true});
        }
    }

    private closeDropdown() {
        if (!this.props.disabled && this.props.open) {
            this.props.onOpenStateChange!({value: false});
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
