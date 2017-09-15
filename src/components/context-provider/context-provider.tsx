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

export class ContextProvider extends React.PureComponent<CPProps> {
    public static childContextTypes = {
        contextProvider: PropTypes.object
    };

    public static defaultProps = {
        tagName: 'div'
    };

    public getChildContext() {
        return {
            contextProvider: omit(this.props, 'tagName', 'style', 'children', 'className')
        };
    }

    public render() {
        const {tagName, className, style, dir, children} = this.props;
        return  React.createElement(tagName!, {className, style, dir, children});
    }
}
