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
var keycode = require("keycode");
var React = require("react");
var test_drive_react_1 = require("test-drive-react");
var drop_down_demo_1 = require("../../demo/components/drop-down.demo");
var src_1 = require("../../src");
var test_kit_1 = require("../../test-kit");
var DropDownDemoDriver = /** @class */ (function (_super) {
    __extends(DropDownDemoDriver, _super);
    function DropDownDemoDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dropdown = new test_kit_1.DropDownDriver(function () { return _this.select('DROP_DOWN_DEMO', 'DROP_DOWN'); });
        return _this;
    }
    DropDownDemoDriver.prototype.text = function () {
        return this.select('DROP_DOWN_DEMO').textContent;
    };
    DropDownDemoDriver.ComponentClass = drop_down_demo_1.DropDownDemo;
    return DropDownDemoDriver;
}(test_drive_react_1.DriverBase));
describe('<DropDown />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () { return clientRenderer.cleanup(); });
    var items = ['Muffins', 'Pancakes', 'Waffles'];
    it('renders a dropdown, opens it with a click, selects an item', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, demo, waitForDom, dropdown;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(drop_down_demo_1.DropDownDemo, null)).withDriver(DropDownDemoDriver), demo = _a.driver, waitForDom = _a.waitForDom;
                    dropdown = demo.dropdown;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false); })];
                case 1:
                    _b.sent();
                    dropdown.clickOnDropDown();
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be open').to.equal(true); })];
                case 2:
                    _b.sent();
                    dropdown.clickOnItem(0);
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(dropdown.list).to.be.absent();
                            test_drive_react_1.expect(demo.text()).to.equal('Muffins');
                        })];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders to the screen', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, dropdown, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.DropDown, null)).withDriver(test_kit_1.DropDownDriver), dropdown = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(dropdown.root).to.be.present();
                            test_drive_react_1.expect(dropdown.selection).to.equal('');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('has correct selected item text', function () { return __awaiter(_this, void 0, void 0, function () {
        var item, _a, dropdown, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    item = 'Test';
                    _a = clientRenderer.render(React.createElement(src_1.DropDown, { value: item }, item)).withDriver(test_kit_1.DropDownDriver), dropdown = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(dropdown.root).to.be.present();
                            test_drive_react_1.expect(dropdown.selection).to.equal(item);
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('doesn\'t open the dropdown if disabled', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, dropdown, waitForDom, container;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.DropDown, { open: true, disabled: true })).withDriver(test_kit_1.DropDownDriver), dropdown = _a.driver, waitForDom = _a.waitForDom, container = _a.container;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false); })];
                case 1:
                    _b.sent();
                    clientRenderer.render(React.createElement(src_1.DropDown, { open: true }), container);
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be open').to.equal(true); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('opens the dropdown when focused and openOnFocus is true', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, dropdown, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.DropDown, { openOnFocus: true })).withDriver(test_kit_1.DropDownDriver), dropdown = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false); })];
                case 1:
                    _b.sent();
                    dropdown.focus();
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be open').to.equal(true); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('toggles between dropdown visibility when the input is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, dropdown, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.DropDown, null)).withDriver(test_kit_1.DropDownDriver), dropdown = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false); })];
                case 1:
                    _b.sent();
                    dropdown.clickOnDropDown();
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be open').to.equal(true); })];
                case 2:
                    _b.sent();
                    dropdown.clickOnDropDown();
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false); })];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('displays item list to choose from when open is true', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, dropdown, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.DropDown, { open: true, dataSource: items })).withDriver(test_kit_1.DropDownDriver), dropdown = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(dropdown.list).to.be.present();
                            test_drive_react_1.expect(dropdown.items).to.have.length(3);
                            items.forEach(function (elem, idx) {
                                test_drive_react_1.expect(dropdown.items[idx]).to.be.present();
                                test_drive_react_1.expect(dropdown.items[idx]).to.have.text(elem);
                            });
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('invokes onClick handler when an item is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
        var onClick, dropdown;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onClick = test_drive_react_1.sinon.spy();
                    dropdown = clientRenderer.render(React.createElement(src_1.DropDown, { open: true, dataSource: items, onChange: onClick })).withDriver(test_kit_1.DropDownDriver).driver;
                    dropdown.clickOnItem(0);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(onClick).to.have.been.calledWithMatch({ value: items[0] }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Keyboard Navigation', function () {
        it('toggles visibility of selection list when SPACE is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, dropdown, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DropDown, null)).withDriver(test_kit_1.DropDownDriver), dropdown = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false); })];
                    case 1:
                        _b.sent();
                        dropdown.focus();
                        dropdown.keyDown(keycode('space'));
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be open').to.equal(true); })];
                    case 2:
                        _b.sent();
                        dropdown.keyDown(keycode('space'));
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false); })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('closes selection list when ESC is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, dropdown, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DropDown, null)).withDriver(test_kit_1.DropDownDriver), dropdown = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false); })];
                    case 1:
                        _b.sent();
                        dropdown.clickOnDropDown();
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be open').to.equal(true); })];
                    case 2:
                        _b.sent();
                        dropdown.keyDown(keycode('esc'));
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false); })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('opens selection list when DOWN is clicked and it is closed', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, dropdown, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.DropDown, null)).withDriver(test_kit_1.DropDownDriver), dropdown = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false); })];
                    case 1:
                        _b.sent();
                        dropdown.focus();
                        dropdown.keyDown(keycode('down'));
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(dropdown.isOpen(), 'expected list to be open').to.equal(true); })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=drop-down.spec.js.map