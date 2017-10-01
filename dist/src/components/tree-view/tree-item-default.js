"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var tree_item_st_css_1 = require("./tree-item.st.css");
var tree_view_icons_1 = require("./tree-view-icons");
var itemIdPrefix = 'TREE_ITEM';
exports.TreeItem = wix_react_tools_1.stylable(tree_item_st_css_1.default)(function (_a) {
    var item = _a.item, itemRenderer = _a.itemRenderer, onItemClick = _a.onItemClick, onIconClick = _a.onIconClick, stateMap = _a.stateMap;
    var state = stateMap.getItemState(item);
    var itemLabel = item.label.replace(' ', '_');
    var TreeNode = itemRenderer;
    var iconProps = {
        'data-automation-id': itemIdPrefix + "_" + itemLabel + "_ICON",
        'onClick': onIconClick && onIconClick.bind(null, item),
        'className': 'item-icon',
        'aria-hidden': 'true'
    };
    return (React.createElement("li", { "aria-expanded": item.children ? !!state.isExpanded : undefined, "aria-selected": state.isSelected ? true : undefined, id: item.label, "data-automation-id": itemIdPrefix + "_" + itemLabel + "_NODE", role: "treeitem" },
        React.createElement("div", { "data-automation-id": itemIdPrefix + "_" + itemLabel, className: "item", "style-state": { selected: state.isSelected, focused: state.isFocused }, onClick: onItemClick && onItemClick.bind(null, item) },
            item.children && (state.isExpanded ?
                React.createElement(tree_view_icons_1.MinusIcon, __assign({}, iconProps)) : React.createElement(tree_view_icons_1.PlusIcon, __assign({}, iconProps))),
            React.createElement("span", { "data-automation-id": itemIdPrefix + "_" + itemLabel + "_LABEL", className: "item-label" }, item.label)),
        item.children && React.createElement("ul", { className: "nested-tree", role: "group" }, state.isExpanded && item.children.map(function (child, index) {
            return React.createElement(TreeNode, { item: child, onItemClick: onItemClick, itemRenderer: itemRenderer, onIconClick: onIconClick, stateMap: stateMap, key: "" + index });
        }))));
});
//# sourceMappingURL=tree-item-default.js.map