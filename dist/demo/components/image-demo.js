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
var React = require("react");
var src_1 = require("../../src");
var ImageDemo = /** @class */ (function (_super) {
    __extends(ImageDemo, _super);
    function ImageDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            // Wix.com's Logo
            src: 'http://d26gg7w375vuv5.cloudfront.net/Design+Assets/black+Wix+Logo+Assets/Black+Wix+logo+Assets.jpg',
            resizeMode: 'fill'
        };
        _this.onSrcChange = function (e) {
            _this.setState({ src: e.target.value });
        };
        _this.onResizeModeChange = function (e) {
            _this.setState({ resizeMode: e.target.value });
        };
        return _this;
    }
    ImageDemo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h2", null, "Image"),
            React.createElement("div", null,
                React.createElement("label", null,
                    "src:",
                    React.createElement("input", { type: "text", value: this.state.src, onChange: this.onSrcChange })),
                React.createElement("select", { value: this.state.resizeMode, onChange: this.onResizeModeChange },
                    React.createElement("option", { value: "cover" }, "cover"),
                    React.createElement("option", { value: "contain" }, "contain"),
                    React.createElement("option", { value: "fill" }, "fill"))),
            React.createElement(src_1.Image, { src: this.state.src, resizeMode: this.state.resizeMode, style: { width: 300, height: 200, marginTop: 10 } })));
    };
    return ImageDemo;
}(React.Component));
exports.ImageDemo = ImageDemo;
//# sourceMappingURL=image-demo.js.map