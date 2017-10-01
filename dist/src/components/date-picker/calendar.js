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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var utils_1 = require("../../utils");
var date_picker_st_css_1 = require("./date-picker.st.css");
var day_1 = require("./day");
var monthNames = utils_1.getMonthNames();
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectDay = function (day) {
            var date = new Date(_this.props.value.getFullYear(), _this.props.value.getMonth(), day);
            _this.props.onChange(date);
        };
        _this.goToNextMonth = function (event) {
            event.preventDefault();
            var nextMonth = utils_1.getMonthFromOffset(new Date(_this.props.value.getFullYear(), _this.props.value.getMonth(), 1), 1);
            _this.props.updateDropdownDate(nextMonth);
        };
        _this.goToPrevMonth = function (event) {
            event.preventDefault();
            var previousMonth = utils_1.getMonthFromOffset(new Date(_this.props.value.getFullYear(), _this.props.value.getMonth(), 1), -1);
            _this.props.updateDropdownDate(previousMonth);
        };
        return _this;
    }
    Calendar.prototype.render = function () {
        return (React.createElement("div", { "data-automation-id": "DATE_PICKER_CALENDAR" },
            React.createElement("div", { className: "dropdownArrowWrapper" },
                React.createElement("div", { className: "dropdownArrow" })),
            React.createElement("div", { className: "dropdown", "data-automation-id": "DATE_PICKER_DROPDOWN" },
                React.createElement("div", { className: "header" },
                    React.createElement("span", { className: "arrowWrapper arrowWrapperPrev", onMouseDown: this.goToPrevMonth, "data-automation-id": "PREV_MONTH_BUTTON" },
                        React.createElement("i", { className: "headerArrow headerArrowPrev" })),
                    React.createElement("span", { className: "headerDate" },
                        React.createElement("span", { "data-automation-id": "MONTH_NAME" }, this.monthName),
                        "\u00A0",
                        React.createElement("span", { "data-automation-id": "YEAR" }, this.year)),
                    React.createElement("span", { className: "arrowWrapper arrowWrapperNext", onMouseDown: this.goToNextMonth, "data-automation-id": "NEXT_MONTH_BUTTON" },
                        React.createElement("i", { className: "headerArrow headerArrowNext" }))),
                React.createElement("div", { className: "calendar", "data-automation-id": "DAY_GRID" },
                    this.dayNames,
                    this.previousDays,
                    this.days,
                    this.followingDays))));
    };
    Object.defineProperty(Calendar.prototype, "monthName", {
        get: function () {
            return monthNames[this.props.value.getMonth()];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "year", {
        get: function () {
            return this.props.value.getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "days", {
        get: function () {
            var dayArray = [];
            var daysInMonth = utils_1.getDaysInMonth(this.props.value);
            for (var day = 1; day <= daysInMonth; day++) {
                dayArray.push(React.createElement(day_1.Day, { day: day, focused: this.isFocused(day), selected: this.isSelected(day), currentDay: this.isCurrentDay(day), onSelect: this.selectDay, "data-automation-id": 'DAY_' + day, key: 'DAY_' + day }));
            }
            return dayArray;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "dayNames", {
        get: function () {
            return utils_1.getDayNames(this.props.startingDay).map(function (name, index) {
                return (React.createElement("span", { className: "calendarItem dayName", key: 'DAY_NAME_' + index, "data-automation-id": 'DAY_NAME_' + name.toUpperCase() }, name));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "previousDays", {
        get: function () {
            var previousDays = [];
            var lastDayOfPrevMonth = utils_1.getDaysInMonth(utils_1.getMonthFromOffset(this.props.value, -1));
            var numberOfDaysToDisplay = lastDayOfPrevMonth -
                utils_1.getNumOfPreviousDays(this.props.value, this.props.startingDay);
            for (var day = numberOfDaysToDisplay + 1; day <= lastDayOfPrevMonth; day++) {
                previousDays.push((React.createElement(day_1.Day, { day: day, "data-automation-id": 'PREV_DAY_' + day, key: 'PREV_DAY_' + day, partOfPrevMonth: true })));
            }
            return previousDays;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "followingDays", {
        get: function () {
            var followingDays = [];
            var numberOfDaysToDisplay = utils_1.getNumOfFollowingDays(this.props.value, this.props.startingDay);
            for (var i = 1; i <= numberOfDaysToDisplay; i++) {
                followingDays.push(React.createElement(day_1.Day, { day: i, "data-automation-id": 'NEXT_DAY_' + i, key: 'NEXT_DAY_' + i, partOfNextMonth: true }));
            }
            return followingDays;
        },
        enumerable: true,
        configurable: true
    });
    Calendar.prototype.isCurrentDay = function (day) {
        var currentDate = new Date();
        return (this.props.value.getFullYear() === currentDate.getFullYear()
            && this.props.value.getMonth() === currentDate.getMonth()
            && currentDate.getDate() === day);
    };
    Calendar.prototype.isSelected = function (day) {
        // Don't highlight the current day as selected
        if (this.props.highlightSelectedDate && this.props.selectedDate) {
            return (this.props.value.getFullYear() === this.props.selectedDate.getFullYear()
                && this.props.value.getMonth() === this.props.selectedDate.getMonth()
                && this.props.selectedDate.getDate() === day);
        }
        else {
            return false;
        }
    };
    Calendar.prototype.isFocused = function (day) {
        if (this.props.highlightFocusedDate) {
            return (this.props.value.getDate() === day);
        }
        else {
            return false;
        }
    };
    __decorate([
        mobx_1.computed
    ], Calendar.prototype, "monthName", null);
    __decorate([
        mobx_1.computed
    ], Calendar.prototype, "year", null);
    __decorate([
        mobx_1.computed
    ], Calendar.prototype, "days", null);
    __decorate([
        mobx_1.computed
    ], Calendar.prototype, "dayNames", null);
    __decorate([
        mobx_1.computed
    ], Calendar.prototype, "previousDays", null);
    __decorate([
        mobx_1.computed
    ], Calendar.prototype, "followingDays", null);
    Calendar = __decorate([
        wix_react_tools_1.stylable(date_picker_st_css_1.default),
        mobx_react_1.observer
    ], Calendar);
    return Calendar;
}(React.Component));
exports.Calendar = Calendar;
//# sourceMappingURL=calendar.js.map