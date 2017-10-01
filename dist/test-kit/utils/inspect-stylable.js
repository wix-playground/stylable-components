"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function elementHasStylableState(element, stylesheet, stateName) {
    var stateMap = stylesheet.$stylesheet.cssStates((_a = {}, _a[stateName] = true, _a));
    var attributeName = Object.keys(stateMap)[0];
    return element.hasAttribute(attributeName);
    var _a;
}
exports.elementHasStylableState = elementHasStylableState;
function elementHasStylableClassName(element, stylesheet, className) {
    var mangledClassName = stylesheet.$stylesheet.get(className);
    return element.classList.contains(mangledClassName);
}
exports.elementHasStylableClassName = elementHasStylableClassName;
//# sourceMappingURL=inspect-stylable.js.map