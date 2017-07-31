import React = require('react');
import { expect, ClientRenderer, simulate } from 'test-drive-react';
import {selectDom} from 'test-drive';
import {PopupDemo} from '../../demo/components/popup-demo';
import {Popup, VerticalPosition, HorizontalPosition} from '../../src/components/'
import {CSSProperties} from "react";

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

    describe('Layout tests', function () {
        const divDim: CSSProperties = {width: '100px', height: '100px'};

        it('(Default) Anchor - vertical: bottom, horizontal: left', async function () {
            let div: HTMLDivElement;
            const { waitForDom} = clientRenderer.render(<div style={divDim} ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

            await waitForDom(() => {expect(div).to.be.present()});

            clientRenderer.render(<Popup anchor={div!} open={true}>
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

            return waitForDom(() => {
                expect([bodySelect(popup), div]).to.be.horizontallyAligned('left');
                expect([div, bodySelect(popup)]).to.be.inVerticalSequence();
            })
        });

        it('Anchor - vertical: bottom, horizontal: right', async function () {
            let div: HTMLDivElement;
            const { waitForDom} = clientRenderer.render(<div style={divDim} ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

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
            const { waitForDom} = clientRenderer.render(<div style={divDim} ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

            await waitForDom(() => {expect(div).to.be.present();});
            clientRenderer.render(<Popup anchor={div!} anchorPosition={{vertical: 'top', horizontal: 'left'}} open={true}>
                <span data-automation-id="SPAN">Popup Body</span>
                <div>some more stuff</div>
            </Popup>);

            return waitForDom(() => {
                expect([bodySelect(popup), div]).to.be.horizontallyAligned('left');
                expect([bodySelect(popup), div]).to.be.verticallyAligned('top');
            });
        });

        it('Anchor - vertical: top, horizontal: right', async function () {
            let div: HTMLDivElement;
            const { waitForDom} = clientRenderer.render(<div style={divDim} ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

            await waitForDom(() => {expect(div).to.be.present();});
            clientRenderer.render(<Popup anchor={div!} anchorPosition={{vertical: 'top', horizontal: 'right'}} open={true}>
                <span data-automation-id="SPAN">Popup Body</span>
                <div>some more stuff</div>
            </Popup>);

            return waitForDom(() => {
                expect([bodySelect(popup), div]).to.be.verticallyAligned('top');
                expect([div, bodySelect(popup)]).to.be.inHorizontalSequence();
            });
        });
    });

    describe.only('Test', function () {
        const verticalArray = ['top', 'center', 'bottom'];
        const horizontalArray = ['left', 'center', 'right'];
        const divDim: CSSProperties = { position:'absolute', top:'50px', left:'50px', width: '100px', height: '100px'};

        // Level one: popup position, level two: anchor position
        const topResults = {
            top: {
                top: (anchor: HTMLElement, popup: HTMLElement) => {return popup.getBoundingClientRect().top === anchor.getBoundingClientRect().top},
                center: (anchor: HTMLElement, popup: HTMLElement) => {
                    const anchorRect = anchor.getBoundingClientRect();
                    return popup.getBoundingClientRect().top === anchorRect.top + (anchorRect.height / 2)},
                bottom: (anchor: HTMLElement, popup: HTMLElement) => {return popup.getBoundingClientRect().top === anchor.getBoundingClientRect().bottom}
            },
            center: {
                top: (anchor: HTMLElement, popup: HTMLElement) => {
                    const popupRect = popup.getBoundingClientRect();
                    return popupRect.top === anchor.getBoundingClientRect().top - (popupRect.height / 2)},
                center: (anchor: HTMLElement, popup: HTMLElement) => {
                    const popupRect = popup.getBoundingClientRect();
                    const anchorRect = anchor.getBoundingClientRect();
                    return popupRect.top ===  anchorRect.top + (anchorRect.height / 2) - (popupRect.height / 2)
                },
                bottom: (anchor: HTMLElement, popup: HTMLElement) => {
                    const popupRect = popup.getBoundingClientRect();
                    return popupRect.bottom === anchor.getBoundingClientRect().bottom + (popupRect.height / 2)}
            },
            bottom: {
                top: (anchor: HTMLElement, popup: HTMLElement) => {return popup.getBoundingClientRect().bottom === anchor.getBoundingClientRect().top},
                center: (anchor: HTMLElement, popup: HTMLElement) => {
                    const anchorRect = anchor.getBoundingClientRect();
                    return popup.getBoundingClientRect().bottom === anchorRect.top + (anchorRect.height / 2)},
                bottom: (anchor: HTMLElement, popup: HTMLElement) => {return popup.getBoundingClientRect().bottom === anchor.getBoundingClientRect().bottom}
            }
        };

        const leftResults = {
            left: {
                left: (anchor: HTMLElement, popup: HTMLElement) => {return popup.getBoundingClientRect().left === anchor.getBoundingClientRect().left},
                center: (anchor: HTMLElement, popup: HTMLElement) => {
                    const anchorRect = anchor.getBoundingClientRect();
                    return popup.getBoundingClientRect().left === anchorRect.left + (anchorRect.width / 2)},
                right: (anchor: HTMLElement, popup: HTMLElement) => {return popup.getBoundingClientRect().right === anchor.getBoundingClientRect().right}
            },
            center: {
                left: (anchor: HTMLElement, popup: HTMLElement) => {
                    const popupRect = popup.getBoundingClientRect();
                    return popupRect.left === anchor.getBoundingClientRect().left - (popupRect.width / 2)},
                center: (anchor: HTMLElement, popup: HTMLElement) => {
                    const popupRect = popup.getBoundingClientRect();
                    const anchorRect = anchor.getBoundingClientRect();
                    return popupRect.left ===  anchorRect.left + (anchorRect.width / 2) - (popupRect.width / 2)
                },
                right: (anchor: HTMLElement, popup: HTMLElement) => {
                    const popupRect = popup.getBoundingClientRect();
                    return popupRect.right === anchor.getBoundingClientRect().right + (popupRect.width / 2)}
            },
            right: {
                left: (anchor: HTMLElement, popup: HTMLElement) => {return popup.getBoundingClientRect().right === anchor.getBoundingClientRect().left},
                center: (anchor: HTMLElement, popup: HTMLElement) => {
                    const anchorRect = anchor.getBoundingClientRect();
                    return popup.getBoundingClientRect().right === anchorRect.left + (anchorRect.width / 2)},
                right: (anchor: HTMLElement, popup: HTMLElement) => {return popup.getBoundingClientRect().right === anchor.getBoundingClientRect().right}
            }
        };

        verticalArray.forEach((vertical: VerticalPosition) => {
            horizontalArray.forEach((horizontal: HorizontalPosition) => {
                it(`Anchor position: vertical ${vertical} horizontal: ${horizontal}`, async function () {
                    let div: HTMLDivElement;
                    const {waitForDom} = clientRenderer.render(<div style={divDim} ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>);

                    await waitForDom(() => {expect(div).to.be.present();});
                    clientRenderer.render(<Popup anchor={div!} anchorPosition={{vertical: vertical, horizontal: horizontal}} open={true}>
                        <span data-automation-id="SPAN">Popup Body</span>
                        <div>some more stuff</div>
                    </Popup>);

                    return waitForDom(() => {
                        expect(topResults.top[vertical](div, bodySelect(popup) as HTMLElement), 'vertical test failed', ).to.be.true;
                        expect(leftResults.left[horizontal](div, bodySelect(popup) as HTMLElement), 'horizontal test failed', ).to.be.true;
                    });
                })
            })
        })
    })
});
