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
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var noop_1 = require("../../utils/noop");
var _1 = require("../popup/");
var selection_list_1 = require("../selection-list");
var drop_down_icons_1 = require("./drop-down-icons");
var drop_down_st_css_1 = require("./drop-down.st.css");
var KeyCodes = {
    ENTER: keycode('enter'),
    UP: keycode('up'),
    DOWN: keycode('down'),
    SPACE: keycode('space'),
    ESC: keycode('escape')
};
var DropDown = /** @class */ (function (_super) {
    __extends(DropDown, _super);
    function DropDown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dropdown: null,
            open: _this.props.open
        };
        _this.onItemClick = function (e) {
            _this.closeDropdown();
            _this.props.onChange({ value: e.value });
        };
        _this.onFocus = function () {
            if (_this.props.openOnFocus) {
                _this.openDropdown();
            }
        };
        _this.toggleDropdown = function () {
            if (!_this.props.disabled) {
                _this.setState({ open: !_this.state.open });
            }
        };
        _this.onKeyDown = function (e) {
            switch (e.keyCode) {
                case KeyCodes.SPACE:
                    e.preventDefault();
                    _this.toggleDropdown();
                    break;
                case KeyCodes.ESC:
                    e.preventDefault();
                    _this.state.open && _this.closeDropdown();
                    break;
                case KeyCodes.DOWN:
                    e.preventDefault();
                    !_this.state.open && _this.openDropdown();
                    break;
            }
        };
        return _this;
    }
    DropDown.prototype.render = function () {
        var _this = this;
        var ToggleIcon = this.props.toggleIcon;
        return (React.createElement("div", { "data-automation-id": "DROP_DOWN", className: "drop-down", onKeyDown: this.onKeyDown, onFocus: this.onFocus, tabIndex: this.props.tabIndex, ref: function (dropdown) { return _this.setState({ dropdown: dropdown }); } },
            React.createElement("div", { "data-automation-id": "DROP_DOWN_INPUT", onClick: this.toggleDropdown, className: "drop-down-input" },
                React.createElement("span", { className: "label" }, this.props.value),
                React.createElement("div", { className: "caret", "data-automation-id": "ICON" },
                    React.createElement(ToggleIcon, null))),
            React.createElement(_1.Popup, { open: this.state.open && !this.props.disabled, anchor: this.state.dropdown },
                React.createElement("div", { className: "root" },
                    React.createElement(selection_list_1.SelectionList, { "data-automation-id": "DROP_DOWN_LIST", className: "drop-down-list", value: this.props.value, onChange: this.onItemClick, dataSource: this.props.dataSource }, this.props.children)))));
    };
    DropDown.prototype.openDropdown = function () {
        if (!this.props.disabled) {
            this.setState({ open: true });
        }
    };
    DropDown.prototype.closeDropdown = function () {
        if (!this.props.disabled) {
            this.setState({ open: false });
        }
    };
    DropDown.defaultProps = {
        open: false,
        children: [],
        onChange: noop_1.noop,
        tabIndex: 0,
        toggleIcon: drop_down_icons_1.CaretDown,
        disabled: false
    };
    DropDown = __decorate([
        wix_react_tools_1.stylable(drop_down_st_css_1.default),
        wix_react_tools_1.properties
    ], DropDown);
    return DropDown;
}(React.PureComponent));
exports.DropDown = DropDown;
//# sourceMappingURL=drop-down.js.map