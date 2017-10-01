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
var modal_demo_st_css_1 = require("./modal-demo.st.css");
var ModalDemo = /** @class */ (function (_super) {
    __extends(ModalDemo, _super);
    function ModalDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false
        };
        _this.toggleOpen = function () { return _this.setState({ isOpen: !_this.state.isOpen }); };
        _this.onModalClick = function (event) {
            if (event.source !== 'children') {
                _this.toggleOpen();
            }
        };
        return _this;
    }
    ModalDemo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("button", { "data-automation-id": "MODAL_BUTTON", onClick: this.toggleOpen }, "Open The Modal!"),
            React.createElement(src_1.Modal, { className: "root", isOpen: this.state.isOpen, onRequestClose: this.onModalClick },
                React.createElement("div", { role: "children", className: "content" }, "\uD83C\uDF0C"))));
    };
    ModalDemo = __decorate([
        wix_react_tools_1.stylable(modal_demo_st_css_1.default)
    ], ModalDemo);
    return ModalDemo;
}(React.Component));
exports.ModalDemo = ModalDemo;
//# sourceMappingURL=modal-demo.js.map