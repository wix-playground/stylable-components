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
var PropTypes = require("prop-types");
var React = require("react");
var utils_1 = require("../../utils");
var ContextProvider = /** @class */ (function (_super) {
    __extends(ContextProvider, _super);
    function ContextProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextProvider.prototype.getChildContext = function () {
        return {
            contextProvider: utils_1.omit(this.props, 'tagName', 'style', 'children', 'className')
        };
    };
    ContextProvider.prototype.render = function () {
        var _a = this.props, tagName = _a.tagName, className = _a.className, style = _a.style, dir = _a.dir, children = _a.children;
        return React.createElement(tagName, { className: className, style: style, dir: dir, children: children });
    };
    ContextProvider.childContextTypes = {
        contextProvider: PropTypes.object
    };
    ContextProvider.defaultProps = {
        tagName: 'div'
    };
    return ContextProvider;
}(React.PureComponent));
exports.ContextProvider = ContextProvider;
//# sourceMappingURL=context-provider.js.map