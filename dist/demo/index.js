"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var components_demo_1 = require("./components-demo");
var meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1';
document.head.appendChild(meta);
var rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);
ReactDOM.render(React.createElement(components_demo_1.ComponentsDemo, null), rootContainer);
//# sourceMappingURL=index.js.map