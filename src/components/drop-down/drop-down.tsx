import * as keycode from 'keycode';
import * as React from 'react';
import {SBComponent, SBStateless} from 'stylable-react-component';
import {root} from 'wix-react-tools';
import {Popup} from '../../../src';
import {noop} from '../../utils/noop';
import {SelectionList, SelectionListProps} from '../selection-list';
import {CaretDown} from './drop-down-icons';
import style from './drop-down.st.css';

const KeyCodes: any = {
    ENTER: keycode('enter'),
    UP: keycode('up'),
    DOWN: keycode('down'),
    SPACE: keycode('space'),
    ESC: keycode('escape')
};

export interface DropDownInputProps {
    selectedItem?: string;
    onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

export const DropDownInput: React.SFC<DropDownInputProps> = SBStateless(props => {
    return (
        <div data-automation-id="DROP_DOWN_INPUT" onClick={props.onClick} className="drop-down-input">
            <span className="label">{props.selectedItem ? props.selectedItem : 'Default Text'}</span>
            <CaretDown className="caret" />
        </div>
    );
}, style);

export interface DropDownItem {
    label: string;
}

export interface DropDownProps extends SelectionListProps {
    open?: boolean;
    disabled?: boolean;
    openOnFocus?: boolean;
    onChange?: (id: string) => void;
    hideSelected?: boolean;
    // children?: any;
    value?: string;

    onInputClick?: () => void;
    items?: DropDownItem[];
    onItemClick?: (item: string | DropDownItem) => void;
    tabIndex?: number;
    focusedItem?: DropDownItem;
    onFocusItem?: (item: DropDownItem) => void;
}

export interface DropDownState {
    dropdown: HTMLDivElement | null;
}

@SBComponent(style)
export class DropDown extends React.Component<DropDownProps, DropDownState> {
    public static defaultProps: DropDownProps = {
        items: [],
        onChange: noop,
        onItemClick: noop,
        onInputClick: noop,
        tabIndex: 0
    };

    constructor() {
        super();
        this.state = {dropdown: null};
    }

    public onItemClick = (item: string) => {
        this.toggleDropDown();
        this.props.onItemClick!(this.props.items!.filter((elem: DropDownItem) => elem.label === item)[0]);
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
                tabIndex={this.props.tabIndex}
                ref={dropdown => {
                    if (!this.state.dropdown) {
                        this.setState({dropdown});
                    }
                }}
            >
                <DropDownInput selectedItem={this.props.value} onClick={this.props.onInputClick} />
                <Popup open={!!this.props.open && !this.props.disabled} anchor={this.state.dropdown}>
                    <div className="root">
                        <SelectionList
                            data-automation-id="DROP_DOWN_LIST"
                            className="drop-down-list"
                            dataSource={this.props.items!.map((item: DropDownItem) => item.label)}
                            value={this.props.value}
                            onChange={this.onItemClick!}
                        />
                    </div>
                </Popup>
            </div>
        );
    }

    private toggleDropDown() {
        if (this.props.open) { this.state.dropdown!.focus(); }
        this.props.onInputClick!();
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
