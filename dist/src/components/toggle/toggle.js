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
var PropTypes = require("prop-types");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var utils_1 = require("../../utils");
var toggle_st_css_1 = require("./toggle.st.css");
var Toggle = /** @class */ (function (_super) {
    __extends(Toggle, _super);
    function Toggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            focus: false
        };
        _this.shouldResetFocus = false;
        _this.onInputFocus = function () { return _this.setState({ focus: true }); };
        _this.onInputBlur = function () { return _this.setState({ focus: false }); };
        _this.toggle = function (e) {
            var _a = _this.props, disabled = _a.disabled, value = _a.value, onChange = _a.onChange;
            if (!disabled && onChange) {
                onChange({ value: !value });
            }
            if (_this.shouldResetFocus) {
                _this.setState({ focus: false });
                _this.shouldResetFocus = false;
            }
        };
        _this.onMouseDown = function () {
            _this.shouldResetFocus = true;
        };
        return _this;
    }
    Toggle.prototype.render = function () {
        var _a = this.props, value = _a.value, disabled = _a.disabled, error = _a.error, label = _a.label, name = _a.name, required = _a.required, tabIndex = _a.tabIndex;
        var focus = this.state.focus;
        return (React.createElement("label", { "data-automation-id": "TOGGLE", onMouseDown: this.onMouseDown, "style-state": {
                checked: value,
                disabled: disabled,
                focus: focus,
                error: error,
                rtl: utils_1.isRTLContext(this.context)
            } },
            !disabled &&
                React.createElement("input", { "data-automation-id": "TOGGLE_INPUT", className: "nativeInput", type: "checkbox", name: name, "aria-label": label, checked: value, required: required, onChange: this.toggle, tabIndex: tabIndex, onFocus: this.onInputFocus, onBlur: this.onInputBlur }),
            React.createElement("div", { className: "switch" })));
    };
    Toggle.defaultProps = {
        value: false,
        disabled: false,
        error: false,
        required: false
    };
    Toggle.contextTypes = {
        contextProvider: PropTypes.shape({
            dir: PropTypes.string
        })
    };
    Toggle = __decorate([
        wix_react_tools_1.stylable(toggle_st_css_1.default)
    ], Toggle);
    return Toggle;
}(React.Component));
exports.default = Toggle;
//# sourceMappingURL=toggle.js.map