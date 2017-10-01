"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../src/utils");
exports.skipDescribeIfTouch = utils_1.isTouch ? describe : describe.skip;
//# sourceMappingURL=skip-describe-if-touch.js.map