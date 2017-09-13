import * as React from 'react';
import {omit} from '../../utils';

export interface CPProps {
    dir?: string;
    tagName?: string;
    className?: string;
    style?: object;
    children?: React.ReactNode;
    [key: string]: any;
}

const fakeChildContextTypes = new Proxy({}, {
    has() {return true; }
});

export class ContextProvider extends React.Component<CPProps> {
    public static defaultProps = {
        tagName: 'div'
    };
    public static childContextTypes = fakeChildContextTypes;

    public getChildContext() {
        const props = omit(this.props, 'tagName', 'style', 'children', 'className');
        return Object.keys(props).reduce<{[key: string]: any}>((obj, key) => {
            let newKey: any;
            if (typeof key === 'symbol') {
                newKey = key;
            } else if (/context\-(.+)/.test(key)) {
                newKey = RegExp.$1;
            } else {
                newKey = 'context-provider-' + key;
            }
            obj[newKey as string] = props[key];
            return obj;
        }, {});
    }
    public render() {
        const {tagName, className, style, dir, children} = this.props;
        return  React.createElement(tagName!, {className, style, dir, children});
    }
}
