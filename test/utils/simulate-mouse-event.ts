export function simulateMouseEvent(
    element: Element,
    eventType: string,
    options?: object
): void {
    const event = document.createEvent('Event');

    event.initEvent(eventType, true, true);

    element.dispatchEvent(new MouseEvent(
        eventType,
        options as any as EventInit
    ));
}
