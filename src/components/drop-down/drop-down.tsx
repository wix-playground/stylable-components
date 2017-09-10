import * as keycode from 'keycode';
import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {ChangeEvent} from '../../types/events';
import {FormInputProps} from '../../types/forms';
import {SelectionList, SelectionListItemValue} from '../selection-list';
import {Popup} from '../../../src';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils/noop';
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

export interface DropDownProps extends OptionList, FormInputProps<string> {
    open?: boolean;
    disabled?: boolean;
    openOnFocus?: boolean;
    children?: React.ReactNode;
    toggleIcon?: React.SFC;
    tabIndex?: number;
}

export interface DropDownState {
    dropdown: HTMLDivElement | null;
}

@SBComponent(style)
export class DropDown extends React.PureComponent<DropDownProps, DropDownState> {
    public static defaultProps: DropDownProps = {
        value: 'Default Text',
        children: [],
        onChange: noop,
        tabIndex: 0,
        toggleIcon: CaretDown
    };

    public state: DropDownState = {dropdown: null};

    public onItemClick = (item: string) => {
        this.toggleDropDown();
        this.props.onChange!({value: item});
    }

    public onInputClick: React.EventHandler<React.MouseEvent<HTMLDivElement>> = event => {
        this.props.onChange!({value: this.props.value!});
    }

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'DROP_DOWN',
            'className': 'drop-down'
        });

        const ToggleIcon = this.props.toggleIcon!;

        return (
            <div
                {...rootProps}
                onKeyDown={this.onKeyDown}
                onFocus={this.onFocus}
                tabIndex={this.props.tabIndex}
                ref={dropdown => this.setState({dropdown})}
            >
                <div data-automation-id="DROP_DOWN_INPUT" onClick={this.onInputClick} className="drop-down-input">
                    <span className="label">{this.props.value!}</span>
                    <div className="caret" data-automation-id="ICON">
                        <ToggleIcon />
                    </div>
                </div>
                <Popup open={!!this.props.open && !this.props.disabled} anchor={this.state.dropdown}>
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
        if (this.props.openOnFocus) { this.toggleDropDown(); }
    }

    private toggleDropDown() {
        if (this.props.open) { this.state.dropdown!.focus(); }
        if (!this.props.disabled) { this.props.onChange!({value: this.props.value!}); }
    }

    private onKeyDown = (e: any) => {
        switch (e.keyCode) {
            case KeyCodes.SPACE:
                e.preventDefault();
                this.toggleDropDown();
                break;
            case KeyCodes.ESC:
                e.preventDefault();
                this.props.open && this.toggleDropDown();
                break;
            case KeyCodes.DOWN:
                e.preventDefault();
                !this.props.open && this.toggleDropDown();
                break;
        }
    }
}
