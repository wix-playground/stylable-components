import { DriverBase } from 'test-drive-react';
import { SelectionListDemo } from '../../demo/components/selection-list-demo';
import { SelectionListTestDriver } from '../../test-kit';
export declare class SelectionListDemoDriver extends DriverBase {
    static ComponentClass: typeof SelectionListDemo;
    readonly food: {
        list: SelectionListTestDriver;
        result: Element;
    };
    readonly emoji: {
        list: SelectionListTestDriver;
        result: Element;
    };
    readonly textStyle: {
        list: SelectionListTestDriver;
        result: Element;
    };
}
