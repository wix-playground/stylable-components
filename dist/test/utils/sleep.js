"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(millis) {
    return new Promise(function (resolve) { return setTimeout(resolve, millis); });
}
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map