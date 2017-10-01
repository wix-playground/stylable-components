/// <reference types="react" />
import { Component } from 'react';
export declare type Props = {
    [EventName in keyof WindowEventMap]?: (event: WindowEventMap[EventName]) => void;
};
export declare class GlobalEvent extends Component<Props> {
    shouldComponentUpdate(): boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(props: Props): void;
    render(): null;
    private forEachEvent(fn);
    private subscribe(event, listener);
    private unsubscribe(event, listener);
}
