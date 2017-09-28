import {DriverBase, simulate} from 'test-drive-react';
import * as keycode from 'keycode';
import {Slider, ContextProvider} from '../../src';
import {simulateMouseEvent, simulateTouchEvent, skipItIfTouch} from '../../test/utils';
import WindowStub from '../../test/stubs/window.stub';

// TODO reuse
interface EventCoordinates {
    clientX: number;
    clientY: number;
}

export class SliderDriver extends DriverBase {
    public static ComponentClass = Slider;

    public find(selector: string): HTMLElement {
        return this.select(selector);
    }
    public get slider(): HTMLElement {
        return this.select('SLIDER');
    }
    public get handle(): HTMLElement {
        return this.select('SLIDER-HANDLE');
    }
    public get progress(): HTMLElement {
        return this.select('SLIDER-PROGRESS');
    }
    public get input(): HTMLElement {
        return this.select('NATIVE-INPUT');
    }
    public get tooltip(): HTMLElement {
        return this.select('SLIDER-TOOLTIP');
    }
    public getMark(index: number): HTMLElement {
        return this.select(`SLIDER-MARKS-${index}`);
    }
    public mouseDown(event: EventCoordinates) {
        const element = this.slider;
        simulate.mouseDown(element, {
            currentTarget: element!,
            clientX: event.clientX,
            clientY: event.clientY
        });
    }
    public mouseMove(event: EventCoordinates, environment: WindowStub) {
        this.mouseEvent('mousemove', event, environment);
    }
    public mouseUp(event: EventCoordinates, environment: WindowStub) {
        this.mouseEvent('mouseup', event, environment);
    }

    public touchStart(event: EventCoordinates) {
        const element = this.slider;
        simulate.touchStart(element, {
            currentTarget: element,
            touches: {
                0: {
                    clientX: event.clientX,
                    clientY: event.clientY
                }
            } as any as TouchList
        });
    }

    public touchMove(event: EventCoordinates, environment: WindowStub) {
        this.touchEvent('touchmove', event, environment);
    }
    public touchEnd(event: EventCoordinates, environment: WindowStub) {
        this.touchEvent('touchend', event, environment);
    }

    public keyDown(key: string, opts?: object) {
        simulate.keyDown(this.handle, {
            keyCode: keycode(key),
            ...opts
        });
    }

    private mouseEvent(name: string, event: EventCoordinates, environment: WindowStub) {
        simulateMouseEvent(
            environment,
            name,
            {
                clientX: event.clientX,
                clientY: event.clientY
            }
        );
    }
    private touchEvent(name: string, event: EventCoordinates, environment: WindowStub) {
        simulateTouchEvent(
            environment,
            name,
            {
                clientX: event.clientX,
                clientY: event.clientY
            }
        );
    }
}

export class SliderContextProvierDriver extends SliderDriver {
    public static ComponentClass = ContextProvider;
}
