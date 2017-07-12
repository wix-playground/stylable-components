import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const style = require('./tree-view.css');

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
    stateMap?: { [key: string]: {isExpanded: boolean} };
}

interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: TreeItemRenderer;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: Object;
}

const itemIdPrefix = 'TREE_ITEM';

export function TreeItem({ item, itemRenderer, onItemClick, isSelected, stateMap = {} }: TreeItemProps): JSX.Element {
    return (
        <div key={item.label}>
            <div data-automation-id={`${itemIdPrefix}_${item.label}`}
                 onClick={() => onItemClick!(item)} data-selected={isSelected(item)}>
                <span data-automation-id={`${itemIdPrefix}_${item.label}_ICON`}>&gt;</span>
                <span data-automation-id={`${itemIdPrefix}_${item.label}_LABEL`}>{item.label}</span>
            </div>
            <div className={style['nested-tree']}>
                {stateMap![item.label] && stateMap![item.label].isExpanded && (item.children || []).map((child: TreeItemData) =>
                    React.createElement(itemRenderer,
                        {item: child, onItemClick, itemRenderer, isSelected, stateMap}))}
            </div>
        </div>
    )
}

const TreeItemWrapper = observer(TreeItem);

@observer
export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps = { itemRenderer: TreeItemWrapper, onSelectItem: () => {} };

    stateMap: { [key: string]: {isExpanded: boolean} } = {};

    isSelected(item: TreeItemData) {
        return this.props.selectedItem === item;
    }

    isExpanded(item: TreeItemData) {
        return this.stateMap[item.label] && this.stateMap[item.label].isExpanded;
    }

    toggleItem = (label: string) => {
        if (!(label in this.stateMap)) {
            this.stateMap[label] = observable({isExpanded: true });
        } else {
            this.stateMap[label].isExpanded = !this.stateMap[label].isExpanded;
        }
    };

    onSelectItem = (item: TreeItemData) => {
        if (!this.isExpanded(item) || this.isSelected(item)) {
            this.toggleItem(item.label);
        }
        this.props.onSelectItem!(item);
    };

    render() {
        return (
            <div data-automation-id='TREE_VIEW'>
                {this.props.dataSource.map((item: TreeItemData) =>
                    React.createElement(
                    this.props.itemRenderer!,
                        {item, onItemClick: this.onSelectItem,
                         itemRenderer: this.props.itemRenderer!,
                         isSelected: this.isSelected.bind(this), stateMap: this.stateMap}))}
            </div>
        )
    }
}
