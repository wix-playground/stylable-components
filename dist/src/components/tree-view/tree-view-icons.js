"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.PlusIcon = function (props) {
    return (React.createElement("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
        React.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "16" }),
        React.createElement("line", { x1: "8", y1: "12", x2: "16", y2: "12" })));
};
exports.MinusIcon = function (props) {
    return (React.createElement("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, props),
        React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", ry: "2" }),
        React.createElement("line", { x1: "8", y1: "12", x2: "16", y2: "12" })));
};
//# sourceMappingURL=tree-view-icons.js.map