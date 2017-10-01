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
var keycode = require("keycode");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var utils_1 = require("../../utils");
var popup_1 = require("../popup");
var calendar_1 = require("./calendar");
var date_picker_icons_1 = require("./date-picker-icons");
var date_picker_st_css_1 = require("./date-picker.st.css");
var invalidDate = 'Invalid Date';
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Called with possibly invalid string from the input
        _this.onUserInput = function (input) {
            if (_this.isDateValid(input)) {
                var updatedDate = input ? new Date(input) : new Date();
                _this.setState({ inputValue: updatedDate.toDateString() });
                _this.props.onChange({ value: updatedDate });
            }
            else {
                _this.setState({ inputValue: invalidDate });
            }
        };
        // Should only be called with valid date from the dropdown
        _this.onCalendarInput = function (input) {
            _this.setState({
                inputValue: input.toDateString(),
                isDropdownVisible: false,
                highlightSelectedDate: true,
                highlightFocusedDate: false,
                dropdownDate: input
            });
            _this.props.onChange({ value: input });
        };
        _this.updateDropdownDate = function (updatedDate) {
            _this.setState({
                highlightFocusedDate: false,
                dropdownDate: updatedDate
            });
        };
        _this.toggleDropdown = function () {
            if (!_this.props.disabled && !_this.props.readOnly) {
                _this.setState({ isDropdownVisible: !_this.state.isDropdownVisible });
            }
        };
        _this.onInputChange = function (event) {
            var eventTarget = event.target;
            _this.setState({ inputValue: eventTarget.value });
        };
        _this.onFocus = function () {
            if (_this.props.openOnFocus) {
                _this.setState({ isDropdownVisible: true });
            }
        };
        _this.onMouseDown = function () {
            _this.toggleDropdown();
        };
        _this.onBlur = function (event) {
            var eventTarget = event.target;
            _this.onUserInput(eventTarget.value);
            _this.setState({ isDropdownVisible: false });
        };
        _this.shiftDate = function (daysToShift) {
            var shiftedDate = new Date(_this.state.dropdownDate.getFullYear(), _this.state.dropdownDate.getMonth(), _this.state.dropdownDate.getDate());
            shiftedDate.setDate(_this.state.dropdownDate.getDate() + daysToShift);
            _this.setState({
                highlightFocusedDate: true,
                dropdownDate: shiftedDate
            });
        };
        _this.onKeyDown = function (event) {
            var eventTarget = event.target;
            var keyCode = event.keyCode;
            if (!_this.props.disabled && !_this.props.readOnly) {
                switch (keyCode) {
                    case keycode('enter'):
                        _this.state.highlightFocusedDate
                            ? _this.onCalendarInput(_this.state.dropdownDate)
                            : _this.onUserInput(eventTarget.value);
                        _this.toggleDropdown();
                        event.preventDefault();
                        break;
                    case keycode('space'):
                        _this.toggleDropdown();
                        event.preventDefault();
                        break;
                    case keycode('right'):
                        if (_this.state.isDropdownVisible) {
                            event.preventDefault();
                            _this.shiftDate(1);
                        }
                        break;
                    case keycode('left'):
                        if (_this.state.isDropdownVisible) {
                            event.preventDefault();
                            _this.shiftDate(-1);
                        }
                        break;
                    case keycode('up'):
                        if (_this.state.isDropdownVisible) {
                            event.preventDefault();
                            _this.shiftDate(-7);
                        }
                        break;
                    case keycode('down'):
                        if (_this.props.openOnFocus === false && !_this.state.isDropdownVisible) {
                            _this.toggleDropdown();
                        }
                        else if (!_this.state.isDropdownVisible) {
                            _this.toggleDropdown();
                        }
                        else {
                            _this.shiftDate(7);
                        }
                        event.preventDefault();
                        break;
                }
            }
        };
        _this.isDateValid = function (stringToValidate) {
            return new Date(stringToValidate).toDateString() !== invalidDate;
        };
        return _this;
    }
    DatePicker.prototype.componentWillMount = function () {
        this.setState({
            inputValue: this.props.value ? this.props.value.toDateString() : '',
            isDropdownVisible: this.props.showDropdownOnInit || false,
            dropdownDate: this.props.value || new Date()
        });
    };
    DatePicker.prototype.render = function () {
        var _this = this;
        var Icon = this.props.calendarIcon;
        return (React.createElement("div", { "data-automation-id": "DATE_PICKER_ROOT", ref: function (dropdownRef) { return _this.setState({ dropdownRef: dropdownRef }); } },
            React.createElement("input", { className: "input", onKeyDown: this.onKeyDown, onMouseDown: this.onMouseDown, onBlur: this.onBlur, onFocus: this.onFocus, onChange: this.onInputChange, value: this.state.inputValue, placeholder: this.props.placeholder, type: "text", "data-automation-id": "DATE_PICKER_INPUT" }),
            React.createElement("div", { className: "icon", "data-automation-id": "CALENDAR_ICON", onClick: this.toggleDropdown },
                React.createElement(Icon, null)),
            React.createElement(popup_1.Popup, { open: this.state.isDropdownVisible, anchor: this.state.dropdownRef },
                React.createElement(calendar_1.Calendar, { onChange: this.onCalendarInput, updateDropdownDate: this.updateDropdownDate, value: this.state.dropdownDate, selectedDate: this.props.value, startingDay: this.props.startingDay, highlightSelectedDate: this.state.highlightSelectedDate, highlightFocusedDate: this.state.highlightFocusedDate }))));
    };
    DatePicker.defaultProps = {
        openOnFocus: false,
        onChange: utils_1.noop,
        calendarIcon: date_picker_icons_1.CalendarIcon
    };
    DatePicker = __decorate([
        wix_react_tools_1.stylable(date_picker_st_css_1.default),
        wix_react_tools_1.properties
    ], DatePicker);
    return DatePicker;
}(React.PureComponent));
exports.DatePicker = DatePicker;
//# sourceMappingURL=date-picker.js.map