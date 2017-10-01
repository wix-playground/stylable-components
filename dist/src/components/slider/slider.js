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
var PropTypes = require("prop-types");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var utils_1 = require("../../utils");
var global_event_1 = require("../global-event");
var noop_1 = require("./../../utils/noop");
var slider_st_css_1 = require("./slider.st.css");
exports.AXISES = {
    x: 'x',
    y: 'y',
    xReverse: 'x-reverse',
    yReverse: 'y-reverse'
};
var CONTINUOUS_STEP = 'any';
var DEFAULT_STEP = 1;
var DEFAULT_MIN = 0;
var DEFAULT_MAX = 100;
var DEFAULT_VALUE = DEFAULT_MIN;
var DEFAULT_AXIS = exports.AXISES.x;
var ChangeDirrection;
(function (ChangeDirrection) {
    ChangeDirrection[ChangeDirrection["ascend"] = 0] = "ascend";
    ChangeDirrection[ChangeDirrection["descend"] = 1] = "descend";
})(ChangeDirrection || (ChangeDirrection = {}));
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.isSliderMounted = false;
        _this.isActive = false;
        _this.onSliderFocus = function (event) {
            _this.props.onFocus(event);
        };
        _this.onSliderBlur = function (event) {
            _this.props.onBlur(event);
        };
        _this.onSliderAreaMouseDown = function (event) {
            if (_this.props.disabled) {
                return;
            }
            event.preventDefault();
            _this.focusableElement.focus();
            var relativeValue = _this.getValueFromElementAndPointer(_this.sliderArea, event);
            _this.setState({
                relativeValue: relativeValue,
                isActive: true
            });
            _this.isActive = true;
            _this.onDragStart(event.nativeEvent);
            _this.callInput(_this.getAbsoluteValue(relativeValue));
        };
        _this.onSliderAreaMouseMove = function (event) {
            if (!_this.isActive) {
                return;
            }
            var relativeValue = _this.getValueFromElementAndPointer(_this.sliderArea, event);
            requestAnimationFrame(function () {
                if (!_this.isSliderMounted) {
                    return;
                }
                _this.setState({
                    relativeValue: relativeValue
                });
            });
            _this.onDrag(event);
            _this.callInput(_this.getAbsoluteValue(relativeValue));
        };
        _this.onSliderAreaMouseUp = function (event) {
            if (!_this.isActive) {
                return;
            }
            var relativeValue = _this.getValueFromElementAndPointer(_this.sliderArea, event);
            var value = _this.getAbsoluteValue(relativeValue);
            _this.setState({
                relativeValue: relativeValue,
                isActive: false
            });
            _this.isActive = false;
            _this.focusableElement.focus();
            _this.onDragStop(event);
            _this.callChange(value);
        };
        _this.onSliderAreaTouchStart = function (event) {
            if (_this.props.disabled) {
                return;
            }
            var focusableElement = event.currentTarget;
            _this.focusableElement = focusableElement;
            focusableElement.focus();
            var relativeValue = _this.getValueFromElementAndPointer(_this.sliderArea, event.touches[0]);
            _this.setState({
                relativeValue: relativeValue,
                isActive: true
            });
            _this.isActive = true;
            event.preventDefault();
            _this.onDragStart(event.nativeEvent);
            _this.callInput(_this.getAbsoluteValue(relativeValue));
        };
        _this.onSliderAreaTouchMove = function (event) {
            if (!_this.isActive) {
                return;
            }
            var relativeValue = _this.getValueFromElementAndPointer(_this.sliderArea, event.changedTouches[0]);
            requestAnimationFrame(function () {
                if (!_this.isSliderMounted) {
                    return;
                }
                _this.setState({
                    relativeValue: relativeValue
                });
            });
            event.preventDefault();
            _this.onDrag(event);
            _this.callInput(_this.getAbsoluteValue(relativeValue));
        };
        _this.onSliderAreaTouchEnd = function (event) {
            if (!_this.isActive) {
                return;
            }
            var relativeValue = _this.getValueFromElementAndPointer(_this.sliderArea, event.changedTouches[0]);
            var value = _this.getAbsoluteValue(relativeValue);
            _this.setState({
                relativeValue: relativeValue,
                isActive: false
            });
            _this.isActive = false;
            _this.onDragStop(event);
            _this.callChange(value);
        };
        _this.onSliderAreaKeyDown = function (event) {
            if (_this.isActive || _this.props.disabled) {
                event.preventDefault();
                return;
            }
            var isReverse = _this.state.isReverse;
            var ctrlKey = event.ctrlKey, shiftKey = event.shiftKey;
            var ctrlOrShiftPressed = shiftKey || ctrlKey;
            switch (keycode(event.keyCode)) {
                case 'up':
                    isReverse ?
                        _this.decreaseValue(false, ctrlOrShiftPressed ? 10 : 1) :
                        _this.increaseValue(false, ctrlOrShiftPressed ? 10 : 1);
                    break;
                case 'right':
                    isReverse ?
                        _this.decreaseValue(ctrlOrShiftPressed, 1) :
                        _this.increaseValue(ctrlOrShiftPressed, 1);
                    break;
                case 'down':
                    isReverse ?
                        _this.increaseValue(false, ctrlOrShiftPressed ? 10 : 1) :
                        _this.decreaseValue(false, ctrlOrShiftPressed ? 10 : 1);
                    break;
                case 'left':
                    isReverse ?
                        _this.increaseValue(ctrlOrShiftPressed, 1) :
                        _this.decreaseValue(ctrlOrShiftPressed, 1);
                    break;
                case 'home':
                    isReverse ?
                        _this.increaseValue(true) :
                        _this.decreaseValue(true);
                    break;
                case 'end':
                    isReverse ?
                        _this.decreaseValue(true) :
                        _this.increaseValue(true);
                    break;
                case 'page up':
                    _this.increaseValue(false, 10);
                    break;
                case 'page down':
                    _this.decreaseValue(false, 10);
                    break;
                default:
                    return;
            }
            event.preventDefault();
        };
        var _a = _this.props, min = _a.min, max = _a.max, step = _a.step, axis = _a.axis;
        _this.state = {
            relativeValue: _this.getRelativeValue(_this.getDefaultValue(), min, max, step),
            relativeStep: _this.getRelativeStep(step, min, max),
            isActive: false,
            isVertical: _this.isVertical(axis),
            isReverse: _this.isReverse(axis) !== _this.isRTL()
        };
        return _this;
    }
    Slider.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { "data-automation-id": "SLIDER", ref: function (el) { return _this.sliderArea = el; }, className: "container", title: this.props.label, onMouseDown: this.onSliderAreaMouseDown, onTouchStart: this.onSliderAreaTouchStart, "style-state": {
                'active': this.state.isActive,
                'disabled': Boolean(this.props.disabled),
                'error': Boolean(this.props.error),
                'x': this.props.axis === exports.AXISES.x !== this.isRTL(),
                'y': this.props.axis === exports.AXISES.y,
                'x-reverse': this.props.axis === exports.AXISES.xReverse !== this.isRTL(),
                'y-reverse': this.props.axis === exports.AXISES.yReverse
            } },
            React.createElement(global_event_1.GlobalEvent, { mousemove: this.onSliderAreaMouseMove, mouseup: this.onSliderAreaMouseUp, touchmove: this.onSliderAreaTouchMove, touchend: this.onSliderAreaTouchEnd, touchcancel: this.onSliderAreaTouchEnd }),
            React.createElement("input", { className: "native-input", value: this.props.value, type: "hidden", "data-automation-id": "SLIDER-NATIVE-INPUT", name: this.props.name, required: this.props.required, disabled: this.props.disabled }),
            React.createElement("div", { className: "track", "data-automation-id": "SLIDER-TRACK" },
                React.createElement("div", { className: "progress", "data-automation-id": "SLIDER-PROGRESS", style: this.getProgressStyles() }),
                React.createElement("a", { ref: function (el) { return _this.focusableElement = el; }, className: "handle", "data-automation-id": "SLIDER-HANDLE", style: this.getHandleStyles(), onKeyDown: this.onSliderAreaKeyDown, onFocus: this.onSliderFocus, onBlur: this.onSliderBlur, role: "slider", "aria-label": this.props.label, "aria-orientation": this.state.isVertical ? 'vertical' : 'horizontal', "aria-valuemin": "" + this.props.min, "aria-valuemax": "" + this.props.max, "aria-valuenow": "" + this.props.value, tabIndex: this.props.disabled ? -1 : 0 },
                    React.createElement("div", { className: "tooltip", "data-automation-id": "SLIDER-TOOLTIP" }, this.getTooltip())),
                this.getMarks())));
    };
    Slider.prototype.componentDidMount = function () {
        this.isSliderMounted = true;
    };
    Slider.prototype.componentWillUnmount = function () {
        this.isSliderMounted = false;
    };
    Slider.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.isActive) {
            return;
        }
        var value = nextProps.value === undefined ? this.props.value : nextProps.value;
        var min = nextProps.min === undefined ? this.props.min : nextProps.min;
        var max = nextProps.max === undefined ? this.props.max : nextProps.max;
        var step = nextProps.step === undefined ? this.props.step : nextProps.step;
        if (value && (value > max)) {
            value = max;
        }
        if (value && (value < min)) {
            value = min;
        }
        this.setState({
            relativeValue: this.getRelativeValue(value, min, max, step),
            relativeStep: this.getRelativeStep(step, min, max),
            isVertical: this.isVertical(nextProps.axis || this.props.axis),
            isReverse: this.isReverse(nextProps.axis || this.props.axis) !== this.isRTL()
        });
    };
    Slider.prototype.getDefaultValue = function () {
        var _a = this.props, value = _a.value, min = _a.min;
        return typeof value === 'undefined' ?
            (typeof min !== 'undefined' ? min : DEFAULT_VALUE) :
            value;
    };
    Slider.prototype.getTooltip = function () {
        return this.props.tooltip;
    };
    Slider.prototype.getMarks = function () {
        var _a = this.props, marks = _a.marks, min = _a.min, max = _a.max, step = _a.step;
        var relativeStep = this.state.relativeStep;
        var range = (max - min);
        var markElements = [];
        if (!marks ||
            typeof step === 'undefined' ||
            step === CONTINUOUS_STEP ||
            relativeStep === CONTINUOUS_STEP ||
            range % step) {
            return markElements;
        }
        for (var i = 0; i <= range / step; i++) {
            var position = relativeStep * i;
            markElements.push((React.createElement("span", { "data-automation-id": "SLIDER-MARKS-" + i, key: i, className: this.getMarkClass(position), style: this.getMarkStyles(position) })));
        }
        return markElements;
    };
    Slider.prototype.getProgressStyles = function () {
        return this.state.isVertical ?
            { height: this.state.relativeValue + "%" } :
            { width: this.state.relativeValue + "%" };
    };
    Slider.prototype.getHandleStyles = function () {
        return this.state.isVertical ?
            (this.state.isReverse ?
                { top: this.state.relativeValue + "%" } :
                { bottom: this.state.relativeValue + "%" }) :
            (this.state.isReverse ?
                { right: this.state.relativeValue + "%" } :
                { left: this.state.relativeValue + "%" });
    };
    Slider.prototype.getMarkStyles = function (position) {
        var _a = this.state, isReverse = _a.isReverse, isVertical = _a.isVertical;
        return isReverse ?
            (isVertical ?
                { top: position + "%" } :
                { right: position + "%" }) :
            (isVertical ?
                { bottom: position + "%" } :
                { left: position + "%" });
    };
    Slider.prototype.getMarkClass = function (position) {
        var relativeValue = this.state.relativeValue;
        return position <= relativeValue ?
            'markProgress' :
            'markTrack';
    };
    Slider.prototype.isVertical = function (axis) {
        return axis === exports.AXISES.y || axis === exports.AXISES.yReverse;
    };
    Slider.prototype.isReverse = function (axis) {
        return axis === exports.AXISES.xReverse || axis === exports.AXISES.yReverse;
    };
    Slider.prototype.isRTL = function () {
        return utils_1.isRTLContext(this.context);
    };
    Slider.prototype.increaseValue = function (toEdge, multiplier) {
        if (toEdge === void 0) { toEdge = false; }
        if (multiplier === void 0) { multiplier = 1; }
        this.changeValue(ChangeDirrection.ascend, multiplier, toEdge);
    };
    Slider.prototype.decreaseValue = function (toEdge, multiplier) {
        if (toEdge === void 0) { toEdge = false; }
        if (multiplier === void 0) { multiplier = 1; }
        this.changeValue(ChangeDirrection.descend, multiplier, toEdge);
    };
    Slider.prototype.changeValue = function (dirrection, multiplier, toEdge) {
        if (multiplier === void 0) { multiplier = 1; }
        if (toEdge === void 0) { toEdge = false; }
        var relativeValue = this.state.relativeValue;
        var newRelativeValue;
        var relativeStep = this.state.relativeStep === CONTINUOUS_STEP ?
            1 :
            this.state.relativeStep;
        if (toEdge) {
            newRelativeValue = dirrection === ChangeDirrection.ascend ?
                100 :
                0;
        }
        else {
            newRelativeValue = this.getValueInRange(dirrection === ChangeDirrection.ascend ?
                Math.floor(relativeValue / relativeStep) * relativeStep + relativeStep * multiplier :
                Math.ceil(relativeValue / relativeStep) * relativeStep - relativeStep * multiplier, 0, 100);
        }
        var newAbsoluteValue = this.getAbsoluteValue(newRelativeValue);
        if (newRelativeValue !== this.state.relativeValue) {
            this.setState({
                relativeValue: newRelativeValue
            });
        }
        this.callInput(newAbsoluteValue);
        if (newAbsoluteValue !== this.props.value) {
            this.callChange(newAbsoluteValue);
        }
    };
    Slider.prototype.callInput = function (value) {
        if (typeof value !== 'string') {
            value = String(value);
        }
        this.props.onInput({ value: value });
    };
    Slider.prototype.callChange = function (value) {
        this.props.onChange({ value: value });
    };
    Slider.prototype.getRelativeStep = function (step, min, max) {
        if (typeof step === 'undefined' || step === CONTINUOUS_STEP) {
            return CONTINUOUS_STEP;
        }
        return 100 * step / (max - min);
    };
    Slider.prototype.getRelativeValue = function (value, min, max, step) {
        var normilizedMax = max - min;
        var normilizedValue = value - min;
        var relativeValue = (normilizedValue * 100) / normilizedMax;
        return this.getValueInRange(relativeValue, 0, 100);
    };
    Slider.prototype.getAbsoluteValue = function (relativeValue) {
        var range = this.props.max - this.props.min;
        var absoluteValue = range * relativeValue / 100 + this.props.min;
        return this.getValueInRange(absoluteValue, this.props.min, this.props.max);
    };
    Slider.prototype.getValueInRange = function (value, min, max) {
        return value < min ? min : (value > max ? max : value);
    };
    Slider.prototype.getValueFromElementAndPointer = function (element, _a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        var _b = this.state, relativeStep = _b.relativeStep, isVertical = _b.isVertical, isReverse = _b.isReverse;
        var _c = element.getBoundingClientRect(), top = _c.top, left = _c.left, height = _c.height, width = _c.width;
        var sliderOffset = isVertical ? top : left;
        var sliderSize = isVertical ? height : width;
        var sliderCoordinate = isVertical ? clientY : clientX;
        var relativeValue = this.getRelativeValue(sliderCoordinate - sliderOffset, 0, sliderSize);
        relativeValue = isReverse ?
            (isVertical ? relativeValue : 100 - relativeValue) :
            (isVertical ? 100 - relativeValue : relativeValue);
        if (relativeStep === undefined || relativeStep === CONTINUOUS_STEP) {
            return relativeValue;
        }
        var value = Math.round(relativeValue / relativeStep) * relativeStep;
        value = value > 100 ?
            value - relativeStep :
            (value < 0 ? value + relativeStep : value);
        return value;
    };
    Slider.prototype.onDragStart = function (event) {
        this.props.onDragStart(event);
    };
    Slider.prototype.onDrag = function (event) {
        this.props.onDrag(event);
    };
    Slider.prototype.onDragStop = function (event) {
        this.props.onDragStop(event);
    };
    Slider.defaultProps = {
        min: DEFAULT_MIN,
        max: DEFAULT_MAX,
        step: DEFAULT_STEP,
        axis: DEFAULT_AXIS,
        onChange: noop_1.noop,
        onInput: noop_1.noop,
        onFocus: noop_1.noop,
        onBlur: noop_1.noop,
        onDragStart: noop_1.noop,
        onDrag: noop_1.noop,
        onDragStop: noop_1.noop
    };
    Slider.contextTypes = {
        contextProvider: PropTypes.shape({
            dir: PropTypes.string
        })
    };
    Slider = __decorate([
        wix_react_tools_1.stylable(slider_st_css_1.default),
        wix_react_tools_1.properties
    ], Slider);
    return Slider;
}(React.Component));
exports.Slider = Slider;
//# sourceMappingURL=slider.js.map