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
var src_1 = require("../../src");
var slider_demo_st_css_1 = require("./slider-demo.st.css");
var SliderDemo = /** @class */ (function (_super) {
    __extends(SliderDemo, _super);
    function SliderDemo(props) {
        var _this = _super.call(this, props) || this;
        _this.onSliderChange = function (_a) {
            var value = _a.value;
            _this.setState({
                value: value,
                rawValue: String(value)
            });
        };
        _this.onSliderInput = function (_a) {
            var value = _a.value;
            _this.setState({
                rawValue: value
            });
        };
        _this.state = {
            value: 50,
            rawValue: '50'
        };
        return _this;
    }
    SliderDemo.prototype.render = function () {
        var min = 0;
        var max = 100;
        return (React.createElement("table", { cellSpacing: "24px" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "table-head-cell" }, "Default Slider"),
                    React.createElement("th", { className: "table-head-cell" }, "Disabled Slider"),
                    React.createElement("th", { className: "table-head-cell" }, "Slider with step"))),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement(src_1.Slider, { value: this.state.value, min: min, max: max, onChange: this.onSliderChange })),
                    React.createElement("td", null,
                        React.createElement(src_1.Slider, { value: this.state.value, min: min, max: max, disabled: true, onChange: this.onSliderChange })),
                    React.createElement("td", null,
                        React.createElement(src_1.Slider, { value: this.state.value, min: min, max: max, step: 10, onChange: this.onSliderChange })))),
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "table-head-cell" },
                        "Slider with error state",
                        React.createElement("br", null),
                        React.createElement("span", { style: { color: '#777', fontSize: '12px' } }, "To be continued...")),
                    React.createElement("th", { className: "table-head-cell" }, "Slider with label"),
                    React.createElement("th", { className: "table-head-cell" }, "Slider with tooltip"))),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement(src_1.Slider, { value: this.state.value, min: min, max: max, error: true, onChange: this.onSliderChange })),
                    React.createElement("td", null,
                        React.createElement(src_1.Slider, { value: this.state.value, min: min, max: max, label: "It's simple slider.", onChange: this.onSliderChange })),
                    React.createElement("td", null,
                        React.createElement(src_1.Slider, { value: this.state.value, min: min, max: max, onChange: this.onSliderChange, onInput: this.onSliderInput, tooltip: React.createElement("div", { className: "tooltip" }, this.state.rawValue) })))),
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "table-head-cell" }, "Slider axis=\"y\""),
                    React.createElement("th", { className: "table-head-cell" }, "Slider axis=\"x-reverse\""),
                    React.createElement("th", { className: "table-head-cell" }, "Slider axis=\"y-reverse\""))),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { className: "vertical-demo" },
                        React.createElement(src_1.Slider, { axis: 'y', value: this.state.value, min: min, max: max, onChange: this.onSliderChange })),
                    React.createElement("td", { className: "vertical-demo" },
                        React.createElement(src_1.Slider, { axis: 'x-reverse', value: this.state.value, min: min, max: max, onChange: this.onSliderChange })),
                    React.createElement("td", { className: "vertical-demo" },
                        React.createElement(src_1.Slider, { axis: 'y-reverse', value: this.state.value, min: min, max: max, onChange: this.onSliderChange })))),
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "table-head-cell" }, "Slider with marks"),
                    React.createElement("th", { className: "table-head-cell" }, "Vertical Slider with marks"),
                    React.createElement("th", { className: "table-head-cell" }, "Reverse Slider with marks"))),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { className: "vertical-demo" },
                        React.createElement(src_1.Slider, { value: this.state.value, min: min, max: max, step: 10, marks: true, onChange: this.onSliderChange })),
                    React.createElement("td", { className: "vertical-demo" },
                        React.createElement(src_1.Slider, { axis: 'y', value: this.state.value, min: min, max: max, step: 10, marks: true, onChange: this.onSliderChange })),
                    React.createElement("td", { className: "vertical-demo" },
                        React.createElement(src_1.Slider, { axis: 'x-reverse', value: this.state.value, min: min, max: max, step: 10, marks: true, onChange: this.onSliderChange })))),
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "table-head-cell" }, "Slider with RTL"),
                    React.createElement("th", { className: "table-head-cell" }, "Reverse Slider with RTL"),
                    React.createElement("th", { className: "table-head-cell" }, "Slider with RTL and marks"))),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement(src_1.ContextProvider, { dir: "rtl" },
                            React.createElement(src_1.Slider, { value: this.state.value, min: min, max: max, onChange: this.onSliderChange }))),
                    React.createElement("td", null,
                        React.createElement(src_1.ContextProvider, { dir: "rtl" },
                            React.createElement(src_1.Slider, { value: this.state.value, min: min, max: max, axis: "x-reverse", onChange: this.onSliderChange }))),
                    React.createElement("td", null,
                        React.createElement(src_1.ContextProvider, { dir: "rtl" },
                            React.createElement(src_1.Slider, { value: this.state.value, min: min, max: max, step: 10, marks: true, onChange: this.onSliderChange })))))));
    };
    SliderDemo = __decorate([
        wix_react_tools_1.stylable(slider_demo_st_css_1.default)
    ], SliderDemo);
    return SliderDemo;
}(React.Component));
exports.SliderDemo = SliderDemo;
//# sourceMappingURL=slider-demo.js.map