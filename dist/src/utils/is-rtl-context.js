"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isRTLContext(context) {
    return Boolean(context && context.contextProvider) && context.contextProvider.dir === 'rtl';
}
exports.isRTLContext = isRTLContext;
//# sourceMappingURL=is-rtl-context.js.map