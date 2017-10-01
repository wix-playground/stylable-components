/// <reference types="react" />
import * as PropTypes from 'prop-types';
import * as React from 'react';
export interface ContextProviderProps {
    dir?: 'ltr' | 'rtl' | 'auto';
    tagName?: string;
    className?: string;
    style?: object;
    children?: React.ReactNode;
    [key: string]: any;
}
export declare class ContextProvider extends React.PureComponent<ContextProviderProps> {
    static childContextTypes: {
        contextProvider: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        tagName: string;
    };
    getChildContext(): {
        contextProvider: Partial<Readonly<{
            children?: React.ReactNode;
        }> & Readonly<ContextProviderProps>>;
    };
    render(): React.DOMElement<{
        className: string | undefined;
        style: object | undefined;
        dir: "auto" | "ltr" | "rtl" | undefined;
        children: React.ReactNode;
    }, Element>;
}
