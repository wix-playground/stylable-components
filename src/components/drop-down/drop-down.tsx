import * as keycode from 'keycode';
import * as React from 'react';
import {SBComponent, SBStateless} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {Popup} from '../../../src';
import {noop} from '../../utils/noop';
import {PopupProps} from '../popup';
import {OptionProps, SelectionList} from '../selection-list';
import {CaretDown} from './drop-down-icons';
import style from './drop-down.st.css';

const KeyCodes: any = {
    ENTER: keycode('enter'),
    UP: keycode('up'),
    DOWN: keycode('down'),
    SPACE: keycode('space'),
    ESC: keycode('escape')
};

export interface DropDownProps extends OptionProps {
    open?: boolean;
    value?: string;
    onChange?: (id: string) => void;
    disabled?: boolean;
    openOnFocus?: boolean;
    children?: any;
    toggleIcon?: React.SFC;
    tabIndex?: number;
}

export interface DropDownState {
    dropdown: HTMLDivElement | null;
}

@SBComponent(style)
export class DropDown extends React.Component<DropDownProps, DropDownState> {
    public static defaultProps: DropDownProps = {
        value: 'Default Text',
        children: [],
        onChange: noop,
        tabIndex: 0
    };

    constructor() {
        super();
        this.state = {dropdown: null};
    }

    public onItemClick = (item: string) => {
        this.toggleDropDown();
        this.props.onChange!(item);
    }

    public onInputClick: React.EventHandler<React.MouseEvent<HTMLDivElement>> = event => {
        this.props.onChange!(this.props.value!);
    }

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'DROP_DOWN',
            'className': 'drop-down'
        });

        return (
            <div
                {...rootProps}
                onKeyDown={this.onKeyDown}
                onFocus={this.onFocus}
                tabIndex={this.props.tabIndex}
                ref={dropdown => {
                    if (!this.state.dropdown) {
                        this.setState({dropdown});
                    }
                }}
            >
                <div data-automation-id="DROP_DOWN_INPUT" onClick={this.onInputClick} className="drop-down-input">
                    <span className="label">{this.props.value!}</span>
                    {this.props.toggleIcon
                        ? this.props.toggleIcon
                        : <CaretDown className="caret" />
                    }
                </div>
                <Popup open={!!this.props.open && !this.props.disabled} anchor={this.state.dropdown}>
                    <div className="root">
                        <SelectionList
                            data-automation-id="DROP_DOWN_LIST"
                            className="drop-down-list"
                            value={this.props.value}
                            onChange={this.onItemClick!}
                            dataSource={this.props.children}
                        />
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
        if (!this.props.disabled) { this.props.onChange!(this.props.value!); }
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
