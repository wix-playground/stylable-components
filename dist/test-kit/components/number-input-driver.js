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
Object.defineProperty(exports, "__esModule", { value: true });
var keycode_1 = require("keycode");
var test_drive_react_1 = require("test-drive-react");
var src_1 = require("../../src");
var utils_1 = require("../utils");
var NumberInputDriver = /** @class */ (function (_super) {
    __extends(NumberInputDriver, _super);
    function NumberInputDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NumberInputDriver.prototype, "nativeInput", {
        get: function () {
            return this.select('NATIVE_INPUT_NUMBER');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberInputDriver.prototype, "stepper", {
        get: function () {
            return this.select('NUMBER_INPUT_STEPPER');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberInputDriver.prototype, "increment", {
        get: function () {
            return this.select('STEPPER_INCREMENT');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberInputDriver.prototype, "decrement", {
        get: function () {
            return this.select('STEPPER_DECREMENT');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberInputDriver.prototype, "prefix", {
        get: function () {
            return this.select('PREFIX');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberInputDriver.prototype, "suffix", {
        get: function () {
            return this.select('SUFFIX');
        },
        enumerable: true,
        configurable: true
    });
    NumberInputDriver.prototype.clickIncrement = function (opts) {
        test_drive_react_1.simulate.click(this.increment, opts);
    };
    NumberInputDriver.prototype.clickDecrement = function (opts) {
        test_drive_react_1.simulate.click(this.decrement, opts);
    };
    NumberInputDriver.prototype.pressUpKey = function (opts) {
        test_drive_react_1.simulate.keyDown(this.nativeInput, __assign({ keyCode: keycode_1.codes.up }, opts));
    };
    NumberInputDriver.prototype.pressDownKey = function (opts) {
        test_drive_react_1.simulate.keyDown(this.nativeInput, __assign({ keyCode: keycode_1.codes.down }, opts));
    };
    NumberInputDriver.prototype.pressEnter = function () {
        test_drive_react_1.simulate.keyDown(this.nativeInput, { keyCode: keycode_1.codes.enter });
    };
    NumberInputDriver.prototype.pressEsc = function () {
        test_drive_react_1.simulate.keyDown(this.nativeInput, { keyCode: keycode_1.codes.esc });
    };
    NumberInputDriver.prototype.typeIn = function (value) {
        utils_1.simulateKeyInput(this.nativeInput, value);
    };
    NumberInputDriver.prototype.blur = function () {
        test_drive_react_1.simulate.blur(this.nativeInput);
    };
    NumberInputDriver.ComponentClass = src_1.NumberInput;
    return NumberInputDriver;
}(test_drive_react_1.DriverBase));
exports.NumberInputDriver = NumberInputDriver;
//# sourceMappingURL=number-input-driver.js.map