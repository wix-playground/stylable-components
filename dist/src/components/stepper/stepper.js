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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var icons_1 = require("../../icons");
var button_st_css_1 = require("../../style/default-theme/controls/button.st.css");
var global_event_1 = require("../global-event");
var stepper_st_css_1 = require("./stepper.st.css");
var DEFAULTS = {
    dragStep: 10,
    disableUp: false,
    disableDown: false
};
var Stepper = /** @class */ (function (_super) {
    __extends(Stepper, _super);
    function Stepper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { dragged: false };
        _this.dragRefPoint = {
            clientX: 0,
            clientY: 0
        };
        _this.handlerClickUp = function (_a) {
            var altKey = _a.altKey, ctrlKey = _a.ctrlKey, shiftKey = _a.shiftKey;
            return _this.props.onUp({ altKey: altKey, ctrlKey: ctrlKey, shiftKey: shiftKey });
        };
        _this.handlerClickDown = function (_a) {
            var altKey = _a.altKey, ctrlKey = _a.ctrlKey, shiftKey = _a.shiftKey;
            return _this.props.onDown({ altKey: altKey, ctrlKey: ctrlKey, shiftKey: shiftKey });
        };
        _this.handleDragStart = function (_a) {
            var clientX = _a.clientX, clientY = _a.clientY;
            _this.setState({ dragged: true });
            _this.updateDragRefPoint({ clientX: clientX, clientY: clientY });
        };
        _this.handleDragStop = function () {
            _this.setState({ dragged: false });
            _this.resetDragRefPoint();
        };
        _this.handleDrag = function (_a) {
            var clientX = _a.clientX, clientY = _a.clientY, shiftKey = _a.shiftKey, altKey = _a.altKey, ctrlKey = _a.ctrlKey;
            var dragged = _this.state.dragged;
            var _b = _this.props, onUp = _b.onUp, onDown = _b.onDown, disableUp = _b.disableUp, disableDown = _b.disableDown, _c = _b.dragStep, dragStep = _c === void 0 ? DEFAULTS.dragStep : _c;
            var refPoint = _this.dragRefPoint;
            if (dragged) {
                if (!disableUp && clientY <= refPoint.clientY - dragStep) {
                    _this.updateDragRefPoint({ clientX: clientX, clientY: clientY });
                    onUp({ altKey: altKey, ctrlKey: ctrlKey, shiftKey: shiftKey });
                }
                if (!disableDown && clientY >= refPoint.clientY + dragStep) {
                    _this.updateDragRefPoint({ clientX: clientX, clientY: clientY });
                    onDown({ altKey: altKey, ctrlKey: ctrlKey, shiftKey: shiftKey });
                }
            }
        };
        return _this;
    }
    Stepper.prototype.render = function () {
        var dragged = this.state.dragged;
        var _a = this.props, onUp = _a.onUp, onDown = _a.onDown, disableUp = _a.disableUp, disableDown = _a.disableDown, dragStep = _a.dragStep, props = __rest(_a, ["onUp", "onDown", "disableUp", "disableDown", "dragStep"]);
        return (React.createElement("div", __assign({}, props, { onMouseDown: this.handleDragStart }),
            React.createElement("button", { type: "button", tabIndex: -1, "data-automation-id": "STEPPER_INCREMENT", className: button_st_css_1.default.root + " control up", onClick: this.handlerClickUp, disabled: disableUp },
                React.createElement(icons_1.ChevronUpIcon, { className: "control-icon" })),
            React.createElement("button", { type: "button", tabIndex: -1, "data-automation-id": "STEPPER_DECREMENT", className: button_st_css_1.default.root + " control down", onClick: this.handlerClickDown, disabled: disableDown },
                React.createElement(icons_1.ChevronDownIcon, { className: "control-icon" })),
            React.createElement(global_event_1.GlobalEvent, { mousemove: dragged ? this.handleDrag : undefined, mouseup: this.handleDragStop })));
    };
    Stepper.prototype.updateDragRefPoint = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        this.dragRefPoint.clientX = clientX;
        this.dragRefPoint.clientY = clientY;
    };
    Stepper.prototype.resetDragRefPoint = function () {
        this.dragRefPoint.clientX = 0;
        this.dragRefPoint.clientY = 0;
    };
    Stepper.defaultProps = {
        disableUp: DEFAULTS.disableUp,
        disableDown: DEFAULTS.disableDown
    };
    Stepper = __decorate([
        wix_react_tools_1.stylable(stepper_st_css_1.default)
    ], Stepper);
    return Stepper;
}(React.Component));
exports.Stepper = Stepper;
//# sourceMappingURL=stepper.js.map