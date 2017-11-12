import {DriverBase, simulate} from 'test-drive-react';
import {AutoComplete} from '../../src';
import style from '../../src/components/auto-complete/auto-complete.st.css';
import {elementHasStylableState, simulateKeyInput} from '../utils';
import {SelectionListTestDriver} from './';

export class AutoCompleteTestDriver extends DriverBase {
    public static ComponentClass = AutoComplete;

    public get input(): HTMLInputElement {
        return this.select('INPUT');
    }

    public get list(): SelectionListTestDriver {
        return new SelectionListTestDriver(() => this.select('LIST'));
    }

    public get isOpen(): boolean {
        return false;
    }

    public focus(): void {
        simulate.focus(this.input);
    }

    public blur(): void {
        simulate.blur(this.input);
    }

    public keyDown(eventData: object): void {
        simulate.keyDown(this.root, eventData);
    }

    public typeText(text: string) {
        simulateKeyInput(this.input, text);
    }

    public hasStylableState(stateName: string): boolean {
        return elementHasStylableState(this.root, style, stateName);
    }
}
