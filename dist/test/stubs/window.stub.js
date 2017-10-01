"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_drive_react_1 = require("test-drive-react");
function stubWindowMethod(sandbox, method, stub) {
    return sandbox.stub(window, method).callsFake(stub);
}
var WindowStub = /** @class */ (function () {
    function WindowStub() {
        var _this = this;
        this.sandbox = test_drive_react_1.sinon.sandbox.create();
        this.addEventListener = stubWindowMethod(this.sandbox, 'addEventListener', function (type, listener) {
            var events = _this.events;
            if (events.has(type)) {
                var listeners = events.get(type);
                listeners.push(listener);
            }
            else {
                var listeners = [listener];
                events.set(type, listeners);
            }
        });
        this.removeEventListener = stubWindowMethod(this.sandbox, 'removeEventListener', function (type, listener) {
            var events = _this.events;
            if (events.has(type)) {
                var listeners = events.get(type);
                if (listener) {
                    var index = listeners.indexOf(listener);
                    if (index >= 0) {
                        listeners.splice(index, 1);
                        if (listeners.length === 0) {
                            events.delete(type);
                        }
                    }
                }
                else {
                    events.delete(type);
                }
            }
        });
        this.events = new Map();
    }
    WindowStub.prototype.simulate = function (type, event) {
        var events = this.events;
        if (events.has(type)) {
            var listeners = events.get(type);
            listeners.forEach(function (listener) { return listener(event); });
        }
    };
    return WindowStub;
}());
exports.default = WindowStub;
//# sourceMappingURL=window.stub.js.map