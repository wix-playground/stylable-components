import { Component } from 'react';

export interface GlobalEventProps {
    event: string;
    debounce?: number;
    handler: EventListener;
}

export default class GlobalEvent extends Component<GlobalEventProps> {

    private emitter = window;

    private timeoutId: NodeJS.Timer;

    public componentDidMount() {
        this.emitter.addEventListener(this.props.event, this.handler);
    }

    public componentWillUnmount() {
        this.emitter.removeEventListener(this.props.event, this.handler);
    }

    private handler = (e: Event) => {
        const { debounce, handler } = this.props;

        if (debounce == null) {
            handler(e);
            return;
        }

        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            handler(e);
        }, debounce);
    }
}
