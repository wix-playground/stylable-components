import WindowStub from '../stubs/window.stub';
export interface Options {
    clientX?: number;
    clientY?: number;
}
export declare function simulateMouseEvent(element: WindowStub, eventType: string, options?: Partial<MouseEvent>): void;
