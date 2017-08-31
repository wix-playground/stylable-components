import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {SelectionList} from '../selection-list';
import {CaretDown} from './drop-down-icons';
import style from './drop-down.st.css';

export interface DropDownInputProps {
    selectedItem?: DropDownItem;
    onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}

export const DropDownInput = stylable(style)<React.SFC<DropDownInputProps>>((props: DropDownInputProps) => {
    return (
        <div data-automation-id="DROP_DOWN_INPUT" onClick={props.onClick} className="drop-down-input">
            <span className="label">{props.selectedItem ? props.selectedItem.label : 'Default Text'}</span>
            <CaretDown className="caret" />
        </div>
    );
});

export interface DropDownListProps {
    open: boolean;
    items?: DropDownItem[];
    selectedItem?: DropDownItem;
    onItemClick?: (item: string) => void;
}

export const DropDownList = stylable(style)<React.SFC<DropDownListProps>>((props: DropDownListProps) => {
    if (!props.open) { return null; }

    return (
        <div data-automation-id="DROP_DOWN_LIST">
            <SelectionList
                className="drop-down-list"
                dataSource={props.items!.map((item: DropDownItem) => item.label)}
                value={props.selectedItem && props.selectedItem.label}
                onChange={props.onItemClick!}
            />
        </div>
    );
});

export interface DropDownItem {
    label: string;
}

export interface DropDownProps extends React.HTMLAttributes<HTMLDivElement> {
    selectedItem?: DropDownItem;
    onInputClick?: () => void;
    open?: boolean;
    items?: DropDownItem[];
    onItemClick?: (item: DropDownItem) => void;
}

@properties
@stylable(style)
export class DropDown extends React.Component<DropDownProps, {}> {

    public static defaultProps: DropDownProps = {items: [], onItemClick: () => {}, onInputClick: () => {}};

    public onItemClick = (item: string) => {
        this.props.onInputClick!();
        this.props.onItemClick!(this.props.items!.filter((elem: DropDownItem) => elem.label === item)[0]);
    }

    public render() {
        return (
            <div data-automation-id="DROP_DOWN" className="drop-down">
                <DropDownInput selectedItem={this.props.selectedItem} onClick={this.props.onInputClick} />
                <DropDownList
                    selectedItem={this.props.selectedItem}
                    items={this.props.items}
                    open={!!this.props.open}
                    onItemClick={this.onItemClick}
                />
            </div>
        );
    }
}
