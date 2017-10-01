"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_react_1 = require("mobx-react");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var src_1 = require("../../src");
var tree_view_demo_st_css_1 = require("./tree-view-demo.st.css");
exports.treeData = [
    { label: 'Food Menu', children: [
            { label: 'Salads', children: [
                    { label: 'Greek Salad' },
                    { label: 'Israeli Salad' },
                    { label: 'Caesar Salad' }
                ] },
            { label: 'Steaks', children: [
                    { label: 'Fillet Steak' },
                    { label: 'Sirloin Steak' }
                ] },
            { label: 'Desserts', children: [
                    { label: 'Pancakes' },
                    { label: 'Muffin' },
                    { label: 'Waffle' },
                    { label: 'Cupcake' }
                ] }
        ] }
];
function SelectedItem(_a) {
    var selectedItem = _a.selectedItem;
    return (React.createElement("div", { style: { fontSize: '1.41em', textDecoration: 'underline' } }, selectedItem ?
        (!selectedItem.children ?
            "You chose " + selectedItem.label + ". Bon appetit!" :
            "You are looking at " + selectedItem.label + ". Please choose a dish.") :
        'Please choose from the Menu!'));
}
var itemIdPrefix = 'TREE_ITEM';
exports.CustomItem = wix_react_tools_1.stylable(tree_view_demo_st_css_1.default)(function (_a) {
    var item = _a.item, itemRenderer = _a.itemRenderer, onItemClick = _a.onItemClick, onIconClick = _a.onIconClick, stateMap = _a.stateMap;
    var state = stateMap.getItemState(item);
    var TreeNode = itemRenderer;
    var itemLabel = item.label.replace(' ', '_');
    var iconProps = (_b = {},
        _b['data-automation-id'] = itemIdPrefix + "_" + itemLabel + "_ICON",
        _b.onClick = onIconClick && onIconClick.bind(null, item),
        _b.className = 'custom-tree-item-icon',
        _b);
    return (React.createElement("div", null,
        React.createElement("div", { className: "custom-tree-node", "style-state": { selected: state.isSelected, focused: state.isFocused }, onClick: onItemClick && onItemClick.bind(null, item), "data-automation-id": itemIdPrefix + "_" + itemLabel },
            item.children &&
                React.createElement("span", __assign({}, iconProps), state.isExpanded ? '[Close] ' : '[Open] '),
            React.createElement("span", { "data-automation-id": itemIdPrefix + "_" + itemLabel + "_LABEL", className: "custom-tree-item-label" },
                item.label,
                React.createElement("span", { className: "node-tool-tip" },
                    " (",
                    Math.floor(Math.random() * 100),
                    " kcal)"))),
        React.createElement("div", { className: "custom-nested-tree" }, state.isExpanded && (item.children || []).map(function (child, index) {
            return React.createElement(TreeNode, { item: child, onItemClick: onItemClick, itemRenderer: itemRenderer, onIconClick: onIconClick, stateMap: stateMap, key: "" + index });
        }))));
    var _b;
});
var CustomItemWrapper = mobx_react_1.observer(exports.CustomItem);
var TreeViewDemo = /** @class */ (function (_super) {
    __extends(TreeViewDemo, _super);
    function TreeViewDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { selectedItem: undefined, focusedItem: undefined, checkBoxMap: {} };
        _this.onSelectItem = function (item) {
            _this.setState({
                selectedItem: item,
                focusedItem: item
            });
        };
        _this.onFocusItem = function (item) {
            _this.setState({
                focusedItem: item
            });
        };
        return _this;
    }
    TreeViewDemo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h3", null, "TreeView with ability to select a child"),
            React.createElement("section", { "data-automation-id": "TREE_VIEW_DEMO" },
                React.createElement(SelectedItem, { selectedItem: this.state.selectedItem }),
                React.createElement("br", null),
                React.createElement(src_1.TreeView, { dataSource: exports.treeData, onFocusItem: this.onFocusItem, focusedItem: this.state.focusedItem, onSelectItem: this.onSelectItem, selectedItem: this.state.selectedItem }))));
    };
    TreeViewDemo = __decorate([
        wix_react_tools_1.stylable(tree_view_demo_st_css_1.default)
    ], TreeViewDemo);
    return TreeViewDemo;
}(React.Component));
exports.TreeViewDemo = TreeViewDemo;
var TreeViewDemoCustom = /** @class */ (function (_super) {
    __extends(TreeViewDemoCustom, _super);
    function TreeViewDemoCustom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { selectedItemCustom: undefined, focusedItemCustom: undefined };
        _this.onSelectItemCustom = function (item) {
            _this.setState({
                selectedItemCustom: item,
                focusedItemCustom: item
            });
        };
        _this.onFocusItemCustom = function (item) {
            _this.setState({
                focusedItemCustom: item
            });
        };
        return _this;
    }
    TreeViewDemoCustom.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h3", null, "TreeView with custom item renderer (try hovering the labels)"),
            React.createElement("section", { "data-automation-id": "TREE_VIEW_DEMO_CUSTOM" },
                React.createElement(SelectedItem, { selectedItem: this.state.selectedItemCustom }),
                React.createElement("br", null),
                React.createElement(src_1.TreeView, { className: "tree-view", dataSource: exports.treeData, itemRenderer: CustomItemWrapper, onFocusItem: this.onFocusItemCustom, focusedItem: this.state.focusedItemCustom, onSelectItem: this.onSelectItemCustom, selectedItem: this.state.selectedItemCustom }))));
    };
    TreeViewDemoCustom = __decorate([
        wix_react_tools_1.stylable(tree_view_demo_st_css_1.default)
    ], TreeViewDemoCustom);
    return TreeViewDemoCustom;
}(React.Component));
exports.TreeViewDemoCustom = TreeViewDemoCustom;
//# sourceMappingURL=tree-view-demo.js.map