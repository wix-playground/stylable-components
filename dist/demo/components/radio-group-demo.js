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
var radio_group_demo_st_css_1 = require("./radio-group-demo.st.css");
var RadioGroupDemo = /** @class */ (function (_super) {
    __extends(RadioGroupDemo, _super);
    function RadioGroupDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            myValue1: 'Start here',
            myValue2: 'Checked Radio'
        };
        _this.onChange = function (e) {
            _this.setState({ myValue1: e.value });
        };
        _this.onChange2 = function (e) {
            _this.setState({ myValue2: e.value });
        };
        return _this;
    }
    RadioGroupDemo.prototype.render = function () {
        return (React.createElement("div", { "data-automation-id": "RADIO_GROUP_DEMO" },
            React.createElement("div", null,
                React.createElement("h3", null, "Children radio group"),
                React.createElement(src_1.RadioGroup, { "data-automation-id": "GROUP_1_GROUP", onChange: this.onChange, name: "demo", className: "rg", value: this.state.myValue1 },
                    React.createElement(src_1.RadioButton, { value: "This way!" },
                        React.createElement("span", { className: "label" }, "Default Radio")),
                    React.createElement(src_1.RadioButton, { value: "No, that way!" },
                        React.createElement("span", { className: "label" }, "No, that way!")),
                    React.createElement(src_1.RadioButton, { value: "But not here", disabled: true },
                        React.createElement("span", { className: "label" }, "But not here")),
                    React.createElement(src_1.RadioButton, { value: "Start here", disabled: true },
                        React.createElement("span", { className: "label" }, "Start here"))),
                React.createElement("br", null),
                React.createElement("span", { "data-automation-id": "GROUP_1_RESULT" },
                    "Value: ",
                    this.state.myValue1)),
            React.createElement("div", { "data-automation-id": "GROUP_2" },
                React.createElement("h3", null, "Data source radio group"),
                React.createElement(src_1.RadioGroup, { onChange: this.onChange2, name: "name", className: "rg", value: this.state.myValue2, dataSource: [
                        { value: 'Default Radio', labelText: 'Default Radio' },
                        { value: 'Checked Radio', labelText: 'Checked Radio' },
                        {
                            value: 'Disabled Radio',
                            disabled: true,
                            labelText: 'Disabled Radio'
                        }
                    ] }),
                React.createElement("br", null),
                React.createElement("span", { "data-automation-id": "RADIO_GROUP_DEMO_VALUE" },
                    "Value: ",
                    this.state.myValue2))));
    };
    RadioGroupDemo = __decorate([
        wix_react_tools_1.stylable(radio_group_demo_st_css_1.default)
    ], RadioGroupDemo);
    return RadioGroupDemo;
}(React.Component));
exports.RadioGroupDemo = RadioGroupDemo;
//# sourceMappingURL=radio-group-demo.js.map