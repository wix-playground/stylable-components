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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var GlobalEvent = /** @class */ (function (_super) {
    __extends(GlobalEvent, _super);
    function GlobalEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalEvent.prototype.shouldComponentUpdate = function () {
        return false;
    };
    GlobalEvent.prototype.componentDidMount = function () {
        var _this = this;
        this.forEachEvent(function (name, listener) { return _this.subscribe(name, listener); });
    };
    GlobalEvent.prototype.componentWillUnmount = function () {
        var _this = this;
        this.forEachEvent(function (name, listener) { return _this.unsubscribe(name, listener); });
    };
    GlobalEvent.prototype.componentWillReceiveProps = function (props) {
        var _this = this;
        this.forEachEvent(function (name, listener) {
            if (listener !== props[name]) {
                _this.unsubscribe(name, listener);
                props[name] && _this.subscribe(name, props[name]);
            }
        });
    };
    GlobalEvent.prototype.render = function () {
        return null;
    };
    GlobalEvent.prototype.forEachEvent = function (fn) {
        var _this = this;
        Object
            .keys(this.props)
            .filter(function (name) { return name !== 'children'; })
            .forEach(function (name) { return fn(name, _this.props[name]); });
    };
    GlobalEvent.prototype.subscribe = function (event, listener) {
        window && window.addEventListener(event, listener);
    };
    GlobalEvent.prototype.unsubscribe = function (event, listener) {
        window && window.removeEventListener(event, listener);
    };
    return GlobalEvent;
}(react_1.Component));
exports.GlobalEvent = GlobalEvent;
//# sourceMappingURL=global-event.js.map