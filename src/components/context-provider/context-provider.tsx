import * as PropTypes from 'prop-types';
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

export interface Hash {
    [key: string]: any;
}

function getContextProps(allProps: CPProps): Hash {
    const props = omit(allProps, 'tagName', 'style', 'children', 'className');
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

function createComponent(context: Hash): React.ComponentClass {
    const childContextTypes = Object.keys(context).reduce<{[key: string]: any}>((obj, key) => {
        obj[key] = PropTypes.any;
        return obj;
    }, {});

    return class extends React.Component<CPProps> {
        public static childContextTypes = childContextTypes;
        public getChildContext() {
            return context;
        }
        public render() {
            const {tagName, className, style, dir, children} = this.props;
            return  React.createElement(tagName!, {className, style, dir, children});
        }
    };
}

function shallowEqual(a: Hash, b: Hash): boolean {
    return Object.keys(a).length === Object.keys(b).length &&
        Object.keys(a).every(key => a[key] === b[key]);
}

export class ContextProvider extends React.PureComponent<CPProps> {
    public static defaultProps = {
        tagName: 'div'
    };
    public Component: React.ComponentClass;
    public contextProps: Hash;

    constructor(props: CPProps) {
        super();
        this.contextProps = getContextProps(props);
        this.Component = createComponent(this.contextProps);
    }

    public componentWillReceiveProps(props: CPProps) {
        const contextProps = getContextProps(props);
        if (!shallowEqual(this.contextProps, contextProps)) {
            this.contextProps = contextProps;
            this.Component = createComponent(contextProps);
        }
    }

    public render() {
        return React.createElement(this.Component, this.props);
    }
}
