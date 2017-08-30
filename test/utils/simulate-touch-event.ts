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
            touches: [touchObj],
            targetTouches: [],
            changedTouches: [touchObj]
        } as any as TouchEventInit
    ));
}
