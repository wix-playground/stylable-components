import * as React from 'react';

export interface TreeItemRenderer {
    (props: TreeItemProps): JSX.Element;
}

export interface TreeItemProps {
    id: string;
    label: string;
    children?: Object[];
    itemRenderer: TreeItemRenderer;
    onClick?: React.EventHandler<any>;
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
        <div data-automation-id={`${itemIdPrefix}_${props.id}`} key={props.id} onClick={props.onClick}>
            <span data-automation-id={`${itemIdPrefix}_${props.id}_ICON`}>&gt;</span>
            <span data-automation-id={`${itemIdPrefix}_${props.id}_LABEL`}>{props.label}</span>
            {(props.children || []).map((item: TreeItemProps) =>
                props.itemRenderer({...item, onClick: props.onClick, itemRenderer: props.itemRenderer}))}
        </div>
    )
}

export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps = { itemRenderer: TreeItem };

    render() {
        return (
            <div data-automation-id='TREE_VIEW'>
                {this.props.dataSource.map((item: TreeItemProps) =>
                    this.props.itemRenderer!({...item, onClick: this.props.onSelectItem, itemRenderer: this.props.itemRenderer!}))}
            </div>
        )
    }
}
