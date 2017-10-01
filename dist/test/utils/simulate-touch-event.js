"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var noop_1 = require("../../src/utils/noop");
function simulateTouchEvent(element, eventType, options) {
    var touchObj = {
        target: element,
        clientX: options.clientX,
        clientY: options.clientY
    };
    var touchEventInit = {
        touches: [touchObj],
        targetTouches: [touchObj],
        changedTouches: [touchObj],
        preventDefault: noop_1.noop
    };
    element.simulate(eventType, touchEventInit);
}
exports.simulateTouchEvent = simulateTouchEvent;
//# sourceMappingURL=simulate-touch-event.js.map