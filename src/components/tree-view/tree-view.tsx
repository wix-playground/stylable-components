import * as React from 'react';
import { observable, autorun } from 'mobx';
import { observer } from 'mobx-react';

require('./tree-view.css');

export interface TreeItemRenderer {
    (props: TreeItemProps): JSX.Element;
}

export interface TreeItemData {
    label: string;
    children?: TreeItemData[];
}

export interface TreeItemProps {
    item: TreeItemData;
    itemRenderer: TreeItemRenderer;
    onItemClick?: React.EventHandler<any>;
    isSelected: (item: Object) => boolean;
    isExpanded?: (label: string) => boolean;
}

interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: TreeItemRenderer;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: Object;
}

const itemIdPrefix = 'TREE_ITEM';

export function TreeItem({ item, itemRenderer, onItemClick, isSelected, isExpanded = () => true }: TreeItemProps): JSX.Element {
    return (
        <div key={item.label}>
            <div data-automation-id={`${itemIdPrefix}_${item.label}`}
                 onClick={() => onItemClick!(item)} data-selected={isSelected(item)}>
                <span data-automation-id={`${itemIdPrefix}_${item.label}_ICON`}>&gt;</span>
                <span data-automation-id={`${itemIdPrefix}_${item.label}_LABEL`}>{item.label}</span>
            </div>
            {isExpanded!(item.label) && (item.children || []).map((child: TreeItemData) =>
                itemRenderer({item: child, onItemClick, itemRenderer, isSelected, isExpanded}))}
        </div>
    )
}

const TreeItemWrapper = observer((props: TreeItemProps) => TreeItem(props));


export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps = { itemRenderer: TreeItemWrapper, onSelectItem: () => {} };

    @observable stateMap: { [key: string]: boolean } = {};


    isSelected(item: TreeItemData) {
        return this.props.selectedItem === item;
    }

    isExpanded(item: TreeItemData) {
        return this.stateMap[item.label];
    }

    toggleItem = (label: string) => {
        this.stateMap[label] = !this.stateMap[label];
    };

    onSelectItem = (item: TreeItemData) => {
        this.toggleItem(item.label);
        this.props.onSelectItem!(item);
    };

    render() {
        debugger;
        return (
            <div data-automation-id='TREE_VIEW'>
                {this.props.dataSource.map((item: TreeItemData) =>
                    this.props.itemRenderer!({item, onItemClick: this.onSelectItem,
                        itemRenderer: this.props.itemRenderer!,
                        isSelected: this.isSelected.bind(this), isExpanded: this.isExpanded.bind(this)}))}
            </div>
        )
    }
}
