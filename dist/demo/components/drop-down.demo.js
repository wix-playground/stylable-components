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
var items = ['Muffins', 'Pancakes', 'Waffles'];
var DropDownDemo = /** @class */ (function (_super) {
    __extends(DropDownDemo, _super);
    function DropDownDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { selectedItem: undefined };
        _this.onItemClick = function (e) {
            _this.setState({
                selectedItem: e.value
            });
        };
        return _this;
    }
    DropDownDemo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h2", null, "DropDown"),
            React.createElement("section", { "data-automation-id": "DROP_DOWN_DEMO", style: { width: '250px' } },
                React.createElement(src_1.DropDown, { value: this.state.selectedItem, onChange: this.onItemClick, dataSource: items }))));
    };
    return DropDownDemo;
}(React.Component));
exports.DropDownDemo = DropDownDemo;
//# sourceMappingURL=drop-down.demo.js.map