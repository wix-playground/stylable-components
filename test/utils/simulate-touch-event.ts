import {noop} from '../../src/utils/noop';

export function simulateTouchEvent(
    element: any,
    eventType: string,
    options: {
        clientX: number,
        clientY: number,
        shiftKey?: boolean
    }
): void {
    const touchObj = {
        target: element,
        clientX: options.clientX,
        clientY: options.clientY
    };

    const touchEventInit: any = {
        touches: [touchObj],
        targetTouches: [touchObj],
        changedTouches: [touchObj],
        preventDefault: noop
    };
    element.simulate(eventType, touchEventInit);
}
