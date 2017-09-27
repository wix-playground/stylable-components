import * as keycode from 'keycode';
import {action, autorun, observable} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {TreeItem} from './tree-item-default';
import {getLastAvailableItem, getNextItem, getPreviousItem} from './tree-util';
import style from './tree-view.st.css';

export const TreeKeyCodes: any = {
    ENTER: keycode('enter'),
    HOME: keycode('home'),
    END: keycode('end'),
    UP: keycode('up'),
    DOWN: keycode('down'),
    LEFT: keycode('left'),
    RIGHT: keycode('right')
};

export type TreeItemEventHandler = (item: TreeItemData, e: React.MouseEvent<HTMLElement>) => void;

export interface TreeItemData {
    label: string;
    children?: TreeItemData[];
}

export interface TreeItemProps {
    item: TreeItemData;
    itemRenderer: React.ComponentType<TreeItemProps>;
    onItemClick?: TreeItemEventHandler;
    onIconClick?: TreeItemEventHandler;
    stateMap: TreeViewStateMap;
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLUListElement> {
    dataSource: object[];
    itemRenderer?: React.ComponentType<TreeItemProps>;
    onSelectItem?: React.EventHandler<any>;
    onFocusItem?: React.EventHandler<any>;
    selectedItem?: TreeItemData;
    focusedItem?: TreeItemData;
    className?: string;
}

export interface TreeItemState {
    isSelected: boolean;
    isExpanded: boolean;
    isFocused: boolean;
}

export type StateMap = Map<TreeItemData, TreeItemState>;
export type TreeViewParentsMap = Map<TreeItemData, TreeItemData | undefined>;

export function initParentsMap(parentsMap: TreeViewParentsMap,
                               data: TreeItemData[] = [], parent: TreeItemData | undefined) {
    data.forEach((item: TreeItemData) => {
        parentsMap.set(item, parent);
        initParentsMap(parentsMap, item.children || [], item);
    });
}

const TreeItemWrapper = observer(TreeItem);

export class TreeViewStateMap {
    private stateMap: StateMap = new Map<TreeItemData, TreeItemState>();

    public getItemState(item: TreeItemData) {
        const state = this.stateMap.get(item);
        if (state) {
            return state;
        } else {
            const newState = observable({isSelected: false, isExpanded: false, isFocused: false});
            this.stateMap.set(item, newState);
            return newState;
        }
    }
}

@observer
@stylable(style)
@properties
export class TreeView extends React.Component<TreeViewProps> {
    public static defaultProps: Partial<TreeViewProps> = {
        itemRenderer: TreeItemWrapper,
        onSelectItem: () => { },
        onFocusItem: () => { }
    };

    private stateMap: TreeViewStateMap = new TreeViewStateMap();
    private parentsMap: TreeViewParentsMap = new Map<TreeItemData, TreeItemData | undefined>();

    constructor(props: TreeViewProps) {
        super(props);
        initParentsMap(this.parentsMap, props.dataSource as TreeItemData[], undefined);
    }

    public componentDidMount() {
        autorun(() => {
            if (this.props.selectedItem) {
                action(() => this.stateMap.getItemState(this.props.selectedItem!).isSelected = true)();
            }
            if (this.props.focusedItem) {
                action(() => this.stateMap.getItemState(this.props.focusedItem!).isFocused = true)();
            }
        });
    }

    public render() {
        const TreeNode = this.props.itemRenderer!;

        return (
            <ul
                data-automation-id="TREE_VIEW"
                onKeyDown={this.onKeyDown}
                role="tree"
                tabIndex={0}
                aria-activedescendant={this.props.focusedItem && this.props.focusedItem.label}
            >
                {(this.props.dataSource || []).map((item: TreeItemData, index: number) =>
                    <TreeNode
                        item={item}
                        onItemClick={this.onSelectItem}
                        itemRenderer={this.props.itemRenderer!}
                        onIconClick={this.onToggleItem}
                        stateMap={this.stateMap}
                        key={`${index}`}
                    />
                )}
            </ul>
        );
    }

    public collapse = (item: TreeItemData): void => {
        this.collapseItem(item);
        if (item.children) {
            item.children.forEach(this.collapse);
        }
    }

    public collapseAll = (): void => {
        this.props.dataSource.forEach(this.collapse);
    }

    public expand = (item: TreeItemData): void => {
        this.expandItem(item);
        if (item.children) {
            item.children.forEach(this.expand);
        }
    }

    public expandAll = (): void => {
        this.props.dataSource.forEach(this.expand);
    }

    public selectItem(item: TreeItemData) {
        if (this.props.selectedItem) {
            if (this.props.selectedItem !== item) {
                this.stateMap.getItemState(this.props.selectedItem).isSelected = false;
                this.props.onSelectItem!(this.props.selectedItem !== item ? item : undefined);
            }
        } else {
            this.props.onSelectItem!(item);
        }
    }

    private toggleItem(item: TreeItemData) {
        this.stateMap.getItemState(item).isExpanded = !this.stateMap.getItemState(item).isExpanded;
    }

    @action
    private onSelectItem = (item: TreeItemData, e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        this.selectItem(item);
        if (this.props.focusedItem) { this.stateMap.getItemState(this.props.focusedItem).isFocused = false; }
    }

    @action
    private onToggleItem = (item: TreeItemData, e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (this.props.focusedItem) { this.stateMap.getItemState(this.props.focusedItem).isFocused = false; }
        this.toggleItem(item);
        this.props.onFocusItem!(item);
    }

    @action
    private onFocusItem(item: TreeItemData) {
        if (this.props.focusedItem !== item) {
            if (this.props.focusedItem) { this.stateMap.getItemState(this.props.focusedItem).isFocused = false; }
            this.props.onFocusItem!(item);
        }
    }

    private expandItem = (item: TreeItemData) => {
        if (this.stateMap.getItemState(item).isExpanded) {
            this.focusNext(item);
        } else {
            if (item.children) { this.stateMap.getItemState(item).isExpanded = true; }
        }
    }

    private collapseItem = (item: TreeItemData) => {
        if (!this.stateMap.getItemState(item).isExpanded) {
            const parent = this.parentsMap.get(item);
            if (parent) { this.onFocusItem!(parent); }
        } else {
            if (item.children) { this.stateMap.getItemState(item).isExpanded = false; }
        }
    }

    private focusPrev = (item: TreeItemData) =>
        this.onFocusItem!(getPreviousItem(this.props.dataSource, item, this.stateMap, this.parentsMap))

    private focusNext = (item: TreeItemData) =>
        this.onFocusItem!(getNextItem(this.props.dataSource, item, this.stateMap, this.parentsMap))

    private focusFirst = () => this.props.onFocusItem!(this.props.dataSource[0]);
    private focusLast = () =>
        this.props.onFocusItem!(
            getLastAvailableItem(this.props.dataSource[this.props.dataSource.length - 1] as TreeItemData, this.stateMap)
        )

    @action
    private onKeyDown = (e: any) => {
        if (!this.props.focusedItem) { return; }

        switch (e.keyCode) {
            case TreeKeyCodes.RIGHT:
                e.preventDefault(); this.expandItem(this.props.focusedItem); break;
            case TreeKeyCodes.LEFT:
                e.preventDefault(); this.collapseItem(this.props.focusedItem); break;
            case TreeKeyCodes.UP:
                e.preventDefault(); this.focusPrev(this.props.focusedItem); break;
            case TreeKeyCodes.DOWN:
                e.preventDefault(); this.focusNext(this.props.focusedItem); break;
            case TreeKeyCodes.ENTER:
                e.preventDefault(); this.selectItem(this.props.focusedItem); break;
            case TreeKeyCodes.HOME:
                this.stateMap.getItemState(this.props.focusedItem).isFocused = false;
                e.preventDefault(); this.focusFirst(); break;
            case TreeKeyCodes.END:
                this.stateMap.getItemState(this.props.focusedItem).isFocused = false;
                e.preventDefault(); this.focusLast(); break;
        }
    }
}
