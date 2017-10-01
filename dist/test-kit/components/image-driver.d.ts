import { DriverBase } from 'test-drive-react';
import { Image } from '../../src';
export declare class ImageDriver extends DriverBase {
    static ComponentClass: typeof Image;
    readonly nativeElement: HTMLImageElement;
    readonly style: CSSStyleDeclaration;
    readonly source: string | null;
}
