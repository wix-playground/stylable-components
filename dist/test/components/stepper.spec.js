"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var test_drive_react_1 = require("test-drive-react");
var stepper_1 = require("../../src/components/stepper");
var window_stub_1 = require("../stubs/window.stub");
describe('<Stepper />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    var windowStub;
    var onUp;
    var onDown;
    beforeEach(function () {
        onUp = test_drive_react_1.sinon.spy();
        onDown = test_drive_react_1.sinon.spy();
        windowStub = new window_stub_1.default();
    });
    afterEach(function () { return windowStub.sandbox.restore(); });
    afterEach(function () { return clientRenderer.cleanup(); });
    it('onUp and onDown should pass modifiers if any', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, select, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(stepper_1.Stepper, { onUp: onUp, onDown: onDown })), select = _a.select, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            var up = select('STEPPER_INCREMENT');
                            var down = select('STEPPER_DECREMENT');
                            test_drive_react_1.simulate.click(up, { shiftKey: true });
                            test_drive_react_1.simulate.click(down, { altKey: true, ctrlKey: true });
                            test_drive_react_1.expect(onUp).to.have.been.calledWithMatch({ shiftKey: true });
                            test_drive_react_1.expect(onDown).to.have.been.calledWithMatch({ altKey: true, ctrlKey: true });
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('draggable', function () {
        describe('drag up', function () {
            it('should call onUp', function () { return __awaiter(_this, void 0, void 0, function () {
                var dragStep, dragStartPoint, _a, waitForDom, select;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            dragStep = 20;
                            dragStartPoint = {
                                clientX: 100,
                                clientY: 100
                            };
                            _a = clientRenderer.render(React.createElement(stepper_1.Stepper, { "data-automation-id": "STEPPER", onUp: onUp, onDown: onDown, dragStep: dragStep })), waitForDom = _a.waitForDom, select = _a.select;
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.simulate.mouseDown(select('STEPPER'), dragStartPoint);
                                    windowStub.simulate('mousemove', {
                                        clientX: dragStartPoint.clientX,
                                        clientY: dragStartPoint.clientY - dragStep,
                                        shiftKey: true
                                    });
                                    test_drive_react_1.expect(onUp).to.have.been.calledOnce;
                                    test_drive_react_1.expect(onUp).to.have.been.calledWithMatch({ shiftKey: true });
                                    test_drive_react_1.expect(onDown).not.to.have.been.called;
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not call onUp when disableUp is true', function () { return __awaiter(_this, void 0, void 0, function () {
                var dragStep, dragStartPoint, _a, waitForDom, select;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            dragStep = 20;
                            dragStartPoint = {
                                clientX: 100,
                                clientY: 100
                            };
                            _a = clientRenderer.render(React.createElement(stepper_1.Stepper, { "data-automation-id": "STEPPER", onUp: onUp, onDown: onDown, dragStep: dragStep, disableUp: true })), waitForDom = _a.waitForDom, select = _a.select;
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.simulate.mouseDown(select('STEPPER'), dragStartPoint);
                                    windowStub.simulate('mousemove', {
                                        clientX: dragStartPoint.clientX,
                                        clientY: dragStartPoint.clientY - dragStep
                                    });
                                    test_drive_react_1.expect(onUp).not.to.have.been.called;
                                    test_drive_react_1.expect(onDown).not.to.have.been.called;
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('drag down', function () {
            it('should call onDown', function () { return __awaiter(_this, void 0, void 0, function () {
                var dragStep, dragStartPoint, _a, waitForDom, select;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            dragStep = 20;
                            dragStartPoint = {
                                clientX: 100,
                                clientY: 100
                            };
                            _a = clientRenderer.render(React.createElement(stepper_1.Stepper, { "data-automation-id": "STEPPER", onUp: onUp, onDown: onDown, dragStep: dragStep })), waitForDom = _a.waitForDom, select = _a.select;
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.simulate.mouseDown(select('STEPPER'), dragStartPoint);
                                    windowStub.simulate('mousemove', {
                                        clientX: dragStartPoint.clientX,
                                        clientY: dragStartPoint.clientY + dragStep,
                                        altKey: true,
                                        ctrlKey: true
                                    });
                                    test_drive_react_1.expect(onUp).not.to.have.been.called;
                                    test_drive_react_1.expect(onDown).to.have.been.calledOnce;
                                    test_drive_react_1.expect(onDown).to.have.been.calledWithMatch({ altKey: true, ctrlKey: true });
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not call onDown when disableDown is true', function () { return __awaiter(_this, void 0, void 0, function () {
                var dragStep, dragStartPoint, _a, waitForDom, select;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            dragStep = 20;
                            dragStartPoint = {
                                clientX: 100,
                                clientY: 100
                            };
                            _a = clientRenderer.render(React.createElement(stepper_1.Stepper, { "data-automation-id": "STEPPER", onUp: onUp, onDown: onDown, dragStep: dragStep, disableDown: true })), waitForDom = _a.waitForDom, select = _a.select;
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.simulate.mouseDown(select('STEPPER'), dragStartPoint);
                                    windowStub.simulate('mousemove', {
                                        clientX: dragStartPoint.clientX,
                                        clientY: dragStartPoint.clientY + dragStep
                                    });
                                    test_drive_react_1.expect(onUp).not.to.have.been.called;
                                    test_drive_react_1.expect(onDown).not.to.have.been.called;
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('drag stop', function () {
            it('should stop calling onUp/onDown', function () { return __awaiter(_this, void 0, void 0, function () {
                var dragStep, dragStartPoint, _a, waitForDom, select;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            dragStep = 20;
                            dragStartPoint = {
                                clientX: 100,
                                clientY: 100
                            };
                            _a = clientRenderer.render(React.createElement(stepper_1.Stepper, { "data-automation-id": "STEPPER", onUp: onUp, onDown: onDown, dragStep: dragStep })), waitForDom = _a.waitForDom, select = _a.select;
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.simulate.mouseDown(select('STEPPER'), { clientX: 100, clientY: 100 });
                                    windowStub.simulate('mousemove', {
                                        clientX: dragStartPoint.clientX,
                                        clientY: dragStartPoint.clientY - dragStep
                                    });
                                    windowStub.simulate('mousemove', {
                                        clientX: dragStartPoint.clientX,
                                        clientY: dragStartPoint.clientY + dragStep
                                    });
                                    windowStub.simulate('mouseup');
                                    windowStub.simulate('mousemove', {
                                        clientX: dragStartPoint.clientX,
                                        clientY: dragStartPoint.clientY - dragStep
                                    });
                                    windowStub.simulate('mousemove', {
                                        clientX: dragStartPoint.clientX,
                                        clientY: dragStartPoint.clientY + dragStep
                                    });
                                    test_drive_react_1.expect(onUp).to.have.been.calledOnce;
                                    test_drive_react_1.expect(onDown).to.have.been.calledOnce;
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=stepper.spec.js.map