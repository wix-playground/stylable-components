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
var items = ['Muffins', 'Pancakes', 'Cupcakes', 'Souffles',
    'Pasta', 'Soup', 'Caramel', 'Avazim', 'Moses'];
var AutoCompleteDemo = /** @class */ (function (_super) {
    __extends(AutoCompleteDemo, _super);
    function AutoCompleteDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { open: false, inputText: '' };
        _this.onChange = function (e) {
            _this.setState({
                inputText: e.value
            });
        };
        _this.updateOpenState = function (e) {
            _this.setState({ open: e.value });
        };
        return _this;
    }
    AutoCompleteDemo.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h2", null, "AutoComplete"),
            React.createElement("section", { "data-automation-id": "AUTO_COMPLETE_DEMO", style: { width: '250px' } },
                React.createElement(src_1.AutoComplete, { dataSource: items, onChange: this.onChange, onOpenStateChange: this.updateOpenState, open: this.state.open, value: this.state.inputText })),
            React.createElement("span", { "data-automation-id": "AUTO_COMPLETE_DEMO_TEXT" },
                "You picked: ",
                this.state.inputText)));
    };
    return AutoCompleteDemo;
}(React.Component));
exports.AutoCompleteDemo = AutoCompleteDemo;
//# sourceMappingURL=auto-complete.demo.js.map