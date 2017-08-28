export function simulateTouchEvent(
    element: Element,
    eventType: string,
    options: {
        x: number,
        y: number,
        shiftKey?: boolean
    }
): void {
    const TouchConstructor: any = Touch;
    const touchObj = new TouchConstructor({
        identifier: Date.now(),
        target: element,
        clientX: options.x,
        clientY: options.y,
        radiusX: 2.5,
        radiusY: 2.5,
        rotationAngle: 10,
        force: 0.5
    });

    element.dispatchEvent(new TouchEvent(
        eventType,
        {
            cancelable: true,
            bubbles: true,
            touches: [touchObj],
            targetTouches: [],
            changedTouches: [touchObj],
            shiftKey: Boolean(options.shiftKey)
        } as any as EventInit
    ));
}
