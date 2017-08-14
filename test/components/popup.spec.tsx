import React = require('react');
import ReactDOM = require('react-dom');
import {selectDom} from 'test-drive';
import { ClientRenderer, expect, waitFor } from 'test-drive-react';
import {PopupDemo} from '../../demo/components/popup-demo';
import {Popup, PositionPoint} from '../../src/components/';

const popup = 'POPUP';
const demoContainer = 'POPUP_DEMO_DIV';

describe('<Popup />', function() {
    const clientRenderer = new ClientRenderer();
    const bodySelect = selectDom(document.body);
    const container = document.body.appendChild(document.createElement('div'));

    afterEach(function() {clientRenderer.cleanup(); });
    after(() => {document.body.removeChild(container); });

    describe('The popup user', function() {
        it('clicks on the parent and the popup opens and closes after another click', async function() {
            const {select, waitForDom} = clientRenderer.render(<PopupDemo />);

            await waitForDom(() => {
                expect(select(demoContainer)).to.be.present();
                expect(select(demoContainer, popup)).to.be.absent();
            });
            (select(demoContainer) as HTMLDivElement).click();
            await waitForDom(() => {
                expect(bodySelect(popup)).to.be.present();
            });
            (select(demoContainer) as HTMLDivElement).click();
            return waitForDom(() => {expect(bodySelect(popup)).to.be.absent(); });
        });
    });

    it('displays the popup and renders its children if the open prop is given', function() {
        clientRenderer.render(
            <Popup
                anchor={container}
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
        clientRenderer.render(
            <Popup
                anchor={container}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        await waitFor(() => {expect(bodySelect(popup)).to.be.present(); });
        ReactDOM.unmountComponentAtNode(bodySelect(popup)!.parentElement!);
        return waitFor(() => {expect(bodySelect(popup)).to.not.exist; });
    });

    it('syncs the popup width', function() {
        clientRenderer.render(
            <Popup
                anchor={container}
                syncWidth={true}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitFor(() => {
            expect(bodySelect(popup)!.getBoundingClientRect().width).to.equal(container.getBoundingClientRect().width);
        });
    });

    it('sets the default maxHeight', function() {
        clientRenderer.render(
            <Popup
                anchor={container}
                open={true}
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>);

        return waitFor(() => {
            expect(bodySelect<HTMLElement>(popup)!.style.maxHeight).to.equal('500px');
        });
    });

    it('sets and enforces the maxHeight', function() {
        clientRenderer.render(
            <Popup
                anchor={container}
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
        const fixture: PositionPoint[] = [{vertical: 'top', horizontal: 'left'},
            {vertical: 'top', horizontal: 'center'},
            {vertical: 'top', horizontal: 'right'},
            {vertical: 'center', horizontal: 'left'},
            {vertical: 'center', horizontal: 'center'},
            {vertical: 'center', horizontal: 'right'},
            {vertical: 'bottom', horizontal: 'left'},
            {vertical: 'bottom', horizontal: 'center'},
            {vertical: 'bottom', horizontal: 'right'}];

        // Level one: popup position, level two: anchor position
        const topResults = getLayoutTest('vertical');
        const leftResults = getLayoutTest('horizontal');
        for (const pPosition of fixture) {
            for (const aPosition of fixture) {
                it(`Popup position: V: ${pPosition.vertical} H: ${pPosition.horizontal};
                 Anchor position: V: ${aPosition.vertical} H: ${aPosition.horizontal}`, function() {
                    container.style.position = 'absolute';
                    container.style.top = '150px';
                    container.style.left = '150px';
                    container.style.width = '150px';
                    container.style.height = '150px';
                    container.style.border = '1px solid blue';

                    clientRenderer.render(
                        <Popup
                            anchor={container}
                            anchorPosition={aPosition}
                            popupPosition={pPosition}
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
                        topResults[pPosition.vertical][aPosition.vertical](container,
                            bodySelect<HTMLElement>(popup)!);
                        leftResults[pPosition.horizontal][aPosition.horizontal](
                            container, bodySelect<HTMLElement>(popup)!);
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

    return {
        [start]: {
            [start]: (anchor: HTMLElement, p: HTMLElement) =>
                createExpect(p.getBoundingClientRect()[start], anchor.getBoundingClientRect()[start]),
            center: (anchor: HTMLElement, p: HTMLElement) => {
                const anchorRect = anchor.getBoundingClientRect();
                createExpect(p.getBoundingClientRect()[start], anchorRect[start] + (anchorRect[length] / 2)); },
            [end]: (anchor: HTMLElement, p: HTMLElement) =>
                createExpect(p.getBoundingClientRect()[start], anchor.getBoundingClientRect()[end])
        },
        center: {
            [start]: (anchor: HTMLElement, p: HTMLElement) => {
                const popupRect = p.getBoundingClientRect();
                createExpect(popupRect[start], anchor.getBoundingClientRect()[start] - (popupRect[length] / 2)); },
            center: (anchor: HTMLElement, p: HTMLElement) => {
                const popupRect = p.getBoundingClientRect();
                const anchorRect = anchor.getBoundingClientRect();
                createExpect(popupRect[start], anchorRect[start] + (anchorRect[length] / 2) - (popupRect[length] / 2));
            },
            [end]: (anchor: HTMLElement, p: HTMLElement) => {
                const popupRect = p.getBoundingClientRect();
                createExpect(popupRect[end], anchor.getBoundingClientRect()[end] + (popupRect[length] / 2)); }
        },
        [end]: {
            [start]: (anchor: HTMLElement, p: HTMLElement) =>
                createExpect(p.getBoundingClientRect()[end], anchor.getBoundingClientRect()[start]),
            center: (anchor: HTMLElement, p: HTMLElement) => {
                const anchorRect = anchor.getBoundingClientRect();
                createExpect(p.getBoundingClientRect()[end], anchorRect[start] + (anchorRect[length] / 2)); },
            [end]: (anchor: HTMLElement, p: HTMLElement) =>
                createExpect(p.getBoundingClientRect()[end], anchor.getBoundingClientRect()[end])
        }
    };
}

function createExpect(pValue: number, aValue: number) {
    expect(equals(pValue, aValue), testString(pValue, aValue)).to.be.true;
}

function testString(p: number, a: number) {
    return `popup: ${p} anchor: ${a}`;
}

function equals(n: number, m: number, decPoint: number = 2): boolean {
    const resolution = Math.pow(10, decPoint);
    return Math.round((n - m) * resolution) / resolution === 0;
}
