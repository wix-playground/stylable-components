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
var checkbox_st_css_1 = require("./checkbox.st.css");
var CheckBox = /** @class */ (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { isFocused: false };
        _this.handleChange = function (e) {
            if (!_this.props.disabled && !_this.props.readonly) {
                _this.props.onChange({ value: _this.props.indeterminate ? true : !_this.props.value });
            }
        };
        _this.handleInputFocus = function () {
            _this.setState({ isFocused: true });
        };
        _this.handleInputBlur = function () {
            _this.setState({ isFocused: false });
        };
        return _this;
    }
    CheckBox.prototype.render = function () {
        var styleState = {
            checked: this.props.value,
            disabled: this.props.disabled,
            readonly: this.props.readonly,
            indeterminate: this.props.indeterminate,
            focus: this.state.isFocused
        };
        return (React.createElement("div", { "data-automation-id": "CHECKBOX_ROOT", onClick: this.handleChange, "style-state": styleState, role: "checkbox", "aria-checked": this.props.indeterminate ? 'mixed' : this.props.value },
            React.createElement("input", { "data-automation-id": "NATIVE_CHECKBOX", type: "checkbox", className: "nativeCheckbox", checked: this.props.value, disabled: this.props.disabled, onChange: this.handleChange, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, id: this.props.id, tabIndex: this.props.tabIndex }),
            React.createElement("span", { className: "boxIcon", "data-automation-id": "CHECKBOX_BOX" }),
            this.props.indeterminate &&
                React.createElement("span", { className: "indeterminateIcon", "data-automation-id": "CHECKBOX_INDETERMINATE" }),
            !this.props.indeterminate && this.props.value &&
                React.createElement("span", { className: "tickIcon", "data-automation-id": "CHECKBOX_TICKMARK" }),
            this.props.children));
    };
    CheckBox.defaultProps = {
        indeterminate: false,
        tabIndex: 0
    };
    CheckBox = __decorate([
        wix_react_tools_1.stylable(checkbox_st_css_1.default),
        wix_react_tools_1.properties
    ], CheckBox);
    return CheckBox;
}(React.Component));
exports.CheckBox = CheckBox;
//# sourceMappingURL=checkbox.js.map