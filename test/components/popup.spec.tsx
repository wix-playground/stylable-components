import React = require('react');
import ReactDOM = require('react-dom');
import {selectDom} from 'test-drive';
import { ClientRenderer, expect, waitFor } from 'test-drive-react';
import {PopupDemo} from '../../demo/components/popup-demo';
import {HorizontalPosition, Popup, VerticalPosition} from '../../src/components/';

const popup = 'POPUP';
const container = 'POPUP_DEMO_DIV';

describe('<Popup />', function() {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);
    const testContainer = document.body.appendChild(document.createElement('div'));

    afterEach(function() {clientRenderer.cleanup(); });
    after(() => {document.body.removeChild(testContainer); });

    describe('The popup user', function() {
        it('clicks on the parent and the popup opens and closes after another click', async function() {
            const {select, waitForDom} = clientRenderer.render(<PopupDemo />);

            await waitForDom(() => {
                expect(select(container)).to.be.present();
                expect(select(container, popup)).to.be.absent();
            });
            (select(container) as HTMLDivElement).click();
            await waitForDom(() => {expect(bodySelect(popup)).to.be.present(); });
            (select(container) as HTMLDivElement).click();
            return waitForDom(() => {expect(bodySelect(popup)).to.be.absent(); });
        });
    });

    it('displays the popup and renders its children if the open prop is given', function() {
        const div = document.body.appendChild(testContainer);

        clientRenderer.render(
            <Popup
                anchor={div!}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitFor(() => {
            expect(bodySelect(popup)).to.be.present();
            expect(bodySelect(popup, 'SPAN')).to.be.present();
        });
    });

    it('removes the component when unmounting', async function() {
        const div = document.body.appendChild(testContainer);

        clientRenderer.render(
            <Popup
                anchor={div!}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        await waitFor(() => {expect(bodySelect(popup)).to.be.present(); });
        ReactDOM.unmountComponentAtNode(bodySelect(popup)!.parentElement!);
        return waitFor(() => {expect(bodySelect(popup)).to.not.exist; });
    });

    it('syncs the popup width', function() {
        const div = document.body.appendChild(testContainer);

        clientRenderer.render(
            <Popup
                anchor={div!}
                syncWidth={true}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitFor(() => {
            expect(bodySelect(popup)!.getBoundingClientRect().width).to.equal(div.getBoundingClientRect().width);
        });
    });

    it('sets the default maxHeight', function() {
        const div = document.body.appendChild(testContainer);

        clientRenderer.render(
            <Popup
                anchor={div!}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitFor(() => {
            expect(bodySelect<HTMLElement>(popup)!.style.maxHeight).to.equal('500px');
        });
    });

    it('sets and enforces the maxHeight', function() {
        const div = document.body.appendChild(testContainer);

        clientRenderer.render(
            <Popup
                anchor={div!}
                maxHeight={5}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitFor(() => {
            expect(bodySelect<HTMLElement>(popup)!.style.maxHeight).to.equal('5px');
            expect(bodySelect<HTMLElement>(popup)!.getBoundingClientRect().height).to.equal(5);
        });
    });

    describe('Scrolling tests', function() {
        const scroll = document.createElement('div');
        scroll.style.height = '5000px';
        scroll.style.width = '5000px';

        before(() => {document.body.appendChild(scroll); });

        after(() => {document.body.removeChild(scroll); });

        it('renders the popup in the right location when it is out of view', async function() {
            let div: HTMLDivElement;
            const { waitForDom} = clientRenderer.render(
                <div>
                    <div style={{height: '1000px'}}>Filler</div>
                    <div ref={(elem: HTMLDivElement) => div = elem}>Anchor</div>
                </div>
            );

            await waitForDom(() => {
                expect(div).to.be.present();
            });
            document.body.scrollTop = 500;
            document.body.scrollLeft = 500;
            clientRenderer.render(
                <Popup
                    anchor={div!}
                    open={true}
                >
                    <span data-automation-id="SPAN">Popup Body</span>
                </Popup>);

            return waitForDom(() => {
                expect([div, bodySelect(popup)]).to.be.inVerticalSequence();
            });
        });
    });

    describe('Layout tests', function() {
        const verticalArray = ['top', 'center', 'bottom'];
        const horizontalArray = ['left', 'center', 'right'];

        // Level one: popup position, level two: anchor position
        const topResults = getLayoutTest('vertical');
        const leftResults = getLayoutTest('horizontal');

        verticalArray.forEach((popupVertical: VerticalPosition) => {
            horizontalArray.forEach((popupHorizontal: HorizontalPosition) => {
                verticalArray.forEach((anchorVertical: VerticalPosition) => {
                    horizontalArray.forEach((anchorHorizontal: HorizontalPosition) => {
                        it(
                            `Popup position: V: ${popupVertical} H: ${popupHorizontal};
                            Anchor position: V: ${anchorVertical} H: ${anchorHorizontal}`, function() {
                                const div = document.body.appendChild(testContainer);
                                div.style.position = 'absolute';
                                div.style.top = '150px';
                                div.style.left = '150px';
                                div.style.width  = '150px';
                                div.style.height = '150px';
                                div.style.border = '1px solid blue';

                                clientRenderer.render(
                                    <Popup
                                        anchor={div!}
                                        anchorPosition={{vertical: anchorVertical, horizontal: anchorHorizontal}}
                                        popupPosition={{vertical: popupVertical, horizontal: popupHorizontal}}
                                        open={true}
                                    >
                                        <div
                                            style={{background: 'green', color: 'white'}}
                                        >
                                    <span
                                        data-automation-id="SPAN"
                                    >
                                        Popup Body
                                    </span>
                                            <div>some more stuff</div>
                                        </div>
                                    </Popup>);

                                return waitFor(() => {
                                    expect(
                                        topResults[popupVertical][anchorVertical](div, bodySelect<HTMLElement>(popup)!),
                                        'vertical test failed'
                                    ).to.be.true;
                                    expect(
                                        leftResults[popupHorizontal][anchorHorizontal](
                                            div, bodySelect<HTMLElement>(popup)!
                                        ), 'horizontal test failed'
                                    ).to.be.true;
                                });
                            });
                    });
                });
            });
        });
    });
});

function getLayoutTest(axis: 'vertical' | 'horizontal') {
    let start: 'left' | 'top' = 'top';
    let end: 'bottom' | 'right' = 'bottom';
    let length: 'height' | 'width' = 'height';

    if (axis === 'horizontal') {
        start = 'left';
        end = 'right';
        length = 'width';
    }

    return {
        [start]: {
            [start]: (anchor: HTMLElement, p: HTMLElement) =>
                equals(p.getBoundingClientRect()[start], anchor.getBoundingClientRect()[start]),
            center: (anchor: HTMLElement, p: HTMLElement) => {
                const anchorRect = anchor.getBoundingClientRect();
                return equals(p.getBoundingClientRect()[start], anchorRect[start] + (anchorRect[length] / 2)); },
            [end]: (anchor: HTMLElement, p: HTMLElement) =>
                equals(p.getBoundingClientRect()[start], anchor.getBoundingClientRect()[end])
        },
        center: {
            [start]: (anchor: HTMLElement, p: HTMLElement) => {
                const popupRect = p.getBoundingClientRect();
                return equals(popupRect[start], anchor.getBoundingClientRect()[start] - (popupRect[length] / 2)); },
            center: (anchor: HTMLElement, p: HTMLElement) => {
                const popupRect = p.getBoundingClientRect();
                const anchorRect = anchor.getBoundingClientRect();
                return equals(popupRect[start], anchorRect[start] + (anchorRect[length] / 2) - (popupRect[length] / 2));
            },
            [end]: (anchor: HTMLElement, p: HTMLElement) => {
                const popupRect = p.getBoundingClientRect();
                return equals(popupRect[end], anchor.getBoundingClientRect()[end] + (popupRect[length] / 2)); }
        },
        [end]: {
            [start]: (anchor: HTMLElement, p: HTMLElement) =>
                equals(p.getBoundingClientRect()[end], anchor.getBoundingClientRect()[start]),
            center: (anchor: HTMLElement, p: HTMLElement) => {
                const anchorRect = anchor.getBoundingClientRect();
                return equals(p.getBoundingClientRect()[end], anchorRect[start] + (anchorRect[length] / 2)); },
            [end]: (anchor: HTMLElement, p: HTMLElement) =>
                equals(p.getBoundingClientRect()[end], anchor.getBoundingClientRect()[end])
        }
    };
}

function equals(n: number, m: number, decPoint: number = 2): boolean {
    const resolution = Math.pow(10, decPoint);
    return Math.round((n - m) * resolution) / resolution === 0;
}
