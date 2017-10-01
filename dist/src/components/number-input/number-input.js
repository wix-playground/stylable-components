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
var keycode_1 = require("keycode");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var utils_1 = require("../../utils");
var stepper_1 = require("../stepper");
var number_input_st_css_1 = require("./number-input.st.css");
var Direction;
(function (Direction) {
    Direction["Increase"] = "increase";
    Direction["Decrease"] = "decrease";
})(Direction || (Direction = {}));
var DEFAULTS = {
    step: 1,
    min: -Infinity,
    max: Infinity,
    onChange: utils_1.noop,
    onInput: utils_1.noop
};
function getPropWithDefault(props, name) {
    return props[name] === undefined ? DEFAULTS[name] : props[name];
}
var NumberInput = /** @class */ (function (_super) {
    __extends(NumberInput, _super);
    function NumberInput(props) {
        var _this = _super.call(this, props) || this;
        _this.committed = true;
        _this.inputRef = null;
        _this.handleIncrement = function (_a) {
            var shiftKey = _a.shiftKey;
            return _this.stepValue(Direction.Increase, shiftKey ? 10 : 1);
        };
        _this.handleDecrement = function (_a) {
            var shiftKey = _a.shiftKey;
            return _this.stepValue(Direction.Decrease, shiftKey ? 10 : 1);
        };
        _this.handleFocus = function (e) { return _this.setState({ focus: true }); };
        _this.handleBlur = function (e) { return _this.setState({ focus: false }); };
        _this.handleInputKeyDown = function (e) {
            switch (e.keyCode) {
                case keycode_1.codes.up:
                    _this.stepValue(Direction.Increase, e.shiftKey ? 10 : 1);
                    e.preventDefault();
                    break;
                case keycode_1.codes.down:
                    _this.stepValue(Direction.Decrease, e.shiftKey ? 10 : 1);
                    e.preventDefault();
                    break;
                case keycode_1.codes.enter:
                    _this.commit(_this.state.value);
                    e.preventDefault();
                    break;
                case keycode_1.codes.esc:
                    _this.revert();
                    e.preventDefault();
                    break;
            }
        };
        _this.handleInputBlur = function (e) { return _this.commit(_this.state.value); };
        _this.handleInputChange = function (e) {
            var onInput = _this.props.onInput;
            var value = e.target.value;
            var next = value !== '' ?
                Number(e.target.value) :
                undefined;
            _this.updateValue(next);
            onInput({ value: value });
        };
        _this.state = {
            value: utils_1.isNumber(props.value) ? props.value : props.defaultValue,
            focus: false,
            error: Boolean(props.error)
        };
        return _this;
    }
    Object.defineProperty(NumberInput.prototype, "isUncontrolled", {
        get: function () {
            return this.props.defaultValue !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberInput.prototype, "currentValue", {
        get: function () {
            return (this.isUncontrolled ?
                this.inputRef ?
                    this.inputRef.value !== '' ?
                        Number(this.inputRef.value) :
                        undefined :
                    this.props.defaultValue :
                this.state.value);
        },
        enumerable: true,
        configurable: true
    });
    NumberInput.prototype.componentWillReceiveProps = function (_a) {
        var min = _a.min, max = _a.max, step = _a.step, value = _a.value, defaultValue = _a.defaultValue;
        if (defaultValue === undefined && value !== this.state.value) {
            this.committed = true;
            this.setState({ value: value });
        }
    };
    NumberInput.prototype.render = function () {
        var _this = this;
        var _a = this.state, value = _a.value, focus = _a.focus;
        var _b = this.props, step = _b.step, min = _b.min, max = _b.max, placeholder = _b.placeholder, name = _b.name, disabled = _b.disabled, required = _b.required, error = _b.error, prefix = _b.prefix, suffix = _b.suffix;
        var disableIncrement = disabled || (utils_1.isNumber(value) && value >= max);
        var disableDecrement = disabled || (utils_1.isNumber(value) && value <= min);
        return (React.createElement("div", { "style-state": {
                disabled: Boolean(disabled),
                error: Boolean(error),
                focus: focus
            }, onFocus: this.handleFocus, onBlur: this.handleBlur },
            prefix ?
                React.createElement("div", { className: "prefix" }, prefix) : null,
            React.createElement("input", { ref: function (input) { return _this.inputRef = input; }, className: "native-input", "data-automation-id": "NATIVE_INPUT_NUMBER", type: "number", name: name, value: utils_1.isNumber(value) ? value : '', placeholder: placeholder, disabled: disabled, required: required, min: min, max: max, step: step, onChange: this.handleInputChange, onKeyDown: this.handleInputKeyDown, onBlur: this.handleInputBlur }),
            suffix ?
                React.createElement("div", { className: "suffix" }, suffix) : null,
            React.createElement(stepper_1.Stepper, { className: "stepper", "data-automation-id": "NUMBER_INPUT_STEPPER", onUp: this.handleIncrement, onDown: this.handleDecrement, disableUp: disableIncrement, disableDown: disableDecrement })));
    };
    NumberInput.prototype.validate = function (value) {
        var min = getPropWithDefault(this.props, 'min');
        var max = getPropWithDefault(this.props, 'max');
        return utils_1.isNumber(value) ?
            Math.min(max, Math.max(min, value))
            : value;
    };
    NumberInput.prototype.commit = function (value) {
        var onChange = this.props.onChange;
        var valueInRange = this.validate(value);
        this.updateValue(valueInRange);
        if (!this.committed) {
            onChange({ value: valueInRange });
            this.committed = true;
        }
    };
    NumberInput.prototype.revert = function () {
        var value = this.props.value;
        this.updateValue(value);
        this.committed = true;
    };
    NumberInput.prototype.updateValue = function (next) {
        var value = this.state.value;
        if (value !== next) {
            this.committed = false;
            this.setState({ value: next });
        }
    };
    NumberInput.prototype.stepValue = function (direction, multiplier) {
        if (multiplier === void 0) { multiplier = 1; }
        var value = this.currentValue;
        var step = getPropWithDefault(this.props, 'step');
        step = step * multiplier;
        var next = (direction === Direction.Increase ?
            utils_1.isNumber(value) ? value + step : step :
            utils_1.isNumber(value) ? value - step : -step);
        this.commit(next);
    };
    NumberInput.defaultProps = {
        onChange: DEFAULTS.onChange,
        onInput: DEFAULTS.onInput
    };
    NumberInput = __decorate([
        wix_react_tools_1.stylable(number_input_st_css_1.default)
    ], NumberInput);
    return NumberInput;
}(React.Component));
exports.NumberInput = NumberInput;
//# sourceMappingURL=number-input.js.map