import {noop} from '../../src/utils/noop';

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
        changedTouches: [touchObj],
        preventDefault: noop
    };
    element.simulate(eventType, touchEventInit);
}
