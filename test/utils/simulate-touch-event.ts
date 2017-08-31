export function simulateTouchEvent(
    element: any,
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

    const touchEventInit: any = {
        touches: [touchObj],
        targetTouches: [touchObj],
        changedTouches: [touchObj]
    };

    const event: any = new CustomEvent(eventType, {bubbles: true, cancelable: true});
    Object.keys(touchEventInit)
        .forEach(property => event[property] = touchEventInit[property]);

    element.dispatchEvent(event);
}
