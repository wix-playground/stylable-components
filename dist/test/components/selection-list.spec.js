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
var selection_list_demo_1 = require("../../demo/components/selection-list-demo");
var src_1 = require("../../src");
var test_kit_1 = require("../../test-kit");
var utils_1 = require("../utils");
var SelectionListDemoDriver = /** @class */ (function (_super) {
    __extends(SelectionListDemoDriver, _super);
    function SelectionListDemoDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.food = {
            list: new test_kit_1.SelectionListTestDriver(function () { return _this.select('FOOD', 'LIST'); }),
            result: _this.select('FOOD', 'RESULT')
        };
        _this.emoji = {
            list: new test_kit_1.SelectionListTestDriver(function () { return _this.select('EMOJI', 'LIST'); }),
            result: _this.select('EMOJI', 'RESULT')
        };
        _this.textStyle = {
            list: new test_kit_1.SelectionListTestDriver(function () { return _this.select('TEXT_STYLE', 'LIST'); }),
            result: _this.select('TEXT_STYLE', 'RESULT')
        };
        return _this;
    }
    SelectionListDemoDriver.ComponentClass = selection_list_demo_1.SelectionListDemo;
    return SelectionListDemoDriver;
}(test_drive_react_1.DriverBase));
exports.SelectionListDemoDriver = SelectionListDemoDriver;
describe('<SelectionList />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () {
        clientRenderer.cleanup();
    });
    it('Takes a list of options and allows to select one', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, demo, waitForDom, _b, list, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(selection_list_demo_1.SelectionListDemo, null)).withDriver(SelectionListDemoDriver), demo = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(demo.root).to.be.present; })];
                case 1:
                    _c.sent();
                    _b = demo.food, list = _b.list, result = _b.result;
                    list.click(list.items[1]);
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(result).to.contain.text('Bacon'); })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Works with a custom renderer and data schema', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, demo, waitForDom, _b, list, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(selection_list_demo_1.SelectionListDemo, null)).withDriver(SelectionListDemoDriver), demo = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(demo.root).to.be.present; })];
                case 1:
                    _c.sent();
                    _b = demo.emoji, list = _b.list, result = _b.result;
                    test_drive_react_1.expect(list.items[3]).to.contain.text('🐘');
                    list.click(list.items[3]);
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(result).to.contain.text('elephant'); })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Works with options specified as children', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, demo, waitForDom, _b, list, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(selection_list_demo_1.SelectionListDemo, null)).withDriver(SelectionListDemoDriver), demo = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(demo.root).to.be.present; })];
                case 1:
                    _c.sent();
                    _b = demo.textStyle, list = _b.list, result = _b.result;
                    list.click(list.items[5]);
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(result.className).to.match(/text-style-label/); })];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Renders items under each other using the default renderer', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, list, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['0', '1', src_1.SelectionListDividerSymbol] })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                case 1:
                    _b.sent();
                    test_drive_react_1.expect(list.items).to.be.inVerticalSequence();
                    test_drive_react_1.expect(list.items).to.be.horizontallyAligned('left');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Fires onChange when an item is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
        var onChange, _a, list, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onChange = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['0', '1'], value: "0", onChange: onChange })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                case 1:
                    _b.sent();
                    list.click(list.items[1]);
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(onChange).to.have.been.calledOnce.calledWithExactly({ value: '1' });
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Fires onChange when an element inside of the item is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
        var onChange, _a, list, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onChange = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.SelectionList, { value: "0", onChange: onChange },
                        React.createElement(src_1.SelectionListOption, { value: "0" },
                            "Item ",
                            React.createElement("strong", null, "#0")),
                        React.createElement(src_1.SelectionListOption, { value: "1" },
                            "Item ",
                            React.createElement("strong", null, "#1")))).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                case 1:
                    _b.sent();
                    list.click(list.items[1].firstElementChild);
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(onChange).to.have.been.calledOnce.calledWithExactly({ value: '1' });
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Doesn't fire onChange for clicks on active items, disabled items, items without value, and dividers", function () { return __awaiter(_this, void 0, void 0, function () {
        var onChange, dataSource, _a, list, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onChange = test_drive_react_1.sinon.spy();
                    dataSource = [
                        { value: '0', label: 'Zero' },
                        { value: '1', label: 'One', disabled: true },
                        { label: 'Three' },
                        src_1.SelectionListDividerSymbol
                    ];
                    _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: dataSource, value: "0", onChange: onChange })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                case 1:
                    _b.sent();
                    list.click(list.items[0]);
                    list.click(list.items[1]);
                    list.click(list.items[2]);
                    list.click(list.items[3]);
                    return [4 /*yield*/, utils_1.sleep(16)];
                case 2:
                    _b.sent();
                    test_drive_react_1.expect(onChange).to.have.not.been.called;
                    return [2 /*return*/];
            }
        });
    }); });
    it('Renders blank items at the same height as normal items', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, list, waitForDom, _b, empty, full;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['', '1'] })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                case 1:
                    _c.sent();
                    _b = list.items, empty = _b[0], full = _b[1];
                    test_drive_react_1.expect(empty).to.have.width.at.least(full);
                    test_drive_react_1.expect(empty).to.have.width.at.most(full);
                    test_drive_react_1.expect(empty).to.have.height.at.least(full);
                    test_drive_react_1.expect(empty).to.have.height.at.most(full);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Renders a divider', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, list, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: [src_1.SelectionListDividerSymbol] })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                case 1:
                    _b.sent();
                    test_drive_react_1.expect(list.elementHasStylableClassName(list.items[0], 'divider')).to.equal(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Renders children above dataSource when both are provided', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, list, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['data'] },
                        React.createElement("div", null, "child"))).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                case 1:
                    _b.sent();
                    test_drive_react_1.expect(list.items[0]).to.contain.text('child');
                    test_drive_react_1.expect(list.items[1]).to.contain.text('data');
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Keyboard navigation', function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            it("Moves down on 'Down' press", function () { return __awaiter(_this, void 0, void 0, function () {
                var onChange, _a, list, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['-2', '-1', '0', '+1', '+2'], value: "0", onChange: onChange })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                        case 1:
                            _b.sent();
                            list.focus();
                            list.keyDown(keycode('down'));
                            list.keyDown(keycode('enter'));
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(onChange).to.have.been.calledOnce.calledWithExactly({ value: '+1' });
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Moves up on 'Up' press", function () { return __awaiter(_this, void 0, void 0, function () {
                var onChange, _a, list, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['-2', '-1', '0', '+1', '+2'], value: "0", onChange: onChange })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                        case 1:
                            _b.sent();
                            list.focus();
                            list.keyDown(keycode('up'));
                            list.keyDown(keycode('enter'));
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(onChange).to.have.been.calledOnce.calledWithExactly({ value: '-1' });
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Moves to the beginning on 'Home' press", function () { return __awaiter(_this, void 0, void 0, function () {
                var onChange, _a, list, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['-2', '-1', '0', '+1', '+2'], value: "0", onChange: onChange })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                        case 1:
                            _b.sent();
                            list.focus();
                            list.keyDown(keycode('home'));
                            list.keyDown(keycode('enter'));
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(onChange).to.have.been.calledOnce.calledWithExactly({ value: '-2' });
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Moves to the end on 'End' press", function () { return __awaiter(_this, void 0, void 0, function () {
                var onChange, _a, list, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['-2', '-1', '0', '+1', '+2'], value: "0", onChange: onChange })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                        case 1:
                            _b.sent();
                            list.focus();
                            list.keyDown(keycode('end'));
                            list.keyDown(keycode('enter'));
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(onChange).to.have.been.calledOnce.calledWithExactly({ value: '+2' });
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Moves to the beginning on 'Down' press if no item is selected", function () { return __awaiter(_this, void 0, void 0, function () {
                var onChange, _a, list, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['-2', '-1', '0', '+1', '+2'], onChange: onChange })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                        case 1:
                            _b.sent();
                            list.focus();
                            list.keyDown(keycode('down'));
                            list.keyDown(keycode('enter'));
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(onChange).to.have.been.calledOnce.calledWithExactly({ value: '-2' });
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Moves to the end on 'Up' press if no item is selected", function () { return __awaiter(_this, void 0, void 0, function () {
                var onChange, _a, list, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['-2', '-1', '0', '+1', '+2'], onChange: onChange })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                        case 1:
                            _b.sent();
                            list.focus();
                            list.keyDown(keycode('up'));
                            list.keyDown(keycode('enter'));
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(onChange).to.have.been.calledOnce.calledWithExactly({ value: '+2' });
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Selects item on 'Enter' press", function () { return __awaiter(_this, void 0, void 0, function () {
                var onChange, _a, list, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['-2', '-1', '0', '+1', '+2'], value: "0", onChange: onChange })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                        case 1:
                            _b.sent();
                            list.focus();
                            list.keyDown(keycode('down'));
                            list.keyDown(keycode('enter'));
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(onChange).to.have.been.calledOnce.calledWithExactly({ value: '+1' });
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Selects item on 'Space' press", function () { return __awaiter(_this, void 0, void 0, function () {
                var onChange, _a, list, waitForDom;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            onChange = test_drive_react_1.sinon.spy();
                            _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['-2', '-1', '0', '+1', '+2'], value: "0", onChange: onChange })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                        case 1:
                            _b.sent();
                            list.focus();
                            list.keyDown(keycode('down'));
                            list.keyDown(keycode('space'));
                            return [4 /*yield*/, waitForDom(function () {
                                    test_drive_react_1.expect(onChange).to.have.been.calledOnce.calledWithExactly({ value: '+1' });
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    describe("Styling", function () {
        it("Puts \"focused\" state on the container when it's focused", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, list, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.SelectionList, null)).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                    case 1:
                        _b.sent();
                        test_drive_react_1.expect(list.elementHasStylableState(list.root, 'focused')).to.equal(false);
                        list.focus();
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(list.elementHasStylableState(list.root, 'focused')).to.equal(true);
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("Puts \"selected\" state on the selected item", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, list, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['0', '1'], value: '0' })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                    case 1:
                        _b.sent();
                        test_drive_react_1.expect(list.elementHasStylableState(list.items[0], 'selected')).to.equal(true);
                        test_drive_react_1.expect(list.elementHasStylableState(list.items[1], 'selected')).to.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Puts \"focused\" state on the item focused via keyboard and removes it on blur", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, list, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.SelectionList, { dataSource: ['0', '1'], value: '0' })).withDriver(test_kit_1.SelectionListTestDriver), list = _a.driver, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(list.root).to.be.present; })];
                    case 1:
                        _b.sent();
                        list.focus();
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(list.elementHasStylableState(list.items[0], 'focused')).to.equal(true);
                                test_drive_react_1.expect(list.elementHasStylableState(list.items[1], 'focused')).to.equal(false);
                            })];
                    case 2:
                        _b.sent();
                        list.keyDown(keycode('down'));
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(list.elementHasStylableState(list.items[0], 'focused')).to.equal(false);
                                test_drive_react_1.expect(list.elementHasStylableState(list.items[1], 'focused')).to.equal(true);
                            })];
                    case 3:
                        _b.sent();
                        list.blur();
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(list.elementHasStylableState(list.items[0], 'focused')).to.equal(false);
                                test_drive_react_1.expect(list.elementHasStylableState(list.items[1], 'focused')).to.equal(false);
                            })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=selection-list.spec.js.map