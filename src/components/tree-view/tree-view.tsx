import * as React from 'react';
import { observer } from 'mobx-react';
import { autorun, observable } from 'mobx';
import { KeyCodes } from '../../common/key-codes';

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
    onFocusItem?: React.EventHandler<any>;
    focusedItem?: TreeItemData;
}

export interface TreeItemState {
    isSelected: boolean;
    isExpanded: boolean;
    isFocused: boolean;
}

export type StateMap = Map<TreeItemData, TreeItemState>;
export type ParentsMap = Map<TreeItemData, TreeItemData | undefined>;

const itemIdPrefix = 'TREE_ITEM';

export const TreeItem: React.SFC<TreeItemProps> = SBStateless(({ item, itemRenderer, onItemClick, stateMap, state }) => {
    const itemLabel = item.label.replace(' ', '_');
    const TreeNode = itemRenderer;
    return (
        <div>
            <div data-automation-id={`${itemIdPrefix}_${itemLabel}`} className="tree-node"
                 cssStates={{selected: state!.isSelected, focused: state!.isFocused}}
                 onClick={() => onItemClick!(item)} data-selected={ state!.isSelected } data-focused={ state!.isFocused }>
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
    static defaultProps: Partial<TreeViewProps> = { itemRenderer: TreeItemWrapper, onSelectItem: () => {}, onFocusItem: () => {} };

    stateMap: StateMap = new Map<TreeItemData, TreeItemState>();
    parentsMap: ParentsMap = new Map<TreeItemData, TreeItemData | undefined>();

    constructor(props: TreeViewProps) {
        super(props);
        this.initState(props.dataSource as TreeItemData[], undefined);
    }

    initState(data: TreeItemData[] = [], parent: TreeItemData | undefined) {
        data.forEach((item: TreeItemData) => {
            this.stateMap.set(item, observable({ isSelected: false, isExpanded: false, isFocused: false }));
            this.parentsMap.set(item, parent);
            this.initState(item.children || [], item);
        });
    }

    componentDidMount() {
        autorun(() => {
            if (this.props.selectedItem) {
                this.stateMap.get(this.props.selectedItem)!.isSelected = true;
            }
            if (this.props.focusedItem) {
                this.stateMap.get(this.props.focusedItem)!.isFocused = true;
            }
        });
    }

    toggleItem(item: TreeItemData) {
        if (this.stateMap.get(item)!.isExpanded && this.props.selectedItem !== item) return;
        this.stateMap.get(item)!.isExpanded = !this.stateMap.get(item)!.isExpanded;
    }

    selectItem(item: TreeItemData) {
        if (this.props.selectedItem) {
            if (this.props.selectedItem !== item ) {
                this.stateMap.get(this.props.selectedItem)!.isSelected = false;
                this.props.onSelectItem!(this.props.selectedItem !== item ? item : undefined);
            }
        } else {
            this.props.onSelectItem!(item);
        }
    }

    onSelectItem = (item: TreeItemData) => {
        this.selectItem(item);
        if (this.props.focusedItem) this.stateMap.get(this.props.focusedItem)!.isFocused = false;
        this.toggleItem(item);
    };

    getPreviousItem(item: TreeItemData) {
        const parent = this.parentsMap.get(item);

        const siblings = parent ? parent.children! : this.props.dataSource;

        const itemIdx = siblings.indexOf(item);
        if (itemIdx === 0) return parent ? parent : item;


        const prevSibling = siblings[itemIdx - 1] as TreeItemData;
        const prevSiblingState = this.stateMap.get(prevSibling)!;

        if (prevSiblingState.isExpanded && prevSibling.children!.length ) {
            return prevSibling.children![prevSibling.children!.length - 1];
        } else {
            return prevSibling;
        }
    }

    getNextParentSibling(item: TreeItemData, parent: TreeItemData | undefined) {
        if (!parent) {
            return item;
        } else {
            const grandParent = this.parentsMap.get(parent);
            const grandParentChildren = grandParent!.children!;
            const parentIdx = grandParentChildren.indexOf(parent);
            return parentIdx !== grandParentChildren.length - 1 ? grandParentChildren[parentIdx + 1] : item;
        }
    }

    getNextItem(item: TreeItemData) {
        const itemState = this.stateMap.get(item)!;

        if (itemState.isExpanded && item.children) {
            return item.children![0];
        } else {
            const parent = this.parentsMap.get(item);
            const siblings = parent ? parent.children! : this.props.dataSource;
            const itemIdx = siblings.indexOf(item);
            return itemIdx !== siblings.length - 1 ? siblings[itemIdx + 1] : this.getNextParentSibling(item, parent);
        }
    }

    getLastAvailableItem(lastChild: TreeItemData): TreeItemData {
        if (this.stateMap.get(lastChild)!.isExpanded && lastChild.children) {
            return this.getLastAvailableItem(lastChild.children[lastChild.children.length - 1]);
        } else {
            return lastChild;
        }

    }

    onFocusItem(item: TreeItemData) {
        if (this.props.focusedItem !== item) {
            if (this.props.focusedItem) this.stateMap.get(this.props.focusedItem)!.isFocused = false;
            this.props.onFocusItem!(item);
        }
    }

    expandItem = (item: TreeItemData) => this.stateMap.get(item)!.isExpanded = true;
    collapseItem = (item: TreeItemData) => this.stateMap.get(item)!.isExpanded = false;
    focusPrev = (item: TreeItemData) => this.onFocusItem!(this.getPreviousItem(item) as TreeItemData);
    focusNext = (item: TreeItemData) => this.onFocusItem!(this.getNextItem(item) as TreeItemData);
    focusFirst = () => this.props.onFocusItem!(this.props.dataSource[0]);
    focusLast = () =>
        this.props.onFocusItem!(this.getLastAvailableItem(this.props.dataSource[this.props.dataSource.length - 1] as TreeItemData));

    onKeyDown = (e: any) => {
        debugger;
        if (!this.props.focusedItem) return;

        switch(e.keyCode) {
            case KeyCodes.RIGHT:
                this.expandItem(this.props.focusedItem); return;
            case KeyCodes.LEFT:
                this.collapseItem(this.props.focusedItem); return;
            case KeyCodes.UP:
                this.focusPrev(this.props.focusedItem);
                return;
            case KeyCodes.DOWN:
                this.focusNext(this.props.focusedItem);
                return;
            case KeyCodes.ENTER:
                this.selectItem(this.props.focusedItem);
                return;
            case KeyCodes.ESCAPE:
                this.stateMap.get(this.props.focusedItem)!.isFocused = false;
                this.props.onFocusItem!(undefined);
                return;
            case KeyCodes.HOME:
                this.stateMap.get(this.props.focusedItem)!.isFocused = false;
                this.focusFirst();
                return;
            case KeyCodes.END:
                this.stateMap.get(this.props.focusedItem)!.isFocused = false;
                this.focusLast();
                return;
            default:
                return;
        }
    };

    render() {
        const TreeNode = this.props.itemRenderer!;
        return (
            <div data-automation-id='TREE_VIEW' className="tree-view" tabIndex={0} onKeyDown={this.onKeyDown}>
                {(this.props.dataSource || []).map((item: TreeItemData, index: number) =>
                    <TreeNode item={item} onItemClick={this.onSelectItem} itemRenderer={this.props.itemRenderer!}
                              stateMap={this.stateMap} state={this.stateMap.get(item)!} key={`${index}`} />
                )}
            </div>
        )
    }
}
