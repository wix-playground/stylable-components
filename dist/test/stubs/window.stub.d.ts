/// <reference types="sinon" />
import { SinonSandbox, SinonStub } from 'sinon';
export declare type WindowEvent = WindowEventMap[keyof WindowEventMap];
export default class WindowStub {
    sandbox: SinonSandbox;
    addEventListener: SinonStub;
    removeEventListener: SinonStub;
    private events;
    simulate(type: string, event?: Partial<WindowEvent>): void;
}
