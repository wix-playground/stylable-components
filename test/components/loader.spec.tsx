import * as React from 'react';
import {ClientRenderer, expect} from 'test-drive-react';
import {CircleLoader, BarsLoader} from '../../src';

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}
const loaders: any = {CircleLoader, BarsLoader};

describe.only('<Loader/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    Object.keys(loaders).forEach(key => {
        const Loader = loaders[key];
        describe(`<${key}/>`, () => {
            describe('render without options', () => {
                let renderer: any;
                beforeEach(() => {
                    renderer = clientRenderer.render(<Loader/>);
                });

                it('should render loader', () => {
                    expect(renderer.select('LOADER')).to.not.null;
                });

                it('should not render text', () => {
                    expect(renderer.select('LOADER_TEXT')).to.be.null;
                });
            });

            describe('render with delay={200}', () => {
                let renderer: any;
                beforeEach(() => {
                    renderer = clientRenderer.render(<Loader delay={200}/>);
                });

                it('should not render loader after 100ms', async () => {
                    await delay(100);
                    expect(renderer.select('LOADER')).to.be.null;
                });
                it('should render loader after 300ms', async () => {
                    await delay(300);
                    expect(renderer.select('LOADER')).to.not.null;
                });
            });

            describe('render with text="loading"', () => {
                let renderer: any;
                beforeEach(() => {
                    renderer = clientRenderer.render(<Loader text="loading"/>);
                });

                it('should render text', () => {
                    expect(renderer.select('LOADER_TEXT')).text('loading');
                });
            });

            describe('render with children', () => {
                let renderer: any;
                beforeEach(() => {
                    renderer = clientRenderer.render(
                        <Loader>
                            <div data-automation-id="TEST_DIV"/>
                        </Loader>
                    );
                });

                it('should render loader', () => {
                    expect(renderer.select('LOADER')).to.not.null;
                });

                it('should render children', () => {
                    expect(renderer.select('TEST_DIV')).to.not.null;
                });
            });
        });
    });
});
