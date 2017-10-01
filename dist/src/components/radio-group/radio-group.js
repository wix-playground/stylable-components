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
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var radio_button_1 = require("./radio-button");
var radio_group_st_css_1 = require("./radio-group.st.css");
var counter = 0;
var RadioGroup = /** @class */ (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.getChildTabIndex = function (index, isGroupChecked) {
            if (isGroupChecked) {
                return _this.checkedArray[index].checked ? _this.props.tabIndex : -1;
            }
            else {
                return index === 0 ? _this.props.tabIndex : -1;
            }
        };
        _this.checkedArray = [];
        if (_this.props.children) {
            _this.initCheckedArray(_this.props.children, true);
        }
        else if (_this.props.dataSource) {
            _this.initCheckedArray(_this.props.dataSource, false);
        }
        _this.name = _this.props.name ? _this.props.name : 'radio_group_' + counter++;
        return _this;
    }
    RadioGroup.prototype.render = function () {
        var childArray = [];
        if (this.props.children) {
            if (React.isValidElement(this.props.children)) {
                childArray.push(this.props.children);
            }
            else {
                childArray = this.createChildren(this.props.children);
            }
        }
        else if (this.props.dataSource.length > 0) {
            childArray = this.createChildrenFromDataSource();
        }
        return (React.createElement("div", { "data-automation-id": "RADIO_GROUP", role: "radiogroup" }, childArray));
    };
    RadioGroup.prototype.initCheckedArray = function (dataArray, isChildren) {
        if (isChildren === void 0) { isChildren = false; }
        var noCheckedRadioButton = true;
        for (var _i = 0, dataArray_1 = dataArray; _i < dataArray_1.length; _i++) {
            var button = dataArray_1[_i];
            if (typeof button === 'object' && isChildren) {
                button = button.props;
            }
            var isChecked = !!this.props.value && this.props.value === button.value;
            this.checkedArray.push(mobx_1.observable({ checked: noCheckedRadioButton && isChecked }));
            if (isChecked) {
                noCheckedRadioButton = false;
            }
        }
    };
    RadioGroup.prototype.childrenOnClick = function (index) {
        var _this = this;
        return function (e) {
            _this.checkedArray.forEach(function (data) {
                data.checked = false;
            });
            _this.checkedArray[index].checked = true;
            if (_this.props.onChange) {
                _this.props.onChange(e);
            }
        };
    };
    RadioGroup.prototype.createChildrenFromDataSource = function () {
        var _this = this;
        return this.props.dataSource.map(function (props, index) { return (React.createElement(radio_button_1.RadioButton, { key: index, value: props.value, "data-automation-id": 'RADIO_BUTTON_' + index, checked: _this.checkedArray[index].checked, onChange: _this.childrenOnClick(index), disabled: _this.props.disabled || props.disabled, readOnly: _this.props.readOnly || props.readOnly, name: _this.name, className: "radioGroupChild", tabIndex: _this.getChildTabIndex(index, _this.isGroupChecked) }, props.labelText ? React.createElement("label", { className: "data-label" }, props.labelText) : null)); });
    };
    RadioGroup.prototype.createChildren = function (dataArray) {
        var _this = this;
        return React.Children.map(dataArray, function (child, index) {
            if (child && typeof child === 'object') {
                if (child.type === radio_button_1.RadioButton) {
                    return (React.createElement(radio_button_1.RadioButton, { key: index, value: child.props.value, "data-automation-id": 'RADIO_BUTTON_' + index, checked: _this.checkedArray[index].checked, onChange: _this.childrenOnClick(index), disabled: _this.props.disabled || child.props.disabled, readOnly: _this.props.readOnly || child.props.readOnly, name: _this.name, className: "radioGroupChild", tabIndex: _this.getChildTabIndex(index, _this.isGroupChecked), children: child.props.children }));
                }
                else {
                    return (React.cloneElement(child, {
                        key: index,
                        checked: _this.checkedArray[index].checked,
                        onChange: mobx_1.action(_this.childrenOnClick(index)),
                        className: 'radioGroupChild',
                        tabIndex: _this.getChildTabIndex(index, _this.isGroupChecked)
                    }, child.props.children));
                }
            }
            else {
                return child;
            }
        });
    };
    Object.defineProperty(RadioGroup.prototype, "isGroupChecked", {
        get: function () {
            return !!this.checkedArray.find(function (elm) { return elm.checked; });
        },
        enumerable: true,
        configurable: true
    });
    RadioGroup.defaultProps = {
        dataSource: [],
        tabIndex: 0
    };
    __decorate([
        mobx_1.computed
    ], RadioGroup.prototype, "isGroupChecked", null);
    RadioGroup = __decorate([
        wix_react_tools_1.stylable(radio_group_st_css_1.default),
        wix_react_tools_1.properties,
        mobx_react_1.observer
    ], RadioGroup);
    return RadioGroup;
}(React.Component));
exports.RadioGroup = RadioGroup;
//# sourceMappingURL=radio-group.js.map