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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var keycode = require("keycode");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var tree_item_default_1 = require("./tree-item-default");
var tree_util_1 = require("./tree-util");
var tree_view_st_css_1 = require("./tree-view.st.css");
exports.TreeKeyCodes = {
    ENTER: keycode('enter'),
    HOME: keycode('home'),
    END: keycode('end'),
    UP: keycode('up'),
    DOWN: keycode('down'),
    LEFT: keycode('left'),
    RIGHT: keycode('right')
};
function initParentsMap(parentsMap, data, parent) {
    if (data === void 0) { data = []; }
    data.forEach(function (item) {
        parentsMap.set(item, parent);
        initParentsMap(parentsMap, item.children || [], item);
    });
}
exports.initParentsMap = initParentsMap;
var TreeItemWrapper = mobx_react_1.observer(tree_item_default_1.TreeItem);
var TreeViewStateMap = /** @class */ (function () {
    function TreeViewStateMap() {
        this.stateMap = new Map();
    }
    TreeViewStateMap.prototype.getItemState = function (item) {
        var state = this.stateMap.get(item);
        if (state) {
            return state;
        }
        else {
            var newState = mobx_1.observable({ isSelected: false, isExpanded: false, isFocused: false });
            this.stateMap.set(item, newState);
            return newState;
        }
    };
    return TreeViewStateMap;
}());
exports.TreeViewStateMap = TreeViewStateMap;
var TreeView = /** @class */ (function (_super) {
    __extends(TreeView, _super);
    function TreeView(props) {
        var _this = _super.call(this, props) || this;
        _this.stateMap = new TreeViewStateMap();
        _this.parentsMap = new Map();
        _this.collapse = function (item) {
            _this.collapseItem(item);
            if (item.children) {
                item.children.forEach(_this.collapse);
            }
        };
        _this.collapseAll = function () {
            _this.props.dataSource.forEach(_this.collapse);
        };
        _this.expand = function (item) {
            _this.expandItem(item);
            if (item.children) {
                item.children.forEach(_this.expand);
            }
        };
        _this.expandAll = function () {
            _this.props.dataSource.forEach(_this.expand);
        };
        _this.onSelectItem = function (item, e) {
            e.stopPropagation();
            _this.selectItem(item);
            if (_this.props.focusedItem) {
                _this.stateMap.getItemState(_this.props.focusedItem).isFocused = false;
            }
        };
        _this.onToggleItem = function (item, e) {
            e.stopPropagation();
            if (_this.props.focusedItem) {
                _this.stateMap.getItemState(_this.props.focusedItem).isFocused = false;
            }
            _this.toggleItem(item);
            _this.props.onFocusItem(item);
        };
        _this.expandItem = function (item) {
            if (_this.stateMap.getItemState(item).isExpanded) {
                _this.focusNext(item);
            }
            else {
                if (item.children) {
                    _this.stateMap.getItemState(item).isExpanded = true;
                }
            }
        };
        _this.collapseItem = function (item) {
            if (!_this.stateMap.getItemState(item).isExpanded) {
                var parent_1 = _this.parentsMap.get(item);
                if (parent_1) {
                    _this.onFocusItem(parent_1);
                }
            }
            else {
                if (item.children) {
                    _this.stateMap.getItemState(item).isExpanded = false;
                }
            }
        };
        _this.focusPrev = function (item) {
            return _this.onFocusItem(tree_util_1.getPreviousItem(_this.props.dataSource, item, _this.stateMap, _this.parentsMap));
        };
        _this.focusNext = function (item) {
            return _this.onFocusItem(tree_util_1.getNextItem(_this.props.dataSource, item, _this.stateMap, _this.parentsMap));
        };
        _this.focusFirst = function () { return _this.props.onFocusItem(_this.props.dataSource[0]); };
        _this.focusLast = function () {
            return _this.props.onFocusItem(tree_util_1.getLastAvailableItem(_this.props.dataSource[_this.props.dataSource.length - 1], _this.stateMap));
        };
        _this.onKeyDown = function (e) {
            if (!_this.props.focusedItem) {
                return;
            }
            switch (e.keyCode) {
                case exports.TreeKeyCodes.RIGHT:
                    e.preventDefault();
                    _this.expandItem(_this.props.focusedItem);
                    break;
                case exports.TreeKeyCodes.LEFT:
                    e.preventDefault();
                    _this.collapseItem(_this.props.focusedItem);
                    break;
                case exports.TreeKeyCodes.UP:
                    e.preventDefault();
                    _this.focusPrev(_this.props.focusedItem);
                    break;
                case exports.TreeKeyCodes.DOWN:
                    e.preventDefault();
                    _this.focusNext(_this.props.focusedItem);
                    break;
                case exports.TreeKeyCodes.ENTER:
                    e.preventDefault();
                    _this.selectItem(_this.props.focusedItem);
                    break;
                case exports.TreeKeyCodes.HOME:
                    _this.stateMap.getItemState(_this.props.focusedItem).isFocused = false;
                    e.preventDefault();
                    _this.focusFirst();
                    break;
                case exports.TreeKeyCodes.END:
                    _this.stateMap.getItemState(_this.props.focusedItem).isFocused = false;
                    e.preventDefault();
                    _this.focusLast();
                    break;
            }
        };
        initParentsMap(_this.parentsMap, props.dataSource, undefined);
        return _this;
    }
    TreeView.prototype.componentDidMount = function () {
        var _this = this;
        mobx_1.autorun(function () {
            if (_this.props.selectedItem) {
                mobx_1.action(function () { return _this.stateMap.getItemState(_this.props.selectedItem).isSelected = true; })();
            }
            if (_this.props.focusedItem) {
                mobx_1.action(function () { return _this.stateMap.getItemState(_this.props.focusedItem).isFocused = true; })();
            }
        });
    };
    TreeView.prototype.render = function () {
        var _this = this;
        var TreeNode = this.props.itemRenderer;
        return (React.createElement("ul", { "data-automation-id": "TREE_VIEW", onKeyDown: this.onKeyDown, role: "tree", tabIndex: 0, "aria-activedescendant": this.props.focusedItem && this.props.focusedItem.label }, (this.props.dataSource || []).map(function (item, index) {
            return React.createElement(TreeNode, { item: item, onItemClick: _this.onSelectItem, itemRenderer: _this.props.itemRenderer, onIconClick: _this.onToggleItem, stateMap: _this.stateMap, key: "" + index });
        })));
    };
    TreeView.prototype.selectItem = function (item) {
        if (this.props.selectedItem) {
            if (this.props.selectedItem !== item) {
                this.stateMap.getItemState(this.props.selectedItem).isSelected = false;
                this.props.onSelectItem(this.props.selectedItem !== item ? item : undefined);
            }
        }
        else {
            this.props.onSelectItem(item);
        }
    };
    TreeView.prototype.toggleItem = function (item) {
        this.stateMap.getItemState(item).isExpanded = !this.stateMap.getItemState(item).isExpanded;
    };
    TreeView.prototype.onFocusItem = function (item) {
        if (this.props.focusedItem !== item) {
            if (this.props.focusedItem) {
                this.stateMap.getItemState(this.props.focusedItem).isFocused = false;
            }
            this.props.onFocusItem(item);
        }
    };
    TreeView.defaultProps = {
        itemRenderer: TreeItemWrapper,
        onSelectItem: function () { },
        onFocusItem: function () { }
    };
    __decorate([
        mobx_1.action
    ], TreeView.prototype, "onSelectItem", void 0);
    __decorate([
        mobx_1.action
    ], TreeView.prototype, "onToggleItem", void 0);
    __decorate([
        mobx_1.action
    ], TreeView.prototype, "onFocusItem", null);
    __decorate([
        mobx_1.action
    ], TreeView.prototype, "onKeyDown", void 0);
    TreeView = __decorate([
        mobx_react_1.observer,
        wix_react_tools_1.stylable(tree_view_st_css_1.default),
        wix_react_tools_1.properties
    ], TreeView);
    return TreeView;
}(React.Component));
exports.TreeView = TreeView;
//# sourceMappingURL=tree-view.js.map