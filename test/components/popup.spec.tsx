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
        const verticalArray = ['top', 'center', 'bottom'];
        const horizontalArray = ['left', 'center', 'right'];
        const divDim: CSSProperties = { position:'absolute', top:'150px', left:'150px', width: '100px', height: '100px'};

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
                right: (anchor: HTMLElement, popup: HTMLElement) => {return popup.getBoundingClientRect().left === anchor.getBoundingClientRect().right}
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
        verticalArray.forEach((popupVertical: VerticalPosition) => {
            horizontalArray.forEach((popupHorizontal: HorizontalPosition) => {
                verticalArray.forEach((anchorVertical: VerticalPosition) => {
                    horizontalArray.forEach((anchorHorizontal: HorizontalPosition) => {
                        it(`Popup position: vertical ${popupVertical} horizontal ${popupHorizontal}; Anchor position: vertical ${anchorVertical} horizontal: ${anchorHorizontal}`, async function () {
                            let div: HTMLDivElement;
                            const {waitForDom} = clientRenderer.render(<div style={divDim}
                                                                            ref={(elem: HTMLDivElement) => div = elem}>
                                Anchor</div>);

                            await waitForDom(() => {
                                expect(div).to.be.present();
                            });
                            clientRenderer.render(<Popup anchor={div!} anchorPosition={{
                                vertical: anchorVertical,
                                horizontal: anchorHorizontal
                            }} popupPosition={{vertical: popupVertical, horizontal: popupHorizontal}} open={true}>
                                <span data-automation-id="SPAN">Popup Body</span>
                                <div>some more stuff</div>
                            </Popup>);

                            return waitForDom(() => {
                                expect(topResults[popupVertical][anchorVertical](div, bodySelect(popup) as HTMLElement), 'vertical test failed',).to.be.true;
                                expect(leftResults[popupHorizontal][anchorHorizontal](div, bodySelect(popup) as HTMLElement), 'horizontal test failed',).to.be.true;
                            });
                        });
                    });
                });
            });
        });


    })
});
