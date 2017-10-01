"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clamp(value, min, max) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}
exports.clamp = clamp;
//# sourceMappingURL=clamp.js.map