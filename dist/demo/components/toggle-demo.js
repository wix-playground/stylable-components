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
var ToggleDemo = /** @class */ (function (_super) {
    __extends(ToggleDemo, _super);
    function ToggleDemo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            checked: false
        };
        return _this;
    }
    ToggleDemo.prototype.render = function () {
        var _this = this;
        var onChange = function (e) { return _this.setState({ checked: e.value }); };
        return (React.createElement("table", null,
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("th", { "data-automation-id": "TOGGLE_DEMO_CONTROLLED" },
                        "Controlled",
                        React.createElement(src_1.Toggle, { label: "with icons", value: this.state.checked, onChange: onChange })),
                    React.createElement("th", null,
                        "Controlled RTL",
                        React.createElement(src_1.ContextProvider, { dir: "rtl" },
                            React.createElement(src_1.Toggle, { label: "with icons", value: this.state.checked, onChange: onChange }))),
                    React.createElement("th", { "data-automation-id": "TOGGLE_DEMO_UNCONTROLLED" },
                        "Off",
                        React.createElement(src_1.Toggle, null)),
                    React.createElement("th", null,
                        "On",
                        React.createElement(src_1.Toggle, { value: true })),
                    React.createElement("th", null,
                        "Disabled and off",
                        React.createElement(src_1.Toggle, { disabled: true })),
                    React.createElement("th", null,
                        "Disabled and on",
                        React.createElement(src_1.Toggle, { disabled: true, value: true })),
                    React.createElement("th", null,
                        "Error and off",
                        React.createElement(src_1.Toggle, { error: true })),
                    React.createElement("th", null,
                        "Error and on",
                        React.createElement(src_1.Toggle, { error: true, value: true }))))));
    };
    return ToggleDemo;
}(React.Component));
exports.ToggleDemo = ToggleDemo;
//# sourceMappingURL=toggle-demo.js.map