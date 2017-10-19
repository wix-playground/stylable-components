import * as React from 'react';
import {
    ClientRenderer, DriverBase, DriverConstructor,
    RenderingContext, RenderingContextWithDriver
} from 'test-drive-react';
import {stylable} from 'wix-react-tools';

export class ClientRendererWithTheme extends ClientRenderer {
    private ThemeWrap: React.SFC;

    public constructor(theme: any) {
        super();
        this.ThemeWrap = stylable(theme)((props: any) => {
            return <div {...props}/>;
        });
    }

    public render<P>(element: React.ReactElement<P>): RenderingContext<P> {
        const rendered = super.render(<this.ThemeWrap children={element}/>);
        const {waitForDom, container} = rendered;
        function withDriver<D extends DriverBase>(Driver: DriverConstructor<D>): RenderingContextWithDriver<D> {
            const driver = new Driver(() => container.firstElementChild!.firstElementChild!);
            return {waitForDom, container, driver};
        }

        return {
            ...rendered,
            withDriver
        };
    }
}
