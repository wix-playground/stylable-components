"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var Ampm;
(function (Ampm) {
    Ampm[Ampm["AM"] = 0] = "AM";
    Ampm[Ampm["PM"] = 1] = "PM";
    Ampm[Ampm["NONE"] = 2] = "NONE";
})(Ampm = exports.Ampm || (exports.Ampm = {}));
exports.isTouchTimeInputSupported = (function () {
    if (!utils_1.isTouch) {
        return false;
    }
    var input = document.createElement('input');
    input.type = 'time';
    return input.type === 'time';
})();
exports.is12TimeFormat = /AM|PM/.test(new Date().toLocaleTimeString());
exports.ampmLabels = (_a = {},
    _a[Ampm.AM] = 'AM',
    _a[Ampm.PM] = 'PM',
    _a[Ampm.NONE] = '',
    _a);
function formatTimeChunk(num) {
    return ('00' + num).slice(-2);
}
exports.formatTimeChunk = formatTimeChunk;
function isTimeSegment(arg) {
    return arg === 'hh' || arg === 'mm';
}
exports.isTimeSegment = isTimeSegment;
function to24(hh, ampm) {
    switch (ampm) {
        case Ampm.NONE:
            return hh;
        case Ampm.AM:
            return hh === 12 ? 0 : hh;
        case Ampm.PM:
            return hh === 12 ? hh : (hh + 12);
    }
}
exports.to24 = to24;
function toAmpm(hh) {
    var ampm;
    if (hh < 12) {
        hh = hh === 0 ? 12 : hh;
        ampm = Ampm.AM;
    }
    else {
        hh = hh === 12 ? hh : (hh % 12);
        ampm = Ampm.PM;
    }
    return { hh: hh, ampm: ampm };
}
exports.toAmpm = toAmpm;
function isValidValue(num, part, ampm) {
    if (part === 'mm') {
        return num >= 0 && num <= 59;
    }
    switch (ampm) {
        case Ampm.NONE:
            return num >= 0 && num <= 23;
        case Ampm.AM:
        case Ampm.PM:
            return num >= 1 && num <= 12;
    }
}
exports.isValidValue = isValidValue;
var _a;
//# sourceMappingURL=utils.js.map