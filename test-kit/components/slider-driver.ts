import * as keycode from 'keycode';
import {DriverBase, simulate} from 'test-drive-react';
import {ContextProvider, Slider} from '../../src';
import {noop} from '../../src/utils';
import {WindowStub} from '../../test-kit';
import {simulateMouseEvent, simulateTouchEvent} from '../utils';

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
        return this.getHandle(0);
    }
    public getHandle(index: number): HTMLElement {
        return this.select(`SLIDER-HANDLE-${index}`);
    }
    public get progress(): HTMLElement {
        return this.select('SLIDER-PROGRESS');
    }
    public getInput(index: number): HTMLElement {
        return this.select(`NATIVE-INPUT-${index}`);
    }
    public getTooltip(index: number): HTMLElement {
        const portal = this.select(`SLIDER-HANDLE-${index}`, 'PORTAL_REF');
        if (!portal) {
            return portal;
        }
        const id = (portal as HTMLElement).dataset.id;
        return document.querySelector(`[data-automation-id="${id}"]`) as HTMLElement;
    }
    public getMark(index: number): HTMLElement {
        return this.select(`SLIDER-MARKS-${index}`);
    }

    public getBounds() {
        return this.slider.getBoundingClientRect();
    }
    public focus(index: number = 0): void {
        simulate.focus(this.getHandle(index));
    }

    public mouseDown(event: SliderEventCoordinates) {
        const element = this.slider;
        simulate.mouseDown(element, {
            preventDefault: noop,
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
            preventDefault: noop,
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
                preventDefault: noop,
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
