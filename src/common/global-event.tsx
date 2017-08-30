import { Component } from 'react';

export type Props = {
    [EventName in keyof WindowEventMap]?: (event: WindowEventMap[EventName]) => void;
};

export default class GlobalEvent extends Component<Props> {

    private emitter = window;

    public componentDidMount() {
        this.forEachEvent(name => this.subscribe(name, this.props[name] as EventListener));
    }

    public componentWillUnmount() {
        this.forEachEvent(name => this.unsubscribe(name, this.props[name] as EventListener));
    }

    public componentWillReceiveProps(props: Props) {
        this.forEachEvent(name => {
            if (this.props[name] !== props[name]) {
                this.unsubscribe(name, this.props[name] as EventListener);
                props[name] && this.subscribe(name, props[name] as EventListener);
            }
        });
    }

    public render() {
        return null;
    }

    private forEachEvent(fn: (name: keyof Props) => void) {
        Object
            .keys(this.props)
            .filter(name => name !== 'children')
            .forEach(fn);
    }

    private subscribe(event: string, handler: EventListener) {
        this.emitter.addEventListener(event, handler);
    }

    private unsubscribe(event: string, handler: EventListener) {
        this.emitter.removeEventListener(event, handler);
    }
}
