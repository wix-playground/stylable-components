import * as React from 'react';

export function wrapWithContext(
    context: any,
    children: React.ReactElement<any>
): React.ReactElement<any> {
    const contextTypes = Object.keys(context)
        .reduce((result: any, key) => {
            result[key] = React.PropTypes.any;
            return result;
        }, {});
    const wrapperWithContext = React.createClass({
        childContextTypes: contextTypes,
        getChildContext() {
            return context;
        },
        render() {
            return children;
        }
    });
    return React.createElement(wrapperWithContext);
}
