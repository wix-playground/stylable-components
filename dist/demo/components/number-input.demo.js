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
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var number_input_1 = require("../../src/components/number-input");
var number_input_demo_st_css_1 = require("./number-input.demo.st.css");
var NumberInputDemo = /** @class */ (function (_super) {
    __extends(NumberInputDemo, _super);
    function NumberInputDemo() {
        var _this = _super.call(this) || this;
        _this.handleSharedValueChange = function (_a) {
            var value = _a.value;
            return _this.setState({ sharedValue: value });
        };
        _this.handleBasicValueChange = function (_a) {
            var value = _a.value;
            return _this.setState({ basicValue: value });
        };
        _this.state = {};
        return _this;
    }
    NumberInputDemo.prototype.render = function () {
        var _a = this.state, basicValue = _a.basicValue, sharedValue = _a.sharedValue;
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("h3", null, "Basic"),
                React.createElement(number_input_1.NumberInput, { value: basicValue, step: 1, max: 100, onChange: this.handleBasicValueChange, placeholder: "How Many?", prefix: React.createElement(TrendingUp, { "data-slot": "prefix" }) },
                    React.createElement("span", { "data-slot": "suffix" }, "USD"))),
            React.createElement("div", null,
                React.createElement("h3", null, "With min/max/step"),
                React.createElement(number_input_1.NumberInput, { value: sharedValue, step: 2, min: -5, max: 5, onChange: this.handleSharedValueChange, placeholder: "How Many?" })),
            React.createElement("div", null,
                React.createElement("h3", null, "Disabled"),
                React.createElement(number_input_1.NumberInput, { disabled: true, value: sharedValue, placeholder: "Always Disabled!" })),
            React.createElement("div", null,
                React.createElement("h3", null, "Error"),
                React.createElement(number_input_1.NumberInput, { error: true, value: sharedValue, onChange: this.handleSharedValueChange, placeholder: "Always wrong!" })),
            React.createElement("div", null,
                React.createElement("h3", null, "Uncontrolled"),
                React.createElement(number_input_1.NumberInput, { defaultValue: 0, step: 2, min: -5, max: 5, placeholder: "Is Uncontrolled" }))));
    };
    NumberInputDemo = __decorate([
        wix_react_tools_1.stylable(number_input_demo_st_css_1.default)
    ], NumberInputDemo);
    return NumberInputDemo;
}(React.Component));
exports.NumberInputDemo = NumberInputDemo;
var TrendingUp = function (props) { return (React.createElement("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" }),
    React.createElement("polyline", { points: "17 6 23 6 23 12" }))); };
//# sourceMappingURL=number-input.demo.js.map