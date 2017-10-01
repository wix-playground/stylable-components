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
var modal_demo_1 = require("../../demo/components/modal-demo");
var src_1 = require("../../src");
describe('<Modal />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    var bodySelect = test_drive_react_1.selectDom(document.body);
    afterEach(function () { return clientRenderer.cleanup(); });
    describe('A typical use case for the modal:', function () {
        it('is hidden at first, a user clicks on a button, the modal appears,' +
            'and then the user clicks on the background and the model closes', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientRenderer.render(React.createElement(modal_demo_1.ModalDemo, null));
                        return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(bodySelect('MODAL')).to.be.absent(); })];
                    case 1:
                        _a.sent();
                        test_drive_react_1.simulate.click(bodySelect('MODAL_BUTTON'));
                        return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(bodySelect('MODAL')).to.be.present(); })];
                    case 2:
                        _a.sent();
                        test_drive_react_1.simulate.click(bodySelect('MODAL'));
                        return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(bodySelect('MODAL')).to.be.absent(); })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('renders to the screen', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true }));
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(bodySelect('MODAL')).to.be.present(); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders any children passed as props', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true },
                        React.createElement("p", { "data-automation-id": "CHILD_1" }, "child 1"),
                        React.createElement("p", { "data-automation-id": "CHILD_2" }, "child 2")));
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            test_drive_react_1.expect(bodySelect('CHILD_1')).to.be.present();
                            test_drive_react_1.expect(bodySelect('CHILD_2')).to.be.present();
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('takes the full width and height of the viewport and is centered in the viewport', function () { return __awaiter(_this, void 0, void 0, function () {
        function checkIfAlignedToScreen(element) {
            var rects = element.getBoundingClientRect();
            return rects.top === 0 && rects.left === 0;
        }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true }));
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            test_drive_react_1.expect(checkIfAlignedToScreen(bodySelect('MODAL')), 'The modal wasn\'t centered').to.equal(true);
                            test_drive_react_1.expect(bodySelect('MODAL').clientHeight).to.equal(window.innerHeight);
                            test_drive_react_1.expect(bodySelect('MODAL').clientWidth).to.equal(window.innerWidth);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders one child in the center of the viewport', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true },
                        React.createElement("p", { "data-automation-id": "CHILD_1", style: { width: '50px', height: '50px' } }, "child 1")));
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var child = bodySelect('CHILD_1');
                            var modal = bodySelect('MODAL');
                            test_drive_react_1.expect([child, modal]).to.be.horizontallyAligned('center', 1);
                            test_drive_react_1.expect([child, modal]).to.be.verticallyAligned('center', 1);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders children in horizontal alignment', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true },
                        React.createElement("p", { "data-automation-id": "CHILD_1", style: { width: '50px', height: '50px' } }, "child 1"),
                        React.createElement("p", { "data-automation-id": "CHILD_2", style: { width: '50px', height: '50px' } }, "child 2")));
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var childOne = bodySelect('CHILD_1');
                            var childTwo = bodySelect('CHILD_2');
                            var modal = bodySelect('MODAL');
                            test_drive_react_1.expect([childOne, childTwo, modal]).to.be.horizontallyAligned('center', 1);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('adds overflow: hidden to the body when opened and removes it when closed', function () { return __awaiter(_this, void 0, void 0, function () {
        var container;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true })).container;
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(window.getComputedStyle(document.body).overflow).to.equal('hidden'); })];
                case 1:
                    _a.sent();
                    clientRenderer.render(React.createElement(src_1.Modal, { isOpen: false }), container);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(window.getComputedStyle(document.body).overflow).to.not.equal('hidden'); })];
                case 2:
                    _a.sent();
                    clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true }), container);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(window.getComputedStyle(document.body).overflow).to.equal('hidden'); })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('appears aligned with the viewport even when the page was scrolled', function () { return __awaiter(_this, void 0, void 0, function () {
        var scroll;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    scroll = document.createElement('div');
                    scroll.style.height = '1000vh';
                    scroll.style.width = '1000vw';
                    document.body.appendChild(scroll);
                    window.scrollTo(0, 2 * window.innerHeight);
                    clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true }));
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            test_drive_react_1.expect(bodySelect('MODAL').getBoundingClientRect().top).to.equal(0);
                        })];
                case 1:
                    _a.sent();
                    window.scrollTo(0, 0);
                    document.body.removeChild(scroll);
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls onRequestClose with source equal to backdrop when the backdrop is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
        var onRequestClose;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onRequestClose = test_drive_react_1.sinon.spy();
                    clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true, onRequestClose: onRequestClose }));
                    test_drive_react_1.simulate.click(bodySelect('MODAL'));
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(onRequestClose).to.have.been.calledWithMatch({ source: 'backdrop' }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls onRequestClose with source equal to children when the child is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
        var onRequestClose;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onRequestClose = test_drive_react_1.sinon.spy();
                    clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true, onRequestClose: onRequestClose },
                        React.createElement("p", { "data-slot": "child", "data-automation-id": "CHILD_1" }, "child 1")));
                    test_drive_react_1.simulate.click(bodySelect('CHILD_1'));
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(onRequestClose.getCall(0)).to.have.been.calledWithMatch({ source: 'child' }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders the modal to the bottom of the DOM', function () { return __awaiter(_this, void 0, void 0, function () {
        var container;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = clientRenderer.render(React.createElement(src_1.Modal, { isOpen: true },
                        React.createElement("p", { "data-automation-id": "CHILD_1" }, "child 1"))).container;
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            var modal = bodySelect('MODAL');
                            var children = bodySelect('CHILD_1');
                            /* tslint:disable:no-bitwise */
                            test_drive_react_1.expect(modal.compareDocumentPosition(children) & Node.DOCUMENT_POSITION_CONTAINED_BY, 'children contained in modal').to.equal(Node.DOCUMENT_POSITION_CONTAINED_BY);
                            test_drive_react_1.expect(container.compareDocumentPosition(modal) & Node.DOCUMENT_POSITION_FOLLOWING, 'modal is following the app container').to.equal(Node.DOCUMENT_POSITION_FOLLOWING);
                            /* tslint:enable:no-bitwise */
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=modal.spec.js.map