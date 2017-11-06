import {SinonSandbox, SinonStub} from 'sinon';
import {sinon} from 'test-drive-react';

export type WindowEvent = WindowEventMap[keyof WindowEventMap];

type WindowEventListener = (e?: Partial<WindowEvent>) => any;

function stubWindowMethod(
    sandbox: SinonSandbox,
    method: keyof Window,
    stub: (...args: any[]) => any
) {
    return sandbox.stub(window, method).callsFake(stub);
}

export class WindowStub {

    public sandbox = sinon.sandbox.create();

    public addEventListener = stubWindowMethod(
        this.sandbox, 'addEventListener',
        (type: string, listener: WindowEventListener) => {
            const events = this.events;
            if (events.has(type)) {
                const listeners = events.get(type);
                (listeners as WindowEventListener[]).push(listener);
            } else {
                const listeners = [listener];
                events.set(type, listeners);
            }
        }
    );

    public removeEventListener = stubWindowMethod(
        this.sandbox, 'removeEventListener',
        (type: string, listener?: WindowEventListener) => {
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

    private events = new Map<string, WindowEventListener[]>();

    public simulate(type: string, event?: Partial<WindowEvent>) {
        const events = this.events;

        if (events.has(type)) {
            const listeners = events.get(type);
            listeners!.forEach(listener => listener(event));
        }
    }
}
