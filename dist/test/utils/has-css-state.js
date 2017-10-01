"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasCssState(elem, stylesheet, stateMap) {
    if (!elem) {
        throw new Error("hasCssState: Element does not exists\"");
    }
    var errors = [];
    for (var k in stateMap) {
        if (stateMap.hasOwnProperty(k)) {
            var mapping = stylesheet.$stylesheet.cssStates((_a = {}, _a[k] = true, _a));
            if (stateMap[k]) {
                for (var m in mapping) {
                    if (!elem.hasAttribute(m)) {
                        errors.push("expected element to have state \":" + k + "\" with mapping to \"" + m + "\" but got nothing.");
                    }
                }
            }
            else {
                for (var m in mapping) {
                    if (elem.hasAttribute(m)) {
                        errors.push("expected element to not have state \":" + k + "\" but found with mapping \"" + m + "\".");
                    }
                }
            }
        }
    }
    if (errors.length) {
        throw new Error('hasCssState:\n' + errors.join('\n'));
    }
    var _a;
}
exports.hasCssState = hasCssState;
//# sourceMappingURL=has-css-state.js.map