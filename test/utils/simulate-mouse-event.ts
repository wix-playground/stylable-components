export interface Options {
    clientX?: number;
    clientY?: number;
}

export function simulateMouseEvent(
    element: Element,
    eventType: string,
    options?: Options
): void {
    const event = document.createEvent('MouseEvents');
    if (event.initMouseEvent) {
        event.initMouseEvent(
            eventType,
            true,
            true,
            window,
            0,
            0,
            0,
            options!.clientX || 0,
            options!.clientY || 0,
            false,
            false,
            false,
            false,
            0,
            null
        );
    } else {
        element.dispatchEvent(new MouseEvent(
            eventType,
            options as any as EventInit
        ));
    }
}
