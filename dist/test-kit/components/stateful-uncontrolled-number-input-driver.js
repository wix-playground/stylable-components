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
var test_drive_react_1 = require("test-drive-react");
var src_1 = require("../../src");
var StatefulUncontrolledNumberInput = /** @class */ (function (_super) {
    __extends(StatefulUncontrolledNumberInput, _super);
    function StatefulUncontrolledNumberInput(props) {
        var _this = _super.call(this) || this;
        _this.handleClick = function () { return _this.setState({ defaultValue: _this.state.defaultValue + 1 }); };
        _this.state = {
            defaultValue: props.initialValue
        };
        return _this;
    }
    StatefulUncontrolledNumberInput.prototype.render = function () {
        return (React.createElement("div", { "data-automation-id": "FIXTURE", onClick: this.handleClick },
            React.createElement(src_1.NumberInput, { defaultValue: this.state.defaultValue })));
    };
    return StatefulUncontrolledNumberInput;
}(React.Component));
exports.StatefulUncontrolledNumberInput = StatefulUncontrolledNumberInput;
var StatefulUnctontrolledNumberInputDriver = /** @class */ (function (_super) {
    __extends(StatefulUnctontrolledNumberInputDriver, _super);
    function StatefulUnctontrolledNumberInputDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StatefulUnctontrolledNumberInputDriver.prototype, "input", {
        get: function () {
            return this.select('NATIVE_INPUT_NUMBER');
        },
        enumerable: true,
        configurable: true
    });
    StatefulUnctontrolledNumberInputDriver.prototype.click = function () {
        test_drive_react_1.simulate.click(this.root);
    };
    StatefulUnctontrolledNumberInputDriver.ComponentClass = StatefulUncontrolledNumberInput;
    return StatefulUnctontrolledNumberInputDriver;
}(test_drive_react_1.DriverBase));
exports.StatefulUnctontrolledNumberInputDriver = StatefulUnctontrolledNumberInputDriver;
//# sourceMappingURL=stateful-uncontrolled-number-input-driver.js.map