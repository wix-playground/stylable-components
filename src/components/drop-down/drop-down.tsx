import * as keycode from 'keycode';
import * as React from 'react';
import {SBComponent, SBStateless} from 'stylable-react-component/dist/stylable-react';
import {root} from 'wix-react-tools';
import {Popup} from '../../../src';
import {SelectionList} from '../selection-list';
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
    selectedItem?: DropDownItem;
    onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

export const DropDownInput: React.SFC<DropDownInputProps> = SBStateless(props => {
    return (
        <div data-automation-id="DROP_DOWN_INPUT" onClick={props.onClick} className="drop-down-input">
            <span className="label">{props.selectedItem ? props.selectedItem.label : 'Default Text'}</span>
            <CaretDown className="caret" />
        </div>
    );
}, style);

export interface DropDownListProps {
    open: boolean;
    items?: DropDownItem[];
    selectedItem?: DropDownItem;
    onItemClick?: (item: string) => void;
    listRef: any;
}

export const DropDownList: React.SFC<DropDownListProps> = SBStateless(props => {
    return (
        <Popup open={props.open} anchor={props.listRef}>
            <SelectionList
                className="drop-down-list"
                dataSource={props.items!.map((item: DropDownItem) => item.label)}
                value={props.selectedItem && props.selectedItem.label}
                onChange={props.onItemClick!}
            />
        </Popup>
    );
}, style);

export interface DropDownItem {
    label: string;
}

export interface DropDownProps {
    open?: boolean;
    disabled?: boolean;
    openOnFocus?: boolean;
    onChange?: (id: string) => void;
    hideSelected?: boolean;
    // children?: any;
    value?: string;

    selectedItem?: DropDownItem;
    onInputClick?: () => void;
    items?: DropDownItem[];
    onItemClick?: (item: string) => void;
    tabIndex?: number;
    focusedItem?: DropDownItem;
    onFocusItem?: (item: DropDownItem) => void;
}

@SBComponent(style)
export class DropDown extends React.Component<DropDownProps, {}> {
    public static defaultProps: DropDownProps = {
        items: [],
        onItemClick: () => {},
        onInputClick: () => {} ,
        tabIndex: 0
    };

    private dropdown: HTMLDivElement | null;

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
                data-automation-id="DROP_DOWN"
                {...rootProps}
                onKeyDown={this.onKeyDown}
                tabIndex={this.props.tabIndex}
                ref={dropdown => this.dropdown = dropdown}
            >
                <DropDownInput selectedItem={this.props.selectedItem} onClick={this.props.onInputClick} />
                <Popup open={!!this.props.open} anchor={this.dropdown}>
                    <SelectionList
                        className="drop-down-list"
                        dataSource={this.props.items!.map((item: DropDownItem) => item.label)}
                        value={this.props.selectedItem && this.props.selectedItem.label}
                        onChange={this.props.onItemClick!}
                    />
                </Popup>
                {/*<DropDownList*/}
                    {/*listRef={this.dropdown}*/}
                    {/*selectedItem={this.props.selectedItem}*/}
                    {/*items={this.props.items}*/}
                    {/*open={!!this.props.open}*/}
                    {/*onItemClick={this.onItemClick}*/}
                {/*/>*/}
            </div>
        );
    }

    private focusList(el: any) {
        if (el) { el.children[0].focus(); }
    }

    private toggleDropDown() {
        if (this.props.open) { this.dropdown!.focus(); }
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
