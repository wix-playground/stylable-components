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
var ReactDOM = require("react-dom");
var test_drive_react_1 = require("test-drive-react");
var src_1 = require("../../src");
var PortalTestDriver = /** @class */ (function (_super) {
    __extends(PortalTestDriver, _super);
    function PortalTestDriver(instance) {
        var _this = _super.call(this, function () { return ReactDOM.findDOMNode(instance); }) || this;
        _this.instance = instance;
        return _this;
    }
    Object.defineProperty(PortalTestDriver.prototype, "root", {
        get: function () {
            return this.instance.getPortalContainer().children[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalTestDriver.prototype, "content", {
        get: function () {
            return this.instance.getPortalContainer().children[0].children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalTestDriver.prototype, "isPresent", {
        get: function () {
            return !!this.instance.getPortalContainer();
        },
        enumerable: true,
        configurable: true
    });
    PortalTestDriver.ComponentClass = src_1.Portal;
    return PortalTestDriver;
}(test_drive_react_1.DriverBase));
exports.PortalTestDriver = PortalTestDriver;
//# sourceMappingURL=portal-driver.js.map