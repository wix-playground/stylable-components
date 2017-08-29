export function simulateMouseEvent(
    element: Element,
    eventType: string,
    options?: object
): void {
    console.error('element.dispatchEvent', eventType);
    element.dispatchEvent(new MouseEvent(
        eventType,
        options as any as EventInit
    ));
}
