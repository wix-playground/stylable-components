import React = require('react');
import { expect, ClientRenderer, simulate } from 'test-drive-react';
import {PopupDemo} from '../../demo/components/popup-demo';
import {Popup} from '../../src/components/'

const popup = 'POPUP';
const container = 'POPUP_DEMO_DIV';

describe('<Popup />', function () {
    const clientRenderer = new ClientRenderer();

    afterEach(function () {
        clientRenderer.cleanup();
    });

    // describe('The popup user', function () {
    //     it('clicks on the parent and the popup opens', async function () {
    //         const {select, waitForDom} = clientRenderer.render(<PopupDemo />);
    //
    //         await waitForDom(() => {
    //             expect(select(container)).to.be.present();
    //             expect(select(container, popup)).to.be.absent()
    //         });
    //         simulate.click(select(container));
    //         return waitForDom(() => {
    //             expect(select(container, popup)).to.be.present();
    //         });
    //     });
    // });

    it('renders a hidden pop up', function () {
        let div;
        const {select, waitForDom} = clientRenderer.render(
            <div>
                <div ref={(elem) => div = elem}>Anchor</div>
                <Popup anchor={div}>
                    <span>Popup Body</span>
                </Popup>
            </div>
        );

        return waitForDom(() => {
            expect(select(popup)).to.not.be.undefined;
            expect(select(popup)).to.be.absent()
        })
    });

    it('displays the popup and renders its children if the open prop is given', function () {
        let div;
        const {select, waitForDom} = clientRenderer.render(
            <div>
                <div ref={(elem) => div = elem}>Anchor</div>
                <Popup anchor={div} open={true}>
                    <span data-automation-id="SPAN">Popup Body</span>
                </Popup>
            </div>
        );

        return waitForDom(() => {
            expect(select(popup)).to.be.present();
            expect(select(popup, 'SPAN')).to.be.present();
        })
    });

    it('renders the popup in the correct default position', function () {
        let div: HTMLDivElement;
        const {select, waitForDom} = clientRenderer.render(
            <div>
                <div ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>
                <Popup anchor={div!} open={true}>
                    <span data-automation-id="SPAN">Popup Body</span>
                </Popup>
            </div>
        );

        return waitForDom(() => {
            expect([select(popup), div]).to.be.horizontallyAligned('left');
            expect([div, select(popup)]).to.be.inVerticalSequence();
        })
    })
});
