import {DriverBase} from 'test-drive-react';
import {Image} from '../../src';

export class ImageDriver extends DriverBase {
    public static ComponentClass = Image;

    public get nativeElement(): HTMLImageElement {
        return this.select<HTMLImageElement>('NATIVE_IMAGE');
    }

    public get source(): string | null {
        return this.nativeElement.getAttribute('src');
    }

    public getComputedStyle(property: string): string {
        return window.getComputedStyle(this.nativeElement).getPropertyValue(property);
    }
}
