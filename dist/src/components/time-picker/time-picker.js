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
var keycode = require("keycode");
var PropTypes = require("prop-types");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var utils_1 = require("../../utils");
var screen_reader_notification_1 = require("../screen-reader-notification");
var stepper_1 = require("../stepper");
var strings_1 = require("./strings");
var time_picker_st_css_1 = require("./time-picker.st.css");
var utils_2 = require("./utils");
var ampmSwitch = (_a = {},
    _a[utils_2.Ampm.AM] = utils_2.Ampm.PM,
    _a[utils_2.Ampm.PM] = utils_2.Ampm.AM,
    _a[utils_2.Ampm.NONE] = utils_2.Ampm.NONE,
    _a);
var segments = ['hh', 'mm', 'ampm'];
function propsValueToSegments(value, format) {
    var isAmpm = format === 'ampm';
    if (!value) {
        return {
            ampm: isAmpm ? utils_2.Ampm.PM : utils_2.Ampm.NONE
        };
    }
    var _a = value.split(':').map(Number), hh24 = _a[0], mm = _a[1];
    var _b = utils_2.toAmpm(hh24), hh = _b.hh, ampm = _b.ampm;
    return {
        mm: utils_2.formatTimeChunk(mm),
        hh: utils_2.formatTimeChunk(isAmpm ? hh : hh24),
        ampm: isAmpm ? ampm : utils_2.Ampm.NONE
    };
}
var TimePicker = /** @class */ (function (_super) {
    __extends(TimePicker, _super);
    function TimePicker(props) {
        var _this = _super.call(this) || this;
        _this.onRootMouseDown = function (e) {
            if (e.target !== e.currentTarget) {
                return;
            }
            e.preventDefault();
            if (utils_2.isTouchTimeInputSupported) {
                _this.nativeInput.focus();
            }
            else {
                _this.segments.hh.focus();
            }
        };
        _this.onStepperMouseDown = function (e) {
            e.preventDefault();
        };
        _this.onStepperUp = function (_a) {
            var shiftKey = _a.shiftKey;
            return _this.changeValue(1, shiftKey ? 10 : 1);
        };
        _this.onStepperDown = function (_a) {
            var shiftKey = _a.shiftKey;
            return _this.changeValue(-1, shiftKey ? 10 : 1);
        };
        _this.onAmpmMouseDown = function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (!_this.props.disabled) {
                _this.toggleAmpm(document.activeElement === _this.segments.ampm);
            }
        };
        _this.onAmpmFocus = function (e) {
            _this.setState({ focus: true, currentSegment: 'ampm' });
        };
        _this.onInputMouseDown = function (e) {
            e.stopPropagation();
            e.preventDefault();
            e.currentTarget.focus();
            e.currentTarget.select();
        };
        _this.onInputChange = function (e) {
            var ampm = _this.state.ampm;
            var value = e.currentTarget.value;
            var name = e.currentTarget.name;
            var numValue = Number(value);
            if (!utils_2.isValidValue(numValue, name, ampm)) {
                return;
            }
            var shouldWaitForInput = utils_2.isValidValue(numValue * 10, name, ampm);
            _this.setState((_a = {
                    currentSegment: name
                },
                _a[name] = shouldWaitForInput ? value : utils_2.formatTimeChunk(value),
                _a), function () {
                if (!shouldWaitForInput) {
                    _this.moveSelection(1);
                    _this.commit();
                }
            });
            var _a;
        };
        _this.onNativeInputChange = function (e) {
            _this.setState(propsValueToSegments(e.currentTarget.value, _this.state.format), _this.commit);
        };
        _this.onNantiveInputFocus = function () {
            _this.setState({ focus: true });
        };
        _this.onInputFocus = function (e) {
            var _a = _this.state, hh = _a.hh, mm = _a.mm;
            var input = e.currentTarget;
            var update = {
                focus: true,
                currentSegment: e.currentTarget.name
            };
            if (!hh && !mm) {
                update.hh = '12';
                update.mm = '00';
            }
            _this.setState(update, function () {
                input.select();
            });
        };
        _this.onBlur = function (e) {
            var name = e.currentTarget instanceof HTMLInputElement && e.currentTarget.name;
            var update = {
                focus: false,
                currentSegment: 'hh'
            };
            if (utils_2.isTimeSegment(name)) {
                update[name] = utils_2.formatTimeChunk(_this.state[name]);
            }
            _this.setState(update);
            _this.commit();
        };
        _this.onKeyDown = function (e) {
            var currentSegment = _this.state.currentSegment;
            var keyCode = keycode(e.keyCode);
            // prevent default for and char (a-z)
            // this is needed to disallow user to move reset select state on input
            if (utils_2.isTimeSegment(currentSegment) &&
                /^\D$/.test(keyCode) &&
                !e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault();
            }
            switch (keyCode) {
                case 'left':
                    e.preventDefault();
                    _this.moveSelection(-1);
                    break;
                case 'right':
                    e.preventDefault();
                    _this.moveSelection(1);
                    break;
                case 'up':
                    e.preventDefault();
                    _this.changeValue(1, e.shiftKey ? 10 : 1);
                    break;
                case 'down':
                    e.preventDefault();
                    _this.changeValue(-1, e.shiftKey ? 10 : 1);
                    break;
                case 'page up':
                    e.preventDefault();
                    _this.changeValue(1, 10);
                    break;
                case 'page down':
                    e.preventDefault();
                    _this.changeValue(-1, 10);
                    break;
                case 'backspace':
                    e.preventDefault();
                    if (utils_2.isTimeSegment(currentSegment) && _this.state[currentSegment]) {
                        _this.updateSegmentValue(currentSegment, '00');
                    }
                    else {
                        _this.moveSelection(-1);
                    }
                    break;
                case 'space':
                case 'enter':
                    e.preventDefault();
                    if (utils_2.isTimeSegment(currentSegment)) {
                        _this.moveSelection(1);
                    }
                    else {
                        _this.toggleAmpm(true);
                    }
                    break;
            }
        };
        _this.commit = function () {
            var value = _this.getValue();
            _this.setState({
                notification: value
            });
            if (_this.lastValue !== value) {
                _this.lastValue = value;
                if (_this.props.onInput) {
                    _this.props.onInput({ value: value });
                }
                if (_this.props.onChange) {
                    _this.props.onChange({ value: value });
                }
            }
        };
        var format = utils_2.isTouchTimeInputSupported ? '24h' : props.format;
        _this.lastValue = props.value;
        _this.segments = {};
        _this.state = __assign({ format: format, focus: false, currentSegment: 'hh' }, propsValueToSegments(props.value, format));
        return _this;
    }
    TimePicker.prototype.componentWillReceiveProps = function (props, state) {
        var _this = this;
        if (props.value !== this.props.value) {
            this.setState(propsValueToSegments(props.value, this.state.format), function () {
                var _a = _this.state, focus = _a.focus, currentSegment = _a.currentSegment;
                if (!utils_2.isTouchTimeInputSupported && focus && currentSegment) {
                    _this.select(currentSegment);
                }
            });
        }
    };
    TimePicker.prototype.render = function () {
        var _this = this;
        var _a = this.state, focus = _a.focus, hh = _a.hh, mm = _a.mm, ampm = _a.ampm, format = _a.format, notification = _a.notification;
        var _b = this.props, label = _b.label, placeholder = _b.placeholder, disabled = _b.disabled, error = _b.error, required = _b.required, name = _b.name;
        var isValueSet = hh !== undefined || mm !== undefined;
        var timeSegments = ['hh', 'mm'];
        return (React.createElement("div", { "data-automation-id": "TIME_PICKER", "style-state": {
                focus: focus,
                error: error,
                disabled: disabled,
                empty: !isValueSet,
                hasPlaceholder: !!placeholder,
                rtl: utils_1.isRTLContext(this.context)
            }, onMouseDown: this.onRootMouseDown },
            notification &&
                React.createElement(screen_reader_notification_1.ScreenReaderNotification, null, notification),
            React.createElement("div", { className: "time" }, timeSegments.map(function (segment) {
                return React.createElement("input", { key: segment, "data-automation-id": 'TIME_PICKER_INPUT_' + segment.toUpperCase(), className: "input", type: "text", tabIndex: utils_2.isTouchTimeInputSupported ? -1 : 0, ref: function (elem) { return _this.segments[segment] = elem; }, value: _this.state[segment] || '', placeholder: _this.state[segment] ? '' : '00', disabled: disabled, name: segment, role: "spinbutton", "aria-label": strings_1.LABELS[segment], "aria-valuetext": _this.state[segment], onMouseDown: _this.onInputMouseDown, onChange: _this.onInputChange, onFocus: _this.onInputFocus, onBlur: _this.onBlur, onKeyDown: _this.onKeyDown });
            })),
            format === 'ampm' &&
                React.createElement("div", { "data-automation-id": "TIME_PICKER_AMPM", className: "ampm", ref: function (elem) { return _this.segments.ampm = elem; }, tabIndex: disabled || utils_2.isTouchTimeInputSupported ? -1 : 0, children: utils_2.ampmLabels[ampm], role: "spinbutton", "aria-label": strings_1.LABELS.ampm, "aria-valuetext": utils_2.ampmLabels[ampm], onMouseDown: this.onAmpmMouseDown, onFocus: this.onAmpmFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown }),
            placeholder && !isValueSet &&
                React.createElement("div", { "data-automation-id": "TIME_PICKER_PLACEHOLDER", className: "placeholder", children: placeholder, onMouseDown: this.onRootMouseDown }),
            !utils_2.isTouchTimeInputSupported &&
                React.createElement("div", { onMouseDown: this.onStepperMouseDown },
                    React.createElement(stepper_1.Stepper, { className: "stepper", onUp: this.onStepperUp, onDown: this.onStepperDown })),
            React.createElement("label", { className: "label", "style-state": { visible: utils_2.isTouchTimeInputSupported } },
                React.createElement("input", { className: "nativeInput", type: "time", tabIndex: utils_2.isTouchTimeInputSupported ? 0 : -1, ref: function (elem) { return _this.nativeInput = elem; }, name: name, required: required, "aria-label": label, value: this.getValue(), disabled: disabled, onFocus: this.onNantiveInputFocus, onBlur: this.onBlur, onChange: this.onNativeInputChange }))));
    };
    TimePicker.prototype.getValue = function () {
        var _a = this.state, _b = _a.hh, hh = _b === void 0 ? 0 : _b, _c = _a.mm, mm = _c === void 0 ? 0 : _c, ampm = _a.ampm;
        var hhString = utils_2.formatTimeChunk(utils_2.to24(Number(hh), ampm));
        var mmString = utils_2.formatTimeChunk(mm);
        return hhString + ":" + mmString;
    };
    TimePicker.prototype.select = function (segment) {
        var input = this.segments[segment];
        this.setState({
            currentSegment: segment
        }, function () {
            input.focus();
            if (utils_2.isTimeSegment(segment)) {
                input.select();
            }
        });
    };
    TimePicker.prototype.moveSelection = function (step) {
        var index = segments.indexOf(this.state.currentSegment);
        var nextSegment = segments[index + step];
        if (this.segments[nextSegment]) {
            this.select(nextSegment);
            return true;
        }
        return false;
    };
    TimePicker.prototype.updateSegmentValue = function (name, value) {
        var _this = this;
        this.setState((_a = {},
            _a[name] = value,
            _a), function () {
            if (utils_2.isTimeSegment(name)) {
                _this.select(name);
            }
            _this.commit();
        });
        var _a;
    };
    TimePicker.prototype.toggleAmpm = function (shouldSelect) {
        this.updateSegmentValue('ampm', ampmSwitch[this.state.ampm]);
        if (shouldSelect) {
            this.segments.ampm.focus();
        }
        else {
            this.segments.ampm.blur();
        }
    };
    TimePicker.prototype.changeValue = function (step, multiplier) {
        var _this = this;
        if (multiplier === void 0) { multiplier = 1; }
        var currentSegment = this.state.currentSegment;
        if (!utils_2.isTimeSegment(currentSegment)) {
            return this.toggleAmpm(true);
        }
        var ampm = this.state.ampm;
        var hh = utils_2.to24(Number(this.state.hh || 0), ampm);
        var mm = Number(this.state.mm || 0);
        if (currentSegment === 'mm') {
            mm += step * multiplier;
        }
        else {
            hh += step;
        }
        var totalMinutes = hh * 60 + mm;
        mm = (totalMinutes + 60) % 60;
        hh = Math.floor(totalMinutes / 60 + 24) % 24;
        if (ampm !== utils_2.Ampm.NONE) {
            var hhAmpm = utils_2.toAmpm(hh);
            hh = hhAmpm.hh;
            ampm = hhAmpm.ampm;
        }
        this.setState({
            hh: utils_2.formatTimeChunk(hh),
            mm: utils_2.formatTimeChunk(mm),
            ampm: ampm
        }, function () {
            _this.select(currentSegment);
            _this.commit();
        });
    };
    TimePicker.defaultProps = {
        format: utils_2.is12TimeFormat ? 'ampm' : '24h',
        disabled: false,
        error: false,
        required: false
    };
    TimePicker.contextTypes = {
        contextProvider: PropTypes.shape({
            dir: PropTypes.string
        })
    };
    TimePicker = __decorate([
        wix_react_tools_1.stylable(time_picker_st_css_1.default)
    ], TimePicker);
    return TimePicker;
}(React.Component));
exports.TimePicker = TimePicker;
var _a;
//# sourceMappingURL=time-picker.js.map