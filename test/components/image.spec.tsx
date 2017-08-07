import * as React from 'react';
import { ClientRenderer, expect, sinon, waitFor } from 'test-drive-react';
import { Image } from '../../src';
import { onePixelTransparentSrc } from '../../src/common/one-pixel-src';
import { sampleImage } from '../fixtures/sample-image';

const brokenSrc = 'data:image/png;base64,this-is-broken!';
const nativeImage = 'NATIVE_IMAGE';

describe('<Image />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('outputs an html image element to dom', async () => {
        const { select, waitForDom } = clientRenderer.render(<Image data-automation-id={nativeImage} />);

        await waitForDom(() => expect(select(nativeImage)).to.be.instanceOf(HTMLImageElement));
    });

    it('uses one pixel transparent gif as default source', async () => {
        const { select, waitForDom } = clientRenderer.render(<Image data-automation-id={nativeImage} />);

        await waitForDom(() => {
            expect(select(nativeImage)).to.have.attribute('src', onePixelTransparentSrc);
            expect(select(nativeImage)).to.be.present();
        });
    });

    it('uses provided defaultImage as default source', async () => {
        const { select, waitForDom } =
            clientRenderer.render(<Image defaultImage="ABC-EZ-AS-123" data-automation-id={nativeImage} />);

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', 'ABC-EZ-AS-123'));
    });

    it('sets the provided alt attribute', async () => {
        const { select, waitForDom } =
            clientRenderer.render(<Image alt="calvin cordozar broadus" data-automation-id={nativeImage} />);

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('alt', 'calvin cordozar broadus'));
    });

    it('sets the provided title attribute', async () => {
        const { select, waitForDom } =
            clientRenderer.render(<Image title="Daredevil" data-automation-id={nativeImage} />);

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('title', 'Daredevil'));
    });

    it('sets the provided src', async () => {
        const { select, waitForDom }
            = clientRenderer.render(<Image src="Wonderwoman" data-automation-id={nativeImage} />);

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', 'Wonderwoman'));
    });

    it('uses default source if provided src is an empty string', async () => {
        const { select, waitForDom } = clientRenderer.render(<Image src="" data-automation-id={nativeImage} />);

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelTransparentSrc));
    });

    it('calls onLoad when image has loaded', async () => {
        const onLoad = sinon.spy();
        clientRenderer.render(<Image src={sampleImage} onLoad={onLoad} data-automation-id={nativeImage} />);

        await waitFor(() => expect(onLoad).to.have.been.calledWithMatch({ src: sampleImage }));
    });

    it('calls onError when it cannot load a source, and falls back to default source', async () => {
        const onError = sinon.spy();
        const { select, waitForDom } =
            clientRenderer.render(<Image src={brokenSrc} onError={onError} data-automation-id={nativeImage} />);

        await waitFor(() => expect(onError).to.have.been.calledWithMatch({ src: brokenSrc }));
        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelTransparentSrc));
    });

    it('calls onError when cannot load the given default image, and falls back to onePixelTransparentSrc', async () => {
        const onError = sinon.spy();
        const { select, waitForDom } = clientRenderer.render(
            <Image
                defaultImage={brokenSrc}
                onError={onError}
                data-automation-id={nativeImage}
            />
        );

        await waitFor(() => expect(onError).to.have.been.calledWithMatch({ src: brokenSrc }));
        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelTransparentSrc));
    });

    describe('resize mode', () => {
        it('sets image as background with size: contain, when resizeMode="contain"', async () => {
            const { select, waitForDom, container } = clientRenderer.render(
                <Image
                    resizeMode="contain"
                    src={sampleImage}
                    data-automation-id={nativeImage}
                />
            );

            await waitForDom(() => {
                const domImgElement = select(nativeImage);
                expect(domImgElement).to.be.present();
                expect(domImgElement).to.have.attribute('src', sampleImage);
                expect(domImgElement).to.have.nested.property('style.visibility', 'hidden');
                expect(domImgElement).to.have.nested.property('style.display', 'block');
                expect(domImgElement).to.have.nested.property('style.maxWidth', '100%');
                expect(domImgElement).to.have.nested.property('style.height', '100%');

                const { parentElement: sizingWrapper } = domImgElement!;
                expect(sizingWrapper, 'verify image is wrapped for sizing').to.not.equal(container);
                expect(sizingWrapper).to.have.nested.property('style.backgroundSize', 'contain');
                expect(sizingWrapper).to.have.nested.property('style.backgroundRepeat', 'no-repeat');

                // chrome normalizes to url("http://domain/file"), while safari normalizes to url(http://domain/file)
                // expect(sizingWrapper).to.have.nested.property('style.backgroundImage', `url("${sampleImage}")`);

                // ie11 normalizes to 'center', while chrome 60 normalizes to 'center center'
                // expect(sizingWrapper).to.have.nested.property('style.backgroundPosition', 'center');
            });
        });

        it('sets image as background with size: cover, when resizeMode="cover"', async () => {
            const { select, waitForDom, container } =
                clientRenderer.render(<Image resizeMode="cover" src={sampleImage} data-automation-id={nativeImage} />);

            await waitForDom(() => {
                const domImgElement = select(nativeImage);
                expect(domImgElement).to.be.present();
                expect(domImgElement).to.have.attribute('src', sampleImage);
                expect(domImgElement).to.have.nested.property('style.visibility', 'hidden');
                expect(domImgElement).to.have.nested.property('style.display', 'block');
                expect(domImgElement).to.have.nested.property('style.maxWidth', '100%');
                expect(domImgElement).to.have.nested.property('style.height', '100%');

                const { parentElement: sizingWrapper } = domImgElement!;
                expect(sizingWrapper, 'verify image is wrapped for sizing').to.not.equal(container);
                expect(sizingWrapper).to.have.nested.property('style.backgroundSize', 'cover');
                expect(sizingWrapper).to.have.nested.property('style.backgroundRepeat', 'no-repeat');

                // chrome normalizes to url("http://domain/file"), while safari normalizes to url(http://domain/file)
                // expect(sizingWrapper).to.have.nested.property('style.backgroundImage', `url("${sampleImage}")`);

                // ie11 normalizes to 'center', while chrome 60 normalizes to 'center center'
                // expect(sizingWrapper).to.have.nested.property('style.backgroundPosition', 'center');
            });
        });

        it('leaves image as-is when resizeMode="fill"', async () => {
            const { select, waitForDom, container } =
                clientRenderer.render(<Image resizeMode="fill" src={sampleImage} data-automation-id={nativeImage} />);

            await waitForDom(() => {
                const domImgElement = select(nativeImage);
                expect(domImgElement).to.be.present();
                expect(domImgElement).to.have.attribute('src', sampleImage);
                expect(domImgElement).to.not.have.nested.property('style.visibility', 'hidden');
                expect(domImgElement!.parentElement, 'verify image is not wrapped').to.equal(container);
            });
        });
    });
});
