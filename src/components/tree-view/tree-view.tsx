import * as React from 'react';
import { observer } from 'mobx-react';
import { autorun, observable } from 'mobx';

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

export interface StateMap {
    // [key: string]: { isSelected: boolean }
}


const itemIdPrefix = 'TREE_ITEM';

function isItemSelected(item: { isSelected: boolean }): boolean {
    debugger;
    return item && item.isSelected;
}

export function TreeItem({ item, itemRenderer, onItemClick, stateMap = {} }: TreeItemProps): JSX.Element {
    return (
        <div key={item.label}>
            <div data-automation-id={`${itemIdPrefix}_${item.label.replace(' ', '_')}`} className={style['tree-node']}
                 onClick={() => onItemClick!(item)} data-selected={ isItemSelected(stateMap[item.label])}>
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
    static defaultProps = { itemRenderer: TreeItemWrapper, selectedItem: observable({ item: {label: ''} }), onSelectItem: () => {} };

    stateMap: Map<TreeItemData, boolean> = new Map<TreeItemData, boolean>();

    componentDidMount() {
        autorun(() => {
            const currLabel = this.props.selectedItem!.item.label;

            if (!currLabel) return;

            debugger;

            if (this.stateMap[currLabel]) {
                this.stateMap[currLabel].isSelected = true;
            } else {
                this.stateMap[currLabel] = observable({ isSelected: true });
            }
        });
    }

    onSelectItem = (item: TreeItemData) => {
        debugger;
        if (this.props.selectedItem!.item.label) {
            this.stateMap[this.props.selectedItem!.item.label].isSelected = false;
        }
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
