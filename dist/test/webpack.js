"use strict";
// https://webpack.js.org/guides/dependency-management/#require-context
// the following is used an an entry point for karma (that runs karma-webpack)
var contextModule = require.context('./', true, /.+\.spec\.ts[x]?$/);
contextModule.keys().forEach(contextModule);
//# sourceMappingURL=webpack.js.map