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
var radio_group_demo_1 = require("../../demo/components/radio-group-demo");
var src_1 = require("../../src");
var radio_group_driver_1 = require("../../test-kit/components/radio-group-driver");
var utils_1 = require("../utils");
var RadioGroupDemoTestDriver = /** @class */ (function (_super) {
    __extends(RadioGroupDemoTestDriver, _super);
    function RadioGroupDemoTestDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.group = new radio_group_driver_1.RadioGroupDriver(function () { return _this.select('GROUP_1_GROUP'); });
        return _this;
    }
    Object.defineProperty(RadioGroupDemoTestDriver.prototype, "result", {
        get: function () {
            return this.select('GROUP_1_RESULT').textContent;
        },
        enumerable: true,
        configurable: true
    });
    RadioGroupDemoTestDriver.ComponentClass = radio_group_demo_1.RadioGroupDemo;
    return RadioGroupDemoTestDriver;
}(test_drive_react_1.DriverBase));
describe('<RadioGroup />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () {
        clientRenderer.cleanup();
    });
    describe('The radio group user', function () {
        it('clicks on a button and it is selected', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, demo, waitForDom, button0;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(radio_group_demo_1.RadioGroupDemo, null)).withDriver(RadioGroupDemoTestDriver), demo = _a.driver, waitForDom = _a.waitForDom;
                        button0 = demo.group.getRadioButton(0);
                        return [4 /*yield*/, waitForDom(function () { test_drive_react_1.expect(button0.root).to.be.present(); })];
                    case 1:
                        _b.sent();
                        button0.click();
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(demo.result).to.equal('Value: This way!');
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('renders to the screen with unselected radio buttons as children', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom, button0, button1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, null,
                        React.createElement(src_1.RadioButton, { value: "Ifrit" }),
                        React.createElement(src_1.RadioButton, { value: "Titan" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    button0 = group.getRadioButton(0);
                    button1 = group.getRadioButton(1);
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(button0.root).to.be.present();
                            test_drive_react_1.expect(button0.isChecked(), 'expected radio to be unchecked').to.equal(false);
                            test_drive_react_1.expect(button0.value).to.equal('Ifrit');
                            test_drive_react_1.expect(button0.nativeElement).to.have.attribute('name', button1.nativeElement.name);
                            test_drive_react_1.expect(button1.root).to.be.present();
                            test_drive_react_1.expect(button1.isChecked(), 'expected radio to be unchecked').to.equal(false);
                            test_drive_react_1.expect(button1.value).to.equal('Titan');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders non RadioButton components as children', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, null,
                        React.createElement(src_1.RadioButton, { value: "1" }),
                        React.createElement("span", null, "Surprise!"),
                        React.createElement(src_1.RadioButton, { value: "2" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(group.items, 'expected RadioGroup to have 3 children').to.have.length(3);
                            test_drive_react_1.expect(group.items[1]).to.be.instanceOf(HTMLSpanElement);
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders the children with the given name value', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, { name: "kupo" },
                        React.createElement(src_1.RadioButton, { value: "Ultima" }),
                        React.createElement(src_1.RadioButton, { value: "Hades" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(group.getRadioButton(0).name).to.equal('kupo');
                            test_drive_react_1.expect(group.getRadioButton(1).name).to.equal('kupo');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('uses "value" prop to determine checked child', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, { value: "Sleipnir" },
                        React.createElement(src_1.RadioButton, { value: "Fafnir" }),
                        React.createElement(src_1.RadioButton, { value: "Sleipnir" }),
                        React.createElement(src_1.RadioButton, { value: "Snepnir" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(group.getRadioButton(1).isChecked(), 'expected radio to be checked').to.equal(true);
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('"value" prop on the group overrides "checked"  on child', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, { value: "Sleipnir" },
                        React.createElement(src_1.RadioButton, { value: "Fafnir", checked: true }),
                        React.createElement(src_1.RadioButton, { value: "Sleipnir" }),
                        React.createElement(src_1.RadioButton, { value: "Snepnir" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(group.getRadioButton(0).isChecked(), 'expected radio to be unchecked').to.equal(false);
                            test_drive_react_1.expect(group.getRadioButton(1).isChecked(), 'expected radio to be checked').to.equal(true);
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders calls the given onChange function on change', function () { return __awaiter(_this, void 0, void 0, function () {
        var onChange, _a, group, waitForDom, button1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onChange = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, { onChange: onChange },
                        React.createElement(src_1.RadioButton, { value: "Leviathan" }),
                        React.createElement(src_1.RadioButton, { value: "Quetzalcoatl" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    button1 = group.getRadioButton(1);
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(button1.root).to.be.present();
                        })];
                case 1:
                    _b.sent();
                    button1.click();
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            test_drive_react_1.expect(onChange).to.have.been.calledOnce;
                            test_drive_react_1.expect(onChange).to.have.been.calledWithMatch({ value: 'Quetzalcoatl' });
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sets the clicked radio button to be active on click', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom, button0, button1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, null,
                        React.createElement(src_1.RadioButton, { value: "Garuda" }),
                        React.createElement(src_1.RadioButton, { value: "Ramuh" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    button0 = group.getRadioButton(0);
                    button1 = group.getRadioButton(1);
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(button0.root).to.be.present();
                        })];
                case 1:
                    _b.sent();
                    button0.click();
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(button0.isChecked(), 'expected radio to be checked').to.equal(true);
                            test_drive_react_1.expect(button1.isChecked(), 'expected radio to be unchecked').to.equal(false);
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('changes the selected button when clicking on a different one', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom, button0, button1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, null,
                        React.createElement(src_1.RadioButton, { value: "Diabolos" }),
                        React.createElement(src_1.RadioButton, { value: "Bahamut" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    button0 = group.getRadioButton(0);
                    button1 = group.getRadioButton(1);
                    return [4 /*yield*/, waitForDom(function () { test_drive_react_1.expect(button0.root).to.be.present(); })];
                case 1:
                    _b.sent();
                    button0.click();
                    return [4 /*yield*/, waitForDom(function () { test_drive_react_1.expect(button0.isChecked(), 'expected radio to be checked').to.equal(true); })];
                case 2:
                    _b.sent();
                    button1.click();
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(button0.isChecked(), 'expected radio to be unchecked').to.equal(false);
                            test_drive_react_1.expect(button1.isChecked(), 'expected radio to be checked').to.equal(true);
                        })];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not affect buttons in a different radio group', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, select, waitForDom, group0, group1, button0InGroup0, button1InGroup1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement("div", null,
                        React.createElement(src_1.RadioGroup, { "data-automation-id": "GROUP_0" },
                            React.createElement(src_1.RadioButton, { value: "Siren" }),
                            React.createElement(src_1.RadioButton, { value: "Cerberus" })),
                        React.createElement(src_1.RadioGroup, { "data-automation-id": "GROUP_1" },
                            React.createElement(src_1.RadioButton, { value: "Alexander" }),
                            React.createElement(src_1.RadioButton, { value: "Odin" })))), select = _a.select, waitForDom = _a.waitForDom;
                    group0 = new radio_group_driver_1.RadioGroupDriver(function () { return select('GROUP_0'); });
                    group1 = new radio_group_driver_1.RadioGroupDriver(function () { return select('GROUP_1'); });
                    button0InGroup0 = group0.getRadioButton(0);
                    button1InGroup1 = group1.getRadioButton(1);
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(button0InGroup0.root).to.be.present();
                            test_drive_react_1.expect(button1InGroup1.root).to.be.present();
                        })];
                case 1:
                    _b.sent();
                    button0InGroup0.click();
                    return [4 /*yield*/, waitForDom(function () { test_drive_react_1.expect(button0InGroup0.isChecked(), 'expected radio to be checked').to.equal(true); })];
                case 2:
                    _b.sent();
                    button1InGroup1.click();
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(button0InGroup0.isChecked(), 'expected radio to be checked').to.equal(true);
                            test_drive_react_1.expect(button1InGroup1.isChecked(), 'expected radio to be checked').to.equal(true);
                        })];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('disabled all radio button children if the disabled prop is true', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, { disabled: true },
                        React.createElement(src_1.RadioButton, { value: "Fafnir" }),
                        React.createElement(src_1.RadioButton, { value: "Sleipnir" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(group.getRadioButton(0).isDisabled(), 'expected radio to be disabled').to.equal(true);
                            test_drive_react_1.expect(group.getRadioButton(1).isDisabled(), 'expected radio to be disabled').to.equal(true);
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Displays radio button children', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom, button0, button1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, null,
                        React.createElement(src_1.RadioButton, { value: "Fafnir" },
                            "YO",
                            React.createElement("span", null, "IMA SPAN")),
                        React.createElement(src_1.RadioButton, { value: "Sleipnir" }, "MO"))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    button0 = group.getRadioButton(0);
                    button1 = group.getRadioButton(1);
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(button0.children[0]).to.have.text('YO');
                            test_drive_react_1.expect(button0.children[1]).to.have.text('IMA SPAN');
                            test_drive_react_1.expect(button0.children[1]).to.be.instanceOf(HTMLSpanElement);
                            test_drive_react_1.expect(button1.children[0]).to.have.text('MO');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders children from the data source prop if given', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom, button0, button1, button2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, { value: "Child1", dataSource: [{ value: 'Child0' }, { value: 'Child1' }, { value: 'Child2' }] })).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    button0 = group.getRadioButton(0);
                    button1 = group.getRadioButton(1);
                    button2 = group.getRadioButton(2);
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(button0.root).to.be.present();
                            test_drive_react_1.expect(button0.value).to.equal('Child0');
                            test_drive_react_1.expect(button0.isChecked(), 'expected radio to be unchecked').to.equal(false);
                            test_drive_react_1.expect(button1.root).to.be.present();
                            test_drive_react_1.expect(button1.value).to.equal('Child1');
                            test_drive_react_1.expect(button1.isChecked(), 'expected radio to be checked').to.equal(true);
                            test_drive_react_1.expect(button2.root).to.be.present();
                            test_drive_react_1.expect(button2.value).to.equal('Child2');
                            test_drive_react_1.expect(button2.isChecked(), 'expected radio to be unchecked').to.equal(false);
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders data source item labels (supplied in prop)', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, group, waitForDom, button0, button1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.RadioGroup, { value: "Child1", dataSource: [{ value: 'BTN0', labelText: 'button0' }, { value: 'BTN1', labelText: 'button1' }] })).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                    button0 = group.getRadioButton(0);
                    button1 = group.getRadioButton(1);
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(button0.children[0]).to.be.instanceOf(HTMLLabelElement);
                            test_drive_react_1.expect(button0.children[0]).to.have.text('button0');
                            test_drive_react_1.expect(button1.children[0]).to.have.text('button1');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Accessibility', function () {
        it('if no child is checked - gives tabindex to the first one and the rest get -1', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, group, waitForDom, button0, button1, button2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.RadioGroup, { tabIndex: 8 },
                            React.createElement(src_1.RadioButton, { value: "male" }),
                            React.createElement(src_1.RadioButton, { value: "female" }),
                            React.createElement(src_1.RadioButton, { value: "other" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                        button0 = group.getRadioButton(0);
                        button1 = group.getRadioButton(1);
                        button2 = group.getRadioButton(2);
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(button0.nativeElement, 'first child should have tabindex 8').to.have.attribute('tabIndex', '8');
                                test_drive_react_1.expect(button1.nativeElement, 'second child should have tabindex -1').to.have.attribute('tabIndex', '-1');
                                test_drive_react_1.expect(button2.nativeElement, 'third child should have tabindex -1').to.have.attribute('tabIndex', '-1');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('if a child is checked - gives that child tabIndex and the rest get -1', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, group, waitForDom, button0, button1, button2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.RadioGroup, { value: "female" },
                            React.createElement(src_1.RadioButton, { value: "male" }),
                            React.createElement(src_1.RadioButton, { value: "female" }),
                            React.createElement(src_1.RadioButton, { value: "other" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                        button0 = group.getRadioButton(0);
                        button1 = group.getRadioButton(1);
                        button2 = group.getRadioButton(2);
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(button0.nativeElement, 'first child should have tabindex -1').to.have.attribute('tabIndex', '-1');
                                test_drive_react_1.expect(button1.nativeElement, 'second child should have tabindex 0').to.have.attribute('tabIndex', '0');
                                test_drive_react_1.expect(button2.nativeElement, 'third child should have tabindex -1').to.have.attribute('tabIndex', '-1');
                            })];
                    case 1:
                        _b.sent();
                        button2.click();
                        return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                                test_drive_react_1.expect(button0.nativeElement, 'first child should have tabindex -1').to.have.attribute('tabIndex', '-1');
                                test_drive_react_1.expect(button1.nativeElement, 'second child should have tabindex -1').to.have.attribute('tabIndex', '-1');
                                test_drive_react_1.expect(button2.nativeElement, 'third child should have tabindex 0').to.have.attribute('tabIndex', '0');
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Group has attribute role = radiogroup', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, group, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.RadioGroup, { name: "yaya" },
                            React.createElement(src_1.RadioButton, { value: "male" }))).withDriver(radio_group_driver_1.RadioGroupDriver), group = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(group.root).to.have.attribute('role', 'radiogroup');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('<RadioButton />', function () {
        it('renders a radio button to the screen', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, radio, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "Shiva" })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(radio.root).to.be.present();
                                test_drive_react_1.expect(radio.nativeElement).to.have.attribute('type', 'radio');
                                test_drive_react_1.expect(radio.value).to.equal('Shiva');
                                test_drive_react_1.expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders the label next to the radio button (right by default)', function () { return __awaiter(_this, void 0, void 0, function () {
            var distance, _a, radio, waitForDom, child;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        distance = 7;
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, null,
                            React.createElement("span", { style: { marginLeft: distance + 'px' } }, "Omega"))).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                        child = radio.children[0];
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(child).to.to.be.instanceOf(HTMLSpanElement);
                                test_drive_react_1.expect(child).to.have.text('Omega');
                                test_drive_react_1.expect([radio.icon, child]).to.be.horizontallyAligned;
                                test_drive_react_1.expect([radio.icon, child]).to.be.inHorizontalSequence({ distance: distance });
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders a checked button if the checked value is passed', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, radio, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "Chocobo", checked: true })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(radio.nativeElement).to.have.property('checked', true);
                                test_drive_react_1.expect(radio.isChecked(), 'expected radio to be checked').to.equal(true);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('set the radio buttons name to the given name', function () {
            var _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "Moogle", name: "mog" })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
            return waitForDom(function () {
                test_drive_react_1.expect(radio.name).to.equal('mog');
            });
        });
        it('calls the onClick function when clicked', function () { return __awaiter(_this, void 0, void 0, function () {
            var onChange, _a, radio, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        onChange = test_drive_react_1.sinon.spy();
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "Tonberry", onChange: onChange })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(radio.root).to.be.present();
                            })];
                    case 1:
                        _b.sent();
                        radio.click();
                        return [2 /*return*/, test_drive_react_1.waitFor(function () {
                                test_drive_react_1.expect(onChange).to.have.been.calledWithMatch({ value: 'Tonberry' });
                            })];
                }
            });
        }); });
        it('renders a disabled radio button', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, radio, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "Tonberry", disabled: true })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(radio.isDisabled(), 'expected radio to be disabled').to.equal(true);
                                test_drive_react_1.expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not call onChange when clicking disabled radio', function () { return __awaiter(_this, void 0, void 0, function () {
            var onChange, _a, radio, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        onChange = test_drive_react_1.sinon.spy();
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "Tonberry", disabled: true, onChange: onChange })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(radio.isDisabled(), 'expected radio to be disabled').to.equal(true);
                                test_drive_react_1.expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
                            })];
                    case 1:
                        _b.sent();
                        radio.click();
                        return [4 /*yield*/, utils_1.sleep(10)];
                    case 2:
                        _b.sent();
                        test_drive_react_1.expect(onChange).to.have.not.been.called;
                        test_drive_react_1.expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders a checked disabled radio button', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, radio, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "Tonberry", disabled: true, checked: true })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(radio.isDisabled(), 'expected radio to be disabled').to.equal(true);
                                test_drive_react_1.expect(radio.isChecked(), 'expected radio to be checked').to.equal(true);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders a readOnly radio button', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, radio, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "Tonberry", readOnly: true })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(radio.isReadOnly(), 'expected radio to be readonly').to.equal(true);
                                test_drive_react_1.expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not call onChange when clicking readOnly radio', function () { return __awaiter(_this, void 0, void 0, function () {
            var onChange, _a, radio, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        onChange = test_drive_react_1.sinon.spy();
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "Tonberry", readOnly: true, onChange: onChange })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(radio.isReadOnly(), 'expected radio to be readonly').to.equal(true);
                                test_drive_react_1.expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
                            })];
                    case 1:
                        _b.sent();
                        radio.click();
                        return [4 /*yield*/, utils_1.sleep(10)];
                    case 2:
                        _b.sent();
                        test_drive_react_1.expect(onChange).to.have.not.been.called;
                        test_drive_react_1.expect(radio.isChecked(), 'expected radio to be unchecked').to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders a checked readOnly radio button', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, radio, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "Tonberry", readOnly: true, checked: true })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(radio.isReadOnly(), 'expected radio to be readonly').to.equal(true);
                                test_drive_react_1.expect(radio.isChecked(), 'expected radio to be checked').to.equal(true);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders any children given to the component', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, select, waitForDom, child;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "" },
                            React.createElement("span", { "data-automation-id": "CHILD" }, "Offspring"))), select = _a.select, waitForDom = _a.waitForDom;
                        child = select('CHILD');
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(child).to.be.present();
                                test_drive_react_1.expect(child).to.be.instanceOf(HTMLSpanElement);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('Accessibility', function () {
            it('has tabIndex 0 by default', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, radio, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "yaya" })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(radio.nativeElement).to.have.attribute('tabIndex', '0');
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('gets tabIndex from the user', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, radio, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "yaya", tabIndex: 666 })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(radio.nativeElement).to.have.attribute('tabIndex', '666');
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('has aria-checked property when checked', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, radio, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "yaya", checked: true })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(radio.root).to.have.attribute('aria-checked', 'true');
                                })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('root has role - radio', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, radio, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(src_1.RadioButton, { value: "yaya", checked: true })).withDriver(radio_group_driver_1.RadioButtonDriver), radio = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(radio.root).to.have.attribute('role', 'radio');
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
//# sourceMappingURL=radio-group.spec.js.map