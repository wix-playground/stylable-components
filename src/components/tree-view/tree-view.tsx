import * as React from 'react';
import {observer} from "mobx-react";
import {autorun, observable} from "mobx";

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
    stateMap?: StateMap;
}

export interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: TreeItemRenderer;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: {item: TreeItemData};
}

interface StateMap {
  selected: {label: string};
}

const itemIdPrefix = 'TREE_ITEM';

export function TreeItem({ item, itemRenderer, onItemClick, stateMap }: TreeItemProps): JSX.Element {
    return (
        <div key={item.label}>
            <div data-automation-id={`${itemIdPrefix}_${item.label.replace(' ', '_')}`} className={style['tree-node']}
                 onClick={() => onItemClick!(item)} data-selected={ stateMap!.selected.label === item.label }>
                <span data-automation-id={`${itemIdPrefix}_${item.label}_ICON`}>&gt; </span>
                <span data-automation-id={`${itemIdPrefix}_${item.label}_LABEL`}>{item.label}</span>
            </div>
            <div className={style['nested-tree']}>
                {(item.children || []).map((child: TreeItemData) =>
                    React.createElement(itemRenderer,
                        {item: child, onItemClick, itemRenderer, stateMap}))}
            </div>
        </div>
    )
}

const TreeItemWrapper = observer(TreeItem);

export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps = { itemRenderer: TreeItemWrapper, selectedItem: observable({ item: { label: 'Fillet' } }), onSelectItem: () => {} };

    stateMap: StateMap;

    componentDidMount() {
        autorun(() => {
            this.stateMap = {selected: observable({ label: this.props.selectedItem!.item.label }) }
        })();
    }

    onSelectItem = (item: TreeItemData) => {
        this.props.onSelectItem!(item);
    };

    render() {
        return (
            <div data-automation-id='TREE_VIEW' className={style['tree-view']}>
                {(this.props.dataSource || []).map((item: TreeItemData) =>
                    React.createElement(
                        this.props.itemRenderer!,
                        {item, onItemClick: this.onSelectItem,
                            itemRenderer: this.props.itemRenderer!, stateMap: this.stateMap }))}
            </div>
        )
    }
}
