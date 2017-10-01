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
var mobx_react_1 = require("mobx-react");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var date_picker_st_css_1 = require("./date-picker.st.css");
var Day = /** @class */ (function (_super) {
    __extends(Day, _super);
    function Day() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMouseDown = function (event) {
            event.preventDefault();
            if (_this.props.onSelect) {
                _this.props.onSelect(_this.props.day);
            }
        };
        return _this;
    }
    Day.prototype.render = function () {
        var styleState = {
            focused: this.props.focused,
            selected: this.props.selected,
            current: this.props.currentDay,
            inactive: this.props.partOfNextMonth || this.props.partOfPrevMonth
        };
        return (React.createElement("span", { className: "calendarItem day", onMouseDown: this.onMouseDown, "style-state": styleState }, this.props.day));
    };
    Day = __decorate([
        mobx_react_1.observer,
        wix_react_tools_1.stylable(date_picker_st_css_1.default),
        wix_react_tools_1.properties
    ], Day);
    return Day;
}(React.Component));
exports.Day = Day;
//# sourceMappingURL=day.js.map