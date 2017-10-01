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
var utils_1 = require("../../src/utils");
var test_kit_1 = require("../../test-kit");
var sample_images_1 = require("../fixtures/sample-images");
describe('<Image />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () { return clientRenderer.cleanup(); });
    it('outputs a visible html image element to dom', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, image, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Image, null)).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () {
                            test_drive_react_1.expect(image.nativeElement).to.be.instanceOf(HTMLImageElement);
                            test_drive_react_1.expect(image.nativeElement).to.be.present();
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('uses one pixel transparent gif as default source', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, image, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Image, null)).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(utils_1.transparentImage); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sets the provided src', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, image, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Image, { src: sample_images_1.onePixelBlack })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(sample_images_1.onePixelBlack); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('uses provided defaultImage as default source', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, image, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Image, { defaultImage: sample_images_1.onePixelBlue })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(sample_images_1.onePixelBlue); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sets the provided alt attribute', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, image, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Image, { alt: "Calvin Cordozar Broadus" })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(image.nativeElement).to.have.attribute('alt', 'Calvin Cordozar Broadus'); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sets the provided title attribute', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, image, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Image, { title: "Daredevil" })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(image.nativeElement).to.have.attribute('title', 'Daredevil'); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('uses default image if provided src is an empty string', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, image, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Image, { src: "", defaultImage: sample_images_1.onePixelBlack })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(sample_images_1.onePixelBlack); })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('updates src if a new one is provided', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, image, waitForDom, container;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(src_1.Image, { src: sample_images_1.onePixelBlack })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom, container = _a.container;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(sample_images_1.onePixelBlack); })];
                case 1:
                    _b.sent();
                    clientRenderer.render(React.createElement(src_1.Image, { src: sample_images_1.onePixelBlue }), container);
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(sample_images_1.onePixelBlue); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls onLoad when image has loaded', function () { return __awaiter(_this, void 0, void 0, function () {
        var onLoad;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    onLoad = test_drive_react_1.sinon.spy();
                    clientRenderer.render(React.createElement(src_1.Image, { src: sample_images_1.onePixelBlack, onLoad: onLoad })).withDriver(test_kit_1.ImageDriver);
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(onLoad).to.have.been.calledWithMatch({ src: sample_images_1.onePixelBlack }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls onError when it cannot load a source, and falls back to default source', function () { return __awaiter(_this, void 0, void 0, function () {
        var onError, _a, image, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onError = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.Image, { src: sample_images_1.brokenSrc, defaultImage: sample_images_1.onePixelBlue, onError: onError })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(onError).to.have.been.calledWithMatch({ src: sample_images_1.brokenSrc }); })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(sample_images_1.onePixelBlue); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls onError when cannot load the default image, and falls back to `transparentImage`', function () { return __awaiter(_this, void 0, void 0, function () {
        var onError, _a, image, waitForDom;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    onError = test_drive_react_1.sinon.spy();
                    _a = clientRenderer.render(React.createElement(src_1.Image, { defaultImage: sample_images_1.brokenSrc, onError: onError })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(onError).to.have.been.calledWithMatch({ src: sample_images_1.brokenSrc }); })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(utils_1.transparentImage); })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('resize mode', function () {
        it('sets image as background with size: contain, when resizeMode="contain"', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, image, waitForDom, container;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.Image, { resizeMode: "contain", src: sample_images_1.onePixelBlack })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom, container = _a.container;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(image.nativeElement).to.be.present();
                                test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(sample_images_1.onePixelBlack);
                                test_drive_react_1.expect(image.style).to.have.property('visibility', 'hidden');
                                test_drive_react_1.expect(image.style).to.have.property('display', 'block');
                                test_drive_react_1.expect(image.style).to.have.property('maxWidth', '100%');
                                test_drive_react_1.expect(image.style).to.have.property('height', '100%');
                                var sizingWrapper = image.nativeElement.parentElement;
                                test_drive_react_1.expect(sizingWrapper, 'verify image is wrapped for sizing').to.not.equal(container);
                                test_drive_react_1.expect(sizingWrapper).to.have.nested.property('style.backgroundSize', 'contain');
                                test_drive_react_1.expect(sizingWrapper).to.have.nested.property('style.backgroundRepeat', 'no-repeat');
                                // chrome normalizes to url("http://domain/file"), while safari normalizes to url(http://domain/file)
                                // expect(sizingWrapper).to.have.nested.property('style.backgroundImage', `url("${onePixelBlack}")`);
                                // ie11 normalizes to 'center', while chrome 60 normalizes to 'center center'
                                // expect(sizingWrapper).to.have.nested.property('style.backgroundPosition', 'center');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('sets image as background with size: cover, when resizeMode="cover"', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, image, waitForDom, container;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.Image, { resizeMode: "cover", src: sample_images_1.onePixelBlack })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom, container = _a.container;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(image.nativeElement).to.be.present();
                                test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(sample_images_1.onePixelBlack);
                                test_drive_react_1.expect(image.style).to.have.property('visibility', 'hidden');
                                test_drive_react_1.expect(image.style).to.have.property('display', 'block');
                                test_drive_react_1.expect(image.style).to.have.property('maxWidth', '100%');
                                test_drive_react_1.expect(image.style).to.have.property('height', '100%');
                                var sizingWrapper = image.nativeElement.parentElement;
                                test_drive_react_1.expect(sizingWrapper, 'verify image is wrapped for sizing').to.not.equal(container);
                                test_drive_react_1.expect(sizingWrapper).to.have.nested.property('style.backgroundSize', 'cover');
                                test_drive_react_1.expect(sizingWrapper).to.have.nested.property('style.backgroundRepeat', 'no-repeat');
                                // chrome normalizes to url("http://domain/file"), while safari normalizes to url(http://domain/file)
                                // expect(sizingWrapper).to.have.nested.property('style.backgroundImage', `url("${onePixelBlack}")`);
                                // ie11 normalizes to 'center', while chrome 60 normalizes to 'center center'
                                // expect(sizingWrapper).to.have.nested.property('style.backgroundPosition', 'center');
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('leaves image as-is when resizeMode="fill"', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, image, waitForDom, container;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = clientRenderer.render(React.createElement(src_1.Image, { resizeMode: "fill", src: sample_images_1.onePixelBlack })).withDriver(test_kit_1.ImageDriver), image = _a.driver, waitForDom = _a.waitForDom, container = _a.container;
                        return [4 /*yield*/, waitForDom(function () {
                                test_drive_react_1.expect(image.nativeElement).to.be.present();
                                test_drive_react_1.expect(image.source, 'incorrect image source').to.equal(sample_images_1.onePixelBlack);
                                test_drive_react_1.expect(image.style).to.not.have.property('visibility', 'hidden');
                                test_drive_react_1.expect(image.nativeElement.parentElement, 'verify image is not wrapped').to.equal(container);
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=image.spec.js.map