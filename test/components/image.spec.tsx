import * as React from 'react';
import {ClientRenderer, expect, sinon, waitFor} from 'test-drive-react';
import {Image} from '../../src';
import {transparentImage} from '../../src/utils';
import {ImageDriver} from '../../test-kit';
import {brokenSrc, onePixelBlack, onePixelBlue} from '../fixtures/sample-images';

describe('<Image />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('outputs a visible html image element to dom', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image />
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.nativeElement).to.be.instanceOf(HTMLImageElement);
            expect(image.nativeElement).to.be.present();
        });
    });

    it('uses one pixel transparent gif as default source', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image />
        ).withDriver(ImageDriver);

        await waitForDom(() => expect(image.source, 'incorrect image source').to.equal(transparentImage));
    });

    it('sets the provided src', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image src={onePixelBlack} />
        ).withDriver(ImageDriver);

        await waitForDom(() => expect(image.source, 'incorrect image source').to.equal(onePixelBlack));
    });

    it('uses provided defaultImage as default source', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image defaultImage={onePixelBlue} />
        ).withDriver(ImageDriver);

        await waitForDom(() => expect(image.source, 'incorrect image source').to.equal(onePixelBlue));
    });

    it('sets the provided alt attribute', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image alt="Calvin Cordozar Broadus" />
        ).withDriver(ImageDriver);

        await waitForDom(() => expect(image.nativeElement).to.have.attribute('alt', 'Calvin Cordozar Broadus'));
    });

    it('sets the provided title attribute', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image title="Daredevil" />
        ).withDriver(ImageDriver);

        await waitForDom(() => expect(image.nativeElement).to.have.attribute('title', 'Daredevil'));
    });

    it('uses default image if provided src is an empty string', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image src="" defaultImage={onePixelBlack} />
        ).withDriver(ImageDriver);

        await waitForDom(() => expect(image.source, 'incorrect image source').to.equal(onePixelBlack));
    });

    it('updates src if a new one is provided', async () => {
        const {driver: image, waitForDom, container} = clientRenderer.render(
            <Image src={onePixelBlack} />
        ).withDriver(ImageDriver);

        await waitForDom(() => expect(image.source, 'incorrect image source').to.equal(onePixelBlack));

        clientRenderer.render(<Image src={onePixelBlue} />, container);

        await waitForDom(() => expect(image.source, 'incorrect image source').to.equal(onePixelBlue));
    });

    it('calls onLoad when image has loaded', async () => {
        const onLoad = sinon.spy();
        clientRenderer.render(<Image src={onePixelBlack} onLoad={onLoad} />).withDriver(ImageDriver);

        await waitFor(() => expect(onLoad).to.have.been.calledWithMatch({src: onePixelBlack}));
    });

    it('calls onError when it cannot load a source, and falls back to default source', async () => {
        const onError = sinon.spy();
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image src={brokenSrc} defaultImage={onePixelBlue} onError={onError} />
        ).withDriver(ImageDriver);

        await waitFor(() => expect(onError).to.have.been.calledWithMatch({src: brokenSrc}));
        await waitForDom(() => expect(image.source, 'incorrect image source').to.equal(onePixelBlue));
    });

    it('calls onError when cannot load the default image, and falls back to `transparentImage`', async () => {
        const onError = sinon.spy();
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image defaultImage={brokenSrc} onError={onError} />
        ).withDriver(ImageDriver);

        await waitFor(() => expect(onError).to.have.been.calledWithMatch({src: brokenSrc}));
        await waitForDom(() => expect(image.source, 'incorrect image source').to.equal(transparentImage));
    });

    describe('resize mode', () => {
        it('sets image as background with size: contain, when resizeMode="contain"', async () => {
            const {driver: image, waitForDom} = clientRenderer.render(
                <Image resizeMode="contain" src={onePixelBlack} style={{height: '20px'}}/>
            ).withDriver(ImageDriver);

            await waitForDom(() => {
                expect(image.root).to.be.present();
                expect(image.source, 'incorrect image source').to.equal(onePixelBlack);
                expect(getComputedStyle(image.nativeElement)).to.have.property('visibility', 'hidden');
                expect(getComputedStyle(image.nativeElement)).to.have.property('display', 'block');
                expect(getComputedStyle(image.nativeElement)).to.have.property('height', '20px');

                expect(image.root, 'verify image is wrapped for sizing').to.not.equal(image.nativeElement);
                expect(getComputedStyle(image.root).getPropertyValue('background-size')).to.equal('contain');
                expect(getComputedStyle(image.root).getPropertyValue('background-repeat')).to.equal('no-repeat');

                // IE / Edge return max-width '300px' while chrome return '100%'
                // expect(getComputedStyle(image.nativeElement)).to.have.property('max-width', '100%');

                // chrome normalizes to url("http://domain/file"), while safari normalizes to url(http://domain/file)
                // expect(getComputedStyle(image.root).getPropertyValue('background-image'))
                // .to.equal(`url("${onePixelBlack}")`);

                // ie11 normalizes to 'center', while chrome 60 normalizes to 'center center'
                // expect(getComputedStyle(image.root).getPropertyValue('background-position'))
                // .to.equal('center');
            });
        });

        it('sets image as background with size: cover, when resizeMode="cover"', async () => {
            const {driver: image, waitForDom} = clientRenderer.render(
                <Image resizeMode="cover" src={onePixelBlack} style={{height: '20px'}}/>
            ).withDriver(ImageDriver);

            await waitForDom(() => {
                expect(image.nativeElement).to.be.present();
                expect(image.source, 'incorrect image source').to.equal(onePixelBlack);
                expect(getComputedStyle(image.nativeElement)).to.have.property('visibility', 'hidden');
                expect(getComputedStyle(image.nativeElement)).to.have.property('display', 'block');
                expect(getComputedStyle(image.nativeElement)).to.have.property('height', '20px');

                expect(image.root, 'verify image is wrapped for sizing').to.not.equal(image.nativeElement);
                expect(getComputedStyle(image.root).getPropertyValue('background-size')).to.equal('cover');
                expect(getComputedStyle(image.root).getPropertyValue('background-repeat')).to.equal('no-repeat');

                // IE / Edge return max-width '300px' while chrome return '100%'
                // expect(getComputedStyle(image.nativeElement)).to.have.property('max-width', '100%');

                // chrome normalizes to url("http://domain/file"), while safari normalizes to url(http://domain/file)
                // expect(getComputedStyle(image.root).getPropertyValue('background-image'))
                // .to.equal(`url("${onePixelBlack}")`);

                // ie11 normalizes to 'center', while chrome 60 normalizes to 'center center'
                // expect(getComputedStyle(image.root).getPropertyValue('background-position'))
                // .to.equal('center');
            });
        });

        it('leaves image as-is when resizeMode="fill"', async () => {
            const {driver: image, waitForDom, container} = clientRenderer.render(
                <Image resizeMode="fill" src={onePixelBlack} />
            ).withDriver(ImageDriver);

            await waitForDom(() => {
                expect(image.nativeElement).to.be.present();
                expect(image.root, 'verify that native image is the root').to.equal(image.nativeElement);
                expect(image.source, 'incorrect image source').to.equal(onePixelBlack);
                expect(getComputedStyle(image.nativeElement)).to.not.have.property('visibility', 'hidden');
                expect(image.nativeElement.parentElement, 'verify image is not wrapped').to.equal(container);
            });
        });
    });
});
