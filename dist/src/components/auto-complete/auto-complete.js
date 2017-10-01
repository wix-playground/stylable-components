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
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var _1 = require("../../");
var utils_1 = require("../../utils");
var drop_down_icons_1 = require("../drop-down/drop-down-icons");
var selection_list_model_1 = require("../selection-list/selection-list-model");
var selection_list_view_1 = require("../selection-list/selection-list-view");
var auto_complete_st_css_1 = require("./auto-complete.st.css");
var prefixFilter = function (item, prefix) {
    return item.toLowerCase().startsWith(prefix.toLowerCase());
};
var AutoComplete = /** @class */ (function (_super) {
    __extends(AutoComplete, _super);
    function AutoComplete() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { input: null, isOpen: _this.props.open };
        _this.refCallback = function (ref) {
            _this.setState({ input: ref });
        };
        _this.onChange = function (e) {
            _this.props.onChange({ value: e.target.value || '' });
            if (!_this.props.value) {
                _this.openPopup();
            }
        };
        _this.onClick = function (e) {
            _this.props.onChange(e);
            _this.togglePopup();
        };
        _this.onCaretClick = function () {
            _this.togglePopup();
        };
        return _this;
    }
    AutoComplete.prototype.render = function () {
        var _this = this;
        var filteredItems = this.props.value ?
            this.props.dataSource.filter(function (item) { return _this.props.filter(item, _this.props.value); }) :
            this.props.dataSource;
        var list = new selection_list_model_1.SelectionListModel();
        list.addDataSource({ dataSource: filteredItems });
        return (React.createElement("div", { "data-automation-id": "AUTO_COMPLETE" },
            React.createElement("input", { className: "auto-complete-input", "data-automation-id": "AUTO_COMPLETE_INPUT", type: "text", onChange: this.onChange, value: this.props.value, ref: this.refCallback }),
            React.createElement(drop_down_icons_1.CaretDown, { onClick: this.onCaretClick, className: "caret", "data-automation-id": "AUTO_COMPLETE_CARET" }),
            React.createElement(_1.Popup, { anchor: this.state.input, open: this.props.open && filteredItems.length > 0 },
                React.createElement(selection_list_view_1.SelectionListView, { className: "root auto-complete-list", list: list, onChange: this.onClick }))));
    };
    AutoComplete.prototype.openPopup = function () {
        this.props.onOpenStateChange({ value: true });
    };
    AutoComplete.prototype.togglePopup = function () {
        this.props.onOpenStateChange({ value: !this.props.open });
    };
    AutoComplete.defaultProps = {
        open: false,
        dataSource: [],
        value: '',
        filter: prefixFilter,
        onChange: utils_1.noop,
        onOpenStateChange: utils_1.noop
    };
    AutoComplete = __decorate([
        wix_react_tools_1.stylable(auto_complete_st_css_1.default),
        wix_react_tools_1.properties
    ], AutoComplete);
    return AutoComplete;
}(React.Component));
exports.AutoComplete = AutoComplete;
//# sourceMappingURL=auto-complete.js.map