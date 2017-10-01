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
var utils_1 = require("../../src/utils");
var bodySelect = test_drive_react_1.selectDom(document.body);
var datePickerDropdown = 'DATE_PICKER_DROPDOWN';
var DatePickerTestDriver = /** @class */ (function (_super) {
    __extends(DatePickerTestDriver, _super);
    function DatePickerTestDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DatePickerTestDriver.prototype, "input", {
        get: function () {
            return this.select('DATE_PICKER_INPUT');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerTestDriver.prototype, "selectedDate", {
        get: function () {
            return this.select('DATE_PICKER_INPUT').value;
        },
        enumerable: true,
        configurable: true
    });
    DatePickerTestDriver.prototype.changeDate = function (value) {
        test_drive_react_1.trigger.change(this.input, value);
        test_drive_react_1.simulate.blur(this.input);
    };
    DatePickerTestDriver.prototype.focus = function () {
        test_drive_react_1.simulate.focus(this.input);
    };
    DatePickerTestDriver.prototype.clickOnDatePicker = function () {
        test_drive_react_1.simulate.mouseDown(this.input);
    };
    DatePickerTestDriver.prototype.clickOnDay = function (day) {
        test_drive_react_1.simulate.mouseDown(this.getDay(day));
    };
    DatePickerTestDriver.prototype.clickOnNextMonth = function () {
        test_drive_react_1.simulate.mouseDown(this.nextMonthLabel);
    };
    DatePickerTestDriver.prototype.clickOnPrevMonth = function () {
        test_drive_react_1.simulate.mouseDown(this.prevMonthLabel);
    };
    DatePickerTestDriver.prototype.openCalender = function () {
        test_drive_react_1.simulate.click(this.select('CALENDAR_ICON'));
    };
    DatePickerTestDriver.prototype.isOpen = function () {
        return !!this.dropDown;
    };
    DatePickerTestDriver.prototype.keyPress = function (keyCode) {
        test_drive_react_1.simulate.keyDown(this.input, { keyCode: keyCode });
    };
    Object.defineProperty(DatePickerTestDriver.prototype, "nextMonthLabel", {
        get: function () {
            return bodySelect('NEXT_MONTH_BUTTON');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerTestDriver.prototype, "prevMonthLabel", {
        get: function () {
            return bodySelect('PREV_MONTH_BUTTON');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerTestDriver.prototype, "dropDown", {
        get: function () {
            return bodySelect(datePickerDropdown);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerTestDriver.prototype.getDay = function (day) {
        return bodySelect(datePickerDropdown, "DAY_" + day);
    };
    DatePickerTestDriver.prototype.getPrevDay = function (day) {
        return bodySelect(datePickerDropdown, "PREV_DAY_" + day);
    };
    DatePickerTestDriver.prototype.getNextDay = function (day) {
        return bodySelect(datePickerDropdown, "NEXT_DAY_" + day);
    };
    DatePickerTestDriver.prototype.getDayName = function (dayName) {
        if (dayName < 0 || dayName > 6) {
            return null;
        }
        var dayNames = utils_1.getDayNames();
        return bodySelect(datePickerDropdown, "DAY_NAME_" + dayNames[dayName].toUpperCase());
    };
    Object.defineProperty(DatePickerTestDriver.prototype, "yearLabel", {
        get: function () {
            return bodySelect(datePickerDropdown, 'YEAR');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerTestDriver.prototype, "monthLabel", {
        get: function () {
            return bodySelect(datePickerDropdown, 'MONTH_NAME');
        },
        enumerable: true,
        configurable: true
    });
    DatePickerTestDriver.ComponentClass = src_1.DatePicker;
    return DatePickerTestDriver;
}(test_drive_react_1.DriverBase));
exports.DatePickerTestDriver = DatePickerTestDriver;
//# sourceMappingURL=date-picker-driver.js.map