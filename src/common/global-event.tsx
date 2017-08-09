import { Component } from 'react';

export interface GlobalEventProps {
    event: string;
    handler: EventListener;
}

export default class GlobalEvent extends Component<GlobalEventProps> {

    private emitter = window;

    public componentDidMount() {
        this.emitter.addEventListener(this.props.event, this.handler);
    }

    public componentWillUnmount() {
        this.emitter.removeEventListener(this.props.event, this.handler);
    }

    public render() {
        return null;
    }

    private handler = (e: Event) => {
        const { handler } = this.props;
        handler(e);
    }
}
