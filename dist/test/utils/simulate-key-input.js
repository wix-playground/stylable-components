"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_drive_react_1 = require("test-drive-react");
function simulateKeyInput(input, value) {
    input.value += value;
    test_drive_react_1.simulate.change(input);
}
exports.simulateKeyInput = simulateKeyInput;
//# sourceMappingURL=simulate-key-input.js.map