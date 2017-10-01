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
var src_1 = require("../../src");
var test_kit_1 = require("../../test-kit");
function assertCommit(input, onChange, expectedValue) {
    test_drive_react_1.expect(onChange).to.have.been.calledOnce;
    test_drive_react_1.expect(onChange.lastCall.args[0]).to.deep.eq({ value: expectedValue });
    test_drive_react_1.expect(input).to.have.value(String(expectedValue));
}
describe('<NumberInput />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () { return clientRenderer.cleanup(); });
    it('should output an input form element with type="number" by default', function () { return __awaiter(_this, void 0, void 0, function () {
        var value, min, max, step, name, _a, driver, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    value = 0;
                    min = -5;
                    max = 5;
                    step = 2;
                    name = 'input-name';
                    _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, min: min, max: max, step: step, name: name, required: true })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            var numberInput = driver.nativeInput;
                            test_drive_react_1.expect(numberInput).to.be.present();
                            test_drive_react_1.expect(numberInput).to.have.property('tagName', 'INPUT');
                            test_drive_react_1.expect(numberInput).to.have.attribute('type', 'number');
                            test_drive_react_1.expect(numberInput).to.have.attribute('min', String(min));
                            test_drive_react_1.expect(numberInput).to.have.attribute('max', String(max));
                            test_drive_react_1.expect(numberInput).to.have.attribute('step', String(step));
                            test_drive_react_1.expect(numberInput).to.have.attribute('name', String(name));
                            test_drive_react_1.expect(numberInput).to.have.attribute('required');
                            test_drive_react_1.expect(numberInput).to.have.value(String(value));
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should only set appropriate attributes on native input', function () { return __awaiter(_this, void 0, void 0, function () {
        var value, _a, driver, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    value = 0;
                    _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            var numberInput = driver.nativeInput;
                            test_drive_react_1.expect(numberInput).to.be.present();
                            test_drive_react_1.expect(numberInput).to.have.property('tagName', 'INPUT');
                            test_drive_react_1.expect(numberInput).to.have.attribute('type', 'number');
                            test_drive_react_1.expect(numberInput).not.to.have.attribute('min');
                            test_drive_react_1.expect(numberInput).not.to.have.attribute('max');
                            test_drive_react_1.expect(numberInput).not.to.have.attribute('step');
                            test_drive_react_1.expect(numberInput).not.to.have.attribute('name');
                            test_drive_react_1.expect(numberInput).not.to.have.attribute('required');
                            test_drive_react_1.expect(numberInput).to.have.value(String(value));
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('can be disabled', function () { return __awaiter(_this, void 0, void 0, function () {
        var value, _a, driver, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    value = 0;
                    _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, disabled: true })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            var numberInput = driver.nativeInput;
                            var increment = driver.increment;
                            var decrement = driver.decrement;
                            test_drive_react_1.expect(numberInput).to.have.attribute('disabled');
                            test_drive_react_1.expect(increment).to.have.attribute('disabled');
                            test_drive_react_1.expect(decrement).to.have.attribute('disabled');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should render a stepper', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, driver, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: 0 })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            var stepper = driver.stepper;
                            test_drive_react_1.expect(stepper).to.be.present();
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('<Stepper />', function () {
        it('should render increment and decrement controls', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, driver, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: 0 })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                var increment = driver.increment;
                                var decrement = driver.decrement;
                                test_drive_react_1.expect(increment).to.be.present();
                                test_drive_react_1.expect(decrement).to.be.present();
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('increment', function () {
            it('should increase the value by one step', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, step, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            step = 2;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, step: step, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.clickIncrement();
                                    assertCommit(driver.nativeInput, onChange, value + step);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should increase the value by a large step when shift key is held', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, step, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            step = 2;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, step: step, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.clickIncrement({ shiftKey: true });
                                    assertCommit(driver.nativeInput, onChange, value + 10 * step);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should be disabled when value >= max', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, max, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 2;
                            max = 2;
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, max: max })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    return test_drive_react_1.expect(driver.increment).to.have.attribute('disabled');
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should set the value to min when value < min', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, min, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = -3;
                            min = 0;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, min: min, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.clickIncrement();
                                    assertCommit(driver.nativeInput, onChange, min);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('decrement', function () {
            it('should decrease the value by one step', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, step, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            step = 2;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, step: step, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.clickDecrement();
                                    assertCommit(driver.nativeInput, onChange, value - step);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should decrease the value by a large step when shift key is held', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, step, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            step = 2;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, step: step, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.clickDecrement({ shiftKey: true });
                                    assertCommit(driver.nativeInput, onChange, value - 10 * step);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should be disabled when value <= min', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, min, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = -1;
                            min = 0;
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, min: min })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    return test_drive_react_1.expect(driver.decrement).to.have.attribute('disabled');
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should set the value to max when value > max', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, max, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 3;
                            max = 0;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, max: max, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.clickDecrement();
                                    assertCommit(driver.nativeInput, onChange, max);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('keyboard interactions', function () {
        describe('up key', function () {
            it('should increase value by one step', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, step, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            step = 2;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, step: step, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.pressUpKey();
                                    assertCommit(driver.nativeInput, onChange, value + step);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should increase value by 10*step with shift key', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, step, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            step = 2;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, step: step, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.pressUpKey({ shiftKey: true });
                                    assertCommit(driver.nativeInput, onChange, value + 10 * step);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should set value to max when value > max', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, max, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 1;
                            max = 0;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, max: max, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.pressUpKey();
                                    assertCommit(driver.nativeInput, onChange, max);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should set value to min when value < min', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, min, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            min = 1;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, min: min, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.pressUpKey();
                                    assertCommit(driver.nativeInput, onChange, min);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not call onChange when value = max', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, max, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            max = 0;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, max: max, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.pressUpKey();
                                    test_drive_react_1.expect(onChange).not.to.have.been.called;
                                    test_drive_react_1.expect(driver.nativeInput).to.have.value(String(value));
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('down key', function () {
            it('should decrease value by one step', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, step, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            step = 2;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, step: step, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.pressDownKey();
                                    assertCommit(driver.nativeInput, onChange, value - step);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should decrease value by 10*step with shift key', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, step, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            step = 2;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, step: step, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.pressDownKey({ shiftKey: true });
                                    assertCommit(driver.nativeInput, onChange, value - 10 * step);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should set value to max when value > max', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, max, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 1;
                            max = 0;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, max: max, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.pressDownKey();
                                    assertCommit(driver.nativeInput, onChange, max);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should set value to min when value < min', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, min, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            min = 1;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, min: min, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.pressDownKey();
                                    assertCommit(driver.nativeInput, onChange, min);
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not call onChange when value = min', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, min, onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 0;
                            min = 0;
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: value, min: min, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.pressDownKey();
                                    test_drive_react_1.expect(onChange).not.to.have.been.called;
                                    test_drive_react_1.expect(driver.nativeInput).to.have.value(String(value));
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('value being typed', function () {
            it('should call onInput on every keystroke', function () { return __awaiter(_this, void 0, void 0, function () {
                var onInput, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            onInput = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { onInput: onInput })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.typeIn('1');
                                    driver.typeIn('2');
                                    driver.typeIn('3');
                                    test_drive_react_1.expect(onInput).to.have.been.calledThrice;
                                    test_drive_react_1.expect(onInput).to.have.been.calledWith({ value: '123' });
                                    test_drive_react_1.expect(driver.nativeInput).to.have.value('123');
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not commit and validate the value', function () { return __awaiter(_this, void 0, void 0, function () {
                var onChange, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { max: 10, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.typeIn('123');
                                    test_drive_react_1.expect(onChange).not.to.have.been.called;
                                    test_drive_react_1.expect(driver.nativeInput).to.have.value('123');
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('enter', function () {
                it('should commit the entered value', function () { return __awaiter(_this, void 0, void 0, function () {
                    var onChange, _a, driver, waitForDom;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                onChange = test_drive_react_1.sinon.spy();
                                _a = clientRenderer.render(React.createElement(src_1.NumberInput, { onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                                return [4 /*yield*/, waitForDom(function () {
                                        driver.typeIn('123');
                                        driver.pressEnter();
                                        assertCommit(driver.nativeInput, onChange, 123);
                                    })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('should not commit already committed value', function () { return __awaiter(_this, void 0, void 0, function () {
                    var onChange, _a, driver, waitForDom;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                onChange = test_drive_react_1.sinon.spy();
                                _a = clientRenderer.render(React.createElement(src_1.NumberInput, { onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                                return [4 /*yield*/, waitForDom(function () {
                                        driver.typeIn('123');
                                        driver.pressEnter();
                                        driver.pressEnter();
                                        assertCommit(driver.nativeInput, onChange, 123);
                                    })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('focus', function () {
                it('should commit on blur', function () { return __awaiter(_this, void 0, void 0, function () {
                    var onChange, _a, driver, waitForDom;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                onChange = test_drive_react_1.sinon.spy();
                                _a = clientRenderer.render(React.createElement(src_1.NumberInput, { onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                                return [4 /*yield*/, waitForDom(function () {
                                        driver.typeIn('123');
                                        driver.blur();
                                        assertCommit(driver.nativeInput, onChange, 123);
                                    })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('esc', function () {
                it('should discard uncommitted changes', function () { return __awaiter(_this, void 0, void 0, function () {
                    var initialValue, onChange, _a, driver, waitForDom;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                initialValue = 3;
                                onChange = test_drive_react_1.sinon.spy();
                                _a = clientRenderer.render(React.createElement(src_1.NumberInput, { value: initialValue, onChange: onChange })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                                return [4 /*yield*/, waitForDom(function () {
                                        driver.typeIn('123');
                                        driver.pressEsc();
                                        test_drive_react_1.expect(onChange).not.to.have.been.called;
                                        test_drive_react_1.expect(driver.nativeInput).to.have.value(String(initialValue));
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
    describe('children', function () {
        it('should render an elements provided by prefix suffix props', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, driver, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.NumberInput, { prefix: React.createElement("span", { "data-slot": "prefix", "data-automation-id": "PREFIX" }, "prefix"), suffix: React.createElement("span", { "data-slot": "suffix", "data-automation-id": "SUFFIX" }, "suffix") })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(driver.prefix).to.be.present();
                                test_drive_react_1.expect(driver.suffix).to.be.present();
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('uncontrolled input', function () {
        describe('defaultValue prop', function () {
            it('should set the value of input', function () { return __awaiter(_this, void 0, void 0, function () {
                var value, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value = 11;
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { defaultValue: value })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    return test_drive_react_1.expect(driver.nativeInput).to.have.value(String(value));
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should only set the value of the input once', function () { return __awaiter(_this, void 0, void 0, function () {
                var initialValue, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            initialValue = 11;
                            _a = clientRenderer.render(React.createElement(test_kit_1.StatefulUncontrolledNumberInput, { initialValue: initialValue })).withDriver(test_kit_1.StatefulUnctontrolledNumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    var numberInput = driver.input;
                                    driver.click();
                                    driver.click();
                                    driver.click();
                                    test_drive_react_1.expect(numberInput).to.have.value(String(initialValue));
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('treating DOM as the source of truth', function () {
            it('should allow the user to enter values', function () { return __awaiter(_this, void 0, void 0, function () {
                var initialValue, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            initialValue = 1;
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { defaultValue: initialValue })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.typeIn('23');
                                    test_drive_react_1.expect(driver.nativeInput).to.have.value(String(123));
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should be controlled by stepper correctly', function () { return __awaiter(_this, void 0, void 0, function () {
                var initialValue, newValue, _a, driver, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            initialValue = 1;
                            newValue = 3;
                            _a = clientRenderer.render(React.createElement(src_1.NumberInput, { defaultValue: initialValue })).withDriver(test_kit_1.NumberInputDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    driver.nativeInput.value = String(newValue);
                                    driver.clickIncrement();
                                    test_drive_react_1.expect(driver.nativeInput).to.have.value(String(newValue + 1));
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
//# sourceMappingURL=number-input.spec.js.map