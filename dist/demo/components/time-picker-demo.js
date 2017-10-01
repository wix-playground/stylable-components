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
var utils_1 = require("../../src/components/time-picker/utils");
var time_picker_demo_st_css_1 = require("./time-picker-demo.st.css");
var TimePickerDemo = /** @class */ (function (_super) {
    __extends(TimePickerDemo, _super);
    function TimePickerDemo() {
        var _this = _super.call(this) || this;
        _this.createOnChange = function (name) { return function (e) {
            return _this.setState((_a = {}, _a[name] = e.value, _a));
            var _a;
        }; };
        _this.state = {
            value1: '01:55',
            value2: null
        };
        return _this;
    }
    TimePickerDemo.prototype.render = function () {
        return (React.createElement("table", { cellSpacing: 24 },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { colSpan: 4 },
                        "System time format: ",
                        React.createElement("code", null, utils_1.is12TimeFormat ? 'ampm' : '24h'))),
                React.createElement("tr", null,
                    React.createElement("th", null, "Controlled 24 time format"),
                    React.createElement("th", null, "Controlled 12 time format"),
                    React.createElement("th", null, "Controlled 12 time format with error"),
                    React.createElement("th", null, "Controlled 12 time format with RTL"),
                    React.createElement("th", null, "Placeholder (read-only)"),
                    React.createElement("th", null, "No value (read-only)"),
                    React.createElement("th", null, "Disabled"))),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { "data-automation-id": "TIME_PICKER_DEMO_CONTROLLED_24" },
                        React.createElement(src_1.TimePicker, { value: this.state.value1, format: "24h", onChange: this.createOnChange('value1') }),
                        React.createElement("span", { style: { marginLeft: 20 } }, this.state.value1)),
                    React.createElement("td", { "data-automation-id": "TIME_PICKER_DEMO_CONTROLLED_AMPM" },
                        React.createElement(src_1.TimePicker, { format: "ampm", value: this.state.value1, onChange: this.createOnChange('value1') }),
                        React.createElement("span", { style: { marginLeft: 20 } }, this.state.value1)),
                    React.createElement("td", null,
                        React.createElement(src_1.TimePicker, { error: true, format: "ampm", value: this.state.value1, onChange: this.createOnChange('value1') }),
                        React.createElement("span", { style: { marginLeft: 20 } }, this.state.value1)),
                    React.createElement("td", null,
                        React.createElement(src_1.ContextProvider, { dir: "rtl" },
                            React.createElement(src_1.TimePicker, { format: "ampm", value: this.state.value1, onChange: this.createOnChange('value1') }),
                            React.createElement("span", { style: { marginRight: 20 } }, this.state.value1))),
                    React.createElement("td", null,
                        React.createElement(src_1.TimePicker, { placeholder: "Pick the time", value: this.state.value2, onChange: this.createOnChange('value2') }),
                        React.createElement("span", { style: { marginLeft: 20 } }, this.state.value2)),
                    React.createElement("td", null,
                        React.createElement(src_1.TimePicker, { format: "ampm" })),
                    React.createElement("td", null,
                        React.createElement(src_1.TimePicker, { value: "14:55", disabled: true }))))));
    };
    TimePickerDemo = __decorate([
        wix_react_tools_1.stylable(time_picker_demo_st_css_1.default)
    ], TimePickerDemo);
    return TimePickerDemo;
}(React.Component));
exports.TimePickerDemo = TimePickerDemo;
//# sourceMappingURL=time-picker-demo.js.map