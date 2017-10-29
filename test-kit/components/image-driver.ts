import {DriverBase} from 'test-drive-react';
import {Image} from '../../src';
import baseStyle from '../../src/components/image/image.st.css';
import {elementHasStylableState} from '../utils';

export class ImageDriver extends DriverBase {
    public static ComponentClass = Image;

    public get nativeElement(): HTMLImageElement {
        return this.select<HTMLImageElement>('NATIVE_IMAGE');
    }

    public get source(): string | null {
        return this.nativeElement.getAttribute('src');
    }

    public hasStylableState(stateName: string): boolean {
        return elementHasStylableState(this.root, baseStyle, stateName);
    }
}
