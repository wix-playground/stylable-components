import * as React from 'react';
import {ClientRenderer, expect} from 'test-drive-react';
import {CircleLoader, Loader} from '../../src';

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}
const loaders: any = {Loader, CircleLoader};

describe('<Loader/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    Object.keys(loaders).forEach(key => {
        const Component = loaders[key];
        describe(`<${key}/>`, () => {
            describe('render without options', () => {
                let renderer: any;
                beforeEach(() => {
                    renderer = clientRenderer.render(<Component/>);
                });

                it('should render loader', () => {
                    expect(renderer.select('LOADER')).to.not.null;
                });

                it('should not render text', () => {
                    expect(renderer.select('LOADER_TEXT')).to.be.null;
                });
            });

            describe('render with delay', () => {
                let renderer: any;
                beforeEach(() => {
                    renderer = clientRenderer.render(<Component delay={200}/>);
                });

                it('should not render loader before delay time', async () => {
                    await delay(100);
                    expect(renderer.select('LOADER')).to.be.null;
                });
                it('should render loader after delay time', async () => {
                    await delay(300);
                    expect(renderer.select('LOADER')).to.not.null;
                });
            });

            describe('render with text', () => {
                let renderer: any;
                beforeEach(() => {
                    renderer = clientRenderer.render(<Component text="loading"/>);
                });

                it('should render text', () => {
                    expect(renderer.select('LOADER_TEXT')).text('loading');
                });
            });

            describe('render with children and text', () => {
                let renderer: any;
                beforeEach(() => {
                    renderer = clientRenderer.render(
                        <Component>
                            <div data-automation-id="TEST_DIV"/>
                        </Component>
                    );
                });

                it('should render loader', () => {
                    expect(renderer.select('LOADER')).to.not.null;
                });

                it('should render children', () => {
                    expect(renderer.select('TEST_DIV')).to.not.null;
                });

                it('should not render the text', () => {
                    expect(renderer.select('LOADER_TEXT')).to.be.null;
                });
            });

        });
    });
});
