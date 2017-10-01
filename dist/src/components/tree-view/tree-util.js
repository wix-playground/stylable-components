"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPreviousItem(dataSource, item, stateMap, parentsMap) {
    var parent = parentsMap.get(item);
    var siblings = parent ? parent.children : dataSource;
    var itemIdx = siblings.indexOf(item);
    if (itemIdx === 0) {
        return parent ? parent : item;
    }
    var prevSibling = siblings[itemIdx - 1];
    var prevSiblingState = stateMap.getItemState(prevSibling);
    if (prevSiblingState.isExpanded && prevSibling.children.length) {
        return prevSibling.children[prevSibling.children.length - 1];
    }
    else {
        return prevSibling;
    }
}
exports.getPreviousItem = getPreviousItem;
function getNextItem(dataSource, item, stateMap, parentsMap) {
    var itemState = stateMap.getItemState(item);
    if (itemState.isExpanded && item.children) {
        return item.children[0];
    }
    else {
        var parent_1 = parentsMap.get(item);
        var siblings = parent_1 ? parent_1.children : dataSource;
        var itemIdx = siblings.indexOf(item);
        return itemIdx !== siblings.length - 1 ?
            siblings[itemIdx + 1] :
            getNextParentSibling(item, parent_1, parentsMap);
    }
}
exports.getNextItem = getNextItem;
function getLastAvailableItem(lastChild, stateMap) {
    if (stateMap.getItemState(lastChild).isExpanded && lastChild.children) {
        return getLastAvailableItem(lastChild.children[lastChild.children.length - 1], stateMap);
    }
    else {
        return lastChild;
    }
}
exports.getLastAvailableItem = getLastAvailableItem;
function getNextParentSibling(item, parent, parentsMap) {
    if (!parent) {
        return item;
    }
    else {
        var grandParent = parentsMap.get(parent);
        if (!grandParent) {
            return item;
        }
        var grandParentChildren = grandParent.children;
        var parentIdx = grandParentChildren.indexOf(parent);
        return parentIdx !== grandParentChildren.length - 1 ? grandParentChildren[parentIdx + 1] : item;
    }
}
exports.getNextParentSibling = getNextParentSibling;
//# sourceMappingURL=tree-util.js.map