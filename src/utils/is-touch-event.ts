export function isTouchEvent(event: any): event is TouchEvent | React.TouchEvent<any> {
    return 'changedTouches' in event || 'touches' in event;
}
