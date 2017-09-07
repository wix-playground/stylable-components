import {Component} from 'react';

export type Props = {
    [EventName in keyof WindowEventMap]?: (event: WindowEventMap[EventName]) => void;
};

export default class GlobalEvent extends Component<Props> {

    public shouldComponentUpdate() {
        return false;
    }

    public componentDidMount() {
        this.forEachEvent((name, listener) => this.subscribe(name, listener));
    }

    public componentWillUnmount() {
        this.forEachEvent((name, listener) => this.unsubscribe(name, listener));
    }

    public componentWillReceiveProps(props: Props) {
        this.forEachEvent((name, listener) => {
            if (listener !== props[name]) {
                this.unsubscribe(name, listener);
                props[name] && this.subscribe(name, props[name] as EventListener);
            }
        });
    }

    public render() {
        return null;
    }

    private forEachEvent(fn: (name: keyof Props, listener: EventListener) => void) {
        (Object
            .keys(this.props)
            .filter(name => name !== 'children') as Array<keyof Props>)
            .forEach(name => fn(name, this.props[name] as EventListener));
    }

    private subscribe(event: string, listener: EventListener) {
        window && window.addEventListener(event, listener);
    }

    private unsubscribe(event: string, listener: EventListener) {
        window && window.removeEventListener(event, listener);
    }
}
