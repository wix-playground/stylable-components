import * as React from 'react';
import {ClientRenderer, expect, sinon, waitFor} from 'test-drive-react';
import {Image} from '../../src';
import {transparentImage} from '../../src/utils';
import {ImageDriver} from '../../test-kit';
import {brokenSrc, brokenSrc2, onePixelBlack, onePixelBlue} from '../fixtures/sample-images';
import {sleep} from '../utils';

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

    it('shows one pixel transparent gif if no source props are provided', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image />
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(transparentImage);
            expect(image.hasStylableState('loaded'), 'Expected to have "loaded" style state').to.equal(true);
        });
    });

    it('does not send an onLoad event when falling back to showing one transparent pixel', async () => {
        const onLoad = sinon.spy();
        clientRenderer.render(<Image onLoad={onLoad}/>).withDriver(ImageDriver);

        await sleep(10);

        expect(onLoad).to.not.have.been.called;
    });

    it('shows provided src', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image src={onePixelBlack} />
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(onePixelBlack);
            expect(image.hasStylableState('loaded'), 'Expected to have "loaded" style state').to.equal(true);
        });
    });

    it('shows src if provided together with defaultImage', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image src={onePixelBlack} defaultImage={onePixelBlue}/>
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(onePixelBlack);
            expect(image.hasStylableState('loaded'), 'Expected to have "loaded" style state').to.equal(true);
        });
    });

    it('shows defaultImage if provided without src', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image defaultImage={onePixelBlack}/>
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(onePixelBlack);
            expect(image.hasStylableState('loaded'), 'Expected to have "loaded" style state').to.equal(true);
        });
    });

    it('shows defaultImage if provided src is an empty string', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image defaultImage={onePixelBlack} src=""/>
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(onePixelBlack);
            expect(image.hasStylableState('loaded'), 'Expected to have "loaded" style state').to.equal(true);
        });
    });

    it('shows a transparent pixel gif if provided only with errorImage', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image errorImage={onePixelBlack}/>
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(transparentImage);
            expect(image.hasStylableState('loaded'), 'Expected to have "loaded" style state').to.equal(true);
        });
    });

    it('shows errorImage if provided with invalid src', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image src={brokenSrc} errorImage={onePixelBlack}/>
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(onePixelBlack);
            expect(image.hasStylableState('error'), 'Expected to have "error" style state').to.equal(true);
        });
    });

    it('shows errorImage if provided with invalid defaultImage', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image defaultImage={brokenSrc} errorImage={onePixelBlack}/>
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(onePixelBlack);
            expect(image.hasStylableState('error'), 'Expected to have "error" style state').to.equal(true);
        });
    });

    it('shows a transparent pixel gif if provided with invalid src', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image src={brokenSrc}/>
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(transparentImage);
            expect(image.hasStylableState('error'), 'Expected to have "error" style state').to.equal(true);
        });
    });

    it('shows a transparent pixel gif if provided with invalid defaultImage', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image defaultImage={brokenSrc}/>
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(transparentImage);
            expect(image.hasStylableState('error'), 'Expected to have "error" style state').to.equal(true);
        });
    });

    it('shows a transparent pixel gif if provided with invalid src and invalid errorImage', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image src={brokenSrc} errorImage={brokenSrc2}/>
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(transparentImage);
            expect(image.hasStylableState('error'), 'Expected to have "error" style state').to.equal(true);
        });
    });

    it('shows a transparent pixel gif if provided with invalid defaultImage and invalid errorImage', async () => {
        const {driver: image, waitForDom} = clientRenderer.render(
            <Image defaultImage={brokenSrc} errorImage={brokenSrc2}/>
        ).withDriver(ImageDriver);

        await waitForDom(() => {
            expect(image.source, 'incorrect image source').to.equal(transparentImage);
            expect(image.hasStylableState('error'), 'Expected to have "error" style state').to.equal(true);
        });
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

    it('calls onError when src fails loading', async () => {
        const onError = sinon.spy();
        clientRenderer.render(<Image src={brokenSrc} onError={onError}/>).withDriver(ImageDriver);

        await waitFor(() => expect(onError).to.have.been.calledWithMatch({src: brokenSrc}));
    });

    it('calls onError when defaultImage fails loading', async () => {
        const onError = sinon.spy();
        clientRenderer.render(<Image defaultImage={brokenSrc} onError={onError}/>);

        await waitFor(() => expect(onError).to.have.been.calledWithMatch({src: brokenSrc}));
    });

    it('gets to "loading" state before "loaded" state', async () => {
        const {driver: image} = clientRenderer.render(
            <Image src={onePixelBlue}/>
        ).withDriver(ImageDriver);

        const msg1 = 'Did not get to "loading" state before "loaded"';
        await waitFor(() => {
            expect(image.hasStylableState('loading'), msg1).to.equal(true);
            expect(image.hasStylableState('loaded'), msg1).to.equal(false);
        });

        const msg2 = 'Did not get to "loaded" state after "loading"';
        await waitFor(() => {
            expect(image.hasStylableState('loading'), msg2).to.equal(false);
            expect(image.hasStylableState('loaded'), msg2).to.equal(true);
        });
    });

    it('removes "error" state if broken source is replaced', async () => {
        const {driver: image, waitForDom, container} = clientRenderer.render(
            <Image src={brokenSrc} />
        ).withDriver(ImageDriver);

        await sleep(10);

        await waitForDom(() => {
            expect(image.hasStylableState('error'), 'Expected to have "error" style state').to.equal(true);
        });

        clientRenderer.render(<Image src={onePixelBlue} />, container);

        await waitForDom(() => {
            expect(image.hasStylableState('loaded'), 'Expected to have "loaded" style state').to.equal(true);
        });
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
