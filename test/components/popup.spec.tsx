import React = require('react');
import { expect, ClientRenderer, simulate } from 'test-drive-react';
import {selectDom} from 'test-drive';
import {PopupDemo} from '../../demo/components/popup-demo';
import {Popup} from '../../src/components/'

const popup = 'POPUP';
const container = 'POPUP_DEMO_DIV';

describe('<Popup />', function () {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);

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

    it('displays the popup and renders its children if the open prop is given', async function () {
        let div: HTMLDivElement;
        const { waitForDom} = clientRenderer.render(<div ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

        await waitForDom(() => {
            expect(div).to.be.present();
        });

        clientRenderer.render(<Popup anchor={div!} open={true}>
            <span data-automation-id="SPAN">Popup Body</span>
        </Popup>);

        return waitForDom(() => {
            expect(bodySelect(popup)).to.be.present();
            expect(bodySelect(popup, 'SPAN')).to.be.present();
        })
    });

    it('renders the popup in the correct default position', async function () {
        let div: HTMLDivElement;
        const { waitForDom} = clientRenderer.render(<div ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

        await waitForDom(() => {
            expect(div).to.be.present();
        });

        clientRenderer.render(<Popup anchor={div!} open={true}>
            <span data-automation-id="SPAN">Popup Body</span>
        </Popup>);

        return waitForDom(() => {
            expect([bodySelect(popup), div]).to.be.horizontallyAligned('left');
            expect([div, bodySelect(popup)]).to.be.inVerticalSequence();
        })
    });

    describe('Layout tests', function () {

        it('Anchor - vertical: bottom, horizontal: right', async function () {
            let div: HTMLDivElement;
            const { waitForDom} = clientRenderer.render(<div ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

            await waitForDom(() => {expect(div).to.be.present();});
            clientRenderer.render(<Popup anchor={div!} anchorPosition={{vertical: 'bottom', horizontal: 'right'}} open={true}>
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

            return waitForDom(() => {
                expect([div, bodySelect(popup)]).to.be.inVerticalSequence();
                expect([div, bodySelect(popup)]).to.be.inHorizontalSequence();
            })
        });

        it('Anchor - vertical: top, horizontal: left', async function () {
            let div: HTMLDivElement;
            const { waitForDom} = clientRenderer.render(<div ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);
            
            await waitForDom(() => {expect(div).to.be.present();});
            clientRenderer.render(<Popup anchor={div!} anchorPosition={{vertical: 'top', horizontal: 'left'}} open={true}>
                <span data-automation-id="SPAN">Popup Body</span>
                <div>some more stuff</div>
            </Popup>);

            return waitForDom(() => {
                expect([bodySelect(popup), div]).to.be.horizontallyAligned('left');
                expect([bodySelect(popup), div]).to.be.verticallyAligned('top');
            })
        });
    });
});
