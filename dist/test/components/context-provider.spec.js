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
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = require("prop-types");
var React = require("react");
var react_dom_1 = require("react-dom");
var test_drive_react_1 = require("test-drive-react");
var src_1 = require("../../src");
describe('<ContextProvider/>', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () { return clientRenderer.cleanup(); });
    describe('render with no properties', function () {
        var root;
        beforeEach(function () {
            var renderer = clientRenderer.render(React.createElement(src_1.ContextProvider, null));
            root = react_dom_1.findDOMNode(renderer.result);
        });
        it('should render div', function () {
            test_drive_react_1.expect(root).instanceof(HTMLDivElement);
        });
    });
    describe('render with tagName="p" ', function () {
        var root;
        beforeEach(function () {
            var renderer = clientRenderer.render(React.createElement(src_1.ContextProvider, { tagName: "p" }));
            root = react_dom_1.findDOMNode(renderer.result);
        });
        it('should render paragraph', function () {
            test_drive_react_1.expect(root).instanceof(HTMLParagraphElement);
        });
    });
    describe('render with children ', function () {
        var renderer;
        var root;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.ContextProvider, null,
                React.createElement("div", { "data-automation-id": "TEST_DIV" }, "Hello")));
            root = react_dom_1.findDOMNode(renderer.result);
        });
        it('should render child', function () {
            test_drive_react_1.expect(renderer.select('TEST_DIV')).to.not.null;
        });
    });
    describe('render with "style" and "className" ', function () {
        var renderer;
        var root;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.ContextProvider, { className: "context-div", style: { width: 10 } }));
            root = react_dom_1.findDOMNode(renderer.result);
        });
        it('should have "className"', function () {
            test_drive_react_1.expect(root).to.have.class('context-div');
        });
        it('should have inline styles', function () {
            test_drive_react_1.expect(root).attr('style', 'width: 10px;');
        });
    });
    describe('render with dir="rtl" ', function () {
        var Inner = /** @class */ (function (_super) {
            __extends(Inner, _super);
            function Inner() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Inner.prototype.render = function () {
                return React.createElement("div", { "data-automation-id": "TEST_DIV", dir: this.context.contextProvider.dir });
            };
            Inner.contextTypes = {
                contextProvider: PropTypes.shape({
                    dir: PropTypes.string
                })
            };
            return Inner;
        }(React.Component));
        var renderer;
        var root;
        beforeEach(function () {
            renderer = clientRenderer.render(React.createElement(src_1.ContextProvider, { dir: "rtl" },
                React.createElement(Inner, null)));
            root = react_dom_1.findDOMNode(renderer.result);
        });
        it('should render component with div="rtl"', function () {
            test_drive_react_1.expect(root).attr('dir', 'rtl');
        });
        it('should pass "dir" as "contextProvider.dir" context property', function () {
            test_drive_react_1.expect(renderer.select('TEST_DIV')).attr('dir', 'rtl');
        });
    });
    // this could not be done since react does not allow to pass Symbol properties
    // @see https://github.com/facebook/react/issues/7552
    describe.skip('render with Symbol property', function () {
        var prop = Symbol();
        var Inner = /** @class */ (function (_super) {
            __extends(Inner, _super);
            function Inner() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Inner.prototype.render = function () {
                return React.createElement("div", { "data-automation-id": "TEST_DIV" }, this.context.contextProvider[prop]);
            };
            Inner.contextTypes = {
                contextProvider: PropTypes.shape((_a = {},
                    _a[prop] = PropTypes.any,
                    _a))
            };
            return Inner;
        }(React.Component));
        var renderer;
        var root;
        beforeEach(function () {
            var props = (_a = {},
                _a[prop] = 'baz',
                _a.qwe = 123,
                _a);
            renderer = clientRenderer.render(React.createElement(src_1.ContextProvider, __assign({}, props),
                React.createElement(Inner, null)));
            root = react_dom_1.findDOMNode(renderer.result);
            var _a;
        });
        it('should pass the contenxt {contextProvider: {[Symbol]: "baz"}}', function () {
            test_drive_react_1.expect(renderer.select('TEST_DIV')).text('baz');
        });
        var _a;
    });
    describe('nested contextProvider', function () {
        var Inner = /** @class */ (function (_super) {
            __extends(Inner, _super);
            function Inner() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Inner.prototype.render = function () {
                return (React.createElement("div", { "data-automation-id": this.props.id, dir: this.context.contextProvider.dir, children: this.context.contextProvider.x }));
            };
            Inner.contextTypes = {
                contextProvider: PropTypes.shape({
                    dir: PropTypes.string,
                    x: PropTypes.number
                })
            };
            return Inner;
        }(React.Component));
        var inner1;
        var inner2;
        beforeEach(function () {
            var renderer = clientRenderer.render((React.createElement(src_1.ContextProvider, { dir: "ltr", x: 10 },
                React.createElement(Inner, { id: "TEST_DIV_1" }),
                React.createElement(src_1.ContextProvider, { dir: "rtl", x: 20 },
                    React.createElement(Inner, { id: "TEST_DIV_2" })))));
            inner1 = renderer.select('TEST_DIV_1');
            inner2 = renderer.select('TEST_DIV_2');
        });
        it('first Inner component should have dir="ltr', function () {
            test_drive_react_1.expect(inner1).attr('dir', 'ltr');
        });
        it('first Inner component should have content "10"', function () {
            test_drive_react_1.expect(inner1).text('10');
        });
        it('second Inner component should have dir="rtl', function () {
            test_drive_react_1.expect(inner2).attr('dir', 'rtl');
        });
        it('second Inner component should have content "20"', function () {
            test_drive_react_1.expect(inner2).text('20');
        });
    });
});
//# sourceMappingURL=context-provider.spec.js.map