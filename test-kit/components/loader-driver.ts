import {DriverBase} from 'test-drive-react';
import {BarsLoader, CircleLoader, DotsLoader, Loader} from '../../src';

export class LoaderDriver extends DriverBase {
    public static ComponentClass = Loader;

    public get loader() {
        return this.select('LOADER');
    }

    public get text() {
        return this.select('LOADER_TEXT');
    }

    public find(selector: string) {
        return this.select(selector);
    }
}
export class CircleLoaderDriver extends LoaderDriver {
    public static ComponentClass = CircleLoader;
}
export class BarsLoaderDriver extends LoaderDriver {
    public static ComponentClass = BarsLoader;
}
export class DotsLoaderDriver extends LoaderDriver {
    public static ComponentClass = DotsLoader;
}
