import * as React from 'react';
import { SBComponent } from 'stylable-react-component';
import style from './tree-view.st.css';

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
}

export interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: TreeItemRenderer;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: TreeItemData;
}

const itemIdPrefix = 'TREE_ITEM';

export function TreeItem({ item, itemRenderer, onItemClick, isSelected }: TreeItemProps): JSX.Element {
    return (
        <div key={item.label}>
            <div
                data-automation-id={`${itemIdPrefix}_${item.label.replace(' ', '_')}`}
                className="tree-node"
                cssStates={{
                    selected: isSelected(item)
                }}
                onClick={() => onItemClick!(item)}
            >
                <span data-automation-id={`${itemIdPrefix}_${item.label}_ICON`}>&gt; </span>
                <span data-automation-id={`${itemIdPrefix}_${item.label}_LABEL`}>{item.label}</span>
            </div>
            <div className="nested-tree">
                {(item.children || []).map((child: TreeItemData) =>
                    itemRenderer({ item: child, onItemClick, itemRenderer, isSelected })
                )}
            </div>
        </div>
    )
}

@SBComponent(style)
export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps = {
        itemRenderer: TreeItem,
        onSelectItem: () => { }
    };

    isSelected = (item: TreeItemData) => {
        return !!this.props.selectedItem && (this.props.selectedItem!.label === item.label);
    };

    render() {
        return (
            <div data-automation-id='TREE_VIEW'>
                {(this.props.dataSource || []).map((item: TreeItemData) =>
                    this.props.itemRenderer!({
                        item,
                        onItemClick: this.props.onSelectItem,
                        itemRenderer: this.props.itemRenderer!,
                        isSelected: this.isSelected
                    })
                )}
            </div>
        )
    }
}
