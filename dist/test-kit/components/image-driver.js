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
Object.defineProperty(exports, "__esModule", { value: true });
var test_drive_react_1 = require("test-drive-react");
var src_1 = require("../../src");
var ImageDriver = /** @class */ (function (_super) {
    __extends(ImageDriver, _super);
    function ImageDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ImageDriver.prototype, "nativeElement", {
        get: function () {
            return this.select('NATIVE_IMAGE');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageDriver.prototype, "style", {
        get: function () {
            return this.nativeElement.style;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageDriver.prototype, "source", {
        get: function () {
            return this.nativeElement.getAttribute('src');
        },
        enumerable: true,
        configurable: true
    });
    ImageDriver.ComponentClass = src_1.Image;
    return ImageDriver;
}(test_drive_react_1.DriverBase));
exports.ImageDriver = ImageDriver;
//# sourceMappingURL=image-driver.js.map