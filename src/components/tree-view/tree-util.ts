import {TreeItemData, TreeViewParentsMap, TreeViewStateMap} from './tree-view';

export function getPreviousItem(
    dataSource: object[],
    item: TreeItemData,
    stateMap: TreeViewStateMap,
    parentsMap: TreeViewParentsMap): TreeItemData {
    const parent = parentsMap.get(item);

    const siblings = parent ? parent.children! : dataSource;

    const itemIdx = siblings.indexOf(item);
    if (itemIdx === 0) { return parent ? parent : item; }

    const prevSibling = siblings[itemIdx - 1] as TreeItemData;
    const prevSiblingState = stateMap.getItemState(prevSibling);

    if (prevSiblingState.isExpanded && prevSibling.children!.length) {
        return prevSibling.children![prevSibling.children!.length - 1];
    } else {
        return prevSibling;
    }
}

export function getNextItem(
    dataSource: object[],
    item: TreeItemData,
    stateMap: TreeViewStateMap,
    parentsMap: TreeViewParentsMap): TreeItemData {
    const itemState = stateMap.getItemState(item);

    if (itemState.isExpanded && item.children) {
        return item.children![0];
    } else {
        const parent = parentsMap.get(item);
        const siblings = parent ? parent.children! : dataSource;
        const itemIdx = siblings.indexOf(item);
        return itemIdx !== siblings.length - 1 ?
            siblings[itemIdx + 1] as TreeItemData :
            getNextParentSibling(item, parent, parentsMap);
    }
}

export function getLastAvailableItem(lastChild: TreeItemData, stateMap: TreeViewStateMap): TreeItemData {
    if (stateMap.getItemState(lastChild).isExpanded && lastChild.children) {
        return getLastAvailableItem(lastChild.children[lastChild.children.length - 1], stateMap);
    } else {
        return lastChild;
    }

}

export function getNextParentSibling(
    item: TreeItemData,
    parent: TreeItemData | undefined,
    parentsMap: TreeViewParentsMap): TreeItemData {
    if (!parent) {
        return item;
    } else {
        const grandParent = parentsMap.get(parent);
        if (!grandParent) { return item; }
        const grandParentChildren = grandParent!.children!;
        const parentIdx = grandParentChildren.indexOf(parent);
        return parentIdx !== grandParentChildren.length - 1 ? grandParentChildren[parentIdx + 1] : item;
    }
}
