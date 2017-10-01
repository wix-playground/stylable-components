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
var style_st_css_1 = require("./style.st.css");
var auto_complete_demo_1 = require("./components/auto-complete.demo");
var checkbox_demo_1 = require("./components/checkbox-demo");
var date_picker_demo_1 = require("./components/date-picker-demo");
var drop_down_demo_1 = require("./components/drop-down.demo");
var image_demo_1 = require("./components/image-demo");
var modal_demo_1 = require("./components/modal-demo");
var number_input_demo_1 = require("./components/number-input.demo");
var popup_demo_1 = require("./components/popup-demo");
var radio_group_demo_1 = require("./components/radio-group-demo");
var selection_list_demo_1 = require("./components/selection-list-demo");
var slider_demo_1 = require("./components/slider-demo");
var time_picker_demo_1 = require("./components/time-picker-demo");
var toggle_demo_1 = require("./components/toggle-demo");
var tree_view_demo_1 = require("./components/tree-view-demo");
wix_react_tools_1.setGlobalConfig({ devMode: true });
var ComponentsDemo = /** @class */ (function (_super) {
    __extends(ComponentsDemo, _super);
    function ComponentsDemo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentsDemo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(image_demo_1.ImageDemo, null),
            React.createElement("hr", null),
            React.createElement(drop_down_demo_1.DropDownDemo, null),
            React.createElement("hr", null),
            React.createElement(auto_complete_demo_1.AutoCompleteDemo, null),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "CheckBox"),
                React.createElement(checkbox_demo_1.CheckBoxDemo, null)),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "TreeView"),
                React.createElement(tree_view_demo_1.TreeViewDemo, null),
                React.createElement("hr", null),
                React.createElement(tree_view_demo_1.TreeViewDemoCustom, null)),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "TimePicker"),
                React.createElement(time_picker_demo_1.TimePickerDemo, null)),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "Toggle"),
                React.createElement(toggle_demo_1.ToggleDemo, null)),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "Slider"),
                React.createElement(slider_demo_1.SliderDemo, null)),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "DatePicker"),
                React.createElement(date_picker_demo_1.DatePickerDemo, null)),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "SelectionList"),
                React.createElement(selection_list_demo_1.SelectionListDemo, null)),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "Radio Group"),
                React.createElement(radio_group_demo_1.RadioGroupDemo, null)),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "Typography"),
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("th", null,
                                React.createElement("h1", null, "H1")),
                            React.createElement("th", null,
                                React.createElement("h2", null, "H2")),
                            React.createElement("th", null,
                                React.createElement("h3", null, "H3")),
                            React.createElement("th", null,
                                React.createElement("h4", null, "H4")),
                            React.createElement("th", null,
                                React.createElement("h5", null, "H5")),
                            React.createElement("th", null,
                                React.createElement("h6", null, "H6")),
                            React.createElement("th", null,
                                React.createElement("label", null, "Label")),
                            React.createElement("th", null,
                                React.createElement("p", null, "paragraph")))))),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "button"),
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("th", null,
                                React.createElement("button", null, "Normal")),
                            React.createElement("th", null,
                                React.createElement("button", { disabled: true }, "Disabled")),
                            React.createElement("th", null,
                                React.createElement("a", { className: "button", href: "http://www.wix.com", target: "_blank" }, "Link")),
                            React.createElement("th", null,
                                React.createElement("a", { className: "button", href: "http://www.wix.com", target: "_blank" }, "Disabled link")))))),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "anchor"),
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("th", null,
                                React.createElement("a", { href: "http://www.wix.com", target: "_blank" }, "Normal")),
                            React.createElement("th", null,
                                React.createElement("a", { href: "http://www.wix.com", target: "_blank" }, "Disabled")))))),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "input"),
                React.createElement("table", null,
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("th", null,
                                React.createElement("input", { placeholder: "Placeholder" })),
                            React.createElement("th", null,
                                React.createElement("input", { placeholder: "Disabled", disabled: true })))))),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "Popup"),
                React.createElement(popup_demo_1.PopupDemo, null)),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "NumberInput"),
                React.createElement(number_input_demo_1.NumberInputDemo, null)),
            React.createElement("hr", null),
            React.createElement("div", null,
                React.createElement("h2", null, "Modal"),
                React.createElement(modal_demo_1.ModalDemo, null))));
    };
    ComponentsDemo = __decorate([
        wix_react_tools_1.stylable(style_st_css_1.default)
    ], ComponentsDemo);
    return ComponentsDemo;
}(React.Component));
exports.ComponentsDemo = ComponentsDemo;
//# sourceMappingURL=components-demo.js.map