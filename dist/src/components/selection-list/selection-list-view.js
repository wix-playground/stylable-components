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
var mobx_react_1 = require("mobx-react");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var utils_1 = require("../../utils");
var selection_list_st_css_1 = require("./selection-list.st.css");
function closestElementMatching(predicate, startAt) {
    var current = startAt;
    while (current && !predicate(current)) {
        current = current.parentElement;
    }
    return current;
}
var SelectionListView = /** @class */ (function (_super) {
    __extends(SelectionListView, _super);
    function SelectionListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            var item = closestElementMatching(function (el) { return el.parentElement === event.currentTarget; }, event.target);
            if (!item) {
                return;
            }
            var value = item.dataset.value;
            if (value !== undefined && value !== _this.props.list.getSelectedValue()) {
                _this.props.onChange({ value: value });
            }
        };
        return _this;
    }
    SelectionListView.prototype.render = function () {
        return (React.createElement("div", { className: "list", "data-automation-id": "LIST", "style-state": { focused: Boolean(this.props.focused) }, onBlur: this.props.onBlur, onClick: this.handleClick, onFocus: this.props.onFocus, onKeyDown: this.props.onKeyDown, tabIndex: this.props.tabIndex }, this.props.list.items.map(function (item, index) {
            return React.createElement(ItemWrapper, { key: index, item: item });
        })));
    };
    SelectionListView.defaultProps = {
        onChange: utils_1.noop,
        onBlur: utils_1.noop,
        onFocus: utils_1.noop,
        onKeyDown: utils_1.noop
    };
    SelectionListView = __decorate([
        mobx_react_1.observer,
        wix_react_tools_1.stylable(selection_list_st_css_1.default),
        wix_react_tools_1.properties
    ], SelectionListView);
    return SelectionListView;
}(React.Component));
exports.SelectionListView = SelectionListView;
var ItemWrapper = /** @class */ (function (_super) {
    __extends(ItemWrapper, _super);
    function ItemWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemWrapper.prototype.render = function () {
        var item = this.props.item;
        if (item.isOption) {
            return React.cloneElement(item.element, {
                focused: item.focused,
                selected: item.selected
            });
        }
        return item.element;
    };
    ItemWrapper = __decorate([
        mobx_react_1.observer
    ], ItemWrapper);
    return ItemWrapper;
}(React.Component));
//# sourceMappingURL=selection-list-view.js.map