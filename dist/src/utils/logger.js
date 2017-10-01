"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wix_react_tools_1 = require("wix-react-tools");
var createLogFunction = function (method) { return function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!wix_react_tools_1.getGlobalConfig().devMode) {
        return;
    }
    var formated = args.reduce(function (str, item) { return str.replace(/%s/, item); }, message);
    console[method](new Error(formated));
}; };
var once = function (fn, set) { return function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!set.has(message)) {
        set.add(message);
        fn.apply(void 0, [message].concat(args));
    }
}; };
exports.createLogger = function () {
    var set = new Set();
    var result = {};
    return ['warn', 'error'].reduce(function (obj, method) {
        var fn = createLogFunction(method);
        obj[method] = fn;
        obj[method + "Once"] = once(fn, set);
        return obj;
    }, result);
};
exports.warn = (_a = exports.createLogger(), _a.warn), exports.error = _a.error, exports.warnOnce = _a.warnOnce, exports.errorOnce = _a.errorOnce;
var _a;
//# sourceMappingURL=logger.js.map