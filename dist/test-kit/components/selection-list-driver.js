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
var selection_list_st_css_1 = require("../../src/components/selection-list/selection-list.st.css");
var utils_1 = require("../utils");
var SelectionListTestDriver = /** @class */ (function (_super) {
    __extends(SelectionListTestDriver, _super);
    function SelectionListTestDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionListTestDriver.prototype.focus = function () {
        test_drive_react_1.simulate.focus(this.root);
    };
    SelectionListTestDriver.prototype.blur = function () {
        test_drive_react_1.simulate.blur(this.root);
    };
    Object.defineProperty(SelectionListTestDriver.prototype, "items", {
        get: function () {
            return Array.from(this.root.children);
        },
        enumerable: true,
        configurable: true
    });
    SelectionListTestDriver.prototype.keyDown = function (keyCode) {
        test_drive_react_1.simulate.keyDown(this.root, { keyCode: keyCode });
    };
    SelectionListTestDriver.prototype.click = function (element) {
        test_drive_react_1.simulate.click(element);
    };
    SelectionListTestDriver.prototype.elementHasStylableState = function (element, stateName) {
        return utils_1.elementHasStylableState(element, selection_list_st_css_1.default, stateName);
    };
    SelectionListTestDriver.prototype.elementHasStylableClassName = function (element, className) {
        return utils_1.elementHasStylableClassName(element, selection_list_st_css_1.default, className);
    };
    SelectionListTestDriver.ComponentClass = src_1.SelectionList;
    return SelectionListTestDriver;
}(test_drive_react_1.DriverBase));
exports.SelectionListTestDriver = SelectionListTestDriver;
//# sourceMappingURL=selection-list-driver.js.map