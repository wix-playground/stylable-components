"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var screen_reader_notification_st_css_1 = require("./screen-reader-notification.st.css");
exports.ScreenReaderNotification = wix_react_tools_1.stylable(screen_reader_notification_st_css_1.default)(function (_a) {
    var children = _a.children;
    return (React.createElement("p", { "data-automation-id": "SCREEN_READER_NOTIFICATION", role: "alert", children: children }));
});
//# sourceMappingURL=screen-reader-notification.js.map