import { Component } from 'react';

export interface GlobalEventProps {
    event: string;
    handler: EventListener;
}

export default class GlobalEvent extends Component<GlobalEventProps> {

    private emitter = window;

    public componentDidMount() {
        this.subscribe(this.props.event);
    }

    public componentWillUnmount() {
        this.unsubscribe(this.props.event);
    }

    public componentWillReceiveProps({event}: GlobalEventProps) {
        if (event !== this.props.event) {
            this.unsubscribe(this.props.event);
            this.subscribe(event);
        }
    }

    public render() {
        return null;
    }

    private handler = (e: Event) => {
        const { handler } = this.props;
        handler(e);
    }

    private subscribe(event: string) {
        this.emitter.addEventListener(event, this.handler);
    }

    private unsubscribe(event: string) {
        this.emitter.removeEventListener(event, this.handler);
    }
}
