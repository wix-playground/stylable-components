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
var utils_1 = require("../../utils");
var selection_list_model_1 = require("./selection-list-model");
var selection_list_view_1 = require("./selection-list-view");
var SelectionList = /** @class */ (function (_super) {
    __extends(SelectionList, _super);
    function SelectionList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.disposers = new wix_react_tools_1.Disposers();
        _this.focused = false;
        _this.handleFocus = function () {
            _this.focused = true;
        };
        _this.handleBlur = function () {
            _this.focused = false;
        };
        _this.handleKeyDown = function (event) {
            switch (event.keyCode) {
                case keycode('enter'):
                case keycode('space'):
                    event.preventDefault();
                    var focusedValue = _this.list.getFocusedValue();
                    if (focusedValue !== undefined) {
                        _this.props.onChange({ value: focusedValue });
                    }
                    break;
                case keycode('up'):
                    event.preventDefault();
                    _this.list.focusPrevious();
                    break;
                case keycode('down'):
                    event.preventDefault();
                    _this.list.focusNext();
                    break;
                case keycode('home'):
                    event.preventDefault();
                    _this.list.focusFirst();
                    break;
                case keycode('end'):
                    event.preventDefault();
                    _this.list.focusLast();
                    break;
            }
        };
        return _this;
    }
    Object.defineProperty(SelectionList.prototype, "children", {
        // Wrapping props with @computed allows to observe them independently from other props.
        get: function () { return this.props.children; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionList.prototype, "dataSource", {
        get: function () { return this.props.dataSource; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionList.prototype, "dataSchema", {
        get: function () { return this.props.dataSchema; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionList.prototype, "renderItem", {
        get: function () { return this.props.renderItem; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionList.prototype, "value", {
        get: function () { return this.props.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionList.prototype, "list", {
        get: function () {
            var _this = this;
            var list = new selection_list_model_1.SelectionListModel();
            list.addChildren(this.children);
            list.addDataSource(this);
            list.selectValue(mobx_1.untracked(function () { return _this.value; }));
            return list;
        },
        enumerable: true,
        configurable: true
    });
    SelectionList.prototype.componentWillMount = function () {
        var _this = this;
        this.disposers.set(mobx_1.autorun(function () {
            _this.list.selectValue(_this.value);
        }));
        this.disposers.set(mobx_1.autorun(function () {
            _this.list.focusValue(_this.focused ? _this.value : undefined);
        }));
    };
    SelectionList.prototype.componentWillUnmount = function () {
        this.disposers.disposeAll();
    };
    SelectionList.prototype.render = function () {
        return (React.createElement(selection_list_view_1.SelectionListView, { focused: this.focused, list: this.list, onBlur: this.handleBlur, onChange: this.props.onChange, onFocus: this.handleFocus, onKeyDown: this.handleKeyDown, style: this.props.style, tabIndex: this.props.tabIndex }));
    };
    SelectionList.defaultProps = {
        onChange: utils_1.noop,
        tabIndex: -1
    };
    __decorate([
        mobx_1.observable
    ], SelectionList.prototype, "focused", void 0);
    __decorate([
        mobx_1.computed
    ], SelectionList.prototype, "children", null);
    __decorate([
        mobx_1.computed
    ], SelectionList.prototype, "dataSource", null);
    __decorate([
        mobx_1.computed
    ], SelectionList.prototype, "dataSchema", null);
    __decorate([
        mobx_1.computed
    ], SelectionList.prototype, "renderItem", null);
    __decorate([
        mobx_1.computed
    ], SelectionList.prototype, "value", null);
    __decorate([
        mobx_1.computed
    ], SelectionList.prototype, "list", null);
    SelectionList = __decorate([
        mobx_react_1.observer,
        wix_react_tools_1.properties
    ], SelectionList);
    return SelectionList;
}(React.Component));
exports.SelectionList = SelectionList;
//# sourceMappingURL=selection-list.js.map