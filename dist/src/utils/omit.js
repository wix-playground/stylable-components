"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function omit(obj) {
    var skip = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        skip[_i - 1] = arguments[_i];
    }
    return Object.keys(obj).reduce(function (acc, key) {
        if (skip.indexOf(key) === -1) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}
exports.omit = omit;
//# sourceMappingURL=omit.js.map