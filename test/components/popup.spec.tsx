import React = require('react');
import ReactDOM = require('react-dom');
import {selectDom} from 'test-drive';
import { ClientRenderer, expect, waitFor } from 'test-drive-react';
import {PopupDemo} from '../../demo/components/popup-demo';
import {Popup, PositionPoint} from '../../src/components/';

const portalId = 'PORTAL';
const demoContainer = 'POPUP_DEMO_DIV';

describe('<Popup />', function() {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);
    const anchor = document.body.appendChild(document.createElement('div'));
    anchor.style.position = 'absolute';
    anchor.style.top = '150px';
    anchor.style.left = '150px';
    anchor.style.width = '150px';
    anchor.style.height = '150px';
    anchor.style.border = '1px solid blue';

    afterEach(function() {clientRenderer.cleanup(); });
    after(() => {document.body.removeChild(anchor); });

    describe('The popup user', function() {
        it('clicks on the parent and the popup opens and closes after another click', async function() {
            const {select, waitForDom} = clientRenderer.render(<PopupDemo />);

            await waitForDom(() => {
                expect(select(demoContainer)).to.be.present();
                expect(select(demoContainer, portalId)).to.be.absent();
            });
            (select(demoContainer) as HTMLDivElement).click();
            await waitForDom(() => {
                expect(bodySelect(portalId)).to.be.present();
            });
            (select(demoContainer) as HTMLDivElement).click();
            return waitForDom(() => {expect(bodySelect(portalId)).to.be.absent(); });
        });
    });

    it('displays the popup and renders its children if the open prop is given', function() {
        clientRenderer.render(
            <Popup
                anchor={anchor}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitFor(() => {
            expect(bodySelect(portalId)).to.be.present();
            expect(bodySelect(portalId, 'SPAN')).to.be.present();
        });
    });

    it('removes the component when unmounting', async function() {
        clientRenderer.render(
            <Popup
                anchor={anchor}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        await waitFor(() => {expect(bodySelect(portalId)).to.be.present(); });
        ReactDOM.unmountComponentAtNode(bodySelect(portalId)!.parentElement!);
        return waitFor(() => {expect(bodySelect(portalId)).to.not.exist; });
    });

    it('syncs the popup width', function() {
        clientRenderer.render(
            <Popup
                anchor={anchor}
                syncWidth={true}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitFor(() => {
            expect(bodySelect(portalId)!.getBoundingClientRect().width)
                .to.equal(anchor.getBoundingClientRect().width);
        });
    });

    it('sets the default maxHeight', function() {
        clientRenderer.render(
            <Popup
                anchor={anchor}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitFor(() => {
            expect(bodySelect<HTMLElement>(portalId)!.style.maxHeight).to.equal('500px');
        });
    });

    it('sets and enforces the maxHeight', function() {
        clientRenderer.render(
            <Popup
                anchor={anchor}
                maxHeight={5}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitFor(() => {
            expect(bodySelect<HTMLElement>(portalId)!.style.maxHeight).to.equal('5px');
            expect(bodySelect<HTMLElement>(portalId)!.getBoundingClientRect().height).to.equal(5);
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
                expect([div, bodySelect(portalId)]).to.be.inVerticalSequence();
            });
        });
    });

    describe('Layout tests', function() {
        const fixture = getFixture();

        for (const popupPos of fixture) {
            for (const anchorPos of fixture) {
                it(`Popup position: V: ${popupPos.vertical} H: ${popupPos.horizontal};
                 Anchor position: V: ${anchorPos.vertical} H: ${anchorPos.horizontal}`, function() {
                    clientRenderer.render(
                        <Popup anchor={anchor} anchorPosition={anchorPos} popupPosition={popupPos} open={true}>
                            <div style={{background: 'green', color: 'white'}}>
                                    <span data-automation-id="SPAN">
                                        Popup Body
                                    </span>
                                <div>some more stuff</div>
                            </div>
                        </Popup>);

                    return waitFor(() => {
                        const popup = bodySelect<HTMLElement>(portalId)!;

                        runTest(popup, anchor, popupPos, anchorPos);
                    });
                });
            }
        }
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

    // Level one: popup position, level two: anchor position
    return {
        [start]: {
            [start]: (anchor: HTMLElement, popup: HTMLElement) =>
                createExpect(popup.getBoundingClientRect()[start], anchor.getBoundingClientRect()[start]),
            center: (anchor: HTMLElement, popup: HTMLElement) => {
                const anchorRect = anchor.getBoundingClientRect();
                createExpect(popup.getBoundingClientRect()[start], anchorRect[start] + (anchorRect[length] / 2)); },
            [end]: (anchor: HTMLElement, popup: HTMLElement) =>
                createExpect(popup.getBoundingClientRect()[start], anchor.getBoundingClientRect()[end])
        },
        center: {
            [start]: (anchor: HTMLElement, popup: HTMLElement) => {
                const popupRect = popup.getBoundingClientRect();
                createExpect(popupRect[start], anchor.getBoundingClientRect()[start] - (popupRect[length] / 2)); },
            center: (anchor: HTMLElement, popup: HTMLElement) => {
                const popupRect = popup.getBoundingClientRect();
                const anchorRect = anchor.getBoundingClientRect();
                createExpect(popupRect[start], anchorRect[start] + (anchorRect[length] / 2) - (popupRect[length] / 2));
            },
            [end]: (anchor: HTMLElement, popup: HTMLElement) => {
                const popupRect = popup.getBoundingClientRect();
                createExpect(popupRect[end], anchor.getBoundingClientRect()[end] + (popupRect[length] / 2)); }
        },
        [end]: {
            [start]: (anchor: HTMLElement, popup: HTMLElement) =>
                createExpect(popup.getBoundingClientRect()[end], anchor.getBoundingClientRect()[start]),
            center: (anchor: HTMLElement, popup: HTMLElement) => {
                const anchorRect = anchor.getBoundingClientRect();
                createExpect(popup.getBoundingClientRect()[end], anchorRect[start] + (anchorRect[length] / 2)); },
            [end]: (anchor: HTMLElement, popup: HTMLElement) =>
                createExpect(popup.getBoundingClientRect()[end], anchor.getBoundingClientRect()[end])
        }
    };
}

function runTest(popup: HTMLElement, anchor: HTMLElement, popupPos: PositionPoint, anchorPos: PositionPoint) {
    const topTests = getLayoutTest('vertical');
    const leftTests = getLayoutTest('horizontal');

    topTests[popupPos.vertical][anchorPos.vertical](anchor, popup);
    leftTests[popupPos.horizontal][anchorPos.horizontal](anchor, popup);
}

function getFixture(): PositionPoint[] {
    return [{vertical: 'top', horizontal: 'left'},
        {vertical: 'top', horizontal: 'center'},
        {vertical: 'top', horizontal: 'right'},
        {vertical: 'center', horizontal: 'left'},
        {vertical: 'center', horizontal: 'center'},
        {vertical: 'center', horizontal: 'right'},
        {vertical: 'bottom', horizontal: 'left'},
        {vertical: 'bottom', horizontal: 'center'},
        {vertical: 'bottom', horizontal: 'right'}];
}

function createExpect(pValue: number, aValue: number) {
    expect(pValue, `popup value: ${pValue} anchor value: ${aValue}`).to.be.closeTo(aValue, 0.01);
}
