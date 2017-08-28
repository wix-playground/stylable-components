import React = require('react');

export function isReactComponent(value: any): value is React.ComponentType<any> {
    return value && value.prototype && value.prototype instanceof React.Component;
}
