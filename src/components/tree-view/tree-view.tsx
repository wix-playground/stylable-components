import * as React from 'react';

export interface TreeItemRenderer {
    (props: TreeItemProps): JSX.Element;
}

export interface TreeItemProps {
    label: string;
    children?: Object[];
    itemRenderer: TreeItemRenderer;
    onClick?: React.EventHandler<any>;
    isSelected: (item: Object) => boolean;
}

interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: TreeItemRenderer;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: Object;
}

const itemIdPrefix = 'TREE_ITEM';

export function TreeItem(props: TreeItemProps): JSX.Element {
    return (
        <div data-automation-id={`${itemIdPrefix}_${props.label}`}
             key={props.label} onClick={props.onClick} data-selected={props.isSelected(props)}>
            <span data-automation-id={`${itemIdPrefix}_${props.label}_ICON`}>&gt;</span>
            <span data-automation-id={`${itemIdPrefix}_${props.label}_LABEL`}>{props.label}</span>
            {(props.children || []).map((item: TreeItemProps) =>
                props.itemRenderer({...item, onClick: props.onClick,
                    itemRenderer: props.itemRenderer, isSelected: props.isSelected}))}
        </div>
    )
}

export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps = { itemRenderer: TreeItem };

    isSelected(item: Object) {
        return this.props.selectedItem === item;
    }

    render() {
        return (
            <div data-automation-id='TREE_VIEW'>
                {this.props.dataSource.map((item: TreeItemProps) =>
                    this.props.itemRenderer!({...item, onClick: this.props.onSelectItem,
                        itemRenderer: this.props.itemRenderer!, isSelected: this.isSelected.bind(this)}))}
            </div>
        )
    }
}
