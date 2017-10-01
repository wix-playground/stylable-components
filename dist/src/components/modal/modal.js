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
var utils_1 = require("../../utils");
var is_element_1 = require("../../utils/is-element");
var stop_scrolling_1 = require("../../utils/stop-scrolling");
var portal_1 = require("../portal");
var modal_st_css_1 = require("./modal.st.css");
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function (event) {
            var target = event.target;
            if (is_element_1.isElement(target)) {
                var closeEvent = __assign({}, event, { source: _this.getDataFromNearestNode(target) });
                _this.props.onRequestClose(closeEvent);
            }
        };
        return _this;
    }
    Modal.prototype.componentDidMount = function () {
        this.shouldEnableScrolling(!this.props.isOpen);
    };
    Modal.prototype.componentDidUpdate = function () {
        this.shouldEnableScrolling(!this.props.isOpen);
    };
    Modal.prototype.render = function () {
        return (this.props.isOpen ? (React.createElement(portal_1.Portal, null,
            React.createElement("div", { className: "backdrop", "data-slot": "backdrop", "data-automation-id": "MODAL", onClick: this.onClick },
                React.createElement("div", { className: "children", "data-slot": "children" }, this.props.children)))) : null);
    };
    Modal.prototype.getDataFromNearestNode = function (target) {
        return target.getAttribute('data-slot') || this.getDataFromNearestNode(target.parentElement);
    };
    Modal.prototype.shouldEnableScrolling = function (shouldScroll) {
        if (shouldScroll) {
            stop_scrolling_1.enableScrolling();
        }
        else {
            stop_scrolling_1.stopScrolling();
        }
    };
    Modal.defaultProps = {
        isOpen: false,
        onRequestClose: utils_1.noop
    };
    Modal = __decorate([
        wix_react_tools_1.stylable(modal_st_css_1.default),
        wix_react_tools_1.properties
    ], Modal);
    return Modal;
}(React.PureComponent));
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map