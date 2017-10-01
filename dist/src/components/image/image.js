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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../../utils");
var hiddenImageStyle = {
    display: 'block',
    maxWidth: '100%',
    height: '100%',
    visibility: 'hidden'
};
var staticWrapperStyle = {
    display: 'inline-block',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
};
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onError = function (e) {
            _this.props.onError(__assign({}, e, { src: _this.state.src }));
            _this.setState({ src: _this.getFallbackSrcFor(_this.state.src) });
        };
        _this.onLoad = function (e) {
            if (_this.state.src !== _this.props.defaultImage && _this.state.src !== utils_1.transparentImage) {
                _this.props.onLoad(__assign({}, e, { src: _this.state.src }));
            }
        };
        return _this;
    }
    Image.prototype.render = function () {
        var _a = this.props, 
        // these two are always set on the root
        style = _a.style, className = _a.className, 
        // shouldn't be printed to DOM
        defaultImage = _a.defaultImage, resizeMode = _a.resizeMode, rest = __rest(_a, ["style", "className", "defaultImage", "resizeMode"]);
        // 'fill' is the default image behavior, so no need to put it on background
        if (resizeMode === 'contain' || resizeMode === 'cover') {
            var wrapperStyle = __assign({}, staticWrapperStyle, { backgroundImage: "url(\"" + this.state.src + "\")", backgroundSize: resizeMode }, style);
            return (React.createElement("div", { style: wrapperStyle, className: className },
                React.createElement("img", __assign({ "data-automation-id": "NATIVE_IMAGE" }, rest, { style: hiddenImageStyle, src: this.state.src, onLoad: this.onLoad, onError: this.onError }))));
        }
        return (React.createElement("img", __assign({ "data-automation-id": "NATIVE_IMAGE" }, rest, { style: __assign({ display: 'inline-block' }, style), className: className, src: this.state.src, onLoad: this.onLoad, onError: this.onError })));
    };
    Image.prototype.componentWillMount = function () {
        this.setState({ src: this.props.src || this.props.defaultImage });
    };
    Image.prototype.componentWillReceiveProps = function (newProps) {
        this.setState({ src: newProps.src || this.props.defaultImage });
    };
    Image.prototype.getFallbackSrcFor = function (src) {
        // first, fallback to defaultImage, and later to one transparent pixel
        return (src !== this.props.defaultImage) ? this.props.defaultImage : utils_1.transparentImage;
    };
    Image.defaultProps = {
        defaultImage: utils_1.transparentImage,
        onLoad: utils_1.noop,
        onError: utils_1.noop
    };
    return Image;
}(React.PureComponent));
exports.Image = Image;
//# sourceMappingURL=image.js.map