import * as React from 'react';
import { observer } from 'mobx-react';
import { autorun, observable } from 'mobx';

import { SBComponent, SBStateless } from 'stylable-react-component';
import style from './tree-view.st.css';

export interface TreeItemData {
    label: string;
    children?: TreeItemData[];
}

export interface TreeItemProps {
    item: TreeItemData;
    itemRenderer: React.ComponentType<TreeItemProps>;
    onItemClick?: React.EventHandler<any>;
    stateMap: StateMap;
    state: TreeItemState;
}

export interface TreeViewProps {
    dataSource: Object[];
    itemRenderer?: React.ComponentType<TreeItemProps>;
    onSelectItem?: React.EventHandler<any>;
    selectedItem?: TreeItemData;
}

export interface TreeItemState {
    isSelected: boolean;
    isExpanded: boolean;
}

export type StateMap = Map<TreeItemData, TreeItemState>;

const itemIdPrefix = 'TREE_ITEM';

export const TreeItem: React.SFC<TreeItemProps> = SBStateless(({ item, itemRenderer, onItemClick, stateMap, state }) => {
    const itemLabel = item.label.replace(' ', '_');
    const TreeNode = itemRenderer;
    return (
        <div>
            <div data-automation-id={`${itemIdPrefix}_${itemLabel}`} className="tree-node"
                 cssStates={{selected: state!.isSelected}}
                 onClick={() => onItemClick!(item)} data-selected={ state!.isSelected }>
                <span data-automation-id={`${itemIdPrefix}_${itemLabel}_ICON`}>&gt; </span>
                <span data-automation-id={`${itemIdPrefix}_${itemLabel}_LABEL`}>{item.label}</span>
            </div>
            <div className="nested-tree">
                {state!.isExpanded && (item.children || []).map((child: TreeItemData, index: number) =>
                    <TreeNode item={child} onItemClick={onItemClick} itemRenderer={itemRenderer}
                              stateMap={stateMap} state={stateMap.get(child)!} key={`${index}`} />
                )}
            </div>
        </div>
    )
}, style);

const TreeItemWrapper = observer(TreeItem);

@SBComponent(style) @observer
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
        if (!this.stateMap.get(item)!.isExpanded || this.props.selectedItem === item) {
            this.stateMap.get(item)!.isExpanded = !this.stateMap.get(item)!.isExpanded;
        }
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
        const TreeNode = this.props.itemRenderer!;
        return (
            <div data-automation-id='TREE_VIEW' className="tree-view">
                {(this.props.dataSource || []).map((item: TreeItemData, index: number) =>
                    <TreeNode item={item} onItemClick={this.onSelectItem} itemRenderer={this.props.itemRenderer!}
                              stateMap={this.stateMap} state={this.stateMap.get(item)!} key={`${index}`} />
                )}
            </div>
        )
    }
}

