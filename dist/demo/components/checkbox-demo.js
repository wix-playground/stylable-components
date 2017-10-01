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
var checkbox_demo_st_css_1 = require("./checkbox-demo.st.css");
var src_1 = require("../../src");
exports.demoCheckBoxText = 'Yes, I\'m over 18 years old';
var CheckBoxDemo = /** @class */ (function (_super) {
    __extends(CheckBoxDemo, _super);
    function CheckBoxDemo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckBoxDemo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("h3", null, "Basic CheckBox"),
                React.createElement(BasicDemo, null)),
            React.createElement("div", null,
                React.createElement("h3", null, "Disabled"),
                React.createElement(DisabledDemo, null)),
            React.createElement("div", null,
                React.createElement("h3", null, "Indeterminate"),
                React.createElement(IndeterminateDemo, null))));
    };
    CheckBoxDemo = __decorate([
        wix_react_tools_1.stylable(checkbox_demo_st_css_1.default)
    ], CheckBoxDemo);
    return CheckBoxDemo;
}(React.Component));
exports.CheckBoxDemo = CheckBoxDemo;
var BasicDemo = /** @class */ (function (_super) {
    __extends(BasicDemo, _super);
    function BasicDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: false
        };
        _this.handleChange = function (e) { _this.setState({ value: e.value }); };
        return _this;
    }
    BasicDemo.prototype.render = function () {
        return (React.createElement("div", { "data-automation-id": "BASIC_DEMO" },
            React.createElement(src_1.CheckBox, { "data-automation-id": "BASIC_DEMO_CHECKBOX", value: this.state.value, onChange: this.handleChange },
                React.createElement("span", { "data-automation-id": "BASIC_LABEL", className: checkbox_demo_st_css_1.default.label }, exports.demoCheckBoxText)),
            " ",
            React.createElement("br", null),
            React.createElement("button", { disabled: !this.state.value, "data-automation-id": "BUTTON_SUBMIT" }, "Proceed")));
    };
    return BasicDemo;
}(React.Component));
exports.BasicDemo = BasicDemo;
var DisabledDemo = /** @class */ (function (_super) {
    __extends(DisabledDemo, _super);
    function DisabledDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: false
        };
        _this.handleChange = function (e) { _this.setState({ value: e.value }); };
        return _this;
    }
    DisabledDemo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("span", { "data-automation-id": "DISABLED_DEMO" },
                React.createElement(src_1.CheckBox, { "data-automation-id": "DISABLED_DEMO_CHECKBOX", value: this.state.value, onChange: this.handleChange, disabled: true },
                    React.createElement("span", { "data-automation-id": "DISABLED_LABEL", className: checkbox_demo_st_css_1.default.label }, "Unchecked"))),
            React.createElement("span", null,
                React.createElement(src_1.CheckBox, { value: true, disabled: true },
                    React.createElement("span", { className: checkbox_demo_st_css_1.default.label }, "Checked"))),
            React.createElement("span", null,
                React.createElement(src_1.CheckBox, { value: true, disabled: true, indeterminate: true },
                    React.createElement("span", { className: checkbox_demo_st_css_1.default.label }, "Indeterminate")))));
    };
    return DisabledDemo;
}(React.Component));
exports.DisabledDemo = DisabledDemo;
var IndeterminateDemo = /** @class */ (function (_super) {
    __extends(IndeterminateDemo, _super);
    function IndeterminateDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value1: true,
            value2: false
        };
        _this.onChangeParent = function (e) { _this.setState({ value1: e.value, value2: e.value }); };
        _this.onChangeChild1 = function (e) { _this.setState({ value1: e.value }); };
        _this.onChangeChild2 = function (e) { _this.setState({ value2: e.value }); };
        return _this;
    }
    IndeterminateDemo.prototype.render = function () {
        return (React.createElement("ul", { "data-automation-id": "INDETERMINATE_DEMO" },
            React.createElement(src_1.CheckBox, { value: this.state.value1 && this.state.value2, onChange: this.onChangeParent, indeterminate: this.state.value1 !== this.state.value2, "data-automation-id": "INDETERMINATE_DEMO_TOP_LEVEL" },
                React.createElement("span", { "data-automation-id": "DISABLED_LABEL", className: checkbox_demo_st_css_1.default.label }, "All Options")),
            React.createElement("li", { style: { listStyle: 'none', marginLeft: '1em' } },
                React.createElement(src_1.CheckBox, { value: this.state.value1, onChange: this.onChangeChild1, "data-automation-id": "INDETERMINATE_DEMO_OPTION1" },
                    React.createElement("span", { className: checkbox_demo_st_css_1.default.label }, "Option1"))),
            React.createElement("li", { style: { listStyle: 'none', marginLeft: '1em' } },
                React.createElement(src_1.CheckBox, { value: this.state.value2, onChange: this.onChangeChild2, "data-automation-id": "INDETERMINATE_DEMO_OPTION2" },
                    React.createElement("span", { className: checkbox_demo_st_css_1.default.label }, "Option2")))));
    };
    return IndeterminateDemo;
}(React.Component));
exports.IndeterminateDemo = IndeterminateDemo;
//# sourceMappingURL=checkbox-demo.js.map