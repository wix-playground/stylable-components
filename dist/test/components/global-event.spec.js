"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var test_drive_react_1 = require("test-drive-react");
var global_event_1 = require("../../src/components/global-event");
var window_stub_1 = require("../stubs/window.stub");
describe('<GlobalEvent />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    var windowStub;
    beforeEach(function () { return windowStub = new window_stub_1.default(); });
    afterEach(function () { return windowStub.sandbox.restore(); });
    afterEach(function () { return clientRenderer.cleanup(); });
    describe('mount', function () {
        it('should add an event listener on window object when mounted', function () {
            var handler = function () { };
            clientRenderer.render(React.createElement(global_event_1.GlobalEvent, { click: handler }));
            test_drive_react_1.expect(windowStub.addEventListener).to.have.been.calledOnce;
        });
    });
    describe('unmount', function () {
        it('should remove an event listener on window object when unmounted', function () {
            var handler = function () { };
            clientRenderer.render(React.createElement(global_event_1.GlobalEvent, { click: handler }));
            clientRenderer.cleanup();
            test_drive_react_1.expect(windowStub.removeEventListener).to.have.been.calledOnce;
        });
    });
    describe('changing a listener', function () {
        var Fixture = /** @class */ (function (_super) {
            __extends(Fixture, _super);
            function Fixture(_a) {
                var listener = _a.listener;
                var _this = _super.call(this) || this;
                _this.state = { listener: listener };
                return _this;
            }
            Fixture.prototype.render = function () {
                var listener = this.state.listener;
                return React.createElement(global_event_1.GlobalEvent, { click: listener });
            };
            return Fixture;
        }(React.Component));
        it('should not call a handler after it was unset', function () {
            var originalListener = test_drive_react_1.sinon.spy();
            var fixture = clientRenderer.render(React.createElement(Fixture, { listener: originalListener })).result;
            fixture.setState({ listener: undefined });
            windowStub.simulate('click');
            test_drive_react_1.expect(originalListener).not.to.have.been.called;
        });
        it('should call new handler but not the old one', function () {
            var originalListener = test_drive_react_1.sinon.spy();
            var newListener = test_drive_react_1.sinon.spy();
            var fixture = clientRenderer.render(React.createElement(Fixture, { listener: originalListener })).result;
            fixture.setState({ listener: newListener });
            windowStub.simulate('click');
            test_drive_react_1.expect(originalListener).not.to.have.been.called;
            test_drive_react_1.expect(newListener).to.have.been.calledOnce;
        });
    });
    describe('listening to multiple events', function () {
        it('should call all appropriate handlers', function () {
            var onMouseDown = test_drive_react_1.sinon.spy();
            var onMouseMove = test_drive_react_1.sinon.spy();
            var onMouseUp = test_drive_react_1.sinon.spy();
            clientRenderer.render(React.createElement(global_event_1.GlobalEvent, { mousedown: onMouseDown, mousemove: onMouseMove, mouseup: onMouseUp }));
            windowStub.simulate('mousedown');
            windowStub.simulate('mousemove');
            windowStub.simulate('mouseup');
            test_drive_react_1.expect(onMouseDown).to.have.been.calledBefore(onMouseMove);
            test_drive_react_1.expect(onMouseMove).to.have.been.calledBefore(onMouseUp);
        });
    });
});
//# sourceMappingURL=global-event.spec.js.map