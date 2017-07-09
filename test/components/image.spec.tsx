import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate, waitForDom, waitFor } from 'test-drive-react';
import { Image } from '../../src';
import { objectFitSupported } from '../../src/common/environment';
import { onePixelTransparentSrc } from '../../src';
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

    it('outputs an html image element to dom', () => {
        const {select, waitForDom} = clientRenderer.render(<Image />);

        return waitForDom(() => expect(select(nativeImage)).to.be.an.instanceOf(HTMLImageElement));
    });

    it('uses one pixel transparent gif as default source', () => {
        const {select} = clientRenderer.render(<Image />);

        return verifyElementSrc(select(nativeImage)!, onePixelTransparentSrc);
    });

    it('uses provided defaultImage as default source', () => {
        const {select} = clientRenderer.render(<Image defaultImage="ABC-EZ-AS-123" />);

        return verifyElementSrc(select(nativeImage)!, 'ABC-EZ-AS-123');
    });

    it('sets the provided alt attribute', () => {
        const {select, waitForDom} = clientRenderer.render(<Image alt="calvin cordozar broadus" />);

        return waitForDom(() => expect(select(nativeImage)).to.have.attribute('alt', 'calvin cordozar broadus'));
    });

    it('sets the provided title attribute', () => {
        const {select, waitForDom} = clientRenderer.render(<Image title="Daredevil" />);

        return waitForDom(() => expect(select(nativeImage)).to.have.attribute('title', 'Daredevil'));
    });

    it('sets the provided src', () => {
        const {select} = clientRenderer.render(<Image src="Wonderwoman" />);

        return verifyElementSrc(select(nativeImage)!, 'Wonderwoman');
    });

    it('uses default source if provided src is an empty string', () => {
        const {select, waitForDom} = clientRenderer.render(<Image src="" />);

        return waitForDom(() => expect(select(nativeImage)).to.have.attribute('src', onePixelTransparentSrc));
    });

    it('calls onLoad when image has loaded', () => {
        const onLoad = sinon.spy();
        clientRenderer.render(<Image src={sampleImage} onLoad={onLoad} />);

        return waitFor(() => expect(onLoad).to.have.been.calledWithMatch({ data: sampleImage }));
    });

    const brokenSrc = 'data:image/png;base64,this-is-broken!';

    it('calls onError when it cannot load a source, and falls back to default source', () => {
        const onError = sinon.spy();
        const {select} = clientRenderer.render(<Image src={brokenSrc} onError={onError} />);

        return waitFor(() => expect(onError).to.have.been.calledWithMatch({ data: brokenSrc }))
        .then(() => verifyElementSrc(select(nativeImage)!, onePixelTransparentSrc));
    });

    it('calls onError when it cannot load the given default image, and falls back to onePixelTransparentSrc', () => {
        const onError = sinon.spy();
        const {select} = clientRenderer.render(<Image defaultImage={brokenSrc} onError={onError} />);

        return waitFor(() => expect(onError).to.have.been.calledWithMatch({ data: brokenSrc }))
        .then(() => verifyElementSrc(select(nativeImage)!, onePixelTransparentSrc));
    });
});
