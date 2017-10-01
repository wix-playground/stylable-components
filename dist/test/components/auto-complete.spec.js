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
var auto_complete_demo_1 = require("../../demo/components/auto-complete.demo");
var src_1 = require("../../src");
var autoComp = 'AUTO_COMPLETE';
var autoCompDemo = autoComp + '_DEMO';
var autoCompInput = autoComp + '_INPUT';
var items = ['Muffins', 'Pancakes', 'Cupcakes', 'Souffles', 'Pasta', 'Soup', 'Caramel', 'Avazim', 'Moses'];
var bodySelect = test_drive_react_1.selectDom(document.body);
var bodyWaitForDom = test_drive_react_1.waitForDom.bind(null, document.body);
describe('<AutoComplete />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () { return clientRenderer.cleanup(); });
    describe('The autocomplete user', function () {
        it('types in the input and selects a value', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, select, waitForDom, prefix, filteredItems, itemList;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(auto_complete_demo_1.AutoCompleteDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                        prefix = 'P';
                        filteredItems = items.filter(function (item) { return item.startsWith(prefix); }).join('');
                        test_drive_react_1.simulate.click(select(autoComp + '_CARET'));
                        itemList = bodySelect('LIST');
                        return [4 /*yield*/, bodyWaitForDom(function () {
                                test_drive_react_1.expect(itemList).to.be.present();
                                test_drive_react_1.expect(itemList.textContent).to.equal(items.join(''));
                            })];
                    case 1:
                        _b.sent();
                        test_drive_react_1.trigger.change(bodySelect(autoCompInput), prefix);
                        return [4 /*yield*/, bodyWaitForDom(function () { return test_drive_react_1.expect(itemList.textContent).to.equal(filteredItems); })];
                    case 2:
                        _b.sent();
                        test_drive_react_1.simulate.click(bodySelect('LIST').children[0]);
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(select(autoCompDemo + '_TEXT')).to.have.text('You picked: Pancakes');
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('renders to the screen', function () {
        var _a = clientRenderer.render(React.createElement(src_1.AutoComplete, null)), select = _a.select, waitForDom = _a.waitForDom;
        return waitForDom(function () {
            test_drive_react_1.expect(select(autoComp)).to.be.present();
            test_drive_react_1.expect(bodySelect('LIST')).to.be.absent();
        });
    });
    it('invokes the onChange when text is entered to label', function () {
        var onChange = test_drive_react_1.sinon.spy();
        var select = clientRenderer.render(React.createElement(src_1.AutoComplete, { onChange: onChange })).select;
        select(autoComp, autoCompInput).value = 'abc';
        test_drive_react_1.simulate.change(select(autoComp, autoCompInput));
        return bodyWaitForDom(function () {
            test_drive_react_1.expect(onChange).to.have.been.calledOnce;
            test_drive_react_1.expect(onChange).to.have.been.calledWithMatch({ value: 'abc' });
        });
    });
    it('renders the item list if open is given', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientRenderer.render(React.createElement(src_1.AutoComplete, { dataSource: items, open: true }));
                    return [4 /*yield*/, bodyWaitForDom(function () { return test_drive_react_1.expect(bodySelect('LIST')).to.be.present(); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders the items if given', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientRenderer.render(React.createElement(src_1.AutoComplete, { open: true, dataSource: items }));
                    return [4 /*yield*/, bodyWaitForDom(function () { return test_drive_react_1.expect(bodySelect('LIST').children[0]).to.have.text('Muffins'); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('invokes the onChange when an option is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
        var onChange;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onChange = test_drive_react_1.sinon.spy();
                    clientRenderer.render(React.createElement(src_1.AutoComplete, { open: true, dataSource: ['Cat', 'Dog'], onChange: onChange }));
                    test_drive_react_1.simulate.click(bodySelect('LIST').children[0]);
                    return [4 /*yield*/, bodyWaitForDom(function () {
                            test_drive_react_1.expect(onChange).to.have.been.calledOnce;
                            test_drive_react_1.expect(onChange).to.have.been.calledWithMatch({ value: 'Cat' });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('displays filtered results according to given value', function () { return __awaiter(_this, void 0, void 0, function () {
        var prefix, filteredItems, itemList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prefix = 'P';
                    filteredItems = ['Pancakes', 'Pasta'];
                    clientRenderer.render(React.createElement(src_1.AutoComplete, { open: true, dataSource: items, value: prefix }));
                    itemList = bodySelect('LIST');
                    return [4 /*yield*/, bodyWaitForDom(function () {
                            test_drive_react_1.expect(itemList.textContent).to.equal(filteredItems.join(''));
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('ignores case when filtering according to the default filter', function () { return __awaiter(_this, void 0, void 0, function () {
        var prefix, filteredItems, itemList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prefix = 'm';
                    filteredItems = ['Muffins', 'Moses'];
                    clientRenderer.render(React.createElement(src_1.AutoComplete, { open: true, dataSource: items, value: prefix }));
                    itemList = bodySelect('LIST');
                    return [4 /*yield*/, bodyWaitForDom(function () {
                            test_drive_react_1.expect(itemList.textContent).to.equal(filteredItems.join(''));
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('places the caret inside the input and centers it', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, select, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.AutoComplete, null)), select = _a.select, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            var input = select(autoComp, autoCompInput);
                            var caret = select(autoComp, autoComp + '_CARET');
                            test_drive_react_1.expect(caret).to.be.insideOf(input);
                            test_drive_react_1.expect([input, caret]).to.be.verticallyAligned('center');
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls the onOpenStateChange event when clicking on the caret', function () { return __awaiter(_this, void 0, void 0, function () {
        var onOpenStateChange, _a, select, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onOpenStateChange = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.AutoComplete, { onOpenStateChange: onOpenStateChange })), select = _a.select, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(autoComp, autoComp + '_CARET')).to.be.present(); })];
                case 1:
                    _b.sent();
                    test_drive_react_1.simulate.click(select(autoComp, autoComp + '_CARET'));
                    return [4 /*yield*/, bodyWaitForDom(function () {
                            test_drive_react_1.expect(onOpenStateChange).to.have.been.calledOnce;
                            test_drive_react_1.expect(onOpenStateChange).to.have.been.calledWithMatch({ value: true });
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls the onOpenStateChange event when selecting an item', function () { return __awaiter(_this, void 0, void 0, function () {
        var onOpenStateChange, _a, select, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onOpenStateChange = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.AutoComplete, { dataSource: items, open: true, onOpenStateChange: onOpenStateChange })), select = _a.select, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(autoComp)).to.be.present(); })];
                case 1:
                    _b.sent();
                    test_drive_react_1.simulate.click(bodySelect('LIST').children[0]);
                    return [4 /*yield*/, bodyWaitForDom(function () {
                            test_drive_react_1.expect(onOpenStateChange).to.have.been.calledOnce;
                            test_drive_react_1.expect(onOpenStateChange).to.have.been.calledWithMatch({ value: false });
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls the onOpenStateChange event when first entering a value', function () { return __awaiter(_this, void 0, void 0, function () {
        var onOpenStateChange, _a, select, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onOpenStateChange = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.AutoComplete, { onOpenStateChange: onOpenStateChange })), select = _a.select, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(autoComp)).to.be.present(); })];
                case 1:
                    _b.sent();
                    test_drive_react_1.trigger.change(bodySelect(autoCompInput), 'M');
                    return [4 /*yield*/, bodyWaitForDom(function () {
                            test_drive_react_1.expect(onOpenStateChange).to.have.been.calledOnce;
                            test_drive_react_1.expect(onOpenStateChange).to.have.been.calledWithMatch({ value: true });
                        })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=auto-complete.spec.js.map