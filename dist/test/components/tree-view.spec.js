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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var mobx_1 = require("mobx");
var React = require("react");
var test_drive_react_1 = require("test-drive-react");
var tree_view_demo_1 = require("../../demo/components/tree-view-demo");
var src_1 = require("../../src");
var tree_util_1 = require("../../src/components/tree-view/tree-util");
var tree_view_1 = require("../../src/components/tree-view/tree-view");
var utils_1 = require("../../test-kit/utils");
var tree_view_demo_st_css_1 = require("../../demo/components/tree-view-demo.st.css");
var tree_item_st_css_1 = require("../../src/components/tree-view/tree-item.st.css");
var treeView = 'TREE_VIEW';
var treeItem = 'TREE_ITEM';
var treeData = [
    {
        label: 'Food Menu', children: [
            {
                label: 'Salads', children: [
                    { label: 'Greek Salad' },
                    { label: 'Israeli Salad' },
                    { label: 'Caesar Salad' }
                ]
            },
            {
                label: 'Steaks', children: [
                    { label: 'Fillet Steak' },
                    { label: 'Sirloin Steak' }
                ]
            },
            {
                label: 'Desserts', children: [
                    { label: 'Pancakes' },
                    { label: 'Muffin' },
                    { label: 'Waffle' },
                    { label: 'Cupcake' }
                ]
            }
        ]
    }
];
var changedLabel = 'Kaiserschmarrn';
// duplicating the data so i can pass a new object to the non-mobx version
var newTreeData = JSON.parse(JSON.stringify(treeData));
newTreeData[0].children[2].children.push({ label: changedLabel });
var TreeViewWrapper = /** @class */ (function (_super) {
    __extends(TreeViewWrapper, _super);
    function TreeViewWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { treeData: treeData };
        _this.switchDataSource = function () {
            _this.setState({
                treeData: newTreeData
            });
        };
        return _this;
    }
    TreeViewWrapper.prototype.render = function () {
        return React.createElement(src_1.TreeView, { dataSource: this.state.treeData });
    };
    return TreeViewWrapper;
}(React.Component));
exports.TreeViewWrapper = TreeViewWrapper;
var TreeViewMobxWrapper = /** @class */ (function (_super) {
    __extends(TreeViewMobxWrapper, _super);
    function TreeViewMobxWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.obsTreeData = treeData;
        _this.modifyMobxDataSource = function () {
            _this.obsTreeData[0].children[2].children.push({ label: changedLabel });
        };
        _this.renameLabel = function () {
            _this.obsTreeData[0].children[0].label = changedLabel;
        };
        return _this;
    }
    TreeViewMobxWrapper.prototype.render = function () {
        return React.createElement(src_1.TreeView, { dataSource: this.obsTreeData });
    };
    __decorate([
        mobx_1.observable
    ], TreeViewMobxWrapper.prototype, "obsTreeData", void 0);
    return TreeViewMobxWrapper;
}(React.Component));
exports.TreeViewMobxWrapper = TreeViewMobxWrapper;
function getLabelsList(data) {
    return (_a = [data.label]).concat.apply(_a, (data.children || [])
        .map(getLabelsList));
    var _a;
}
function getAllNodeLabels(data) {
    return data.map(getLabelsList).reduce(function (prev, next) { return prev.concat(next); });
}
describe('<TreeView />', function () {
    var clientRenderer = new test_drive_react_1.ClientRenderer();
    afterEach(function () { return clientRenderer.cleanup(); });
    var getTreeItem = function (id) { return treeItem + "_" + id.replace(' ', '_'); };
    var getTreeItemIcon = function (id) { return getTreeItem(id) + "_ICON"; };
    var getTreeItemLabel = function (id) { return getTreeItem(id) + "_LABEL"; };
    function expandItemWithLabel(select, id) {
        test_drive_react_1.simulate.click(select(getTreeItemIcon(id)));
    }
    function selectItemWithLabel(select, id) {
        test_drive_react_1.simulate.click(select(getTreeItemLabel(id)));
    }
    function isElementSelected(element, style) {
        return utils_1.elementHasStylableState(element, style, 'selected');
    }
    function isElementFocused(element, style) {
        return utils_1.elementHasStylableState(element, style, 'focused');
    }
    var sampleItem = { label: 'label' };
    var nestedItem = treeData[0].children[1];
    var allNodesLabels = getAllNodeLabels(treeData);
    it('renders a tree view with a few children', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, select, waitForDom, nodeChildren, elementToSelect;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(treeView + '_DEMO'), 'demo not present').to.be.present(); })];
                case 1:
                    _b.sent();
                    nodeChildren = treeData[0].children;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(nodeChildren[1].label))).to.be.absent(); })];
                case 2:
                    _b.sent();
                    expandItemWithLabel(select, treeData[0].label);
                    nodeChildren.forEach(function (child) { return expandItemWithLabel(select, child.label); });
                    return [4 /*yield*/, waitForDom(function () { return allNodesLabels.forEach(function (item) {
                            return test_drive_react_1.expect(select(treeView + '_DEMO', getTreeItem(item)), "item did not appear: " + item).to.be.present();
                        }); })];
                case 3:
                    _b.sent();
                    elementToSelect = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));
                    selectItemWithLabel(select, allNodesLabels[2]);
                    return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(isElementSelected(elementToSelect, tree_item_st_css_1.default)).to.equal(true); })];
            }
        });
    }); });
    it('renders a tree view with custom children', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, select, waitForDom, nodeChildren, elementToSelect;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemoCustom, null)), select = _a.select, waitForDom = _a.waitForDom;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(treeView + '_DEMO_CUSTOM'), 'custom demo not present').to.be.present(); })];
                case 1:
                    _b.sent();
                    nodeChildren = treeData[0].children;
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(nodeChildren[1].label))).to.be.absent(); })];
                case 2:
                    _b.sent();
                    expandItemWithLabel(select, treeData[0].label);
                    nodeChildren.forEach(function (child) { return expandItemWithLabel(select, child.label); });
                    return [4 /*yield*/, waitForDom(function () { return allNodesLabels.forEach(function (item) {
                            return test_drive_react_1.expect(select(treeView + '_DEMO_CUSTOM', getTreeItem(item)), "item did not appear: " + item).to.be.present();
                        }); })];
                case 3:
                    _b.sent();
                    elementToSelect = select(treeView + '_DEMO_CUSTOM', getTreeItem(allNodesLabels[2]));
                    selectItemWithLabel(select, allNodesLabels[2]);
                    return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(isElementSelected(elementToSelect, tree_view_demo_st_css_1.default)).to.equal(true); })];
            }
        });
    }); });
    it('ends up in expected state after multiple clicks on same tree node', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, select, waitForDom, elementToSelect, elementToAssert;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                    expandItemWithLabel(select, allNodesLabels[0]);
                    elementToSelect = select(treeView + '_DEMO', getTreeItemIcon(allNodesLabels[1]));
                    elementToAssert = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(elementToSelect).to.be.present(); })];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(elementToAssert).to.be.absent(); })];
                case 2:
                    _b.sent();
                    expandItemWithLabel(select, allNodesLabels[1]);
                    elementToAssert = select(treeView + '_DEMO', getTreeItem(allNodesLabels[2]));
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(elementToAssert).to.be.present(); })];
                case 3:
                    _b.sent();
                    expandItemWithLabel(select, allNodesLabels[1]);
                    return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(elementToAssert).to.be.absent(); })];
            }
        });
    }); });
    it('should rename node label without collapsing tree', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, select, waitForDom, result, firstChildLabel;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = clientRenderer.render(React.createElement(TreeViewMobxWrapper, null)), select = _a.select, waitForDom = _a.waitForDom, result = _a.result;
                    firstChildLabel = treeData[0].children[0].label;
                    expandItemWithLabel(select, treeData[0].label);
                    return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(firstChildLabel))).to.have.text(firstChildLabel); })];
                case 1:
                    _b.sent();
                    result.renameLabel();
                    return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(changedLabel))).to.have.text(changedLabel); })];
            }
        });
    }); });
    describe('Using default renderer', function () {
        it('renders correct children', function () {
            var _a = clientRenderer.render(React.createElement(src_1.TreeView, { dataSource: treeData })), select = _a.select, waitForDom = _a.waitForDom;
            return waitForDom(function () {
                return treeData.forEach(function (item) {
                    return test_drive_react_1.expect(select(treeView, getTreeItem(item.label)), item.label + " was not present").to.be.present();
                });
            });
        });
        it('invokes the onSelectItem callback when an item is clicked', function () {
            var onSelectItem = test_drive_react_1.sinon.spy();
            var select = clientRenderer.render(React.createElement(src_1.TreeView, { dataSource: treeData, onSelectItem: onSelectItem })).select;
            selectItemWithLabel(select, treeData[0].label);
            return test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(onSelectItem).to.have.been.calledWithMatch(treeData[0]); });
        });
        describe('Keyboard Navigation', function () {
            it('expands and collapses focused treeItem when right and left arrows are clicked', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, nodeChildren;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                            nodeChildren = treeData[0].children;
                            selectItemWithLabel(select, treeData[0].label);
                            expandItemWithLabel(select, treeData[0].label);
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(nodeChildren[1].label))).to.be.present(); })];
                        case 1:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.LEFT });
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(nodeChildren[1].label))).to.be.absent(); })];
                        case 2:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.RIGHT });
                            return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(nodeChildren[1].label))).to.be.present(); })];
                    }
                });
            }); });
            it('returns to parent if there is after collapsing the element if possible when left is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, nodeChildren;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                            nodeChildren = treeData[0].children;
                            expandItemWithLabel(select, treeData[0].label);
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(nodeChildren[1].label))).to.be.present(); })];
                        case 1:
                            _b.sent();
                            selectItemWithLabel(select, nodeChildren[1].label);
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(getTreeItem(nodeChildren[1].label)), tree_item_st_css_1.default)).to.equal(true); })];
                        case 2:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.LEFT });
                            return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(getTreeItem(treeData[0].label)), tree_item_st_css_1.default)).to.equal(true); })];
                    }
                });
            }); });
            it('moves to child to if there is one after expanding the element if possible when right is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, nodeChildren;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                            nodeChildren = treeData[0].children;
                            expandItemWithLabel(select, treeData[0].label);
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(nodeChildren[0].label))).to.be.present(); })];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(getTreeItem(treeData[0].label)), tree_item_st_css_1.default)).to.equal(true); })];
                        case 2:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.RIGHT });
                            return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(getTreeItem(nodeChildren[0].label)), tree_item_st_css_1.default)).to.equal(true); })];
                    }
                });
            }); });
            it('focuses next and previous when down and up arrows are clicked', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, rootNode, nodeChildren;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                            rootNode = getTreeItem(treeData[0].label);
                            nodeChildren = treeData[0].children;
                            selectItemWithLabel(select, treeData[0].label);
                            expandItemWithLabel(select, treeData[0].label);
                            // this should assert first child of root is not focused
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(getTreeItem(nodeChildren[0].label)), tree_item_st_css_1.default)).to.equal(false); })];
                        case 1:
                            // this should assert first child of root is not focused
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.DOWN });
                            // this should assert first child of root is focused
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(getTreeItem(nodeChildren[0].label)), tree_item_st_css_1.default)).to.equal(true); })];
                        case 2:
                            // this should assert first child of root is focused
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.UP });
                            // this should assert first child of root is not focused
                            return [2 /*return*/, waitForDom(function () {
                                    var item = getTreeItem(nodeChildren[0].label);
                                    test_drive_react_1.expect(isElementFocused(select(item), tree_item_st_css_1.default)).to.equal(false);
                                    test_drive_react_1.expect(isElementFocused(select(rootNode), tree_item_st_css_1.default)).to.equal(true);
                                })];
                    }
                });
            }); });
            it('focuses parent node\'s next sibling after exhausting current node sibling list', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, nodeChildren, firstSubtreeChildren;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                            nodeChildren = treeData[0].children;
                            selectItemWithLabel(select, treeData[0].label);
                            expandItemWithLabel(select, treeData[0].label);
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.DOWN });
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.RIGHT });
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(getTreeItem(nodeChildren[0].label)), tree_item_st_css_1.default)).to.equal(true); })];
                        case 1:
                            _b.sent();
                            nodeChildren[0].children.forEach(function () { return test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.DOWN }); });
                            firstSubtreeChildren = nodeChildren[0].children;
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(getTreeItem(firstSubtreeChildren[firstSubtreeChildren.length - 1].label)), tree_item_st_css_1.default)).to.equal(true); })];
                        case 2:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.DOWN });
                            return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(getTreeItem(nodeChildren[1].label)), tree_item_st_css_1.default)).to.equal(true); })];
                    }
                });
            }); });
            it('selects currently focused node on Enter click', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, nodeChildren;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                            nodeChildren = treeData[0].children;
                            selectItemWithLabel(select, treeData[0].label);
                            expandItemWithLabel(select, treeData[0].label);
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.DOWN });
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(isElementSelected(select(getTreeItem(nodeChildren[0].label)), tree_item_st_css_1.default)).to.equal(false); })];
                        case 1:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.ENTER });
                            return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(isElementSelected(select(getTreeItem(nodeChildren[0].label)), tree_item_st_css_1.default)).to.equal(true); })];
                    }
                });
            }); });
            it('focuses first item when HOME is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, rootNode;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                            rootNode = getTreeItem(treeData[0].label);
                            selectItemWithLabel(select, treeData[0].label);
                            expandItemWithLabel(select, treeData[0].label);
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.DOWN });
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.DOWN });
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(rootNode), tree_item_st_css_1.default)).to.equal(false); })];
                        case 1:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.HOME });
                            return [2 /*return*/, waitForDom(function () { return test_drive_react_1.expect(isElementFocused(select(rootNode), tree_item_st_css_1.default)).to.equal(true); })];
                    }
                });
            }); });
            it('focuses last item available when END is clicked', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, nodeChildren, lastRootNode, lastChildren;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                            nodeChildren = treeData[0].children;
                            selectItemWithLabel(select, treeData[0].label);
                            expandItemWithLabel(select, treeData[0].label);
                            lastRootNode = nodeChildren[2];
                            lastChildren = lastRootNode.children;
                            expandItemWithLabel(select, lastRootNode.label);
                            return [4 /*yield*/, waitForDom(function () {
                                    return test_drive_react_1.expect(isElementFocused(select(getTreeItem(lastChildren[lastChildren.length - 1].label)), tree_item_st_css_1.default)).to.equal(false);
                                })];
                        case 1:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.END });
                            return [2 /*return*/, waitForDom(function () {
                                    return test_drive_react_1.expect(isElementFocused(select(getTreeItem(lastChildren[lastChildren.length - 1].label)), tree_item_st_css_1.default)).to.equal(true);
                                })];
                    }
                });
            }); });
            it('cannot focus past first and last elements when clicking up and down respectively', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, rootNode, nodeChildren, lastRootNode, lastChildren;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(tree_view_demo_1.TreeViewDemo, null)), select = _a.select, waitForDom = _a.waitForDom;
                            rootNode = getTreeItem(treeData[0].label);
                            nodeChildren = treeData[0].children;
                            expandItemWithLabel(select, treeData[0].label);
                            lastRootNode = nodeChildren[2];
                            lastChildren = lastRootNode.children;
                            expandItemWithLabel(select, lastRootNode.label);
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.END });
                            return [4 /*yield*/, waitForDom(function () {
                                    return test_drive_react_1.expect(isElementFocused(select(getTreeItem(lastChildren[lastChildren.length - 1].label)), tree_item_st_css_1.default)).to.equal(true);
                                })];
                        case 1:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.DOWN });
                            return [4 /*yield*/, waitForDom(function () {
                                    return test_drive_react_1.expect(isElementFocused(select(getTreeItem(lastChildren[lastChildren.length - 1].label)), tree_item_st_css_1.default)).to.equal(true);
                                })];
                        case 2:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.HOME });
                            return [4 /*yield*/, test_drive_react_1.expect(isElementFocused(select(rootNode), tree_item_st_css_1.default)).to.equal(true)];
                        case 3:
                            _b.sent();
                            test_drive_react_1.simulate.keyDown(select('TREE_VIEW_DEMO', 'TREE_VIEW'), { keyCode: src_1.TreeKeyCodes.UP });
                            return [2 /*return*/, test_drive_react_1.expect(isElementFocused(select(rootNode), tree_item_st_css_1.default)).to.equal(true)];
                    }
                });
            }); });
        });
        describe('Reaction to dataSource changes', function () {
            it('renders the additional item when a new data array is passed', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(TreeViewWrapper, null)), select = _a.select, waitForDom = _a.waitForDom, result = _a.result;
                            expandItemWithLabel(select, treeData[0].label);
                            expandItemWithLabel(select, treeData[0].children[2].label);
                            return [4 /*yield*/, waitForDom(function () {
                                    return test_drive_react_1.expect(select(treeView, getTreeItem('Kaiserschmarrn'))).to.be.absent();
                                })];
                        case 1:
                            _b.sent();
                            result.switchDataSource();
                            expandItemWithLabel(select, newTreeData[0].label);
                            expandItemWithLabel(select, newTreeData[0].children[2].label);
                            return [2 /*return*/, waitForDom(function () {
                                    return test_drive_react_1.expect(select(treeView, getTreeItem('Kaiserschmarrn'))).to.be.present();
                                })];
                    }
                });
            }); });
            it('renders the additional item when a new data element is added to existing data', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(TreeViewMobxWrapper, null)), select = _a.select, waitForDom = _a.waitForDom, result = _a.result;
                            expandItemWithLabel(select, treeData[0].label);
                            expandItemWithLabel(select, treeData[0].children[2].label);
                            return [4 /*yield*/, waitForDom(function () {
                                    return test_drive_react_1.expect(select(treeView, getTreeItem('Kaiserschmarrn'))).to.be.absent();
                                })];
                        case 1:
                            _b.sent();
                            result.modifyMobxDataSource();
                            return [2 /*return*/, waitForDom(function () {
                                    return test_drive_react_1.expect(select(treeView, getTreeItem('Kaiserschmarrn'))).to.be.present();
                                })];
                    }
                });
            }); });
        });
        describe('<TreeItem />', function () {
            var stateMap = new tree_view_1.TreeViewStateMap();
            stateMap.getItemState(nestedItem).isExpanded = true;
            it('renders an item', function () {
                var _a = clientRenderer.render(React.createElement(src_1.TreeItem, { item: sampleItem, itemRenderer: src_1.TreeItem, stateMap: stateMap })), select = _a.select, waitForDom = _a.waitForDom;
                return waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(sampleItem.label))).to.be.present(); });
            });
            it('renders with provided label', function () {
                var _a = clientRenderer.render(React.createElement(src_1.TreeItem, { item: sampleItem, itemRenderer: src_1.TreeItem, stateMap: stateMap })), select = _a.select, waitForDom = _a.waitForDom;
                return waitForDom(function () {
                    return test_drive_react_1.expect(select(getTreeItem(sampleItem.label) + '_LABEL')).to.have.text(sampleItem.label);
                });
            });
            it('renders with an icon', function () {
                var _a = clientRenderer.render(React.createElement(src_1.TreeItem, { item: treeData[0], itemRenderer: src_1.TreeItem, stateMap: stateMap })), select = _a.select, waitForDom = _a.waitForDom;
                return waitForDom(function () { return test_drive_react_1.expect(select(getTreeItem(treeData[0].label) + '_ICON')).to.be.present(); });
            });
            it('renders correct children', function () {
                var _a = clientRenderer.render(React.createElement(src_1.TreeItem, { item: nestedItem, itemRenderer: src_1.TreeItem, stateMap: stateMap })), select = _a.select, waitForDom = _a.waitForDom;
                return waitForDom(function () {
                    return nestedItem.children.forEach(function (item) {
                        return test_drive_react_1.expect(select(getTreeItem(item.label)), item.label + " was not present").to.be.present();
                    });
                });
            });
            it('invokes onClick when clicked', function () {
                var onClick = test_drive_react_1.sinon.spy();
                var select = clientRenderer.render(React.createElement(src_1.TreeItem, { item: sampleItem, itemRenderer: src_1.TreeItem, onItemClick: onClick, stateMap: stateMap })).select;
                test_drive_react_1.simulate.click(select(getTreeItemLabel(sampleItem.label)));
                return test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(onClick).to.have.been.calledOnce; });
            });
        });
        describe('Tree Traversal Utils', function () {
            var treeState = new tree_view_1.TreeViewStateMap();
            treeState.getItemState(treeData[0]).isExpanded = true;
            treeState.getItemState(treeData[0].children[1]).isExpanded = true;
            var parentsMap = new Map();
            tree_view_1.initParentsMap(parentsMap, treeData, undefined);
            it('gets previous item when its a sibling', function () { return __awaiter(_this, void 0, void 0, function () {
                var previous;
                return __generator(this, function (_a) {
                    previous = tree_util_1.getPreviousItem(treeData, treeData[0].children[1], treeState, parentsMap);
                    test_drive_react_1.expect(previous.label).to.eql(treeData[0].children[0].label);
                    return [2 /*return*/];
                });
            }); });
            it('gets previous item when its a parent', function () { return __awaiter(_this, void 0, void 0, function () {
                var previous;
                return __generator(this, function (_a) {
                    previous = tree_util_1.getPreviousItem(treeData, treeData[0].children[0], treeState, parentsMap);
                    test_drive_react_1.expect(previous.label).to.eql(treeData[0].label);
                    return [2 /*return*/];
                });
            }); });
            it('gets next item when its a sibling', function () { return __awaiter(_this, void 0, void 0, function () {
                var next;
                return __generator(this, function (_a) {
                    next = tree_util_1.getNextItem(treeData, treeData[0].children[1].children[0], treeState, parentsMap);
                    test_drive_react_1.expect(next.label).to.eql(treeData[0].children[1].children[1].label);
                    return [2 /*return*/];
                });
            }); });
            it('gets next item when its a parent', function () { return __awaiter(_this, void 0, void 0, function () {
                var next;
                return __generator(this, function (_a) {
                    next = tree_util_1.getNextItem(treeData, treeData[0].children[1].children[1], treeState, parentsMap);
                    test_drive_react_1.expect(next.label).to.eql(treeData[0].children[2].label);
                    return [2 /*return*/];
                });
            }); });
            it('selects last available item', function () { return __awaiter(_this, void 0, void 0, function () {
                var last;
                return __generator(this, function (_a) {
                    last = tree_util_1.getLastAvailableItem(treeData[0], treeState);
                    test_drive_react_1.expect(last.label).to.eql(treeData[0].children[2].label);
                    return [2 /*return*/];
                });
            }); });
        });
        describe('Accessibility', function () {
            it('puts correct aria values on different parts of the tree', function () {
                var _a = clientRenderer.render(React.createElement(src_1.TreeView, { dataSource: treeData })), select = _a.select, waitForDom = _a.waitForDom;
                var firstChild = treeData[0].children[0];
                expandItemWithLabel(select, treeData[0].label);
                return waitForDom(function () {
                    test_drive_react_1.expect(select(treeView)).to.have.attribute('role', 'tree');
                    test_drive_react_1.expect(select(treeView, getTreeItem(firstChild.label) + '_NODE')).to.have.attr('role', 'treeitem');
                });
            });
        });
        describe('TreeView methods', function () {
            var firstChild = treeData[0].children[0];
            var secondChild = treeData[0].children[1];
            function renderAndExpandPartsOfTree() {
                return __awaiter(this, void 0, void 0, function () {
                    var renderResult, select, waitForDom, treeRootIcon;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                renderResult = clientRenderer.render(React.createElement(src_1.TreeView, { dataSource: treeData }));
                                select = renderResult.select, waitForDom = renderResult.waitForDom;
                                treeRootIcon = select(treeView, getTreeItemIcon('Food Menu'));
                                test_drive_react_1.simulate.click(treeRootIcon);
                                return [4 /*yield*/, waitForDom(function () {
                                        return test_drive_react_1.expect(select(treeView, getTreeItemLabel(firstChild.label))).to.be.present();
                                    })];
                            case 1:
                                _a.sent();
                                test_drive_react_1.simulate.click(select(treeView, getTreeItemIcon(firstChild.label)));
                                return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(treeView, getTreeItemLabel(firstChild.children[0].label))).to.be.present(); })];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, renderResult];
                        }
                    });
                });
            }
            it('collapses a node and its subtree when \'collapse\' method is used', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, renderAndExpandPartsOfTree()];
                        case 1:
                            _a = _b.sent(), select = _a.select, waitForDom = _a.waitForDom, result = _a.result;
                            result.collapse(treeData[0]);
                            return [2 /*return*/, waitForDom(function () {
                                    test_drive_react_1.expect(select(treeView, getTreeItemLabel(firstChild.label))).to.be.absent();
                                    test_drive_react_1.expect(select(treeView, getTreeItemLabel(firstChild.children[0].label))).to.be.absent();
                                })];
                    }
                });
            }); });
            it('collapses the whole tree when \'collapseAll\' method is used', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, renderAndExpandPartsOfTree()];
                        case 1:
                            _a = _b.sent(), select = _a.select, waitForDom = _a.waitForDom, result = _a.result;
                            result.collapseAll();
                            return [2 /*return*/, waitForDom(function () {
                                    test_drive_react_1.expect(select(treeView, getTreeItemLabel(firstChild.label))).to.be.absent();
                                    test_drive_react_1.expect(select(treeView, getTreeItemLabel(firstChild.children[0].label))).to.be.absent();
                                })];
                    }
                });
            }); });
            it('expands a node and its subtree when \'expand\' method is used', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, result, treeRootIcon;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = clientRenderer.render(React.createElement(src_1.TreeView, { dataSource: treeData })), select = _a.select, waitForDom = _a.waitForDom, result = _a.result;
                            treeRootIcon = select(treeView, getTreeItemIcon('Food Menu'));
                            test_drive_react_1.simulate.click(treeRootIcon);
                            return [4 /*yield*/, waitForDom(function () { return test_drive_react_1.expect(select(treeView, getTreeItemLabel(firstChild.label))).to.be.present(); })];
                        case 1:
                            _b.sent();
                            result.expand(firstChild);
                            return [2 /*return*/, waitForDom(function () {
                                    test_drive_react_1.expect(select(treeView, getTreeItemLabel(firstChild.children[0].label))).to.be.present();
                                    test_drive_react_1.expect(select(treeView, getTreeItemLabel(secondChild.children[0].label))).to.be.absent();
                                })];
                    }
                });
            }); });
            it('expands the whole tree when \'expandAll\' method is used', function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, select, waitForDom, result;
                return __generator(this, function (_b) {
                    _a = clientRenderer.render(React.createElement(src_1.TreeView, { dataSource: treeData })), select = _a.select, waitForDom = _a.waitForDom, result = _a.result;
                    result.expandAll();
                    return [2 /*return*/, waitForDom(function () { return allNodesLabels.forEach(function (item) {
                            return test_drive_react_1.expect(select(treeView, getTreeItem(item)), "item did not appear: " + item).to.be.present();
                        }); })];
                });
            }); });
            it('selects the provided item when \'selectItem\' method is used', function () { return __awaiter(_this, void 0, void 0, function () {
                var onSelectItem, result;
                return __generator(this, function (_a) {
                    onSelectItem = test_drive_react_1.sinon.spy();
                    result = clientRenderer.render(React.createElement(src_1.TreeView, { dataSource: treeData, onSelectItem: onSelectItem })).result;
                    result.selectItem(treeData[0]);
                    return [2 /*return*/, test_drive_react_1.waitFor(function () { return test_drive_react_1.expect(onSelectItem).to.have.been.calledWithMatch(treeData[0]); })];
                });
            }); });
        });
    });
});
//# sourceMappingURL=tree-view.spec.js.map