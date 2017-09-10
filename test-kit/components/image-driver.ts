import {DriverBase} from 'test-drive-react';
import {Image} from '../../src';

export class ImageDriver extends DriverBase {
    public static ComponentClass = Image;

    public get nativeElement() {
        return this.select('NATIVE_IMAGE') as HTMLImageElement;
    }

    public get style() {
        return this.nativeElement.style;
    }
}
