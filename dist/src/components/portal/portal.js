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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var Portal = /** @class */ (function (_super) {
    __extends(Portal, _super);
    function Portal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Portal.prototype.render = function () {
        var _a = this.props, children = _a.children, rest = __rest(_a, ["children"]);
        this.portalContent = (React.createElement("div", __assign({}, rest, { "data-automation-id": "PORTAL" }), children));
        return null;
    };
    Portal.prototype.componentDidMount = function () {
        this.renderPortal();
    };
    Portal.prototype.componentDidUpdate = function () {
        this.renderPortal();
    };
    Portal.prototype.componentWillUnmount = function () {
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            document.body.removeChild(this.container);
            this.container = null;
        }
    };
    Portal.prototype.getPortalContainer = function () {
        return this.container;
    };
    Portal.prototype.renderPortal = function () {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.portalContent, this.getContainer());
    };
    Portal.prototype.getContainer = function () {
        return this.container = this.container || document.body.appendChild(document.createElement('div'));
    };
    return Portal;
}(React.PureComponent));
exports.Portal = Portal;
//# sourceMappingURL=portal.js.map