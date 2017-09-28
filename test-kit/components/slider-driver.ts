import {DriverBase, simulate} from 'test-drive-react';
import {Slider, ContextProvider} from '../../src';

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
}

export class SliderContextProvierDriver extends SliderDriver {
    public static ComponentClass = ContextProvider;
}
