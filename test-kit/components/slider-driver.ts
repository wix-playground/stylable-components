import * as keycode from 'keycode';
import {DriverBase, simulate} from 'test-drive-react';
import {ContextProvider, Slider} from '../../src';
import {simulateMouseEvent, simulateTouchEvent} from '../../test/utils';
import WindowStub from '../../test/stubs/window.stub';

// TODO reuse
export interface SliderEventCoordinates {
    clientX: number;
    clientY: number;
}

export class BaseSliderDriver extends DriverBase {
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

    public getBounds() {
        return this.slider.getBoundingClientRect();
    }

    public mouseDown(event: SliderEventCoordinates) {
        const element = this.slider;
        simulate.mouseDown(element, {
            currentTarget: element!,
            clientX: event.clientX,
            clientY: event.clientY
        });
    }
    public mouseMove(event: SliderEventCoordinates, environment: WindowStub) {
        this.mouseEvent('mousemove', event, environment);
    }
    public mouseUp(event: SliderEventCoordinates, environment: WindowStub) {
        this.mouseEvent('mouseup', event, environment);
    }

    public touchStart(event: SliderEventCoordinates) {
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

    public touchMove(event: SliderEventCoordinates, environment: WindowStub) {
        this.touchEvent('touchmove', event, environment);
    }
    public touchEnd(event: SliderEventCoordinates, environment: WindowStub) {
        this.touchEvent('touchend', event, environment);
    }

    public keyDown(key: string, opts?: object) {
        simulate.keyDown(this.handle, {
            keyCode: keycode(key),
            ...opts
        });
    }

    private mouseEvent(name: string, event: SliderEventCoordinates, environment: WindowStub) {
        simulateMouseEvent(
            environment,
            name,
            {
                clientX: event.clientX,
                clientY: event.clientY
            }
        );
    }
    private touchEvent(name: string, event: SliderEventCoordinates, environment: WindowStub) {
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

export class SliderDriver extends BaseSliderDriver {
    public static ComponentClass = Slider;
}
export class SliderContextProvierDriver extends BaseSliderDriver {
    public static ComponentClass = ContextProvider;
}
