import * as React from 'react';
import { expect, ClientRenderer, sinon, waitForDom, waitFor } from 'test-drive-react';
import { Image, onePixelTransparentSrc } from '../../src';
import { objectFitSupported } from '../../src/common/environment';
import { sampleImage } from '../fixtures/sample-image';

const nativeImage = 'NATIVE_IMAGE';

describe('<Image />', () => {
    const clientRenderer = new ClientRenderer();

    afterEach(() => clientRenderer.cleanup());

    function verifyElementSrc(element: Element, src: string) {
        if (objectFitSupported) {
            return waitForDom(element, () => expect(element).to.have.attribute('src', src));
        } else {
            return waitForDom(element, () => expect(element).to.have.deep.property('style.backgroundImage', `url("${src}")`));
        }
    }

    it('outputs an html image element to dom', async () => {
        const {select, waitForDom} = clientRenderer.render(<Image data-automation-id={nativeImage} />);

        await waitForDom(() =>
            expect(select(nativeImage) instanceof HTMLImageElement, 'Expected the Image component to be instance of HTMLImageElement').to.equal(true));
    });

    it('uses one pixel transparent gif as default source', async () => {
        const {select} = clientRenderer.render(<Image data-automation-id={nativeImage} />);

        await verifyElementSrc(select(nativeImage)!, onePixelTransparentSrc);
    });

    it('uses provided defaultImage as default source', async () => {
        const {select} = clientRenderer.render(<Image defaultImage="ABC-EZ-AS-123" data-automation-id={nativeImage} />);

        await verifyElementSrc(select(nativeImage)!, 'ABC-EZ-AS-123');
    });

    it('sets the provided alt attribute', async () => {
        const {select, waitForDom} = clientRenderer.render(<Image alt="calvin cordozar broadus" data-automation-id={nativeImage} />);

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('alt', 'calvin cordozar broadus'));
    });

    it('sets the provided title attribute', async () => {
        const {select, waitForDom} = clientRenderer.render(<Image title="Daredevil" data-automation-id={nativeImage} />);

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('title', 'Daredevil'));
    });

    it('sets the provided src', async () => {
        const {select} = clientRenderer.render(<Image src="Wonderwoman" data-automation-id={nativeImage} />);

        await verifyElementSrc(select(nativeImage)!, 'Wonderwoman');
    });

    it('uses default source if provided src is an empty string', async () => {
        const {select, waitForDom} = clientRenderer.render(<Image src="" data-automation-id={nativeImage} />);

        await waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelTransparentSrc));
    });

    it('calls onLoad when image has loaded', async () => {
        const onLoad = sinon.spy();
        clientRenderer.render(<Image src={sampleImage} onLoad={onLoad} data-automation-id={nativeImage} />);

        await waitFor(() => expect(onLoad).to.have.been.calledWithMatch({ src: sampleImage }));
    });

    const brokenSrc = 'data:image/png;base64,this-is-broken!';

    it('calls onError when it cannot load a source, and falls back to default source', async () => {
        const onError = sinon.spy();
        const {select} = clientRenderer.render(<Image src={brokenSrc} onError={onError} data-automation-id={nativeImage} />);

        await waitFor(() => expect(onError).to.have.been.calledWithMatch({ src: brokenSrc }));

        await verifyElementSrc(select(nativeImage)!, onePixelTransparentSrc);
    });

    it('calls onError when it cannot load the given default image, and falls back to onePixelTransparentSrc', async () => {
        const onError = sinon.spy();
        const {select} = clientRenderer.render(<Image defaultImage={brokenSrc} onError={onError} data-automation-id={nativeImage} />);

        await waitFor(() => expect(onError).to.have.been.calledWithMatch({ src: brokenSrc }));

        await verifyElementSrc(select(nativeImage)!, onePixelTransparentSrc);
    });
});
