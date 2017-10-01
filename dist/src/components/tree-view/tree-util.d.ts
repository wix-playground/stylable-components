import { TreeItemData, TreeViewParentsMap, TreeViewStateMap } from './tree-view';
export declare function getPreviousItem(dataSource: object[], item: TreeItemData, stateMap: TreeViewStateMap, parentsMap: TreeViewParentsMap): TreeItemData;
export declare function getNextItem(dataSource: object[], item: TreeItemData, stateMap: TreeViewStateMap, parentsMap: TreeViewParentsMap): TreeItemData;
export declare function getLastAvailableItem(lastChild: TreeItemData, stateMap: TreeViewStateMap): TreeItemData;
export declare function getNextParentSibling(item: TreeItemData, parent: TreeItemData | undefined, parentsMap: TreeViewParentsMap): TreeItemData;
