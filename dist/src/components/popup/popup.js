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
var React = require("react");
var wix_react_tools_1 = require("wix-react-tools");
var portal_1 = require("../portal");
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popup.prototype.render = function () {
        if (this.props.anchor && this.props.open) {
            return (React.createElement(portal_1.Portal, { style: this.createStyle() }, this.props.children));
        }
        return null;
    };
    Popup.prototype.createStyle = function () {
        if (!this.props.anchor) {
            return {};
        }
        var newStyle = { position: 'absolute' };
        newStyle.maxHeight = this.props.maxHeight;
        newStyle.transform = '';
        newStyle.WebkitTransform = '';
        if (isPoint(this.props.anchor)) {
            newStyle.top = this.props.anchor.y;
            newStyle.left = this.props.anchor.x;
        }
        else {
            var anchorRect = this.props.anchor.getBoundingClientRect();
            if (this.props.syncWidth) {
                newStyle.width = anchorRect.width;
            }
            newStyle.top = getVerticalReference(anchorRect, this.props.anchorPosition.vertical);
            newStyle.left = getHorizontalReference(anchorRect, this.props.anchorPosition.horizontal);
        }
        switch (this.props.popupPosition.vertical) {
            case 'center':
                addTransform(newStyle, 'translateY(-50%)');
                break;
            case 'bottom':
                addTransform(newStyle, 'translateY(-100%)');
                break;
        }
        switch (this.props.popupPosition.horizontal) {
            case 'center':
                addTransform(newStyle, 'translateX(-50%)');
                break;
            case 'right':
                addTransform(newStyle, 'translateX(-100%)');
                break;
        }
        return newStyle;
    };
    Popup.defaultProps = {
        open: false,
        anchorPosition: { vertical: 'bottom', horizontal: 'left' },
        popupPosition: { vertical: 'top', horizontal: 'left' },
        syncWidth: true,
        maxHeight: 500
    };
    Popup = __decorate([
        wix_react_tools_1.properties
    ], Popup);
    return Popup;
}(React.Component));
exports.Popup = Popup;
function getVerticalReference(rect, anchorPosition) {
    if (anchorPosition === 'center') {
        return window.pageYOffset + rect.top + (rect.height / 2);
    }
    else {
        return window.pageYOffset + rect[anchorPosition];
    }
}
function getHorizontalReference(rect, anchorPosition) {
    if (anchorPosition === 'center') {
        return window.pageXOffset + rect.left + (rect.width / 2);
    }
    else {
        return window.pageXOffset + rect[anchorPosition];
    }
}
function addTransform(style, transformation) {
    style.transform += transformation;
    style.WebkitTransform += transformation;
}
function isPoint(elem) {
    return elem.hasOwnProperty('x') && elem.hasOwnProperty('y');
}
//# sourceMappingURL=popup.js.map