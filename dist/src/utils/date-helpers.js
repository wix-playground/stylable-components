"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
];
function getDayNames(startingDay) {
    if (startingDay === void 0) { startingDay = 0; }
    var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Days start from Sunday (Sunday = 0, Monday = 1, etc.)
    for (var i = startingDay; i > 0; i--) {
        dayNames.push(dayNames.shift());
    }
    return dayNames;
}
exports.getDayNames = getDayNames;
function getMonthNames() {
    return monthNames;
}
exports.getMonthNames = getMonthNames;
function getMonthFromOffset(date, offset) {
    return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}
exports.getMonthFromOffset = getMonthFromOffset;
function getDaysInMonth(date) {
    // Important: the '0' in the day category "rolls back" the daysArray to the start of the previous month
    // so we add a month to the daysArray in order to get the number of days for the intended month
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
exports.getDaysInMonth = getDaysInMonth;
function getLastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
}
exports.getLastDayOfMonth = getLastDayOfMonth;
function getNumOfPreviousDays(date, startingDay) {
    if (startingDay === void 0) { startingDay = 0; }
    // Days start from Sunday (Sunday = 0, Monday = 1, etc.)
    var previousDays = (new Date(date.getFullYear(), date.getMonth(), 1).getDay() - startingDay) + 7;
    return previousDays > 6 ? previousDays - 7 : previousDays;
}
exports.getNumOfPreviousDays = getNumOfPreviousDays;
function getNumOfFollowingDays(date, startingDay) {
    if (startingDay === void 0) { startingDay = 0; }
    var followingDays = (6 - getLastDayOfMonth(date)) + startingDay;
    return followingDays > 6 ? followingDays - 7 : followingDays;
}
exports.getNumOfFollowingDays = getNumOfFollowingDays;
//# sourceMappingURL=date-helpers.js.map