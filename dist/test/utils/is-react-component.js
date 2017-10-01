"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function isReactComponent(value) {
    return value && value.prototype && value.prototype instanceof React.Component;
}
exports.isReactComponent = isReactComponent;
//# sourceMappingURL=is-react-component.js.map