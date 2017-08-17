import keycode = require('keycode');
import {clamp} from '../../utils';
import {ItemValue} from './basic-list';

export class ListNavigation {
    private values: ItemValue[] = [];
    private position: number = -1;

    constructor(focusableValues: ItemValue[]) {
        this.values = focusableValues;
    }

    public handleKeydown(event: React.KeyboardEvent<any>): boolean {
        switch (event.keyCode) {
            case keycode('up'):   this.focusPrevious(); return true;
            case keycode('down'): this.focusNext();     return true;
            case keycode('home'): this.focusFirst();    return true;
            case keycode('end'):  this.focusLast();     return true;
        }
        return false;
    }

    public getFocusedValue() {
        return this.values[this.position];
    }

    public focusValue(value: ItemValue | undefined) {
        this.position = (value === undefined) ? -1 : this.values.indexOf(value);
    }

    public focusIndex(index: number) {
        this.position = clamp(index, 0, this.values.length - 1);
    }

    public blur() {
        this.position = -1;
    }

    public focusPrevious() {
        this.position === -1 ? this.focusLast() : this.focusIndex(this.position - 1);
    }

    public focusNext() {
        this.position === -1 ? this.focusFirst() : this.focusIndex(this.position + 1);
    }

    public focusLast() {
        this.position = this.values.length - 1;
    }

    public focusFirst() {
        this.position = 0;
    }
}
