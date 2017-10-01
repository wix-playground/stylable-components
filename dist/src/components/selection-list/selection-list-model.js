"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var React = require("react");
var clamp_1 = require("../../utils/clamp");
var divider_1 = require("./divider");
var option_1 = require("./option");
function renameKeys(data, schema) {
    var result = {};
    for (var key in schema) {
        if (schema.hasOwnProperty(key)) {
            result[key] = data[schema[key]];
        }
    }
    return result;
}
function defaultRenderItem(item) {
    if (typeof item === 'string') {
        item = { value: item, label: item };
    }
    if (item === divider_1.divider) {
        return React.createElement(divider_1.Divider, null);
    }
    else if (item.hidden) {
        return null;
    }
    return React.createElement(option_1.Option, { value: item.value, disabled: item.disabled }, item.label);
}
var SelectionListModel = /** @class */ (function () {
    function SelectionListModel() {
        this.items = [];
        this.selectableValues = [];
        this.selectedValue = undefined;
        this.focusedValue = undefined;
    }
    SelectionListModel.prototype.addDataSource = function (_a) {
        var _this = this;
        var _b = _a.dataSource, dataSource = _b === void 0 ? [] : _b, dataSchema = _a.dataSchema, _c = _a.renderItem, renderItem = _c === void 0 ? defaultRenderItem : _c;
        dataSource.forEach(function (data) {
            var element = renderItem(dataSchema && typeof data === 'object' ? renameKeys(data, dataSchema) : data);
            if (element) {
                _this.addItem(data, element);
            }
        });
    };
    SelectionListModel.prototype.addChildren = function (children) {
        var _this = this;
        React.Children.forEach(children, function (element) {
            if (typeof element === 'object') {
                _this.addItem(element, element);
            }
        });
    };
    SelectionListModel.prototype.focusFirst = function () {
        this.focusIndex(0);
    };
    SelectionListModel.prototype.focusLast = function () {
        this.focusIndex(Infinity);
    };
    SelectionListModel.prototype.focusPrevious = function () {
        var currentIndex = this.getFocusedIndex();
        this.focusIndex(currentIndex === -1 ? Infinity : currentIndex - 1);
    };
    SelectionListModel.prototype.focusNext = function () {
        var currentIndex = this.getFocusedIndex();
        this.focusIndex(currentIndex === -1 ? 0 : currentIndex + 1);
    };
    SelectionListModel.prototype.findItemByValue = function (value) {
        return this.items.find(function (item) { return item.value === value; });
    };
    SelectionListModel.prototype.getSelectedValue = function () {
        return this.selectedValue;
    };
    SelectionListModel.prototype.getFocusedValue = function () {
        return this.focusedValue;
    };
    SelectionListModel.prototype.selectValue = function (value) {
        this.selectedValue = value;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.selected = (value !== undefined && item.value === value);
        }
    };
    SelectionListModel.prototype.focusValue = function (value) {
        this.focusedValue = value;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.focused = (value !== undefined && item.value === value);
        }
    };
    SelectionListModel.prototype.addItem = function (data, element) {
        var value = element.props.value;
        var disabled = Boolean(element.props.disabled);
        var item = mobx_1.extendShallowObservable({
            data: data,
            disabled: disabled,
            element: element,
            isOption: value !== undefined,
            selectable: value !== undefined && !disabled,
            value: value
        }, {
            focused: false,
            selected: false
        });
        this.items.push(item);
        if (item.selectable) {
            this.selectableValues.push(item.value);
        }
    };
    SelectionListModel.prototype.getFocusedIndex = function () {
        return this.focusedValue === undefined ? -1 : this.selectableValues.indexOf(this.focusedValue);
    };
    SelectionListModel.prototype.focusIndex = function (index) {
        this.focusValue(this.selectableValues[clamp_1.clamp(index, 0, this.selectableValues.length - 1)]);
    };
    return SelectionListModel;
}());
exports.SelectionListModel = SelectionListModel;
//# sourceMappingURL=selection-list-model.js.map