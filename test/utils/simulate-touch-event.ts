export function simulateTouchEvent(
    element: Element,
    eventType: string,
    options: {
        x: number,
        y: number,
        shiftKey?: boolean
    }
): void {
    const touchObj = {
        target: element,
        clientX: options.x,
        clientY: options.y
    };

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
