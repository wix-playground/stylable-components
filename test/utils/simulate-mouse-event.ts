export function simulateMouseEvent(
    element: Element,
    eventType: string,
    options?: object
): void {
    element.dispatchEvent(new MouseEvent(
        eventType,
        options as any as EventInit
    ));
}
