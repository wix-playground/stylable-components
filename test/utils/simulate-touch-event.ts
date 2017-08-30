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

    const touchEventInit: any = {
        touches: [touchObj],
        targetTouches: [touchObj],
        changedTouches: [touchObj]
    };

    // element.dispatchEvent(new TouchEvent(
    //     eventType,
    //     {
    //         touches: [touchObj],
    //         targetTouches: [touchObj],
    //         changedTouches: [touchObj]
    //     } as any as TouchEventInit
    // ));
    let event: any;

    if (TouchEvent) {
        touchEventInit.bubbles = true;
        touchEventInit.cancelable = true;
        // event = new TouchEvent(eventType, touchEventInit);
    } else {
        event = new CustomEvent(eventType, {bubbles: true, cancelable: true});
        Object.keys(touchEventInit)
            .forEach(property => event[property] = touchEventInit[property]);
    }

    element.dispatchEvent(event);
}
