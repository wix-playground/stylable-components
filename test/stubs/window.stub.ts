import {SinonSandbox, SinonStub} from 'sinon';
import {sinon} from 'test-drive-react';

type EventListener = (...args: any[]) => any;

function stubbed(sandbox: SinonSandbox, method: keyof Window, stub: (...args: any[]) => any) {
    return sandbox.stub(window, method, stub);
}

export default class WindowStub {

    public sandbox = sinon.sandbox.create();

    public addEventListener = stubbed(
        this.sandbox, 'addEventListener',
        (type: string, listener: EventListener) => {
            const events = this.events;
            if (events.has(type)) {
                const listeners = events.get(type);
                (listeners as EventListener[]).push(listener);
            } else {
                const listeners = [listener];
                events.set(type, listeners);
            }
        }
    );

    public removeEventListener = stubbed(
        this.sandbox, 'removeEventListener',
        (type: string, listener?: EventListener) => {
            const events = this.events;

            if (events.has(type)) {
                const listeners = events.get(type);

                if (listener) {
                    const index = listeners!.indexOf(listener);

                    if (index >= 0) {
                        listeners!.splice(index, 1);

                        if (listeners!.length === 0) {
                            events.delete(type);
                        }
                    }
                } else {
                    events.delete(type);
                }
            }
        }
    );

    private events = new Map<string, EventListener[]>();

    public simulate(type: string) {
        const events = this.events;

        if (events.has(type)) {
            const listeners = events.get(type);
            listeners!.forEach(listener => listener());
        }
    }

}
