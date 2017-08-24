import * as React from 'react';
import {ClientRenderer, expect, sinon, waitFor} from 'test-drive-react';
import {Image} from '../../src';
import {transparentImage} from '../../src/utils';
import {brokenSrc, onePixelBlack, onePixelBlue} from '../fixtures/sample-images';

const nativeImage = 'NATIVE_IMAGE';

describe('<Image />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('outputs a visible html image element to dom', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <Image />
        );

        await waitForDom(() => {
            expect(select(nativeImage)).to.be.instanceOf(HTMLImageElement);
            expect(select(nativeImage)).to.be.present();
        });
    });

    it('uses one pixel transparent gif as default source', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <Image />
        );

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', transparentImage));
    });

    it('sets the provided src', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <Image src={onePixelBlack} />
        );

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelBlack));
    });

    it('uses provided defaultImage as default source', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <Image defaultImage={onePixelBlue} />
        );

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelBlue));
    });

    it('sets the provided alt attribute', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <Image alt="Calvin Cordozar Broadus" />
        );

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('alt', 'Calvin Cordozar Broadus'));
    });

    it('sets the provided title attribute', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <Image title="Daredevil" />
        );

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('title', 'Daredevil'));
    });

    it('uses default image if provided src is an empty string', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <Image src="" defaultImage={onePixelBlack} />
        );

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelBlack));
    });

    it('updates src if a new one is provided', async () => {
        const {select, waitForDom, container} = clientRenderer.render(
            <Image src={onePixelBlack} />
        );

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelBlack));

        clientRenderer.render(<Image src={onePixelBlue} />, container);

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelBlue));
    });

    it('calls onLoad when image has loaded', async () => {
        const onLoad = sinon.spy();
        clientRenderer.render(<Image src={onePixelBlack} onLoad={onLoad} />);

        await waitFor(() => expect(onLoad).to.have.been.calledWithMatch({src: onePixelBlack}));
    });

    it('calls onError when it cannot load a source, and falls back to default source', async () => {
        const onError = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(
            <Image src={brokenSrc} defaultImage={onePixelBlue} onError={onError} />
        );

        await waitFor(() => expect(onError).to.have.been.calledWithMatch({src: brokenSrc}));
        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelBlue));
    });

    it('calls onError when cannot load the default image, and falls back to `transparentImage`', async () => {
        const onError = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(
            <Image defaultImage={brokenSrc} onError={onError} />
        );

        await waitFor(() => expect(onError).to.have.been.calledWithMatch({src: brokenSrc}));
        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', transparentImage));
    });

    describe('resize mode', () => {
        it('sets image as background with size: contain, when resizeMode="contain"', async () => {
            const {select, waitForDom, container} = clientRenderer.render(
                <Image resizeMode="contain" src={onePixelBlack} />
            );

            await waitForDom(() => {
                const domImgElement = select(nativeImage);
                expect(domImgElement).to.be.present();
                expect(domImgElement).to.have.attribute('src', onePixelBlack);
                expect(domImgElement).to.have.nested.property('style.visibility', 'hidden');
                expect(domImgElement).to.have.nested.property('style.display', 'block');
                expect(domImgElement).to.have.nested.property('style.maxWidth', '100%');
                expect(domImgElement).to.have.nested.property('style.height', '100%');

                const {parentElement: sizingWrapper} = domImgElement!;
                expect(sizingWrapper, 'verify image is wrapped for sizing').to.not.equal(container);
                expect(sizingWrapper).to.have.nested.property('style.backgroundSize', 'contain');
                expect(sizingWrapper).to.have.nested.property('style.backgroundRepeat', 'no-repeat');

                // chrome normalizes to url("http://domain/file"), while safari normalizes to url(http://domain/file)
                // expect(sizingWrapper).to.have.nested.property('style.backgroundImage', `url("${onePixelBlack}")`);

                // ie11 normalizes to 'center', while chrome 60 normalizes to 'center center'
                // expect(sizingWrapper).to.have.nested.property('style.backgroundPosition', 'center');
            });
        });

        it('sets image as background with size: cover, when resizeMode="cover"', async () => {
            const {select, waitForDom, container} = clientRenderer.render(
                <Image resizeMode="cover" src={onePixelBlack} />
            );

            await waitForDom(() => {
                const domImgElement = select(nativeImage);
                expect(domImgElement).to.be.present();
                expect(domImgElement).to.have.attribute('src', onePixelBlack);
                expect(domImgElement).to.have.nested.property('style.visibility', 'hidden');
                expect(domImgElement).to.have.nested.property('style.display', 'block');
                expect(domImgElement).to.have.nested.property('style.maxWidth', '100%');
                expect(domImgElement).to.have.nested.property('style.height', '100%');

                const {parentElement: sizingWrapper} = domImgElement!;
                expect(sizingWrapper, 'verify image is wrapped for sizing').to.not.equal(container);
                expect(sizingWrapper).to.have.nested.property('style.backgroundSize', 'cover');
                expect(sizingWrapper).to.have.nested.property('style.backgroundRepeat', 'no-repeat');

                // chrome normalizes to url("http://domain/file"), while safari normalizes to url(http://domain/file)
                // expect(sizingWrapper).to.have.nested.property('style.backgroundImage', `url("${onePixelBlack}")`);

                // ie11 normalizes to 'center', while chrome 60 normalizes to 'center center'
                // expect(sizingWrapper).to.have.nested.property('style.backgroundPosition', 'center');
            });
        });

        it('leaves image as-is when resizeMode="fill"', async () => {
            const {select, waitForDom, container} = clientRenderer.render(
                <Image resizeMode="fill" src={onePixelBlack} />
            );

            await waitForDom(() => {
                const domImgElement = select(nativeImage);
                expect(domImgElement).to.be.present();
                expect(domImgElement).to.have.attribute('src', onePixelBlack);
                expect(domImgElement).to.not.have.nested.property('style.visibility', 'hidden');
                expect(domImgElement!.parentElement, 'verify image is not wrapped').to.equal(container);
            });
        });
    });
});
