"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var test_drive_react_1 = require("test-drive-react");
var WixReactComponents = require("../../src");
var is_react_component_1 = require("../utils/is-react-component");
var allComponents = Object.keys(WixReactComponents);
var failingComponents = [
    'NumberInput', 'Toggle', 'Portal', 'Popup', 'TimePicker', 'Modal', 'ContextProvider'
];
describe('Root Element contract', function () {
    allComponents
        .filter(function (exportName) { return failingComponents.indexOf(exportName) === -1; })
        .forEach(function (exportName) { return describe(exportName, function () {
        var ComponentClass = WixReactComponents[exportName];
        if (is_react_component_1.isReactComponent(ComponentClass)) {
            assertRootElementContract(ComponentClass);
        }
    }); });
});
function assertRootElementContract(Component) {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    function render(element) {
        var output = clientRenderer.render(element);
        return __assign({ rootNode: react_dom_1.findDOMNode(output.result) }, output);
    }
    function isDisplayInline(rootNode) {
        var display = window.getComputedStyle(rootNode).display;
        return display === 'inline-block' || display === 'inline-flex';
    }
    afterEach(function () {
        clientRenderer.cleanup();
    });
    it('is rendered with default props', function () {
        var rootNode = render(React.createElement(Component, { "data-automation-id": "CONTRACT_TEST" })).rootNode;
        test_drive_react_1.expect(rootNode).to.be.instanceOf(Element);
    });
    it('performs data-automation-id merge', function () {
        var _a = render(React.createElement(Component, { "data-automation-id": "CONTRACT_TEST" })), select = _a.select, rootNode = _a.rootNode;
        test_drive_react_1.expect(select('CONTRACT_TEST'), 'data-automation-id not properly merged').to.equal(rootNode);
    });
    it('performs data-* attribute merge', function () {
        var customValue = 'some-custom-value';
        var rootNode = render(React.createElement(Component, { "data-some-custom-attr": customValue })).rootNode;
        test_drive_react_1.expect(rootNode).to.have.attribute('data-some-custom-attr');
        test_drive_react_1.expect(rootNode.getAttribute('data-some-custom-attr')).to.contain(customValue);
    });
    it('performs inline style merge', function () {
        var sampleColor = 'rgb(255, 0, 0)';
        var rootNode = render(React.createElement(Component, { style: { backgroundColor: sampleColor } })).rootNode;
        test_drive_react_1.expect(getComputedStyle(rootNode).backgroundColor, 'inline style not properly merged').to.equal(sampleColor);
    });
    it('performs className merge', function () {
        var testClassName = 'sample-class-name';
        var rootNode = render(React.createElement(Component, { className: testClassName })).rootNode;
        test_drive_react_1.expect(rootNode.classList.contains(testClassName), 'className not properly merged').to.equal(true);
    });
    it('has display values of \'inline-block\' or \'inline-flex\'', function () {
        var rootNode = render(React.createElement(Component, null)).rootNode;
        test_drive_react_1.expect(isDisplayInline(rootNode), 'element display is not \'inline-block\' or \'inline-flex\'').to.equal(true);
    });
}
exports.assertRootElementContract = assertRootElementContract;
//# sourceMappingURL=root-element.spec.js.map