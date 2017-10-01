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
var test_drive_react_1 = require("test-drive-react");
var src_1 = require("../../src");
var test_kit_1 = require("../../test-kit");
describe('<Portal />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () { clientRenderer.cleanup(); });
    it('displays the portal and renders its children', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, portal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = clientRenderer.render(React.createElement(src_1.Portal, null,
                        React.createElement("span", null, "Portal Body"))).result;
                    portal = new test_kit_1.PortalTestDriver(result);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            test_drive_react_1.expect(portal.root).to.be.present();
                            test_drive_react_1.expect(portal.content[0]).to.be.present();
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('applies supplied styles to the popup and updates them if changed', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, container, result, portal;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Portal, { style: { position: 'absolute' } },
                        React.createElement("span", null, "Portal Body"))), container = _a.container, result = _a.result;
                    portal = new test_kit_1.PortalTestDriver(result);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.root).to.have.nested.property('style.position', 'absolute'); })];
                case 1:
                    _b.sent();
                    clientRenderer.render(React.createElement(src_1.Portal, { style: { position: 'fixed' } },
                        React.createElement("span", null, "Portal Body")), container);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.root).to.have.nested.property('style.position', 'fixed'); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('applies supplied className and id to the popup and updates them if changed', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, container, result, portal;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Portal, { className: "my-test-class", id: "my-test-id" },
                        React.createElement("span", null, "Portal Body"))), container = _a.container, result = _a.result;
                    portal = new test_kit_1.PortalTestDriver(result);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.root).to.have.nested.property('className', 'my-test-class'); })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.root).to.have.nested.property('id', 'my-test-id'); })];
                case 2:
                    _b.sent();
                    clientRenderer.render(React.createElement(src_1.Portal, { className: "another-test-class", id: "another-test-id" },
                        React.createElement("span", null, "Portal Body")), container);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.root).to.have.nested.property('className', 'another-test-class'); })];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.root).to.have.nested.property('id', 'another-test-id'); })];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('removes the component when unmounting', function () { return __awaiter(_this, void 0, void 0, function () {
        var container, result, portal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = document.body.appendChild(document.createElement('div'));
                    result = clientRenderer.render(React.createElement(src_1.Portal, null,
                        React.createElement("span", null, "Popup Body")), container).result;
                    portal = new test_kit_1.PortalTestDriver(result);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.root).to.be.present(); })];
                case 1:
                    _a.sent();
                    ReactDOM.unmountComponentAtNode(container);
                    document.body.removeChild(container);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.isPresent).to.be.false; })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('updates the portal content if the children are changed', function () { return __awaiter(_this, void 0, void 0, function () {
        var initialText, updatedText, _a, container, result, portal;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    initialText = 'Portal Body';
                    updatedText = 'Portal Body Updated';
                    _a = clientRenderer.render(React.createElement(src_1.Portal, null,
                        React.createElement("span", null, initialText))), container = _a.container, result = _a.result;
                    portal = new test_kit_1.PortalTestDriver(result);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.content[0]).to.have.text(initialText); })];
                case 1:
                    _b.sent();
                    clientRenderer.render(React.createElement(src_1.Portal, null,
                        React.createElement("span", null, updatedText)), container);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.content[0]).to.have.text(updatedText); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders the portal in the bottom of the DOM', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, container, result, portal;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Portal, null,
                        React.createElement("span", null, "Portal Body"))), container = _a.container, result = _a.result;
                    portal = new test_kit_1.PortalTestDriver(result);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () {
                            /* tslint:disable:no-bitwise */
                            test_drive_react_1.expect(portal.root.compareDocumentPosition(portal.content[0]) & Node.DOCUMENT_POSITION_CONTAINED_BY, 'children contained in portal').to.equal(Node.DOCUMENT_POSITION_CONTAINED_BY);
                            test_drive_react_1.expect(container.compareDocumentPosition(portal.root) & Node.DOCUMENT_POSITION_FOLLOWING, 'portal is following the app container').to.equal(Node.DOCUMENT_POSITION_FOLLOWING);
                            /* tslint:enable:no-bitwise */
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('renders with a className passed as a prop', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, portal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = clientRenderer.render(React.createElement(src_1.Portal, { className: "test-class" },
                        React.createElement("span", null, "Portal Body"))).result;
                    portal = new test_kit_1.PortalTestDriver(result);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(portal.root.className).to.contain('test-class'); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=portal.spec.js.map