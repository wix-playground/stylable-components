"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var keycode = require("keycode");
var React = require("react");
var test_drive_react_1 = require("test-drive-react");
var src_1 = require("../../src");
var slider_1 = require("../../src/components/slider");
var window_stub_1 = require("../stubs/window.stub");
var utils_1 = require("../utils");
var environment;
function getAxis(options, context) {
    var axis;
    if (!options) {
        return;
    }
    axis = options.axis;
    if (context && context.dir === 'rtl') {
        axis = axis === slider_1.AXISES.x ?
            slider_1.AXISES.xReverse :
            axis === slider_1.AXISES.xReverse ?
                slider_1.AXISES.x :
                axis || slider_1.AXISES.xReverse;
    }
    return axis;
}
function getEventCoordinates(bounds, direction, value) {
    if (value === void 0) { value = 0.702; }
    switch (direction) {
        case slider_1.AXISES.x:
            return {
                clientX: Math.round(bounds.left + bounds.width * value),
                clientY: bounds.top + bounds.height / 3
            };
        case slider_1.AXISES.y:
            return {
                clientX: bounds.left + bounds.width / 3,
                clientY: Math.round(bounds.bottom - bounds.height * value)
            };
        case slider_1.AXISES.xReverse:
            return {
                clientX: Math.round(bounds.left + bounds.width * (1 - value)),
                clientY: bounds.top + bounds.height / 3
            };
        case slider_1.AXISES.yReverse:
            return {
                clientX: bounds.left + bounds.width / 3,
                clientY: Math.round(bounds.bottom - bounds.height * (1 - value))
            };
        default:
            return {
                clientX: Math.round(bounds.left + bounds.width * value),
                clientY: bounds.top + bounds.height / 3
            };
    }
}
function getRenderedSlider(clientRenderer, props, context) {
    var slider = context ?
        (React.createElement(src_1.ContextProvider, __assign({}, context),
            React.createElement(slider_1.Slider, __assign({}, props)))) :
        (React.createElement(slider_1.Slider, __assign({}, props)));
    return clientRenderer.render(slider);
}
function withValueMinMax(clientRenderer, positionProp, sizeProp, orientation, options, context) {
    var _this = this;
    describe('with value, min and max', function () {
        var value = 5;
        var min = -10;
        var max = 10;
        var select;
        var waitForDom;
        beforeEach(function () {
            var rendered = getRenderedSlider(clientRenderer, __assign({ value: value,
                min: min,
                max: max }, options), context);
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });
        it('renders handle on the right place', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-HANDLE');
                            test_drive_react_1.expect(element.style[positionProp]).to.equal('75%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders progress bar with the right width', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-PROGRESS');
                            test_drive_react_1.expect(element).to.be.present();
                            test_drive_react_1.expect(element.style[sizeProp]).to.equal('75%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders invisible native input with right value', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-NATIVE-INPUT');
                            test_drive_react_1.expect(element).to.has.value(String(value));
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders with proper aria-orientation', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-HANDLE');
                            test_drive_react_1.expect(element.getAttribute('aria-orientation')).to.equal(orientation);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
}
function whenDragThingsAround(clientRenderer, positionProp, sizeProp, options, context) {
    var _this = this;
    describe('when drag things around', function () {
        var value = 5;
        var min = 0;
        var max = 10;
        var onChange;
        var onInput;
        var select;
        var waitForDom;
        var eventMock;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            onInput = test_drive_react_1.sinon.spy();
            var rendered = getRenderedSlider(clientRenderer, __assign({ value: value,
                min: min,
                max: max,
                onChange: onChange,
                onInput: onInput }, options), context);
            select = rendered.select;
            waitForDom = rendered.waitForDom;
            var bounds = select('SLIDER').getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, getAxis(options, context));
        });
        it('should change value', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            var handle = select('SLIDER-HANDLE');
                            var progress = select('SLIDER-PROGRESS');
                            test_drive_react_1.simulate.mouseDown(element, {
                                currentTarget: element,
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            test_drive_react_1.expect(handle.style[positionProp]).to.equal('70%');
                            test_drive_react_1.expect(progress.style[sizeProp]).to.equal('70%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call onChange', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            test_drive_react_1.simulate.mouseDown(element, {
                                currentTarget: element,
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            utils_1.simulateMouseEvent(environment, 'mouseup', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: 7 });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call onInput', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            test_drive_react_1.simulate.mouseDown(element, {
                                currentTarget: element,
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            utils_1.simulateMouseEvent(environment, 'mousemove', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            utils_1.simulateMouseEvent(environment, 'mouseup', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            test_drive_react_1.expect(onInput).to.be.calledWithMatch({ value: '7' });
                            test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: 7 });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when drag things around using touch', function () {
        var value = 5;
        var min = 0;
        var max = 10;
        var onChange;
        var onInput;
        var select;
        var waitForDom;
        var eventMock;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            onInput = test_drive_react_1.sinon.spy();
            var rendered = getRenderedSlider(clientRenderer, __assign({ value: value,
                min: min,
                max: max,
                onChange: onChange,
                onInput: onInput }, options), context);
            select = rendered.select;
            waitForDom = rendered.waitForDom;
            var bounds = select('SLIDER').getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, getAxis(options, context));
        });
        utils_1.skipItIfTouch('should change value', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            var handle = select('SLIDER-HANDLE');
                            var progress = select('SLIDER-PROGRESS');
                            test_drive_react_1.simulate.touchStart(element, {
                                currentTarget: element,
                                touches: {
                                    0: {
                                        clientX: eventMock.clientX,
                                        clientY: eventMock.clientY
                                    }
                                }
                            });
                            test_drive_react_1.expect(handle.style[positionProp]).to.equal('70%');
                            test_drive_react_1.expect(progress.style[sizeProp]).to.equal('70%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        utils_1.skipItIfTouch('should call onChange', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            test_drive_react_1.simulate.touchStart(element, {
                                currentTarget: element,
                                touches: {
                                    0: {
                                        clientX: eventMock.clientX,
                                        clientY: eventMock.clientY
                                    }
                                }
                            });
                            utils_1.simulateTouchEvent(environment, 'touchend', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: 7 });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        utils_1.skipItIfTouch('should call onInput', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            test_drive_react_1.simulate.touchStart(element, {
                                currentTarget: element,
                                touches: {
                                    0: {
                                        clientX: eventMock.clientX,
                                        clientY: eventMock.clientY
                                    }
                                }
                            });
                            utils_1.simulateTouchEvent(environment, 'touchmove', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            utils_1.simulateTouchEvent(environment, 'touchend', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            test_drive_react_1.expect(onInput).to.be.calledWithMatch({ value: '7' });
                            test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: 7 });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
}
function whenDragThingsAroundWithStep(clientRenderer, positionProp, sizeProp, options, context) {
    var _this = this;
    describe('when drag things around with step', function () {
        var value = 5;
        var min = 0;
        var max = 10;
        var step = 2;
        var onChange;
        var onInput;
        var select;
        var waitForDom;
        var eventMock;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            onInput = test_drive_react_1.sinon.spy();
            var rendered = getRenderedSlider(clientRenderer, __assign({ value: value,
                min: min,
                max: max,
                step: step,
                onChange: onChange,
                onInput: onInput }, options), context);
            select = rendered.select;
            waitForDom = rendered.waitForDom;
            var bounds = select('SLIDER').getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, getAxis(options, context));
        });
        it('renders handle on the right place', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-HANDLE');
                            test_drive_react_1.expect(element.style[positionProp]).to.equal('50%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders progress bar with the right width', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-PROGRESS');
                            test_drive_react_1.expect(element).to.be.present();
                            test_drive_react_1.expect(element.style[sizeProp]).to.equal('50%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders invisible native input with right value', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-NATIVE-INPUT');
                            test_drive_react_1.expect(element).to.has.value(String(value));
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should change value according to step', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            var handle = select('SLIDER-HANDLE');
                            var progress = select('SLIDER-PROGRESS');
                            test_drive_react_1.simulate.mouseDown(element, {
                                currentTarget: element,
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            test_drive_react_1.expect(handle.style[positionProp]).to.equal('80%');
                            test_drive_react_1.expect(progress.style[sizeProp]).to.equal('80%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call onChange with value normalized to step', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            test_drive_react_1.simulate.mouseDown(element, {
                                currentTarget: element,
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            utils_1.simulateMouseEvent(environment, 'mouseup', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: 8 });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call onInput with value normalized to step', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            test_drive_react_1.simulate.mouseDown(element, {
                                currentTarget: element,
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            utils_1.simulateMouseEvent(environment, 'mousemove', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            utils_1.simulateMouseEvent(environment, 'mouseup', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            test_drive_react_1.expect(onInput).to.be.calledWithMatch({ value: '8' });
                            test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: 8 });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when drag things around with step using touch', function () {
        var value = 5;
        var min = 0;
        var max = 10;
        var step = 2;
        var onChange;
        var onInput;
        var select;
        var waitForDom;
        var eventMock;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            onInput = test_drive_react_1.sinon.spy();
            var rendered = getRenderedSlider(clientRenderer, __assign({ value: value,
                min: min,
                max: max,
                step: step,
                onChange: onChange,
                onInput: onInput }, options), context);
            select = rendered.select;
            waitForDom = rendered.waitForDom;
            var bounds = select('SLIDER').getBoundingClientRect();
            eventMock = getEventCoordinates(bounds, getAxis(options, context));
        });
        utils_1.skipItIfTouch('should change value', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            var handle = select('SLIDER-HANDLE');
                            var progress = select('SLIDER-PROGRESS');
                            test_drive_react_1.simulate.touchStart(element, {
                                currentTarget: element,
                                touches: {
                                    0: {
                                        clientX: eventMock.clientX,
                                        clientY: eventMock.clientY
                                    }
                                }
                            });
                            test_drive_react_1.expect(handle.style[positionProp]).to.equal('80%');
                            test_drive_react_1.expect(progress.style[sizeProp]).to.equal('80%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        utils_1.skipItIfTouch('should call onChange', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            test_drive_react_1.simulate.touchStart(element, {
                                currentTarget: element,
                                touches: {
                                    0: {
                                        clientX: eventMock.clientX,
                                        clientY: eventMock.clientY
                                    }
                                }
                            });
                            utils_1.simulateTouchEvent(environment, 'touchend', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: 8 });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        utils_1.skipItIfTouch('should call onInput', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            test_drive_react_1.simulate.touchStart(element, {
                                currentTarget: element,
                                touches: {
                                    0: {
                                        clientX: eventMock.clientX,
                                        clientY: eventMock.clientY
                                    }
                                }
                            });
                            utils_1.simulateTouchEvent(environment, 'touchmove', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            utils_1.simulateTouchEvent(environment, 'touchend', {
                                clientX: eventMock.clientX,
                                clientY: eventMock.clientY
                            });
                            test_drive_react_1.expect(onInput).to.be.calledWithMatch({ value: '8' });
                            test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: 8 });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
}
function keyboard(clientRenderer, options, context) {
    var _this = this;
    var step = Number(options && options.step || 1);
    describe(step === 1 ? 'keyboard control' : 'keyboard control with step', function () {
        var value = 50;
        var min = 0;
        var max = 100;
        var onChange;
        var onInput;
        var select;
        var waitForDom;
        var deviation = step;
        var home = 0;
        var end = 100;
        switch (getAxis(options, context)) {
            case slider_1.AXISES.xReverse:
            case slider_1.AXISES.yReverse:
                deviation = -1 * step;
                home = 100;
                end = 0;
        }
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            onInput = test_drive_react_1.sinon.spy();
            var rendered = getRenderedSlider(clientRenderer, __assign({ value: value,
                min: min,
                max: max,
                onChange: onChange,
                onInput: onInput }, options), context);
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });
        it('on pressing right key', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.right
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: value + deviation });
                    })];
            });
        }); });
        it('on pressing up key', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.up
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: value + deviation });
                    })];
            });
        }); });
        it('on pressing page up key', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes['page up']
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: value + Math.abs(deviation * 10) });
                    })];
            });
        }); });
        it('on pressing up key with ctrl', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.up
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: value + (deviation * 10) });
                    })];
            });
        }); });
        it('on pressing left key with ctrl', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.left
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: home });
                    })];
            });
        }); });
        it('on pressing up key with shift', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.up
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: value + (deviation * 10) });
                    })];
            });
        }); });
        it('on pressing left key with shift', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.left
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: home });
                    })];
            });
        }); });
        it('on pressing left key', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.left
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: value - deviation });
                    })];
            });
        }); });
        it('on pressing down key', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.down
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: value - deviation });
                    })];
            });
        }); });
        it('on pressing page down key', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes['page down']
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: value - Math.abs(deviation * 10) });
                    })];
            });
        }); });
        it('on pressing down key with ctrl', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.down
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: value - (deviation * 10) });
                    })];
            });
        }); });
        it('on pressing right key with ctrl', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    ctrlKey: true,
                    keyCode: keycode.codes.right
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: end });
                    })];
            });
        }); });
        it('on pressing down key with shift', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.down
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: value - (deviation * 10) });
                    })];
            });
        }); });
        it('on pressing right key with shift', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.right
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: end });
                    })];
            });
        }); });
        it('on pressing home key', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    keyCode: keycode.codes.home
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: home });
                    })];
            });
        }); });
        it('on pressing end key', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                test_drive_react_1.simulate.keyDown(select('SLIDER-HANDLE'), {
                    shiftKey: true,
                    keyCode: keycode.codes.end
                });
                return [2 /*return*/, test_drive_react_1.waitFor(function () {
                        test_drive_react_1.expect(onChange).have.been.calledWithMatch({ value: end });
                    })];
            });
        }); });
    });
}
describe('<Slider />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    beforeEach(function () {
        environment = new window_stub_1.default();
    });
    afterEach(function () {
        environment.sandbox.restore();
    });
    afterEach(function () {
        clientRenderer.cleanup();
    });
    describe('without any arguments', function () {
        var select;
        var waitForDom;
        beforeEach(function () {
            var rendered = clientRenderer.render(React.createElement(slider_1.Slider, null));
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });
        it('renders default value on the start of the track', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-HANDLE');
                            test_drive_react_1.expect(element.style.left).to.equal('0%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders progress bar', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-PROGRESS');
                            test_drive_react_1.expect(element).not.to.be.null;
                            test_drive_react_1.expect(element.style.width).to.equal('0%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders invisible native input with default value', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-NATIVE-INPUT');
                            test_drive_react_1.expect(element).to.has.value('');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('with min and max and no value', function () {
        var min = -10;
        var max = 10;
        var select;
        var waitForDom;
        beforeEach(function () {
            var rendered = clientRenderer.render(React.createElement(slider_1.Slider, { min: min, max: max }));
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });
        it('renders handle on the right place', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-HANDLE');
                            test_drive_react_1.expect(element.style.left).to.equal('0%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders progress bar with the right width', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-PROGRESS');
                            test_drive_react_1.expect(element).not.to.be.present();
                            test_drive_react_1.expect(element.style.width).to.equal('0%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders invisible native input with right value', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-NATIVE-INPUT');
                            test_drive_react_1.expect(element).to.has.value('');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    withValueMinMax(clientRenderer, 'left', 'width', 'horizontal', {});
    describe('when value is out of range', function () {
        var valueLessThenMin = -1;
        var valueGreaterThenMax = 11;
        var min = 0;
        var max = 10;
        it('should normilize value that less than min to min', function () { return __awaiter(_this, void 0, void 0, function () {
            var rendered, select, waitForDom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rendered = clientRenderer.render(React.createElement(slider_1.Slider, { value: valueLessThenMin, min: min, max: max }));
                        select = rendered.select;
                        waitForDom = rendered.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                var handle = select('SLIDER-HANDLE');
                                var progress = select('SLIDER-PROGRESS');
                                test_drive_react_1.expect(handle.style.left).to.equal('0%');
                                test_drive_react_1.expect(progress.style.width).to.equal('0%');
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should normilize value that greater than max to max', function () { return __awaiter(_this, void 0, void 0, function () {
            var rendered, select, waitForDom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rendered = clientRenderer.render(React.createElement(slider_1.Slider, { value: valueGreaterThenMax, min: min, max: max }));
                        select = rendered.select;
                        waitForDom = rendered.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                var handle = select('SLIDER-HANDLE');
                                var progress = select('SLIDER-PROGRESS');
                                test_drive_react_1.expect(handle.style.left).to.equal('100%');
                                test_drive_react_1.expect(progress.style.width).to.equal('100%');
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when value is out of step', function () {
        var valueOutOfStep = 3;
        var min = 0;
        var max = 10;
        var step = 5;
        var onChange;
        var onInput;
        var select;
        var waitForDom;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            onInput = test_drive_react_1.sinon.spy();
            var rendered = clientRenderer.render(React.createElement(slider_1.Slider, { value: valueOutOfStep, min: min, max: max, step: step, onChange: onChange, onInput: onInput }));
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });
        it('renders handle ignoring step', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-HANDLE');
                            test_drive_react_1.expect(element.style.left).to.equal('30%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders progress bar ignoring step', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-PROGRESS');
                            test_drive_react_1.expect(element).to.be.present();
                            test_drive_react_1.expect(element.style.width).to.equal('30%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders invisible native input with passed value', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForDom(function () {
                            var element = select('SLIDER-NATIVE-INPUT');
                            test_drive_react_1.expect(element).to.has.value(String(valueOutOfStep));
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should change value according to step', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            var handle = select('SLIDER-HANDLE');
                            var progress = select('SLIDER-PROGRESS');
                            var bounds = element.getBoundingClientRect();
                            test_drive_react_1.simulate.mouseDown(element, {
                                currentTarget: element,
                                clientY: bounds.top + bounds.height / 3,
                                clientX: Math.round(bounds.left + bounds.width * 0.4)
                            });
                            test_drive_react_1.expect(handle.style.left).to.equal('50%');
                            test_drive_react_1.expect(progress.style.width).to.equal('50%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call onChange with value normalized to step', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            var bounds = element.getBoundingClientRect();
                            test_drive_react_1.simulate.mouseDown(element, {
                                currentTarget: element,
                                clientX: Math.round(bounds.left + bounds.width * 0.5)
                            });
                            utils_1.simulateMouseEvent(environment, 'mouseup', { clientX: Math.round(bounds.left + bounds.width * 0.8) });
                            test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: 10 });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call onInput with value normalized to step', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            var bounds = element.getBoundingClientRect();
                            test_drive_react_1.simulate.mouseDown(element, {
                                currentTarget: element,
                                clientX: Math.round(bounds.left + bounds.width * 0.5)
                            });
                            utils_1.simulateMouseEvent(environment, 'mousemove', { clientX: Math.round(bounds.left + bounds.width * 0.6) });
                            utils_1.simulateMouseEvent(environment, 'mouseup', { clientX: Math.round(bounds.left + bounds.width * 0.6) });
                            test_drive_react_1.expect(onInput).to.be.calledWithMatch({ value: '5' });
                            test_drive_react_1.expect(onChange).to.be.calledWithMatch({ value: 5 });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when marks=true', function () {
        it('renders proper number of marks', function () { return __awaiter(_this, void 0, void 0, function () {
            var value, min, max, step, rendered, select, waitForDom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = 5;
                        min = 0;
                        max = 10;
                        step = 5;
                        rendered = clientRenderer.render(React.createElement(slider_1.Slider, { value: value, min: min, max: max, step: step, marks: true }));
                        select = rendered.select;
                        waitForDom = rendered.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(select("SLIDER-MARKS-0")).to.be.present();
                                test_drive_react_1.expect(select("SLIDER-MARKS-1")).to.be.present();
                                test_drive_react_1.expect(select("SLIDER-MARKS-2")).to.be.present();
                                test_drive_react_1.expect(select("SLIDER-MARKS-3")).not.to.be.present();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders marks on proper places', function () { return __awaiter(_this, void 0, void 0, function () {
            var value, min, max, step, rendered, select, waitForDom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        value = 5;
                        min = 0;
                        max = 10;
                        step = 2;
                        rendered = clientRenderer.render(React.createElement(slider_1.Slider, { value: value, min: min, max: max, step: step, marks: true }));
                        select = rendered.select;
                        waitForDom = rendered.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                for (var i = 0; i <= 5; i++) {
                                    var mark = select("SLIDER-MARKS-" + i);
                                    test_drive_react_1.expect(mark.style.left).to.equal(20 * i + "%");
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    whenDragThingsAround(clientRenderer, 'left', 'width');
    whenDragThingsAroundWithStep(clientRenderer, 'left', 'width');
    keyboard(clientRenderer);
    keyboard(clientRenderer, { step: 2 });
    describe('when disabled', function () {
        var value = 5;
        var min = 0;
        var max = 10;
        var onChange;
        var select;
        var waitForDom;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            var rendered = clientRenderer.render(React.createElement(slider_1.Slider, { value: value, min: min, max: max, onChange: onChange, disabled: true }));
            select = rendered.select;
            waitForDom = rendered.waitForDom;
        });
        it('should not change value', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var element = select('SLIDER');
                            var handle = select('SLIDER-HANDLE');
                            var progress = select('SLIDER-PROGRESS');
                            var bounds = element.getBoundingClientRect();
                            test_drive_react_1.simulate.mouseDown(element, {
                                currentTarget: element,
                                clientY: bounds.top + bounds.height / 3,
                                clientX: bounds.left + bounds.width / 4
                            });
                            test_drive_react_1.expect(handle.style.left).not.to.equal('25%');
                            test_drive_react_1.expect(progress.style.width).not.to.equal('25%');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when label provided', function () {
        var value = 5;
        var min = 0;
        var max = 10;
        var label = 'Simple Slider';
        it('slider should has title and aria-label equal to passed label value', function () { return __awaiter(_this, void 0, void 0, function () {
            var rendered, select, waitForDom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rendered = clientRenderer.render(React.createElement(slider_1.Slider, { value: value, min: min, max: max, label: label }));
                        select = rendered.select;
                        waitForDom = rendered.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                var slider = select('SLIDER');
                                var sliderHandle = select('SLIDER-HANDLE');
                                test_drive_react_1.expect(slider.title).equal(label);
                                test_drive_react_1.expect(sliderHandle.getAttribute('aria-label')).equal(label);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when name provided', function () {
        var value = 5;
        var min = 0;
        var max = 10;
        var name = 'Simple Slider';
        it('native input should has name equal to passed name value', function () { return __awaiter(_this, void 0, void 0, function () {
            var rendered, select, waitForDom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rendered = clientRenderer.render(React.createElement(slider_1.Slider, { value: value, min: min, max: max, name: name }));
                        select = rendered.select;
                        waitForDom = rendered.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                var sliderInput = select('SLIDER-NATIVE-INPUT');
                                test_drive_react_1.expect(sliderInput.name).equal(name);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when it is required', function () {
        var value = 5;
        var min = 0;
        var max = 10;
        it('native input should has required attribute equal to true', function () { return __awaiter(_this, void 0, void 0, function () {
            var rendered, select, waitForDom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rendered = clientRenderer.render(React.createElement(slider_1.Slider, { value: value, min: min, max: max, required: true }));
                        select = rendered.select;
                        waitForDom = rendered.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                var sliderInput = select('SLIDER-NATIVE-INPUT');
                                test_drive_react_1.expect(sliderInput.required).to.be.true;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('tooltip', function () {
        var value = 5;
        var min = 0;
        var max = 10;
        var label = 'Simple Slider Tooltip';
        it('should be presented', function () { return __awaiter(_this, void 0, void 0, function () {
            var rendered, select, waitForDom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rendered = clientRenderer.render(React.createElement(slider_1.Slider, { value: value, min: min, max: max, label: label, tooltip: React.createElement("div", { "data-slot": "tooltip", "data-automation-id": "TOOLTIP-CUSTOM-CONTENT" }, label) }));
                        select = rendered.select;
                        waitForDom = rendered.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                var tooltip = select('SLIDER-TOOLTIP');
                                var tooltipContent = select('TOOLTIP-CUSTOM-CONTENT');
                                test_drive_react_1.expect(tooltip).to.be.present();
                                test_drive_react_1.expect(tooltipContent).to.be.present();
                                test_drive_react_1.expect(tooltipContent.innerText).to.equal(label);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('vertical Slider', function () {
        withValueMinMax(clientRenderer, 'bottom', 'height', 'vertical', {
            axis: slider_1.AXISES.y
        });
        whenDragThingsAround(clientRenderer, 'bottom', 'height', {
            axis: slider_1.AXISES.y
        });
        whenDragThingsAroundWithStep(clientRenderer, 'bottom', 'height', {
            axis: slider_1.AXISES.y
        });
        keyboard(clientRenderer, { axis: slider_1.AXISES.y });
        keyboard(clientRenderer, { axis: slider_1.AXISES.y, step: 2 });
    });
    describe('reverse Slider', function () {
        withValueMinMax(clientRenderer, 'right', 'width', 'horizontal', {
            axis: slider_1.AXISES.xReverse
        });
        whenDragThingsAround(clientRenderer, 'right', 'width', {
            axis: slider_1.AXISES.xReverse
        });
        whenDragThingsAroundWithStep(clientRenderer, 'right', 'width', {
            axis: slider_1.AXISES.xReverse
        });
        keyboard(clientRenderer, { axis: slider_1.AXISES.xReverse });
        keyboard(clientRenderer, { axis: slider_1.AXISES.xReverse, step: 2 });
    });
    describe('vertical reverse Slider', function () {
        withValueMinMax(clientRenderer, 'top', 'height', 'vertical', {
            axis: slider_1.AXISES.yReverse
        });
        whenDragThingsAround(clientRenderer, 'top', 'height', {
            axis: slider_1.AXISES.yReverse
        });
        whenDragThingsAroundWithStep(clientRenderer, 'top', 'height', {
            axis: slider_1.AXISES.yReverse
        });
        keyboard(clientRenderer, { axis: slider_1.AXISES.yReverse });
        keyboard(clientRenderer, { axis: slider_1.AXISES.yReverse, step: 2 });
    });
    describe('RTL Slider', function () {
        withValueMinMax(clientRenderer, 'right', 'width', 'horizontal', {}, { dir: 'rtl' });
        whenDragThingsAround(clientRenderer, 'right', 'width', {}, { dir: 'rtl' });
        whenDragThingsAroundWithStep(clientRenderer, 'right', 'width', {}, { dir: 'rtl' });
        keyboard(clientRenderer, {}, { dir: 'rtl' });
        keyboard(clientRenderer, { step: 2 }, { dir: 'rtl' });
    });
});
//# sourceMappingURL=slider.spec.js.map