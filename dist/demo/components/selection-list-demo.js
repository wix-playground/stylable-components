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
var selection_list_1 = require("../../src/components/selection-list");
var selection_list_demo_st_css_1 = require("./selection-list-demo.st.css");
var SelectionListDemo = /** @class */ (function (_super) {
    __extends(SelectionListDemo, _super);
    function SelectionListDemo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionListDemo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(FoodList, null),
            React.createElement(EmojiList, null),
            React.createElement(TextStyleList, null)));
    };
    return SelectionListDemo;
}(React.Component));
exports.SelectionListDemo = SelectionListDemo;
var FoodList = /** @class */ (function (_super) {
    __extends(FoodList, _super);
    function FoodList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { value: 'Eggs' };
        _this.dataSource = [
            'Eggs',
            'Bacon',
            'Sausage',
            selection_list_1.divider,
            'Ham',
            { value: 'Spam', label: 'Spam', disabled: true }
        ];
        _this.handleChange = function (_a) {
            var value = _a.value;
            return _this.setState({ value: value });
        };
        return _this;
    }
    FoodList.prototype.render = function () {
        return (React.createElement("div", { "data-automation-id": "FOOD" },
            React.createElement("h3", null, "Options from a data source"),
            React.createElement(selection_list_1.SelectionList, { dataSource: this.dataSource, value: this.state.value, onChange: this.handleChange }),
            React.createElement("p", { "data-automation-id": "RESULT" },
                this.state.value,
                ", great choice!")));
    };
    return FoodList;
}(React.Component));
exports.FoodList = FoodList;
var EmojiList = /** @class */ (function (_super) {
    __extends(EmojiList, _super);
    function EmojiList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { value: 'Crocodile' };
        _this.dataSchema = { value: 'name', label: 'icon' };
        _this.dataSource = [
            { icon: '🐍', name: 'Snek' },
            { icon: '🐋', name: 'Whale' },
            { icon: '🐊', name: 'Crocodile' },
            { icon: '🐘', name: 'Elephant' },
            { icon: '🐇', name: 'Rabbit' },
            { icon: '🐝', name: 'Honeybee' }
        ];
        _this.renderItem = function (_a) {
            var value = _a.value, label = _a.label;
            return React.createElement(selection_list_1.Option, { value: value }, label);
        };
        _this.handleChange = function (_a) {
            var value = _a.value;
            return _this.setState({ value: value });
        };
        return _this;
    }
    EmojiList.prototype.render = function () {
        return (React.createElement("div", { "data-automation-id": "EMOJI" },
            React.createElement("h3", null, "Custom item renderer"),
            React.createElement(selection_list_1.SelectionList, { className: "emoji-list", dataSchema: this.dataSchema, dataSource: this.dataSource, renderItem: this.renderItem, value: this.state.value, onChange: this.handleChange }),
            React.createElement("p", { "data-automation-id": "RESULT" },
                "Your spirit animal is ",
                this.state.value.toLowerCase(),
                ".")));
    };
    EmojiList = __decorate([
        wix_react_tools_1.stylable(selection_list_demo_st_css_1.default)
    ], EmojiList);
    return EmojiList;
}(React.Component));
var TextStyleList = /** @class */ (function (_super) {
    __extends(TextStyleList, _super);
    function TextStyleList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { value: 'heading' };
        _this.handleChange = function (_a) {
            var value = _a.value;
            return _this.setState({ value: value });
        };
        return _this;
    }
    TextStyleList.prototype.render = function () {
        return (React.createElement("div", { "data-automation-id": "TEXT_STYLE" },
            React.createElement("h3", null, "Child components as options"),
            React.createElement(selection_list_1.SelectionList, { className: "text-style-list", value: this.state.value, onChange: this.handleChange },
                React.createElement(selection_list_1.Option, { value: "title" },
                    React.createElement("span", { className: "text-style-title" }, "Title")),
                React.createElement(selection_list_1.Option, { value: "heading" },
                    React.createElement("span", { className: "text-style-heading" }, "Heading")),
                React.createElement(selection_list_1.Option, { value: "heading-red" },
                    React.createElement("span", { className: "text-style-heading-red" }, "Heading Red")),
                React.createElement(selection_list_1.Option, { value: "body" },
                    React.createElement("span", { className: "text-style-body" }, "Body")),
                React.createElement(selection_list_1.Option, { value: "caption", disabled: true },
                    React.createElement("span", { className: "text-style-caption" }, "Caption")),
                React.createElement(selection_list_1.Option, { value: "label" },
                    React.createElement("span", { className: "text-style-label" }, "Label"))),
            React.createElement("p", null,
                React.createElement("span", { "data-automation-id": "RESULT", className: "text-style-" + this.state.value }, "Styled text"))));
    };
    TextStyleList = __decorate([
        wix_react_tools_1.stylable(selection_list_demo_st_css_1.default)
    ], TextStyleList);
    return TextStyleList;
}(React.Component));
//# sourceMappingURL=selection-list-demo.js.map