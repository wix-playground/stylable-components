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
var RadioGroupDriver = /** @class */ (function (_super) {
    __extends(RadioGroupDriver, _super);
    function RadioGroupDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RadioGroupDriver.prototype, "items", {
        get: function () {
            return this.root.children;
        },
        enumerable: true,
        configurable: true
    });
    RadioGroupDriver.prototype.getRadioButton = function (idx) {
        var _this = this;
        return new RadioButtonDriver(function () { return _this.select('RADIO_BUTTON_' + idx.toString()); });
    };
    RadioGroupDriver.ComponentClass = src_1.RadioGroup;
    return RadioGroupDriver;
}(test_drive_react_1.DriverBase));
exports.RadioGroupDriver = RadioGroupDriver;
var RadioButtonDriver = /** @class */ (function (_super) {
    __extends(RadioButtonDriver, _super);
    function RadioButtonDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RadioButtonDriver.prototype, "nativeElement", {
        get: function () {
            return this.select('NATIVE_INPUT');
        },
        enumerable: true,
        configurable: true
    });
    RadioButtonDriver.prototype.isChecked = function () {
        return !!this.select('CHECKED_RADIO_ICON');
    };
    RadioButtonDriver.prototype.isDisabled = function () {
        return this.nativeElement.disabled;
    };
    RadioButtonDriver.prototype.isReadOnly = function () {
        return this.nativeElement.readOnly;
    };
    Object.defineProperty(RadioButtonDriver.prototype, "value", {
        get: function () {
            return this.nativeElement.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButtonDriver.prototype, "name", {
        get: function () {
            return this.nativeElement.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButtonDriver.prototype, "children", {
        get: function () {
            return Array.from(this.select('CONTENT_CONTAINER').childNodes).filter(function (e, idx) { return e.nodeType !== Node.COMMENT_NODE && idx !== 0; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButtonDriver.prototype, "icon", {
        get: function () {
            return this.isChecked() ? this.select('CHECKED_RADIO_ICON') : this.select('UNCHECKED_RADIO_ICON');
        },
        enumerable: true,
        configurable: true
    });
    RadioButtonDriver.prototype.click = function () {
        this.root.click();
    };
    RadioButtonDriver.ComponentClass = src_1.RadioButton;
    return RadioButtonDriver;
}(test_drive_react_1.DriverBase));
exports.RadioButtonDriver = RadioButtonDriver;
//# sourceMappingURL=radio-group-driver.js.map