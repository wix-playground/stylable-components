import WindowStub from '../stubs/window.stub';

export interface Options {
    clientX?: number;
    clientY?: number;
}

export function simulateMouseEvent(
    element: WindowStub,
    eventType: string,
    options?: Partial<MouseEvent>
): void {
    element.simulate(eventType, options);
}
