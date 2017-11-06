import * as React from 'react';
import {ClientRenderer, expect} from 'test-drive-react';
import {BarsLoader, CircleLoader, DotsLoader, Loader} from '../../src';
import {BarsLoaderDriver, CircleLoaderDriver, DotsLoaderDriver, LoaderDriver} from '../../test-kit';

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const loaders: any = {
    Loader: [Loader, LoaderDriver],
    CircleLoader: [CircleLoader, CircleLoaderDriver],
    BarsLoader: [BarsLoader, BarsLoaderDriver],
    DotsLoader: [DotsLoader, DotsLoaderDriver]
};

xdescribe('<Loader/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    Object.keys(loaders).forEach(key => {
        const [Component, Driver] = loaders[key];
        describe(`<${key}/>`, () => {
            describe('render without options', () => {
                let driver: any;
                beforeEach(() => {
                    driver = clientRenderer.render(<Component/>).withDriver(Driver).driver;
                });

                it('should render loader', () => {
                    expect(driver.loader).to.not.null;
                });

                it('should not render text', () => {
                    expect(driver.text).to.be.null;
                });
            });

            describe('render with delay', () => {
                let driver: any;
                beforeEach(() => {
                    driver = clientRenderer.render(<Component delay={200}/>).withDriver(Driver).driver;
                });

                it('should not render loader before delay time', async () => {
                    await delay(100);
                    expect(driver.loader).to.be.null;
                });
                it('should render loader after delay time', async () => {
                    await delay(300);
                    expect(driver.loader).to.not.null;
                });
            });

            describe('render with text', () => {
                let driver: any;
                beforeEach(() => {
                    driver = clientRenderer.render(<Component text="loading"/>).withDriver(Driver).driver;
                });

                it('should render text', () => {
                    expect(driver.text).text('loading');
                });
            });

            describe('render with children and text', () => {
                let driver: any;
                beforeEach(() => {
                    driver = clientRenderer.render((
                        <Component>
                            <div data-automation-id="TEST_DIV"/>
                        </Component>
                    )).withDriver(Driver).driver;
                });

                it('should render loader', () => {
                    expect(driver.loader).to.not.null;
                });

                it('should render children', () => {
                    expect(driver.find('TEST_DIV')).to.not.null;
                });

                it('should not render the text', () => {
                    expect(driver.text).to.be.null;
                });
            });

        });
    });
});
