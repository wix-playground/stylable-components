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
var _1 = require("../../src/");
var popup_demo_st_css_1 = require("./popup-demo.st.css");
var PopupDemo = /** @class */ (function (_super) {
    __extends(PopupDemo, _super);
    function PopupDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            div: null,
            isOpen: false,
            pVertical: 'top',
            pHorizontal: 'left',
            aVertical: 'bottom',
            aHorizontal: 'left'
        };
        _this.onClick = function () {
            _this.setState({ div: _this.state.div, isOpen: !_this.state.isOpen });
        };
        _this.updateState = function (ref) {
            _this.setState({ div: ref, isOpen: _this.state.isOpen });
        };
        _this.changePVertical = function (e) {
            _this.setState({ pVertical: e.value });
        };
        _this.changePHorizontal = function (e) {
            _this.setState({ pHorizontal: e.value });
        };
        _this.changeAVertical = function (e) {
            _this.setState({ aVertical: e.value });
        };
        _this.changeAHorizontal = function (e) {
            _this.setState({ aHorizontal: e.value });
        };
        return _this;
    }
    PopupDemo.prototype.render = function () {
        var popupPos = {
            vertical: this.state.pVertical, horizontal: this.state.pHorizontal
        };
        var anchorPos = {
            vertical: this.state.aVertical, horizontal: this.state.aHorizontal
        };
        var vPos = [{ value: 'top' }, { value: 'center' }, { value: 'bottom' }];
        var hPos = [{ value: 'left' }, { value: 'center' }, { value: 'right' }];
        return (React.createElement("div", null,
            React.createElement("button", { ref: this.updateState, onClick: this.onClick, className: "anchor", "data-automation-id": "POPUP_DEMO_DIV" }, this.state.isOpen ? 'Hide Popup' : 'Show Popup'),
            React.createElement(_1.Popup, { anchor: this.state.div, popupPosition: popupPos, anchorPosition: anchorPos, open: this.state.isOpen },
                React.createElement("div", { style: { color: 'white', backgroundColor: 'black' } }, "Hello!")),
            React.createElement("div", { className: "position" },
                React.createElement("div", { className: "category" },
                    React.createElement("h3", null, "Popup position - vertical"),
                    React.createElement(_1.RadioGroup, { dataSource: vPos, className: "radio", value: "top", onChange: this.changePVertical })),
                React.createElement("div", { className: "category" },
                    React.createElement("h3", null, "Popup position - horizontal"),
                    React.createElement(_1.RadioGroup, { className: "radio", value: "left", onChange: this.changePHorizontal, dataSource: hPos })),
                React.createElement("div", { className: "category" },
                    React.createElement("h3", null, "Anchor position - vertical"),
                    React.createElement(_1.RadioGroup, { className: "radio", value: "bottom", onChange: this.changeAVertical, dataSource: vPos })),
                React.createElement("div", null,
                    React.createElement("h3", null, "Anchor position - horizontal"),
                    React.createElement(_1.RadioGroup, { className: "radio", value: "left", onChange: this.changeAHorizontal, dataSource: hPos })))));
    };
    PopupDemo = __decorate([
        wix_react_tools_1.stylable(popup_demo_st_css_1.default)
    ], PopupDemo);
    return PopupDemo;
}(React.Component));
exports.PopupDemo = PopupDemo;
//# sourceMappingURL=popup-demo.js.map