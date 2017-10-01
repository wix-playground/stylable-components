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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var keycode = require("keycode");
var React = require("react");
var test_drive_react_1 = require("test-drive-react");
var date_picker_demo_1 = require("../../demo/components/date-picker-demo");
var src_1 = require("../../src");
var utils_1 = require("../../src/utils");
var test_kit_1 = require("../../test-kit");
var utils_2 = require("../utils");
var DatePickerDemoDriver = /** @class */ (function (_super) {
    __extends(DatePickerDemoDriver, _super);
    function DatePickerDemoDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.datePicker = new test_kit_1.DatePickerTestDriver(function () { return _this.select('DATE_PICKER_DEMO', 'DATE_PICKER'); });
        return _this;
    }
    Object.defineProperty(DatePickerDemoDriver.prototype, "date", {
        get: function () {
            return this.select('DATE_PICKER_DEMO', 'CURRENT_DATE');
        },
        enumerable: true,
        configurable: true
    });
    DatePickerDemoDriver.ComponentClass = date_picker_demo_1.DatePickerDemo;
    return DatePickerDemoDriver;
}(test_drive_react_1.DriverBase));
describe('The DatePicker Component', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () { return clientRenderer.cleanup(); });
    var JANUARY_FIRST = new Date(2017, 0, 1);
    var FEBRUARY_FIRST = new Date(2017, 1, 1);
    var MARCH_FIRST = new Date(2017, 2, 1);
    var DECEMBER_FIRST = new Date(2017, 11, 1);
    describe('A Typical User', function () {
        it('writes into the date picker input field, presses enter, ' +
            'and expects the date picker input to have the proper value', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePickerDemo, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(date_picker_demo_1.DatePickerDemo, null))
                            .withDriver(DatePickerDemoDriver), datePickerDemo = _a.driver, waitForDom = _a.waitForDom;
                        datePickerDemo.datePicker.changeDate('2017/02/01');
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePickerDemo.date).to.have.text('Wed Feb 01 2017'); })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('clicks on the icon, picks a date from the dropdown, ' +
            'and then expects the dropdown to close and the date to have been selected', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePickerDemo, waitForDom, datePicker;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(date_picker_demo_1.DatePickerDemo, { value: JANUARY_FIRST })).withDriver(DatePickerDemoDriver), datePickerDemo = _a.driver, waitForDom = _a.waitForDom;
                        datePicker = datePickerDemo.datePicker;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.absent(); })];
                    case 1:
                        _b.sent();
                        // simulate.click(select('CALENDAR_ICON'));
                        datePicker.openCalender();
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.present(); })];
                    case 2:
                        _b.sent();
                        datePicker.clickOnDay(4);
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(datePicker.dropDown).to.be.absent();
                                test_drive_react_1.expect(datePickerDemo.date).to.have.text('Wed Jan 04 2017');
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should only call onChange once', function () { return __awaiter(_this, void 0, void 0, function () {
        var onChange, _a, datePicker, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onChange = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.DatePicker, { onChange: onChange }))
                        .withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                    datePicker.changeDate('2017/02/01');
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(onChange).to.have.been.calledOnce; })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should use a provided value', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, datePicker, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.DatePicker, { value: JANUARY_FIRST }))
                        .withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.selectedDate).to.equal(JANUARY_FIRST.toDateString()); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not call onChange with an invalid date', function () { return __awaiter(_this, void 0, void 0, function () {
        var onChange, datePicker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onChange = test_drive_react_1.sinon.spy();
                    datePicker = clientRenderer.render(React.createElement(src_1.DatePicker, { onChange: onChange }))
                        .withDriver(test_kit_1.DatePickerTestDriver).driver;
                    datePicker.changeDate('2sgsdfsdfw223');
                    return [4 /*yield*/, utils_2.sleep(20)];
                case 1:
                    _a.sent();
                    test_drive_react_1.expect(onChange).to.have.not.been.called;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call onChange with the current input value when blurred', function () { return __awaiter(_this, void 0, void 0, function () {
        var onChange, _a, datePicker, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onChange = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.DatePicker, { value: JANUARY_FIRST, onChange: onChange })).withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                    datePicker.changeDate('2017/02/01');
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(onChange).to.have.been.calledWithMatch({ value: FEBRUARY_FIRST }); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should use a provided placeholder', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, datePicker, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.DatePicker, { placeholder: "mm/dd/yyyy" }))
                        .withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.input).to.have.attribute('placeholder', 'mm/dd/yyyy'); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should show and hide the dropdown when the input is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, datePicker, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.DatePicker, null))
                        .withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.isOpen()).to.be.false; })];
                case 1:
                    _b.sent();
                    datePicker.clickOnDatePicker();
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.isOpen()).to.be.true; })];
                case 2:
                    _b.sent();
                    datePicker.clickOnDatePicker();
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.isOpen()).to.be.false; })];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should show and hide the dropdown when focused and openOnFocus is true', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, datePicker, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.DatePicker, { openOnFocus: true }))
                        .withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.absent(); })];
                case 1:
                    _b.sent();
                    datePicker.focus();
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.present(); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('can be changed with the arrow keys', function () { return __awaiter(_this, void 0, void 0, function () {
        function simulateKeyPress(keyToPress) {
            datePicker.openCalender();
            datePicker.keyPress(keycode(keyToPress));
            datePicker.keyPress(keycode('enter'));
        }
        var _a, datePicker, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.DatePicker, { value: JANUARY_FIRST, openOnFocus: true }))
                        .withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                    // Advance one week
                    simulateKeyPress('down');
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.selectedDate).to.equal('Sun Jan 08 2017'); })];
                case 1:
                    _b.sent();
                    // Go back one week
                    simulateKeyPress('up');
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.selectedDate).to.equal('Sun Jan 01 2017'); })];
                case 2:
                    _b.sent();
                    // Go forward one day
                    simulateKeyPress('right');
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.selectedDate).to.equal('Mon Jan 02 2017'); })];
                case 3:
                    _b.sent();
                    // Go back one day
                    simulateKeyPress('left');
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.selectedDate).to.equal('Sun Jan 01 2017'); })];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('The Dropdown', function () {
        var dayNames = utils_1.getDayNames();
        var days = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19',
            '20', '21', '22', '23', '24', '25', '26', '27', '28'
        ];
        it('should display the days for a fixed month', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { showDropdownOnInit: true, value: FEBRUARY_FIRST })).withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                dayNames.forEach(function (dayName, index) { return test_drive_react_1.expect(datePicker.getDayName(index)).to.have.text(dayName); });
                                days.forEach(function (day) { return test_drive_react_1.expect(datePicker.getDay(day)).to.have.text(day); });
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show the next and previous month buttons horizontally aligned with the month and year', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { showDropdownOnInit: true, value: JANUARY_FIRST })).withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                var headerContents = [
                                    datePicker.prevMonthLabel,
                                    datePicker.monthLabel,
                                    datePicker.yearLabel,
                                    datePicker.nextMonthLabel
                                ];
                                test_drive_react_1.expect(headerContents).to.be.verticallyAligned('center', 1);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should display the day names in horizontal sequence, and vertically aligned', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { showDropdownOnInit: true, value: JANUARY_FIRST })).withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                var dayNameElements = dayNames.map(function (name, index) {
                                    return datePicker.getDayName(index);
                                });
                                test_drive_react_1.expect(dayNameElements).to.be.inHorizontalSequence();
                                test_drive_react_1.expect(dayNameElements).to.be.verticallyAligned('center', 1.5);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should display the days in a grid', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { value: JANUARY_FIRST, showDropdownOnInit: true })).withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                var firstRow = [];
                                var firstColumn = [];
                                for (var i = 1; i < 7; i++) {
                                    firstRow.push(datePicker.getDay(i));
                                }
                                for (var i = 1; i <= 5; i++) {
                                    firstColumn.push(datePicker.getDay((7 * (i - 1)) + 1));
                                }
                                // Check that the days are displayed in rows (checking that each row is in horizontal sequence
                                test_drive_react_1.expect(firstRow).to.be.inHorizontalSequence();
                                test_drive_react_1.expect(firstRow).to.be.verticallyAligned('center');
                                // Check that the days are displayed in columns
                                test_drive_react_1.expect(firstColumn).to.be.inVerticalSequence();
                                test_drive_react_1.expect(firstColumn).to.be.horizontallyAligned('center');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show the days starting on the correct day of the week', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { value: MARCH_FIRST, showDropdownOnInit: true })).withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect([
                                datePicker.getDay(1),
                                datePicker.getDayName(3)
                            ]).to.be.horizontallyAligned('center'); })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show the trailing days from the last and next months', function () {
            var datePicker = clientRenderer.render(React.createElement(src_1.DatePicker, { value: MARCH_FIRST, showDropdownOnInit: true }))
                .withDriver(test_kit_1.DatePickerTestDriver).driver;
            test_drive_react_1.expect(datePicker.getPrevDay(26)).to.be.present();
            test_drive_react_1.expect(datePicker.getPrevDay(27)).to.be.present();
            test_drive_react_1.expect(datePicker.getPrevDay(28)).to.be.present();
            test_drive_react_1.expect(datePicker.getNextDay(1)).to.be.present();
        });
        it('displays the year', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { showDropdownOnInit: true, value: JANUARY_FIRST })).withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.yearLabel).to.have.text('2017'); })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('displays the name of the month', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { showDropdownOnInit: true, value: JANUARY_FIRST })).withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.monthLabel).to.have.text('January'); })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('has a button which steps forward a month', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { showDropdownOnInit: true, value: DECEMBER_FIRST })).withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        test_drive_react_1.expect(datePicker.yearLabel).to.have.text('2017');
                        test_drive_react_1.expect(datePicker.monthLabel).to.have.text('December');
                        datePicker.clickOnNextMonth();
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(datePicker.yearLabel).to.have.text('2018');
                                test_drive_react_1.expect(datePicker.monthLabel).to.have.text('January');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('has a button which steps back a month', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { showDropdownOnInit: true, value: JANUARY_FIRST })).withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        test_drive_react_1.expect(datePicker.yearLabel).to.have.text('2017');
                        test_drive_react_1.expect(datePicker.monthLabel).to.have.text('January');
                        datePicker.clickOnPrevMonth();
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(datePicker.yearLabel).to.have.text('2016');
                                test_drive_react_1.expect(datePicker.monthLabel).to.have.text('December');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should stay open when the next or previous month buttons are clicked', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { showDropdownOnInit: true }))
                            .withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.present(); })];
                    case 1:
                        _b.sent();
                        datePicker.clickOnPrevMonth();
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.present(); })];
                    case 2:
                        _b.sent();
                        datePicker.clickOnNextMonth();
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.present(); })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should appear when the Enter key is pressed and the openOnFocus property is set to false', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { openOnFocus: false }))
                            .withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.absent(); })];
                    case 1:
                        _b.sent();
                        datePicker.keyPress(keycode('enter'));
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.present(); })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should appear when the Spacebar is pressed and the openOnFocus property is set to false', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, datePicker, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DatePicker, { openOnFocus: false }))
                            .withDriver(test_kit_1.DatePickerTestDriver), datePicker = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.absent(); })];
                    case 1:
                        _b.sent();
                        datePicker.keyPress(keycode('space'));
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(datePicker.dropDown).to.be.present(); })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('The Helper Functions', function () {
        it('getMonthFromOffset should return the next month when the second argument is 1', function () {
            var date = new Date('Mar 6 2017');
            var nextMonth = utils_1.getMonthFromOffset(date, 1);
            test_drive_react_1.expect(nextMonth.getMonth()).to.equal(date.getMonth() + 1);
        });
        it('getMonthFromOffset should return the previous month when the second argument is -1', function () {
            var date = new Date('Mar 6 2017');
            var nextMonth = utils_1.getMonthFromOffset(date, -1);
            test_drive_react_1.expect(nextMonth.getMonth()).to.equal(date.getMonth() - 1);
        });
        it('getMonthFromOffset should handle the year changing when moving forward a month', function () {
            var date = new Date('Dec 6 2016');
            var nextMonth = utils_1.getMonthFromOffset(date, 1);
            test_drive_react_1.expect(nextMonth.getFullYear()).to.equal(date.getFullYear() + 1);
            test_drive_react_1.expect(nextMonth.getMonth()).to.equal(0);
        });
        it('getMonthFromOffset should handle the year changing when moving back a month', function () {
            var date = new Date('Jan 6 2018');
            var nextMonth = utils_1.getMonthFromOffset(date, -1);
            test_drive_react_1.expect(nextMonth.getFullYear()).to.equal(date.getFullYear() - 1);
            test_drive_react_1.expect(nextMonth.getMonth()).to.equal(11);
        });
        it('getDaysInMonth should return the number of days in a given month', function () {
            test_drive_react_1.expect(utils_1.getDaysInMonth(new Date('Feb 18 2017'))).to.equal(28);
            test_drive_react_1.expect(utils_1.getDaysInMonth(new Date('Jun 5 2016'))).to.equal(30);
            test_drive_react_1.expect(utils_1.getDaysInMonth(new Date('Jan 28, 2017'))).to.equal(31);
        });
        it('getNumOfPreviousDays should return the number of days to display for the previous month', function () {
            // Sunday is the default starting day
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(new Date('Feb 18 2017'))).to.equal(3);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(new Date('Jun 5 2017'))).to.equal(4);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(new Date('July 5 2017'))).to.equal(6);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(new Date('September 5 2019'))).to.equal(0);
        });
        it('getNumOfPreviousDays should handle starting on different days of the week', function () {
            var dateToTest = new Date('July 5 2017');
            var secondDateToTest = new Date('September 5 2017');
            var thirdDateToTest = new Date('October 5 2017');
            var fourthDateToTest = new Date('August 5 2019');
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(dateToTest, 1), 'Wrong number of days for Monday').to.equal(5);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(dateToTest, 2), 'Wrong number of days for Tuesday').to.equal(4);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(dateToTest, 3), 'Wrong number of days for Wednesday').to.equal(3);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(dateToTest, 4), 'Wrong number of days for Thursday').to.equal(2);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(dateToTest, 5), 'Wrong number of days for Friday').to.equal(1);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(dateToTest, 6), 'Wrong number of days for Saturday').to.equal(0);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(secondDateToTest, 1), 'Wrong number of days for Monday').to.equal(4);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(secondDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(3);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(secondDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(2);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(secondDateToTest, 4), 'Wrong number of days for Thursday').to.equal(1);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(secondDateToTest, 5), 'Wrong number of days for Friday').to.equal(0);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(secondDateToTest, 6), 'Wrong number of days for Saturday').to.equal(6);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(thirdDateToTest, 1), 'Wrong number of days for Monday').to.equal(6);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(thirdDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(5);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(thirdDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(4);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(thirdDateToTest, 4), 'Wrong number of days for Thursday').to.equal(3);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(thirdDateToTest, 5), 'Wrong number of days for Friday').to.equal(2);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(thirdDateToTest, 6), 'Wrong number of days for Saturday').to.equal(1);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(fourthDateToTest, 1), 'Wrong number of days for Monday').to.equal(3);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(fourthDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(2);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(fourthDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(1);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(fourthDateToTest, 4), 'Wrong number of days for Thursday').to.equal(0);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(fourthDateToTest, 5), 'Wrong number of days for Friday').to.equal(6);
            test_drive_react_1.expect(utils_1.getNumOfPreviousDays(fourthDateToTest, 6), 'Wrong number of days for Saturday').to.equal(5);
        });
        it('getNumOfFollowingDays should return the number of days to display for the next month', function () {
            // Sunday is the default starting day
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(new Date('Feb 18 2017'))).to.equal(4);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(new Date('Jun 5 2017'))).to.equal(1);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(new Date('July 5 2017'))).to.equal(5);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(new Date('September 5 2019'))).to.equal(5);
        });
        it('getNumOfFollowingDays should handle starting on different days of the week', function () {
            var dateToTest = new Date('July 5 2017');
            var secondDateToTest = new Date('September 5 2017');
            var thirdDateToTest = new Date('October 5 2017');
            var fourthDateToTest = new Date('August 5 2019');
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(dateToTest, 1), 'Wrong number of days for Monday').to.equal(6);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(dateToTest, 2), 'Wrong number of days for Tuesday').to.equal(0);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(dateToTest, 3), 'Wrong number of days for Wednesday').to.equal(1);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(dateToTest, 4), 'Wrong number of days for Thursday').to.equal(2);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(dateToTest, 5), 'Wrong number of days for Friday').to.equal(3);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(dateToTest, 6), 'Wrong number of days for Saturday').to.equal(4);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(secondDateToTest, 1), 'Wrong number of days for Monday').to.equal(1);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(secondDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(2);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(secondDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(3);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(secondDateToTest, 4), 'Wrong number of days for Thursday').to.equal(4);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(secondDateToTest, 5), 'Wrong number of days for Friday').to.equal(5);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(secondDateToTest, 6), 'Wrong number of days for Saturday').to.equal(6);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(thirdDateToTest, 1), 'Wrong number of days for Monday').to.equal(5);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(thirdDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(6);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(thirdDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(0);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(thirdDateToTest, 4), 'Wrong number of days for Thursday').to.equal(1);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(thirdDateToTest, 5), 'Wrong number of days for Friday').to.equal(2);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(thirdDateToTest, 6), 'Wrong number of days for Saturday').to.equal(3);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(fourthDateToTest, 1), 'Wrong number of days for Monday').to.equal(1);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(fourthDateToTest, 2), 'Wrong number of days for Tuesday').to.equal(2);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(fourthDateToTest, 3), 'Wrong number of days for Wednesday').to.equal(3);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(fourthDateToTest, 4), 'Wrong number of days for Thursday').to.equal(4);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(fourthDateToTest, 5), 'Wrong number of days for Friday').to.equal(5);
            test_drive_react_1.expect(utils_1.getNumOfFollowingDays(fourthDateToTest, 6), 'Wrong number of days for Saturday').to.equal(6);
        });
    });
});
//# sourceMappingURL=date-picker.spec.js.map