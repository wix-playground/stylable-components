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
var test_drive_react_1 = require("test-drive-react");
var drop_down_1 = require("../../src/components/drop-down/drop-down");
var bodySelect = test_drive_react_1.selectDom(document.body);
var DropDownDriver = /** @class */ (function (_super) {
    __extends(DropDownDriver, _super);
    function DropDownDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DropDownDriver.prototype, "selection", {
        get: function () {
            return this.root.textContent;
        },
        enumerable: true,
        configurable: true
    });
    DropDownDriver.prototype.isOpen = function () {
        return !!this.list;
    };
    DropDownDriver.prototype.clickOnItem = function (idx) {
        if (this.items) {
            this.items[idx] && test_drive_react_1.simulate.click(this.items[idx]);
        }
    };
    Object.defineProperty(DropDownDriver.prototype, "list", {
        get: function () {
            return bodySelect('LIST');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownDriver.prototype, "items", {
        get: function () {
            return this.list ? this.list.children : null;
        },
        enumerable: true,
        configurable: true
    });
    DropDownDriver.prototype.focus = function () {
        return test_drive_react_1.simulate.focus(this.root);
    };
    DropDownDriver.prototype.clickOnDropDown = function () {
        test_drive_react_1.simulate.click(this.select('DROP_DOWN_INPUT'));
    };
    DropDownDriver.prototype.keyDown = function (keyCode) {
        test_drive_react_1.simulate.keyDown(this.root, { keyCode: keyCode });
    };
    DropDownDriver.ComponentClass = drop_down_1.DropDown;
    return DropDownDriver;
}(test_drive_react_1.DriverBase));
exports.DropDownDriver = DropDownDriver;
//# sourceMappingURL=drop-down-driver.js.map