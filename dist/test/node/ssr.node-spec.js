"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var server_1 = require("react-dom/server");
var test_drive_react_1 = require("test-drive-react");
var WixReactComponents = require("../../src");
var is_react_component_1 = require("../utils/is-react-component");
describe('SSR compatibility', function () {
    var libExportNames = Object.keys(WixReactComponents);
    libExportNames.forEach(function (exportName) {
        var ExportValue = WixReactComponents[exportName];
        if (is_react_component_1.isReactComponent(ExportValue)) {
            it("<" + exportName + " /> renders on Node.js using React's server side rendering", function () {
                test_drive_react_1.expect(function () { return server_1.renderToString(React.createElement(ExportValue, null)); }).to.not.throw();
            });
        }
    });
});
//# sourceMappingURL=ssr.node-spec.js.map