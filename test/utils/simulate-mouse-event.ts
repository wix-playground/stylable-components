export function simulateMouseEvent(
    element: Element,
    eventType: string,
    options?: object
): void {
    setTimeout(function() {
        throw new Error('eventTypeeventType ' + eventType);
    }, 0);
    element.dispatchEvent(new MouseEvent(
        eventType,
        options as any as EventInit
    ));
}
