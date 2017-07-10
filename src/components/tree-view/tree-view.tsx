import * as React from 'react';

interface TreeItemProps {
    id: string;
    label: string;
    onClick?: React.EventHandler<any>;
}

interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: (props: TreeItemProps) => JSX.Element;
    onSelectItem?: React.EventHandler<any>;
}

const itemIdPrefix = 'TREE_ITEM';

export function TreeItem(props: TreeItemProps): JSX.Element {
    return (
        <div data-automation-id={`${itemIdPrefix}_${props.id}`} key={props.id} onClick={props.onClick}>
            <span data-automation-id={`${itemIdPrefix}_${props.id}_ICON`}>&gt;</span>
            <span data-automation-id={`${itemIdPrefix}_${props.id}_LABEL`}>{props.label}</span>
        </div>
    )
}

export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps = { itemRenderer: TreeItem };

    render() {
        return (
            <div data-automation-id='TREE_VIEW'>
                {this.props.dataSource.map((item: TreeItemProps) => this.props.itemRenderer!({id: item.id, label: item.label, onClick: this.props.onSelectItem}))}
            </div>
        )
    }
}
