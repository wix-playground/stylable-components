/// <reference types="react" />
import * as React from 'react';
export declare const TreeKeyCodes: any;
export declare type TreeItemEventHandler = (item: TreeItemData, e: React.MouseEvent<HTMLElement>) => void;
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
export declare type StateMap = Map<TreeItemData, TreeItemState>;
export declare type TreeViewParentsMap = Map<TreeItemData, TreeItemData | undefined>;
export declare function initParentsMap(parentsMap: TreeViewParentsMap, data: TreeItemData[] | undefined, parent: TreeItemData | undefined): void;
export declare class TreeViewStateMap {
    private stateMap;
    getItemState(item: TreeItemData): TreeItemState;
}
export declare class TreeView extends React.Component<TreeViewProps> {
    static defaultProps: Partial<TreeViewProps>;
    private stateMap;
    private parentsMap;
    constructor(props: TreeViewProps);
    componentDidMount(): void;
    render(): JSX.Element;
    collapse: (item: TreeItemData) => void;
    collapseAll: () => void;
    expand: (item: TreeItemData) => void;
    expandAll: () => void;
    selectItem(item: TreeItemData): void;
    private toggleItem(item);
    private onSelectItem;
    private onToggleItem;
    private onFocusItem(item);
    private expandItem;
    private collapseItem;
    private focusPrev;
    private focusNext;
    private focusFirst;
    private focusLast;
    private onKeyDown;
}
