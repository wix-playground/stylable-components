import {DriverBase, simulate} from 'test-drive-react';
import {CheckBox} from '../../../src/';

export class CheckBoxTestDriver extends DriverBase {

    static ComponentClass = CheckBox;

    public isReady(): boolean {
        return (
            !!this.select('CHECKBOX_ROOT') &&
            !!this.select('CHECKBOX_BOX')
        );
    }

    public isChecked(): boolean {
        return this.isReady() && !!this.select('CHECKBOX_TICKMARK');
    }

    public click(): void {
        simulate.click(this.root);
    }

    public get childList(): NodeList {
        // return
    }

    // public getElement(...selectors: string[]): Element {
    //     return this.select(...selectors);
    // }
}
