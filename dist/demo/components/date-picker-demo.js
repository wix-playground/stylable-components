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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var src_1 = require("../../src");
var DatePickerDemo = /** @class */ (function (_super) {
    __extends(DatePickerDemo, _super);
    function DatePickerDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: _this.props.value ? _this.props.value : new Date(),
            startingDay: 0
        };
        _this.setStartingDay = function (event) {
            var target = event.target;
            _this.setState({ startingDay: parseInt(target.value, 10) });
        };
        _this.onChange = function (e) {
            _this.setState({ value: e.value });
        };
        return _this;
    }
    DatePickerDemo.prototype.render = function () {
        return (React.createElement("div", { "data-automation-id": "DATE_PICKER_DEMO" },
            React.createElement("h2", null, "Try changing which day of the week the calendar starts on!"),
            React.createElement("span", null,
                React.createElement("select", { value: this.state.startingDay, onChange: this.setStartingDay },
                    React.createElement("option", { value: "0" }, "Sunday"),
                    React.createElement("option", { value: "1" }, "Monday"),
                    React.createElement("option", { value: "2" }, "Tuesday"),
                    React.createElement("option", { value: "3" }, "Wednesday"),
                    React.createElement("option", { value: "4" }, "Thursday"),
                    React.createElement("option", { value: "5" }, "Friday"),
                    React.createElement("option", { value: "6" }, "Saturday"))),
            React.createElement("span", { style: { marginBottom: '1em' }, "data-automation-id": "CURRENT_DATE" }, this.state.value.toDateString()),
            React.createElement(src_1.DatePicker, __assign({ "data-automation-id": "DATE_PICKER", placeholder: "mm/dd/yyyy", startingDay: this.state.startingDay, value: this.state.value, onChange: this.onChange }, this.props))));
    };
    return DatePickerDemo;
}(React.Component));
exports.DatePickerDemo = DatePickerDemo;
//# sourceMappingURL=date-picker-demo.js.map