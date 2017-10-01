"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var test_drive_react_1 = require("test-drive-react");
var src_1 = require("../../src");
describe('<ScreenReaderNotification/>', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () { return clientRenderer.cleanup(); });
    describe('render component', function () {
        var root;
        beforeEach(function () {
            var renderer = clientRenderer.render(React.createElement(src_1.ScreenReaderNotification, null, "Alert text"));
            root = renderer.select('SCREEN_READER_NOTIFICATION');
        });
        it('should have "alert" role', function () {
            test_drive_react_1.expect(root).attr('role', 'alert');
        });
        it('should have text content', function () {
            test_drive_react_1.expect(root).text('Alert text');
        });
    });
});
//# sourceMappingURL=screen-reader-notification.spec.js.map