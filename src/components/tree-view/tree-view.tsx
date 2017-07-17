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

export interface TreeItemProps extends React.Attributes {
    item: TreeItemData;
    itemRenderer: TreeItemRenderer;
    onItemClick?: React.EventHandler<any>;
    stateMap: StateMap;
    state: TreeItemState;
}

export interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: TreeItemRenderer;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: TreeItemData;
}

export interface TreeItemState {
    isSelected: boolean;
    isExpanded: boolean;
}

export type StateMap = Map<TreeItemData, TreeItemState>;

const itemIdPrefix = 'TREE_ITEM';

export function TreeItem({ item, itemRenderer, onItemClick, stateMap, state }: TreeItemProps): JSX.Element {
    const itemLabel = item.label.replace(' ', '_');
    return (
        <div>
            <div data-automation-id={`${itemIdPrefix}_${itemLabel}`} className={style['tree-node']}
                 onClick={() => onItemClick!(item)} data-selected={ state!.isSelected }>
                <span data-automation-id={`${itemIdPrefix}_${itemLabel}_ICON`}>&gt; </span>
                <span data-automation-id={`${itemIdPrefix}_${itemLabel}_LABEL`}>{item.label}</span>
            </div>
            <div className={style['nested-tree']}>
                {state!.isExpanded && (item.children || []).map((child: TreeItemData, index: number) =>
                    React.createElement(itemRenderer,
                        {item: child, onItemClick, itemRenderer, stateMap, state: stateMap.get(child)!, key: `${index}`}))}
            </div>
        </div>
    )
}

const TreeItemWrapper = observer(TreeItem);

@observer
export class TreeView extends React.Component<TreeViewProps, {}>{
    static defaultProps = { itemRenderer: TreeItemWrapper, onSelectItem: () => {} };

    stateMap: StateMap = new Map<TreeItemData, TreeItemState>();

    constructor(props: TreeViewProps) {
        super(props);
        this.initStateMap(props.dataSource);
    }

    initStateMap(data: Object[] = []) {
        data.forEach((item: TreeItemData) => {
            this.stateMap.set(item, observable({ isSelected: false, isExpanded: false }));
            this.initStateMap(item.children || []);
        });
    }

    componentDidMount() {
        autorun(() => {
            if (this.props.selectedItem) {
                this.stateMap.get(this.props.selectedItem)!.isSelected = true;
            }
        });
    }

    toggleItem(item: TreeItemData) {
        if (this.stateMap.get(item)!.isExpanded && this.props.selectedItem !== item) return;
        this.stateMap.get(item)!.isExpanded = !this.stateMap.get(item)!.isExpanded;
    }

    onSelectItem = (item: TreeItemData) => {
        if (this.props.selectedItem) {
            this.stateMap.get(this.props.selectedItem)!.isSelected = false;
            this.props.onSelectItem!(this.props.selectedItem !== item ? item : undefined);
        } else {
            this.props.onSelectItem!(item);
        }
        this.toggleItem(item);
    };

    render() {
        return (
            <div data-automation-id='TREE_VIEW' className={style['tree-view']}>
                {(this.props.dataSource || []).map((item: TreeItemData, index: number) =>
                    React.createElement(
                        this.props.itemRenderer!,
                        {item, onItemClick: this.onSelectItem, itemRenderer: this.props.itemRenderer!,
                            stateMap: this.stateMap, state: this.stateMap.get(item)!, key: `${index}` }))}
            </div>
        )
    }
}
