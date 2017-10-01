"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var selection_list_st_css_1 = require("./selection-list.st.css");
exports.Option = wix_react_tools_1.stylable(selection_list_st_css_1.default)(function (props) { return (React.createElement("div", { className: "item", "data-value": props.disabled ? undefined : props.value, "style-state": {
        disabled: Boolean(props.disabled),
        selected: Boolean(props.selected),
        focused: Boolean(props.focused)
    } }, props.children)); });
//# sourceMappingURL=option.js.map