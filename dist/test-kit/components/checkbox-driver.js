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
var src_1 = require("../../src");
var CheckBoxTestDriver = /** @class */ (function (_super) {
    __extends(CheckBoxTestDriver, _super);
    function CheckBoxTestDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckBoxTestDriver.prototype.isChecked = function () {
        return !!this.select('CHECKBOX_TICKMARK');
    };
    CheckBoxTestDriver.prototype.isIndeterminate = function () {
        return !!this.select('CHECKBOX_INDETERMINATE');
    };
    CheckBoxTestDriver.prototype.click = function () {
        test_drive_react_1.simulate.click(this.root);
    };
    Object.defineProperty(CheckBoxTestDriver.prototype, "children", {
        get: function () {
            return this.select('CHECKBOX_CHILD_CONTAINER').children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBoxTestDriver.prototype, "box", {
        get: function () {
            return this.select('CHECKBOX_BOX');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBoxTestDriver.prototype, "tickMark", {
        get: function () {
            return this.select('CHECKBOX_TICKMARK');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBoxTestDriver.prototype, "indeterminateMark", {
        get: function () {
            return this.select('CHECKBOX_INDETERMINATE');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckBoxTestDriver.prototype, "nativeInput", {
        get: function () {
            return this.select('NATIVE_CHECKBOX');
        },
        enumerable: true,
        configurable: true
    });
    CheckBoxTestDriver.ComponentClass = src_1.CheckBox;
    return CheckBoxTestDriver;
}(test_drive_react_1.DriverBase));
exports.CheckBoxTestDriver = CheckBoxTestDriver;
//# sourceMappingURL=checkbox-driver.js.map