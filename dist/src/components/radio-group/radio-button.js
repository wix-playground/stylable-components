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
var utils_1 = require("../../utils");
var radio_button_st_css_1 = require("./radio-button.st.css");
var RadioButton = /** @class */ (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { isFocused: false };
        _this.onChange = function (e) {
            if (!_this.props.disabled && !_this.props.readOnly) {
                _this.props.onChange({ value: _this.props.value });
            }
        };
        _this.onInputFocus = function (e) {
            _this.setState({ isFocused: true });
        };
        _this.onInputBlur = function (e) {
            _this.setState({ isFocused: false });
        };
        return _this;
    }
    RadioButton.prototype.render = function () {
        var styleState = {
            checked: this.props.checked,
            disabled: this.props.disabled,
            focused: this.state.isFocused
        };
        return (React.createElement("div", { "data-automation-id": "RADIO_BUTTON_ROOT", onClick: this.onChange, "style-state": styleState, role: "radio", "aria-checked": this.props.checked },
            React.createElement("input", { type: "radio", className: "radioInput", "data-automation-id": "NATIVE_INPUT", onChange: this.onChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, value: this.props.value, tabIndex: this.props.tabIndex, checked: this.props.checked, disabled: this.props.disabled, readOnly: this.props.readOnly, name: this.props.name }),
            React.createElement("div", { className: "contentContainer", "data-automation-id": "CONTENT_CONTAINER" },
                React.createElement("div", { "data-automation-id": "INPUT_CONTAINER", className: "iconContainer" }, this.props.checked ? checkedRadioSvg() : emptyRadioSvg()),
                this.props.children)));
    };
    RadioButton.defaultProps = {
        onChange: utils_1.noop,
        checked: false,
        tabIndex: 0
    };
    RadioButton = __decorate([
        wix_react_tools_1.stylable(radio_button_st_css_1.default),
        wix_react_tools_1.properties
    ], RadioButton);
    return RadioButton;
}(React.Component));
exports.RadioButton = RadioButton;
function emptyRadioSvg() {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: radio_button_st_css_1.default.radioSVG, viewBox: "0 0 16 16", "data-automation-id": "UNCHECKED_RADIO_ICON", focusable: "false" },
        React.createElement("circle", { cx: "8", cy: "8", r: "7.5" })));
}
function checkedRadioSvg() {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", className: radio_button_st_css_1.default.radioSVG, viewBox: "0 0 16 16", "data-automation-id": "CHECKED_RADIO_ICON", focusable: "false" },
        React.createElement("defs", null,
            React.createElement("circle", { id: "a", cx: "8", cy: "8", r: "8" })),
        React.createElement("g", null,
            React.createElement("circle", { cx: "8", cy: "8", r: "6.75", stroke: "#FFF", strokeWidth: "2.5", className: "checkMark" }),
            React.createElement("circle", { cx: "8", cy: "8", r: "7.5" }))));
}
//# sourceMappingURL=radio-button.js.map