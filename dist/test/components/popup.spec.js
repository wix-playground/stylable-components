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
var ReactDOM = require("react-dom");
var test_drive_1 = require("test-drive");
var test_drive_react_1 = require("test-drive-react");
var popup_demo_1 = require("../../demo/components/popup-demo");
var _1 = require("../../src/components/");
var utils_1 = require("../utils");
var portalId = 'PORTAL';
var demoContainer = 'POPUP_DEMO_DIV';
describe('<Popup />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    var bodySelect = test_drive_1.selectDom(document.body);
    var anchor;
    before(function () {
        anchor = document.body.appendChild(document.createElement('div'));
        anchor.style.position = 'absolute';
        anchor.style.top = '150px';
        anchor.style.left = '150px';
        anchor.style.width = '150px';
        anchor.style.height = '150px';
        anchor.style.border = '1px solid blue';
    });
    afterEach(function () { clientRenderer.cleanup(); });
    after(function () { document.body.removeChild(anchor); });
    describe('The popup user', function () {
        it('clicks on the parent and the popup opens and closes after another click', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, select, waitForDom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(popup_demo_1.PopupDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(select(demoContainer)).to.be.present();
                                test_drive_react_1.expect(select(demoContainer, portalId)).to.be.absent();
                            })];
                    case 1:
                        _b.sent();
                        select(demoContainer).click();
                        return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(bodySelect(portalId)).to.be.present(); })];
                    case 2:
                        _b.sent();
                        select(demoContainer).click();
                        return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(bodySelect(portalId)).to.be.absent(); })];
                }
            });
        }); });
    });
    it('displays the popup and renders its children if the open prop is given', function () {
        clientRenderer.render(React.createElement(_1.Popup, { anchor: anchor, open: true },
            React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body")));
        return test_drive_react_1.waitFor(function () {
            test_drive_react_1.expect(bodySelect(portalId)).to.be.present();
            test_drive_react_1.expect(bodySelect(portalId, 'SPAN')).to.be.present();
        });
    });
    it('does not render the popup if there is no anchor', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientRenderer.render(React.createElement(_1.Popup, { anchor: null, open: true },
                        React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body")));
                    return [4 /*yield*/, utils_1.sleep(100)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(bodySelect(portalId)).to.be.absent(); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not reder the popup if the open prop is false', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientRenderer.render(React.createElement(_1.Popup, { anchor: anchor, open: false },
                        React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body")));
                    return [4 /*yield*/, utils_1.sleep(100)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(bodySelect(portalId)).to.be.absent(); })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders the popup using a point as anchor', function () { return __awaiter(_this, void 0, void 0, function () {
        var point;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    point = { x: 100, y: 100 };
                    clientRenderer.render(React.createElement(_1.Popup, { anchor: point, open: true },
                        React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body")));
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(bodySelect(portalId)).to.be.present(); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('removes the component when unmounting', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientRenderer.render(React.createElement(_1.Popup, { anchor: anchor, open: true },
                        React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body")));
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { test_drive_react_1.expect(bodySelect(portalId)).to.be.present(); })];
                case 1:
                    _a.sent();
                    ReactDOM.unmountComponentAtNode(bodySelect(portalId).parentElement);
                    return [2 /*return*/, test_drive_react_1.waitFor(function () { test_drive_react_1.expect(bodySelect(portalId)).to.not.exist; })];
            }
        });
    }); });
    it('syncs the popup width', function () {
        clientRenderer.render(React.createElement(_1.Popup, { anchor: anchor, syncWidth: true, open: true },
            React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body")));
        return test_drive_react_1.waitFor(function () {
            test_drive_react_1.expect(bodySelect(portalId).getBoundingClientRect().width)
                .to.equal(anchor.getBoundingClientRect().width);
        });
    });
    it('sets the default maxHeight', function () {
        clientRenderer.render(React.createElement(_1.Popup, { anchor: anchor, open: true },
            React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body")));
        return test_drive_react_1.waitFor(function () {
            test_drive_react_1.expect(bodySelect(portalId).style.maxHeight).to.equal('500px');
        });
    });
    it('sets and enforces the maxHeight', function () {
        clientRenderer.render(React.createElement(_1.Popup, { anchor: anchor, maxHeight: 5, open: true },
            React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body")));
        return test_drive_react_1.waitFor(function () {
            test_drive_react_1.expect(bodySelect(portalId).style.maxHeight).to.equal('5px');
            test_drive_react_1.expect(bodySelect(portalId).getBoundingClientRect().height).to.equal(5);
        });
    });
    describe('Scrolling tests', function () {
        var scroll = document.createElement('div');
        scroll.style.height = '5000px';
        scroll.style.width = '5000px';
        before(function () { document.body.appendChild(scroll); });
        after(function () {
            document.body.removeChild(scroll);
            document.body.scrollTop = 0;
            document.body.scrollLeft = 0;
        });
        it('renders the popup in the right location when it is out of view', function () { return __awaiter(_this, void 0, void 0, function () {
            var div, waitForDom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        waitForDom = clientRenderer.render(React.createElement("div", null,
                            React.createElement("div", { style: { height: '1000px' } }, "Filler"),
                            React.createElement("div", { ref: function (elem) { return div = elem; } }, "Anchor"))).waitForDom;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(div).to.be.present();
                            })];
                    case 1:
                        _a.sent();
                        document.body.scrollTop = 500;
                        document.body.scrollLeft = 500;
                        clientRenderer.render(React.createElement(_1.Popup, { anchor: div, open: true },
                            React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body")));
                        return [2 /*return*/, waitForDom(function () {
                                test_drive_react_1.expect([div, bodySelect(portalId)]).to.be.inVerticalSequence();
                            })];
                }
            });
        }); });
    });
    describe('Layout tests', function () {
        var fixture = getFixture();
        describe('Popup with anchor', function () {
            var _loop_1 = function (popupPos) {
                var _loop_2 = function (anchorPos) {
                    it("Popup position: V: " + popupPos.vertical + " H: " + popupPos.horizontal + ";\n                 Anchor position: V: " + anchorPos.vertical + " H: " + anchorPos.horizontal, function () {
                        clientRenderer.render(React.createElement(_1.Popup, { anchor: anchor, anchorPosition: anchorPos, popupPosition: popupPos, open: true },
                            React.createElement("div", { style: { background: 'green', color: 'white' } },
                                React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body"),
                                React.createElement("div", null, "some more stuff"))));
                        return test_drive_react_1.waitFor(function () {
                            var popup = bodySelect(portalId);
                            runTest(popup, anchor, popupPos, anchorPos);
                        });
                    });
                };
                for (var _i = 0, fixture_1 = fixture; _i < fixture_1.length; _i++) {
                    var anchorPos = fixture_1[_i];
                    _loop_2(anchorPos);
                }
            };
            for (var _i = 0, fixture_2 = fixture; _i < fixture_2.length; _i++) {
                var popupPos = fixture_2[_i];
                _loop_1(popupPos);
            }
        });
        describe('Popup with point', function () {
            var point = { x: 90, y: 100 };
            var verticalTests = getPointLayoutTests('vertical');
            var horizontalTests = getPointLayoutTests('horizontal');
            var _loop_3 = function (popupPos) {
                it("Popup position: V: " + popupPos.vertical + " H: " + popupPos.horizontal, function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                clientRenderer.render(React.createElement(_1.Popup, { anchor: point, popupPosition: popupPos, open: true },
                                    React.createElement("div", { style: { background: 'green', color: 'white' } },
                                        React.createElement("span", { "data-automation-id": "SPAN" }, "Popup Body"))));
                                return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                                        var popup = bodySelect(portalId);
                                        verticalTests[popupPos.vertical](popup, point);
                                        horizontalTests[popupPos.horizontal](popup, point);
                                    })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            };
            for (var _i = 0, fixture_3 = fixture; _i < fixture_3.length; _i++) {
                var popupPos = fixture_3[_i];
                _loop_3(popupPos);
            }
        });
    });
});
function getAnchorLayoutTests(axis) {
    var start = 'top';
    var end = 'bottom';
    var length = 'height';
    if (axis === 'horizontal') {
        start = 'left';
        end = 'right';
        length = 'width';
    }
    // Level one: popup position, level two: anchor position
    return _a = {},
        _a[start] = (_b = {},
            _b[start] = function (anchor, popup) {
                return createExpect(popup.getBoundingClientRect()[start], anchor.getBoundingClientRect()[start]);
            },
            _b.center = function (anchor, popup) {
                var anchorRect = anchor.getBoundingClientRect();
                createExpect(popup.getBoundingClientRect()[start], anchorRect[start] + (anchorRect[length] / 2));
            },
            _b[end] = function (anchor, popup) {
                return createExpect(popup.getBoundingClientRect()[start], anchor.getBoundingClientRect()[end]);
            },
            _b),
        _a.center = (_c = {},
            _c[start] = function (anchor, popup) {
                var popupRect = popup.getBoundingClientRect();
                createExpect(popupRect[start], anchor.getBoundingClientRect()[start] - (popupRect[length] / 2));
            },
            _c.center = function (anchor, popup) {
                var popupRect = popup.getBoundingClientRect();
                var anchorRect = anchor.getBoundingClientRect();
                createExpect(popupRect[start], anchorRect[start] + (anchorRect[length] / 2) - (popupRect[length] / 2));
            },
            _c[end] = function (anchor, popup) {
                var popupRect = popup.getBoundingClientRect();
                createExpect(popupRect[end], anchor.getBoundingClientRect()[end] + (popupRect[length] / 2));
            },
            _c),
        _a[end] = (_d = {},
            _d[start] = function (anchor, popup) {
                return createExpect(popup.getBoundingClientRect()[end], anchor.getBoundingClientRect()[start]);
            },
            _d.center = function (anchor, popup) {
                var anchorRect = anchor.getBoundingClientRect();
                createExpect(popup.getBoundingClientRect()[end], anchorRect[start] + (anchorRect[length] / 2));
            },
            _d[end] = function (anchor, popup) {
                return createExpect(popup.getBoundingClientRect()[end], anchor.getBoundingClientRect()[end]);
            },
            _d),
        _a;
    var _a, _b, _c, _d;
}
function getPointLayoutTests(axis) {
    var start = 'top';
    var end = 'bottom';
    var length = 'height';
    var pointAxis = 'y';
    if (axis === 'horizontal') {
        start = 'left';
        end = 'right';
        length = 'width';
        pointAxis = 'x';
    }
    return _a = {},
        _a[start] = function (popup, p) {
            createExpect(popup.getBoundingClientRect()[start], p[pointAxis], 0.5);
        },
        _a.center = function (popup, p) {
            var popupRect = popup.getBoundingClientRect();
            createExpect(popupRect[start], p[pointAxis] - (popupRect[length] / 2), 0.5);
        },
        _a[end] = function (popup, p) { return createExpect(popup.getBoundingClientRect()[end], p[pointAxis], 0.5); },
        _a;
    var _a;
}
function runTest(popup, anchor, popupPos, anchorPos) {
    var topTests = getAnchorLayoutTests('vertical');
    var leftTests = getAnchorLayoutTests('horizontal');
    topTests[popupPos.vertical][anchorPos.vertical](anchor, popup);
    leftTests[popupPos.horizontal][anchorPos.horizontal](anchor, popup);
}
function getFixture() {
    return [{ vertical: 'top', horizontal: 'left' },
        { vertical: 'top', horizontal: 'center' },
        { vertical: 'top', horizontal: 'right' },
        { vertical: 'center', horizontal: 'left' },
        { vertical: 'center', horizontal: 'center' },
        { vertical: 'center', horizontal: 'right' },
        { vertical: 'bottom', horizontal: 'left' },
        { vertical: 'bottom', horizontal: 'center' },
        { vertical: 'bottom', horizontal: 'right' }];
}
function createExpect(pValue, aValue, resulotion) {
    if (resulotion === void 0) { resulotion = 0.01; }
    test_drive_react_1.expect(pValue, "popup value: " + pValue + " anchor value: " + aValue).to.be.closeTo(aValue, resulotion);
}
//# sourceMappingURL=popup.spec.js.map