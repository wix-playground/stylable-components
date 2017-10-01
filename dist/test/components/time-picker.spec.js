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
var keycode = require("keycode");
var React = require("react");
var test_drive_react_1 = require("test-drive-react");
var time_picker_demo_1 = require("../../demo/components/time-picker-demo");
var src_1 = require("../../src");
var time_picker_st_css_1 = require("../../src/components/time-picker/time-picker.st.css");
var utils_1 = require("../../src/components/time-picker/utils");
var has_css_state_1 = require("../utils/has-css-state");
var describeNative = utils_1.isTouchTimeInputSupported ? describe : describe.skip;
var describeDesktop = !utils_1.isTouchTimeInputSupported ? describe : describe.skip;
var itDesktop = !utils_1.isTouchTimeInputSupported ? it : it.skip;
var itNative = utils_1.isTouchTimeInputSupported ? it : it.skip;
describe('<TimePicker/>', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () { return clientRenderer.cleanup(); });
    describeDesktop('render with format="ampm"', function () {
        var renderer;
        var hh;
        var mm;
        var placeholder;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "ampm" }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            placeholder = renderer.select('TIME_PICKER_PLACEHOLDER');
        });
        it('should not render with placeholder', function () {
            test_drive_react_1.expect(placeholder).to.be.null;
        });
        it('hh should not have value set', function () {
            test_drive_react_1.expect(hh).attr('value', '');
        });
        it('hh should have placeholder "00"', function () {
            test_drive_react_1.expect(hh).attr('placeholder', '00');
        });
        it('mm should not have value set', function () {
            test_drive_react_1.expect(mm).attr('value', '');
        });
        it('mm should have placeholder "00"', function () {
            test_drive_react_1.expect(mm).attr('placeholder', '00');
        });
    });
    describe('render with format="24h"', function () {
        var renderer;
        var hh;
        var mm;
        var placeholder;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "24h" }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            placeholder = renderer.select('TIME_PICKER_PLACEHOLDER');
        });
        it('should not render with placeholder', function () {
            test_drive_react_1.expect(placeholder).to.be.null;
        });
        it('hh should not have value set', function () {
            test_drive_react_1.expect(hh).attr('value', '');
        });
        it('hh should have placeholder "00"', function () {
            test_drive_react_1.expect(hh).attr('placeholder', '00');
        });
        it('mm should not have value set', function () {
            test_drive_react_1.expect(mm).attr('value', '');
        });
        it('mm should have placeholder "00"', function () {
            test_drive_react_1.expect(mm).attr('placeholder', '00');
        });
    });
    describe('render with value="4:36" format="ampm"', function () {
        var renderer;
        var hh;
        var mm;
        var ampm;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { value: "4:36", format: "ampm" }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            ampm = renderer.select('TIME_PICKER_AMPM');
        });
        it('hh input should have "04" value', function () {
            test_drive_react_1.expect(hh).attr('value', '04');
        });
        it('mm input should have "36" value', function () {
            test_drive_react_1.expect(mm).attr('value', '36');
        });
        itDesktop('ampm should have "AM" value', function () {
            test_drive_react_1.expect(ampm).text('AM');
        });
    });
    describe('render with placeholder="Enter Time"', function () {
        var renderer;
        var hh;
        var mm;
        var placeholder;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { placeholder: "Enter Time" }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            placeholder = renderer.select('TIME_PICKER_PLACEHOLDER');
        });
        it('placeholder should render with "Enter Time"', function () {
            test_drive_react_1.expect(placeholder).text('Enter Time');
        });
        it('hh should not have value set', function () {
            test_drive_react_1.expect(hh).attr('value', '');
        });
        it('mm should not have value set', function () {
            test_drive_react_1.expect(mm).attr('value', '');
        });
    });
    describe('render with format="ampm" value="13:55"', function () {
        var renderer;
        var hh;
        var mm;
        var ampm;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "ampm", value: "13:55" }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            ampm = renderer.select('TIME_PICKER_AMPM');
        });
        describeDesktop('desktop', function () {
            it('hh input should have "01" value', function () {
                test_drive_react_1.expect(hh).attr('value', '01');
            });
            it('mm input should have "55" value', function () {
                test_drive_react_1.expect(mm).attr('value', '55');
            });
            it('ampm should have input "PM" value', function () {
                test_drive_react_1.expect(ampm).text('PM');
            });
        });
        describeNative('mobile', function () {
            it('hh input should have "13" value', function () {
                test_drive_react_1.expect(hh).attr('value', '13');
            });
            it('mm input should have "55" value', function () {
                test_drive_react_1.expect(mm).attr('value', '55');
            });
        });
    });
    describe('render with format="24h" value="13:55"', function () {
        var renderer;
        var hh;
        var mm;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "24h", value: "13:55" }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
        });
        it('hh input should have "13" value', function () {
            test_drive_react_1.expect(hh).attr('value', '13');
        });
        it('mm input should have "55" value', function () {
            test_drive_react_1.expect(mm).attr('value', '55');
        });
    });
    describe('render with onChange={onChange} format="24h" value="13:55"', function () {
        var onChange;
        var renderer;
        var root;
        var hh;
        var mm;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "24h", value: "13:55", onChange: onChange }));
            root = renderer.select('TIME_PICKER');
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
        });
        describe('entering "3" into hh segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(hh);
                hh.value = '3';
                test_drive_react_1.simulate.change(hh);
            });
            it('should set focus state', function () {
                has_css_state_1.hasCssState(root, time_picker_st_css_1.default, { focus: true });
            });
            it('hh input should have "03" value', function () {
                test_drive_react_1.expect(hh).attr('value', '03');
            });
            it('mm input should have "55" value', function () {
                test_drive_react_1.expect(mm).attr('value', '55');
            });
            it('should move selection to mm segment', function () {
                test_drive_react_1.expect(document.activeElement).to.equal(mm);
            });
            it('onChange should be callend with "03:55"', function () {
                test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '03:55' });
            });
        });
        describe('entering "2" into hh segment', function () {
            beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.simulate.focus(hh);
                    hh.value = '2';
                    test_drive_react_1.simulate.change(hh);
                    return [2 /*return*/];
                });
            }); });
            it('hh input should have "2" value', function () {
                test_drive_react_1.expect(hh).attr('value', '2');
            });
            it('mm input should have "55" value', function () {
                test_drive_react_1.expect(mm).attr('value', '55');
            });
            it('should keep selection on hh segment', function () {
                test_drive_react_1.expect(document.activeElement).to.equal(hh);
            });
            it('onChange should not be callen', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                        case 1:
                            _a.sent();
                            test_drive_react_1.expect(onChange).to.not.be.called;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('entering "7" into mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                mm.value = '7';
                test_drive_react_1.simulate.change(mm);
            });
            it('should set focus state', function () {
                has_css_state_1.hasCssState(root, time_picker_st_css_1.default, { focus: true });
            });
            it('hh input should have "13" value', function () {
                test_drive_react_1.expect(hh).attr('value', '13');
            });
            it('mm input should have "07" value', function () {
                test_drive_react_1.expect(mm).attr('value', '07');
            });
            it('should keep selection on mm segment', function () {
                test_drive_react_1.expect(document.activeElement).to.equal(mm);
            });
            it('onChange should be callen with "13:07"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '13:07' });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('entering "5" into mm input', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                mm.value = '5';
                test_drive_react_1.simulate.change(mm);
            });
            it('hh input should have "13" value', function () {
                test_drive_react_1.expect(hh).attr('value', '13');
            });
            it('mm input should have "5" value', function () {
                test_drive_react_1.expect(mm).attr('value', '5');
            });
            it('should keep selection on mm segment', function () {
                test_drive_react_1.expect(document.activeElement).to.equal(mm);
            });
            it('onChange should not be callen', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                        case 1:
                            _a.sent();
                            test_drive_react_1.expect(onChange).to.not.called;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('backspace on mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('backspace') });
            });
            it('hh input should have "13" value', function () {
                test_drive_react_1.expect(hh).attr('value', '13');
            });
            it('mm input should have "00" value', function () {
                test_drive_react_1.expect(mm).attr('value', '00');
            });
            it('should keep selection on mm segment', function () {
                test_drive_react_1.expect(document.activeElement).to.equal(mm);
            });
        });
        describe('backspace x 2 on mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('backspace') });
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('backspace') });
            });
            it('hh input should have "13" value', function () {
                test_drive_react_1.expect(hh).attr('value', '13');
            });
            it('mm input should have "00" value', function () {
                test_drive_react_1.expect(mm).attr('value', '00');
            });
            it('should move selection on hh segment', function () {
                test_drive_react_1.expect(document.activeElement).to.equal(mm);
            });
        });
        describe('arrow down on hh segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(hh);
                test_drive_react_1.simulate.click(hh);
                test_drive_react_1.simulate.keyDown(hh, { keyCode: keycode('down') });
            });
            it('hh input should have "12" value', function () {
                test_drive_react_1.expect(hh).attr('value', '12');
            });
            it('onChange should be callen with "12:55"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '12:55' });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('arrow up on hh segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(hh);
                test_drive_react_1.simulate.click(hh);
                test_drive_react_1.simulate.keyDown(hh, { keyCode: keycode('up') });
            });
            it('hh input should have "14" value', function () {
                test_drive_react_1.expect(hh).attr('value', '14');
            });
            it('onChange should be callen with "14:55"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '14:55' });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('arrow down on mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('down') });
            });
            it('mm input should have "54" value', function () {
                test_drive_react_1.expect(mm).attr('value', '54');
            });
            it('onChange should be callen with "13:54"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '13:54' });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('arrow up on mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('up') });
            });
            it('mm input should have "56" value', function () {
                test_drive_react_1.expect(mm).attr('value', '56');
            });
            it('onChange should be callen with "13:56"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '13:56' });
                    return [2 /*return*/];
                });
            }); });
        });
    });
    describe('render with onChange={onChange} onInput={onInput} format="24h" value="13:55"', function () {
        var onChange;
        var onInput;
        var renderer;
        var hh;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            onInput = test_drive_react_1.sinon.spy();
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "24h", value: "13:55", onChange: onChange, onInput: onInput }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
        });
        describe('entering "3" into hh segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(hh);
                hh.value = '3';
                test_drive_react_1.simulate.change(hh);
            });
            it('onChange should be callend with "03:55"', function () {
                test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '03:55' });
            });
            it('onInput should be callend with "03:55"', function () {
                test_drive_react_1.expect(onInput).to.be.calledWithExactly({ value: '03:55' });
            });
        });
    });
    describe('render with onChange={onChange} format="24h" value="13:59"', function () {
        var onChange;
        var renderer;
        var hh;
        var mm;
        var stepperIncrement;
        var stepperDecrement;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "24h", value: "13:59", onChange: onChange }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            stepperIncrement = renderer.select('STEPPER_INCREMENT');
            stepperDecrement = renderer.select('STEPPER_DECREMENT');
        });
        describe('arrow up on mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('up') });
            });
            it('hh input should have "14" value', function () {
                test_drive_react_1.expect(hh).attr('value', '14');
            });
            it('mm input should have "00" value', function () {
                test_drive_react_1.expect(mm).attr('value', '00');
            });
            itDesktop('mm input should have selection', function () {
                test_drive_react_1.expect([mm.selectionStart, mm.selectionEnd]).to.deep.equal([0, 2]);
            });
            it('onChange should be callen with "14:00"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '14:00' });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('arrow shift + up on mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('up'), shiftKey: true });
            });
            it('hh input should have "14" value', function () {
                test_drive_react_1.expect(hh).attr('value', '14');
            });
            it('mm input should have "09" value', function () {
                test_drive_react_1.expect(mm).attr('value', '09');
            });
            it('onChange should be callen with "14:09"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '14:09' });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('arrow shift + down on mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('down'), shiftKey: true });
            });
            it('mm input should have "49" value', function () {
                test_drive_react_1.expect(mm).attr('value', '49');
            });
            it('onChange should be callen with "13:49"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '13:49' });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('arrow shift + up on hh segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(hh);
                test_drive_react_1.simulate.click(hh);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('up'), shiftKey: true });
            });
            it('hh input should have "14" value', function () {
                test_drive_react_1.expect(hh).attr('value', '14');
            });
            it('onChange should be callen with "14:59"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '14:59' });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('arrow shift + down on hh segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(hh);
                test_drive_react_1.simulate.click(hh);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('down'), shiftKey: true });
            });
            it('hh input should have "12" value', function () {
                test_drive_react_1.expect(hh).attr('value', '12');
            });
            it('onChange should be callen with "12:59"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '12:59' });
                    return [2 /*return*/];
                });
            }); });
        });
        describeDesktop('shift + stepper up (mm focus)', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.click(stepperIncrement, { shiftKey: true });
            });
            it('hh input should have "14" value', function () {
                test_drive_react_1.expect(hh).attr('value', '14');
            });
            it('mm input should have "09" value', function () {
                test_drive_react_1.expect(mm).attr('value', '09');
            });
            itDesktop('mm input should have selection', function () {
                test_drive_react_1.expect([mm.selectionStart, mm.selectionEnd]).to.deep.equal([0, 2]);
            });
            it('onChange should be callen with "14:09"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '14:09' });
                    return [2 /*return*/];
                });
            }); });
        });
        describeDesktop('shift + stepper down (mm focus)', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.click(stepperDecrement, { shiftKey: true });
            });
            it('mm input should have "49" value', function () {
                test_drive_react_1.expect(mm).attr('value', '49');
            });
            it('onChange should be callen with "13:49"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '13:49' });
                    return [2 /*return*/];
                });
            }); });
        });
        describeDesktop('shift + stepper up (hh focus)', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(hh);
                test_drive_react_1.simulate.click(hh);
                test_drive_react_1.simulate.click(stepperIncrement, { shiftKey: true });
            });
            it('hh input should have "14" value', function () {
                test_drive_react_1.expect(hh).attr('value', '14');
            });
            itDesktop('hh input should have selection', function () {
                test_drive_react_1.expect([hh.selectionStart, hh.selectionEnd]).to.deep.equal([0, 2]);
            });
            it('onChange should be callen with "14:59"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '14:59' });
                    return [2 /*return*/];
                });
            }); });
        });
        describeDesktop('shift + stepper down (hh focus)', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(hh);
                test_drive_react_1.simulate.click(hh);
                test_drive_react_1.simulate.click(stepperDecrement, { shiftKey: true });
            });
            it('hh input should have "12" value', function () {
                test_drive_react_1.expect(hh).attr('value', '12');
            });
            itDesktop('hh input should have selection', function () {
                test_drive_react_1.expect([hh.selectionStart, hh.selectionEnd]).to.deep.equal([0, 2]);
            });
            it('onChange should be callen with "12:59"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '12:59' });
                    return [2 /*return*/];
                });
            }); });
        });
        describe('arrow up on mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('up') });
            });
            it('hh input should have "14" value', function () {
                test_drive_react_1.expect(hh).attr('value', '14');
            });
            it('mm input should have "00" value', function () {
                test_drive_react_1.expect(mm).attr('value', '00');
            });
            it('onChange should be callen with "14:00"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '14:00' });
                    return [2 /*return*/];
                });
            }); });
        });
    });
    describe('render with onChange={onChange} format=ampm" value="11:59"', function () {
        var onChange;
        var renderer;
        var hh;
        var mm;
        var ampm;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "ampm", value: "11:59", onChange: onChange }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            ampm = renderer.select('TIME_PICKER_AMPM');
        });
        describe('arrow up on mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('up') });
            });
            it('hh input should have "12" value', function () {
                test_drive_react_1.expect(hh).attr('value', '12');
            });
            it('mm input should have "00" value', function () {
                test_drive_react_1.expect(mm).attr('value', '00');
            });
            itDesktop('ampm input should have "PM" value', function () {
                test_drive_react_1.expect(ampm).text('PM');
            });
            it('onChange should be callen with "12:00"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '12:00' });
                    return [2 /*return*/];
                });
            }); });
        });
    });
    describe('render with onChange={onChange} format="ampm" value="23:59"', function () {
        var onChange;
        var renderer;
        var hh;
        var mm;
        var ampm;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "ampm", value: "23:59", onChange: onChange }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            ampm = renderer.select('TIME_PICKER_AMPM');
        });
        describe('arrow up on hh segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(hh);
                test_drive_react_1.simulate.click(hh);
                test_drive_react_1.simulate.keyDown(hh, { keyCode: keycode('up') });
            });
            itDesktop('hh input should have "12" value', function () {
                test_drive_react_1.expect(hh).attr('value', '12');
            });
            itNative('hh input should have "00" value', function () {
                test_drive_react_1.expect(hh).attr('value', '00');
            });
            it('mm input should have "59" value', function () {
                test_drive_react_1.expect(mm).attr('value', '59');
            });
            itDesktop('ampm input should have "AM" value', function () {
                test_drive_react_1.expect(ampm).text('AM');
            });
            it('onChange should be callen with "00:59"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '00:59' });
                    return [2 /*return*/];
                });
            }); });
        });
    });
    describe('render with onChange={onChange} format="ampm" value="00:00"', function () {
        var onChange;
        var renderer;
        var hh;
        var mm;
        var ampm;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "ampm", value: "00:00", onChange: onChange }));
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            ampm = renderer.select('TIME_PICKER_AMPM');
        });
        describe('arrow down on mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                test_drive_react_1.simulate.click(mm);
                test_drive_react_1.simulate.keyDown(mm, { keyCode: keycode('down') });
            });
            itDesktop('hh input should have "11" value', function () {
                test_drive_react_1.expect(hh).attr('value', '11');
            });
            itNative('hh input should have "23" value', function () {
                test_drive_react_1.expect(hh).attr('value', '23');
            });
            it('mm input should have "59" value', function () {
                test_drive_react_1.expect(mm).attr('value', '59');
            });
            itDesktop('ampm input should have "PM" value', function () {
                test_drive_react_1.expect(ampm).text('PM');
            });
            it('onChange should be callen with "23:59"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '23:59' });
                    return [2 /*return*/];
                });
            }); });
        });
    });
    describe('render with format="24h" value="01:55"', function () {
        var renderer;
        var root;
        var hh;
        var mm;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "24h", value: "01:55" }));
            root = renderer.select('TIME_PICKER');
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
        });
        describe('entering "1" into hh segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(hh);
                hh.value = '1';
                test_drive_react_1.simulate.change(hh);
            });
            it('should set focus state', function () {
                has_css_state_1.hasCssState(root, time_picker_st_css_1.default, { focus: true });
            });
            it('hh input should have "1" value', function () {
                test_drive_react_1.expect(hh).attr('value', '1');
            });
            it('mm input should have "55" value', function () {
                test_drive_react_1.expect(mm).attr('value', '55');
            });
            it('should keep curson in hh segment', function () {
                test_drive_react_1.expect(document.activeElement).to.equal(hh);
            });
        });
    });
    describeNative('render with value="01:59" format="ampm" (touch)', function () {
        var renderer;
        var stepperIncrement;
        var stepperDecrement;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "ampm", value: "01:59" }));
            stepperIncrement = renderer.select('STEPPER_INCREMENT');
            stepperDecrement = renderer.select('STEPPER_DECREMENT');
        });
        it('should not render stepperIncrement', function () {
            test_drive_react_1.expect(stepperIncrement).to.be.null;
        });
        it('should not render stepperDecrement', function () {
            test_drive_react_1.expect(stepperDecrement).to.be.null;
        });
    });
    describe('render with onChange={onChange} format="ampm" value="04:55"', function () {
        var onChange;
        var renderer;
        var root;
        var hh;
        var mm;
        var ampm;
        beforeEach(function () {
            onChange = test_drive_react_1.sinon.spy();
            renderer = clientRenderer.render(React.createElement(src_1.TimePicker, { format: "ampm", value: "04:55", onChange: onChange }));
            root = renderer.select('TIME_PICKER');
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            ampm = renderer.select('TIME_PICKER_AMPM');
        });
        describe('entering "3" into mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                mm.value = '3';
                test_drive_react_1.simulate.change(mm);
            });
            it('should set focus state', function () {
                has_css_state_1.hasCssState(root, time_picker_st_css_1.default, { focus: true });
            });
            it('hh input should have "04" value', function () {
                test_drive_react_1.expect(hh).attr('value', '04');
            });
            it('mm input should have "3" value', function () {
                test_drive_react_1.expect(mm).attr('value', '3');
            });
            itDesktop('ampm should have "AM" value', function () {
                test_drive_react_1.expect(ampm).text('AM');
            });
            it('should keep selection on mm segment', function () {
                test_drive_react_1.expect(document.activeElement).to.equal(mm);
            });
            it('onChange should not be callen', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                        case 1:
                            _a.sent();
                            test_drive_react_1.expect(onChange).to.not.be.called;
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('entering "7" into mm segment', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(mm);
                mm.value = '7';
                test_drive_react_1.simulate.change(mm);
            });
            it('should set focus state', function () {
                has_css_state_1.hasCssState(root, time_picker_st_css_1.default, { focus: true });
            });
            it('hh input should have "04" value', function () {
                test_drive_react_1.expect(hh).attr('value', '04');
            });
            it('mm input should have "07" value', function () {
                test_drive_react_1.expect(mm).attr('value', '07');
            });
            itDesktop('ampm should have "AM" value', function () {
                test_drive_react_1.expect(ampm).text('AM');
            });
            itDesktop('should move selection on ampm segment', function () {
                test_drive_react_1.expect(document.activeElement).to.equal(ampm);
            });
            it('onChange should be callen with "04:07"', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '04:07' });
                    return [2 /*return*/];
                });
            }); });
        });
        describeDesktop('focus and change ampm input', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.focus(ampm);
                test_drive_react_1.simulate.keyDown(ampm, { keyCode: keycode('space') });
            });
            it('onChange should be callen with "16:55"', function () {
                test_drive_react_1.expect(onChange).to.be.calledWithExactly({ value: '16:55' });
            });
        });
    });
    describeDesktop('Render <TimePickerDemo/>', function () {
        var renderer;
        var firstInputHH;
        var firstInputMM;
        var firstStepperUp;
        var secondInputHH;
        var secondInputMM;
        var secondStepperUp;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(time_picker_demo_1.TimePickerDemo, null));
            firstInputHH = renderer.select('TIME_PICKER_DEMO_CONTROLLED_24', 'TIME_PICKER_INPUT_HH');
            firstInputMM = renderer.select('TIME_PICKER_DEMO_CONTROLLED_24', 'TIME_PICKER_INPUT_MM');
            firstStepperUp = renderer.select('TIME_PICKER_DEMO_CONTROLLED_24', 'STEPPER_INCREMENT');
            secondInputHH = renderer.select('TIME_PICKER_DEMO_CONTROLLED_AMPM', 'TIME_PICKER_INPUT_HH');
            secondInputMM = renderer.select('TIME_PICKER_DEMO_CONTROLLED_AMPM', 'TIME_PICKER_INPUT_MM');
            secondStepperUp = renderer.select('TIME_PICKER_DEMO_CONTROLLED_AMPM', 'STEPPER_INCREMENT');
        });
        describe('focus on hh segment on first input', function () {
            it('should keep focus on hh segment of first input', function () {
                test_drive_react_1.simulate.focus(firstInputHH);
                test_drive_react_1.simulate.click(firstStepperUp);
                test_drive_react_1.expect(document.activeElement === firstInputHH).to.be.true;
            });
        });
        describe('focus on mm segment on first input', function () {
            it('should keep focus on mm segment on first input', function () {
                test_drive_react_1.simulate.focus(firstInputMM);
                test_drive_react_1.simulate.click(firstStepperUp);
                test_drive_react_1.expect(document.activeElement === firstInputMM).to.be.true;
            });
        });
        describe('initial click on stepper inside first input', function () {
            it('should move focus on hh segment on first input', function () {
                test_drive_react_1.simulate.click(firstStepperUp);
                test_drive_react_1.expect(document.activeElement === firstInputHH).to.be.true;
            });
        });
        describe('focus on mm segment on first input then on mm segment on second input then', function () {
            beforeEach(function () {
                test_drive_react_1.simulate.click(firstInputMM);
                test_drive_react_1.simulate.focus(firstInputMM);
            });
            describe('focus on mm segment on second input', function () {
                beforeEach(function () {
                    test_drive_react_1.simulate.blur(firstInputMM);
                    test_drive_react_1.simulate.click(secondInputMM);
                    test_drive_react_1.simulate.focus(secondInputMM);
                });
                describe.skip('click on stepper in first input', function () {
                    it('should set focus on hh on first input', function () {
                        test_drive_react_1.simulate.blur(secondInputMM);
                        test_drive_react_1.simulate.focus(firstStepperUp);
                        test_drive_react_1.simulate.click(firstStepperUp);
                        test_drive_react_1.expect(document.activeElement === firstInputHH).to.be.true;
                    });
                });
            });
        });
    });
});
describe('TimePicker/utils', function () {
    describe('formatTimeChunk()', function () {
        it('""', function () {
            test_drive_react_1.expect(utils_1.formatTimeChunk('')).to.equal('00');
        });
        it('"1"', function () {
            test_drive_react_1.expect(utils_1.formatTimeChunk('1')).to.equal('01');
        });
        it('"12"', function () {
            test_drive_react_1.expect(utils_1.formatTimeChunk('12')).to.equal('12');
        });
    });
    describe('to24()', function () {
        it('12 AM = 0', function () {
            test_drive_react_1.expect(utils_1.to24(12, utils_1.Ampm.AM)).to.equal(0);
        });
        it('1 AM = 1', function () {
            test_drive_react_1.expect(utils_1.to24(1, utils_1.Ampm.AM)).to.equal(1);
        });
        it('12 PM = 12', function () {
            test_drive_react_1.expect(utils_1.to24(12, utils_1.Ampm.PM)).to.equal(12);
        });
        it('11 PM = 23', function () {
            test_drive_react_1.expect(utils_1.to24(11, utils_1.Ampm.PM)).to.equal(23);
        });
    });
    describe('toAmpm()', function () {
        it('0 = 12 AM', function () {
            test_drive_react_1.expect(utils_1.toAmpm(0)).to.deep.equal({ hh: 12, ampm: utils_1.Ampm.AM });
        });
        it('1 = 1 AM', function () {
            test_drive_react_1.expect(utils_1.toAmpm(1)).to.deep.equal({ hh: 1, ampm: utils_1.Ampm.AM });
        });
        it('12 = 12 PM', function () {
            test_drive_react_1.expect(utils_1.toAmpm(12)).to.deep.equal({ hh: 12, ampm: utils_1.Ampm.PM });
        });
        it('15 = 3 PM', function () {
            test_drive_react_1.expect(utils_1.toAmpm(15)).to.deep.equal({ hh: 3, ampm: utils_1.Ampm.PM });
        });
    });
    describe('isValidValue()', function () {
        it('11:00 AM = true', function () {
            test_drive_react_1.expect(utils_1.isValidValue(11, 'hh', utils_1.Ampm.AM)).to.equal(true);
        });
        it('11:00 PM = true', function () {
            test_drive_react_1.expect(utils_1.isValidValue(11, 'hh', utils_1.Ampm.PM)).to.equal(true);
        });
        it('13:00 PM = false', function () {
            test_drive_react_1.expect(utils_1.isValidValue(13, 'hh', utils_1.Ampm.PM)).to.equal(false);
        });
        it('13:00 = true', function () {
            test_drive_react_1.expect(utils_1.isValidValue(13, 'hh', utils_1.Ampm.NONE)).to.equal(true);
        });
        it('25:00 = false', function () {
            test_drive_react_1.expect(utils_1.isValidValue(25, 'hh', utils_1.Ampm.NONE)).to.equal(false);
        });
        it('11:25 = true', function () {
            test_drive_react_1.expect(utils_1.isValidValue(25, 'mm', utils_1.Ampm.NONE)).to.equal(true);
        });
        it('11:65 = false', function () {
            test_drive_react_1.expect(utils_1.isValidValue(65, 'mm', utils_1.Ampm.NONE)).to.equal(false);
        });
    });
});
//# sourceMappingURL=time-picker.spec.js.map