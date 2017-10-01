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
var checkbox_demo_1 = require("../../demo/components/checkbox-demo");
var src_1 = require("../../src");
var checkbox_driver_1 = require("../../test-kit/components/checkbox-driver");
var sleep_1 = require("../utils/sleep");
var CheckBoxDemoDriver = /** @class */ (function (_super) {
    __extends(CheckBoxDemoDriver, _super);
    function CheckBoxDemoDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.basicDemo = {
            checkbox: new checkbox_driver_1.CheckBoxTestDriver(function () { return _this.select('BASIC_DEMO', 'BASIC_DEMO_CHECKBOX'); }),
            button: _this.select('BASIC_DEMO', 'BUTTON_SUBMIT')
        };
        _this.disabledDemo = {
            checkbox: new checkbox_driver_1.CheckBoxTestDriver(function () { return _this.select('DISABLED_DEMO', 'DISABLED_DEMO_CHECKBOX'); })
        };
        _this.indeterminateDemo = {
            topCheckbox: new checkbox_driver_1.CheckBoxTestDriver(function () { return _this.select('INDETERMINATE_DEMO_TOP_LEVEL'); }),
            option1Checkbox: new checkbox_driver_1.CheckBoxTestDriver(function () { return _this.select('INDETERMINATE_DEMO_OPTION1'); }),
            option2Checkbox: new checkbox_driver_1.CheckBoxTestDriver(function () { return _this.select('INDETERMINATE_DEMO_OPTION2'); })
        };
        return _this;
    }
    CheckBoxDemoDriver.ComponentClass = checkbox_demo_1.CheckBoxDemo;
    return CheckBoxDemoDriver;
}(test_drive_react_1.DriverBase));
describe('<Checkbox/>', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () {
        clientRenderer.cleanup();
    });
    describe('Component / Demo test', function () {
        it('Basic demo', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, driver, waitForDom, checkbox, button;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(checkbox_demo_1.CheckBoxDemo, null)).withDriver(CheckBoxDemoDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                        checkbox = driver.basicDemo.checkbox;
                        button = driver.basicDemo.button;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.root, 'basic root').to.be.present();
                                test_drive_react_1.expect(checkbox.isChecked(), 'expected checkbox to be unchecked').to.equal(false);
                                test_drive_react_1.expect(checkbox.children[0], 'basic label').to.have.text(checkbox_demo_1.demoCheckBoxText);
                                test_drive_react_1.expect(button, 'submit button was expected to be diabled').to.have.attribute('disabled');
                            })];
                    case 1:
                        _b.sent();
                        checkbox.click();
                        return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                                test_drive_react_1.expect(checkbox.isChecked(), 'expected checkbox to be checked').to.equal(true);
                                test_drive_react_1.expect(checkbox.tickMark).to.be.insideOf(checkbox.box);
                                test_drive_react_1.expect(button, 'submit button was expected to be enabled').to.not.have.attribute('disabled');
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Disabled Demo', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, driver, waitForDom, checkbox;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(checkbox_demo_1.CheckBoxDemo, null)).withDriver(CheckBoxDemoDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                        checkbox = driver.disabledDemo.checkbox;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.root, 'disabled root').to.be.present();
                                test_drive_react_1.expect(checkbox.box, 'disabled box').to.be.present();
                                test_drive_react_1.expect(checkbox.isChecked(), 'disabled checkbox should not be checked').to.equal(false);
                            })];
                    case 1:
                        _b.sent();
                        checkbox.click();
                        return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                                test_drive_react_1.expect(checkbox.box, 'disabled box').to.be.present();
                                test_drive_react_1.expect(checkbox.isChecked(), 'disabled checkbox should not be checked').to.equal(false);
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Indeterminate Demo', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, driver, waitForDom, _b, topCheckbox, option1Checkbox, option2Checkbox;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(checkbox_demo_1.CheckBoxDemo, null)).withDriver(CheckBoxDemoDriver), driver = _a.driver, waitForDom = _a.waitForDom;
                        _b = driver.indeterminateDemo, topCheckbox = _b.topCheckbox, option1Checkbox = _b.option1Checkbox, option2Checkbox = _b.option2Checkbox;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(option1Checkbox.isChecked(), 'option 1 should be checked').to.equal(true);
                                test_drive_react_1.expect(option2Checkbox.isChecked(), 'option 2 should be unchecked').to.equal(false);
                                test_drive_react_1.expect(topCheckbox.isChecked(), 'top checkbox should be unchecked').to.equal(false);
                                test_drive_react_1.expect(topCheckbox.isIndeterminate(), 'top checkbox should be indeterminate').to.equal(true);
                            })];
                    case 1:
                        _c.sent();
                        topCheckbox.click();
                        return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                                test_drive_react_1.expect(option1Checkbox.isChecked(), 'option 1 should be checked').to.equal(true);
                                test_drive_react_1.expect(option2Checkbox.isChecked(), 'option 2 should be checked').to.equal(true);
                            })];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('Renders with default values', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, checkbox, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.CheckBox, null)).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(checkbox.root).to.be.present();
                            test_drive_react_1.expect(checkbox.isChecked(), 'checkbox was expected to be unchecked').to.equal(false);
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Displays children', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, checkbox, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.CheckBox, null,
                        React.createElement("span", null, "covfefe"))).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(checkbox.children[0]).to.have.text('covfefe');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Displays a box icon', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, checkbox, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.CheckBox, null)).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(checkbox.box).to.be.present();
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Aligns children and box icon', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, checkbox, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.CheckBox, null,
                        React.createElement("span", null, "yoyo"))).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(checkbox.children[0]).to.have.text('yoyo');
                            test_drive_react_1.expect([checkbox.box, checkbox.children[0]]).to.be.verticallyAligned('bottom', 5);
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Displays custom tick mark when value is true', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, checkbox, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.CheckBox, { value: true })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(checkbox.box).to.be.present();
                            test_drive_react_1.expect(checkbox.box).to.have.attribute('data-name', 'custom-box');
                            test_drive_react_1.expect(checkbox.tickMark).to.be.present();
                            test_drive_react_1.expect(checkbox.tickMark).to.have.attribute('data-name', 'custom-tickmark');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Calls onChange when clicked', function () { return __awaiter(_this, void 0, void 0, function () {
        var onChange, _a, checkbox, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onChange = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.CheckBox, { value: true, onChange: onChange })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(checkbox.root).to.be.present();
                        })];
                case 1:
                    _b.sent();
                    checkbox.click();
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            test_drive_react_1.expect(onChange).to.have.been.calledOnce;
                            test_drive_react_1.expect(onChange).to.have.been.calledWithMatch({ value: false });
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Accessibility features', function () {
        it('Renders a native input and pass on checked state', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, checkbox, waitForDom, nativeInput;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { value: true })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        nativeInput = checkbox.nativeInput;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(nativeInput, 'native input not found in DOM').to.be.present();
                                test_drive_react_1.expect(nativeInput).to.be.instanceOf(HTMLInputElement);
                                test_drive_react_1.expect(nativeInput).to.have.attribute('type', 'checkbox');
                                test_drive_react_1.expect(nativeInput, 'native checkbox should be checked').to.have.property('checked', true);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('native input gets disabled state', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, checkbox, waitForDom, nativeInput;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { disabled: true })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        nativeInput = checkbox.nativeInput;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(nativeInput, 'native checkbox should be disabled').to.have.attribute('disabled');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('native input gets id prop if supplied by user', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, checkbox, waitForDom, nativeInput;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { id: "covfefe" })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        nativeInput = checkbox.nativeInput;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(nativeInput, 'native checkbox should have id').to.have.attribute('id', 'covfefe');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('component gets tabIndex 0 by default', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, null)).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.nativeInput).to.have.attribute('tabIndex', '0');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('component gets tabIndex supplied by the user', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { tabIndex: 99998 })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.nativeInput).to.have.attribute('tabIndex', '99998');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('When disabled', function () {
        it('doesn\'t call onChange when clicked', function () { return __awaiter(_this, void 0, void 0, function () {
            var onChange, _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        onChange = test_drive_react_1.sinon.spy();
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { disabled: true, onChange: onChange })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.root).to.be.present();
                            })];
                    case 1:
                        _b.sent();
                        checkbox.click();
                        return [4 /*yield*/, sleep_1.sleep(10)];
                    case 2:
                        _b.sent();
                        test_drive_react_1.expect(onChange).to.not.have.been.called;
                        return [2 /*return*/];
                }
            });
        }); });
        it('displays tickmark if value is true', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { disabled: true, value: true })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.isChecked()).to.equal(true);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('displays indeterminate icon', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { disabled: true, value: true, indeterminate: true })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.isIndeterminate()).to.equal(true);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('When readonly', function () {
        it('doesn\'t call onChange when clicked', function () { return __awaiter(_this, void 0, void 0, function () {
            var onChange, _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        onChange = test_drive_react_1.sinon.spy();
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { readonly: true, onChange: onChange })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.root).to.be.present();
                            })];
                    case 1:
                        _b.sent();
                        checkbox.click();
                        return [4 /*yield*/, sleep_1.sleep(10)];
                    case 2:
                        _b.sent();
                        test_drive_react_1.expect(onChange).to.not.have.been.called;
                        return [2 /*return*/];
                }
            });
        }); });
        it('displays tickmark if value is true', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { readonly: true, value: true })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.isChecked()).to.equal(true);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('When indeterminate', function () {
        it('renders indeterminate icon when value is true', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { value: true, indeterminate: true })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.box).to.be.present();
                                test_drive_react_1.expect(checkbox.isIndeterminate()).to.equal(true);
                                test_drive_react_1.expect(checkbox.isChecked()).to.equal(false);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders indeterminate icon when value is false', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { value: false, indeterminate: true })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.box).to.be.present();
                                test_drive_react_1.expect(checkbox.isIndeterminate()).to.equal(true);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('click calls onChange with value true', function () { return __awaiter(_this, void 0, void 0, function () {
            var onChange, _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        onChange = test_drive_react_1.sinon.spy();
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { value: true, onChange: onChange, indeterminate: true })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.root).to.be.present();
                            })];
                    case 1:
                        _b.sent();
                        checkbox.click();
                        return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                                test_drive_react_1.expect(onChange).to.have.been.calledOnce;
                                test_drive_react_1.expect(onChange).to.have.been.calledWithMatch({ value: true });
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not call onChange when disabled', function () { return __awaiter(_this, void 0, void 0, function () {
            var onChange, _a, checkbox, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        onChange = test_drive_react_1.sinon.spy();
                        _a = clientRenderer.render(React.createElement(src_1.CheckBox, { disabled: true, onChange: onChange, indeterminate: true })).withDriver(checkbox_driver_1.CheckBoxTestDriver), checkbox = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(checkbox.root).to.be.present();
                            })];
                    case 1:
                        _b.sent();
                        checkbox.click();
                        return [4 /*yield*/, sleep_1.sleep(10)];
                    case 2:
                        _b.sent();
                        test_drive_react_1.expect(onChange).to.not.have.been.called;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=checkbox.spec.js.map