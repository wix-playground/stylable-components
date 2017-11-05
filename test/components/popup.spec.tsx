import React = require('react');
import ReactDOM = require('react-dom');
import {ClientRenderer, DriverBase, expect, sinon, waitFor} from 'test-drive-react';
import {PopupDemo} from '../../demo/components/popup-demo';
import {Popup, PopupPositionPoint} from '../../src/components/';
import {PopupTestDriver} from '../../test-kit/components/popup-driver';
import {sleep} from '../utils';

export class PopupDemoTestDriver extends DriverBase {
    public static ComponentClass = PopupDemo;
    public popup: PopupTestDriver;
    public container: HTMLButtonElement = this.select('POPUP_DEMO_BTN');

    constructor(getPopupDemo: () => HTMLElement) {
        super(getPopupDemo);
        this.popup = new PopupTestDriver(getPopupDemo);
    }
}

describe('<Popup />', () => {
    const clientRenderer = new ClientRenderer();
    let anchor: HTMLElement;

    before(() => {
        anchor = document.body.appendChild(document.createElement('div'));
        anchor.style.position = 'absolute';
        anchor.style.top = '150px';
        anchor.style.left = '150px';
        anchor.style.width = '150px';
        anchor.style.height = '150px';
        anchor.style.border = '1px solid blue';
    });
    afterEach(() => {clientRenderer.cleanup(); });
    after(() => {document.body.removeChild(anchor); });

    describe('The popup user', () => {
        it('clicks on the parent and the popup opens and closes after another click', async () => {
            const {driver: popupDemo, waitForDom} =
                clientRenderer.render(<PopupDemo />).withDriver(PopupDemoTestDriver);

            await waitForDom(() => {
                expect(popupDemo.container).to.be.present();
                expect(popupDemo.popup.root).to.be.absent();
            });

            popupDemo.container.click();

            await waitForDom(() => expect(popupDemo.popup.root).to.be.present());

            popupDemo.container.click();
            return waitForDom(() => expect(popupDemo.popup.root).to.be.absent());
        });
    });

    it('displays the popup and renders its children if the open prop is given', () => {
        const {driver: popup} = clientRenderer.render(
            <Popup anchor={anchor} open>
                <span>Popup Body</span>
            </Popup>
        ).withDriver(PopupTestDriver);

        return waitFor(() => {
            expect(popup.root).to.be.present();
            expect(popup.content[0]).to.be.present();
        });
    });

    it('does not render the popup if there is no anchor', async () => {
        const {driver: popup} = clientRenderer.render(
            <Popup anchor={null} open>
                <span>Popup Body</span>
            </Popup>
        ).withDriver(PopupTestDriver);
        await sleep(100);

        await waitFor(() => expect(popup.root).to.be.absent());
    });

    it('does not render the popup if the open prop is false', async () => {
        const {driver: popup} = clientRenderer.render(
            <Popup anchor={anchor}>
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>
        ).withDriver(PopupTestDriver);
        await sleep(100);

        await waitFor(() => expect(popup.root).to.be.absent());
    });

    it('removes the component when unmounting', async () => {
        const {driver: popup} = clientRenderer.render(
            <Popup
                anchor={anchor}
                open
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>).withDriver(PopupTestDriver);

        await waitFor(() => {expect(popup.root).to.be.present(); });
        ReactDOM.unmountComponentAtNode(popup.root!.parentElement!);
        return waitFor(() => {expect(popup.root).to.be.absent(); });
    });

    it('syncs the popup width', () => {
        const {driver: popup} = clientRenderer.render(
            <Popup
                anchor={anchor}
                syncWidth={true}
                open
            >
                <span data-automation-id="SPAN">Popup Body</span>
            </Popup>).withDriver(PopupTestDriver);

        return waitFor(() => {
            expect(popup.root.getBoundingClientRect().width)
                .to.equal(anchor.getBoundingClientRect().width);
        });
    });

    describe('Scrolling tests', () => {
        const scroll = document.createElement('div');
        scroll.style.height = '5000px';
        scroll.style.width = '5000px';

        before(() => {document.body.appendChild(scroll); });

        after(() => {
            document.body.removeChild(scroll);
        });

        afterEach(() => {
            document.body.scrollTop = 0;
            document.body.scrollLeft = 0;
        });

        it('renders the popup in the right location when it is out of view', async () => {
            let div: HTMLDivElement;
            const {waitForDom} = clientRenderer.render(
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
            const {driver: popup} = clientRenderer.render(
                <Popup
                    anchor={div!}
                    open
                >
                    <span data-automation-id="SPAN">Popup Body</span>
                </Popup>).withDriver(PopupTestDriver);

            return waitForDom(() => {
                expect([div, popup.root]).to.be.inVerticalSequence();
            });
        });

        it('listens to internal scrolling and adjusts the popup location accordingly', async () => {
            let anchorDiv: HTMLDivElement;
            let scrollDiv: HTMLDivElement;
            const {waitForDom} = clientRenderer.render(
                <div>
                    <div
                        ref={(elem: HTMLDivElement) => scrollDiv = elem}
                        style={{height: '100px', overflow: 'auto', WebkitOverflowScrolling: 'touch'}}
                    >
                        <div style={{height: '300px'}}>Filler</div>
                        <div ref={(elem: HTMLDivElement) => anchorDiv = elem}>Anchor</div>
                    </div>
                </div>
            );

            await waitForDom(() => expect(anchorDiv).to.be.present());

            const {driver: popup} = clientRenderer.render(
                <Popup
                    anchor={anchorDiv!}
                    open
                >
                    <span data-automation-id="SPAN">Popup Body</span>
                </Popup>).withDriver(PopupTestDriver);

            scrollDiv!.scrollTop = 200;

            return waitForDom(() => {
                expect([anchorDiv, popup.root]).to.be.inVerticalSequence();
            });
        });

        it('calls onExitBounds when the popup leaves the viewport from top', async () => {
            let anchorDiv: HTMLDivElement;
            let scrollDiv: HTMLDivElement;
            const onExitBounds = sinon.spy();
            const {waitForDom} = clientRenderer.render(
                <div
                    ref={(elem: HTMLDivElement) => scrollDiv = elem}
                    style={{height: '1000px', overflow: 'auto', WebkitOverflowScrolling: 'touch'}}
                >
                    <div ref={(elem: HTMLDivElement) => anchorDiv = elem} style={{height: '50px'}}>Anchor</div>
                    <div style={{height: '5000px'}}/>
                </div>
            );

            await waitForDom(() => expect(anchorDiv).to.be.present());

            const {driver: popup} = clientRenderer.render(
                <Popup
                    anchor={anchorDiv!}
                    open
                    onExitBounds={onExitBounds}
                >
                    <div style={{height: '50px'}}>Body</div>
                </Popup>).withDriver(PopupTestDriver);

            await waitForDom(() => {
                expect(popup.root).to.be.present();
                expect(popup.root.getBoundingClientRect().top).to.equal(50);
            });
            expect(onExitBounds).to.not.have.been.called;
            scrollDiv!.scrollTop = 51;

            return waitFor(() => {
                expect(onExitBounds).to.have.been.calledOnce;
            });
        });

        it('calls onExitBounds when the popup leaves the viewport from bottom', async () => {
            let anchorDiv: HTMLDivElement;
            let scrollDiv: HTMLDivElement;
            const onExitBounds = sinon.spy();
            const {waitForDom} = clientRenderer.render(
                <div
                    ref={(elem: HTMLDivElement) => scrollDiv = elem}
                    style={{height: '1000px', overflow: 'auto', WebkitOverflowScrolling: 'touch'}}
                >
                    <div style={{height: '3000px'}}/>
                    <div ref={(elem: HTMLDivElement) => anchorDiv = elem} style={{height: '50px'}}>Anchor</div>
                    <div style={{height: '100px'}}/>
                </div>
            );
            scrollDiv!.scrollTop = 3100;
            await waitForDom(() => expect(anchorDiv).to.be.present());

            const {driver: popup} = clientRenderer.render(
                <Popup
                    anchor={anchorDiv!}
                    open
                    onExitBounds={onExitBounds}
                >
                    <div style={{height: '50px'}}>Body</div>
                </Popup>).withDriver(PopupTestDriver);

            await waitForDom(() => expect(popup.root).to.be.present());
            expect(onExitBounds).to.not.have.been.called;
            scrollDiv!.scrollTop = 2000;
            return waitFor(() => {
                expect(onExitBounds).to.have.been.calledOnce;
            });
        });

        it('calls onExitBounds when the popup leaves the viewport from left', async () => {
            let anchorDiv: HTMLDivElement;
            let scrollDiv: HTMLDivElement;
            const onExitBounds = sinon.spy();
            const {waitForDom} = clientRenderer.render(
                <div
                    ref={(elem: HTMLDivElement) => scrollDiv = elem}
                    style={{width: '100%', overflow: 'auto', WebkitOverflowScrolling: 'touch'}}
                >
                    <div ref={(elem: HTMLDivElement) => anchorDiv = elem} style={{width: '50px'}}>Anchor</div>
                    <div style={{width: '5000px', height: '1px'}}/>
                </div>
            );

            await waitForDom(() => expect(anchorDiv).to.be.present());

            const {driver: popup} = clientRenderer.render(
                <Popup
                    anchor={anchorDiv!}
                    open
                    onExitBounds={onExitBounds}
                >
                    <div style={{width: '50px'}}>Body</div>
                </Popup>).withDriver(PopupTestDriver);

            await waitForDom(() => expect(popup.root).to.be.present());
            expect(onExitBounds).to.not.have.been.called;
            scrollDiv!.scrollLeft = 1;

            return waitFor(() => {
                expect(onExitBounds).to.have.been.calledOnce;
            });
        });

        it('calls onExitBounds when the popup leaves the viewport from right', async () => {
            let anchorDiv: HTMLDivElement;
            let scrollDiv: HTMLDivElement;
            const onExitBounds = sinon.spy();
            const {waitForDom} = clientRenderer.render(
                <div
                    ref={(elem: HTMLDivElement) => scrollDiv = elem}
                    style={{width: '100%', overflow: 'auto', WebkitOverflowScrolling: 'touch'}}
                >
                    <div ref={(elem: HTMLDivElement) => anchorDiv = elem} style={{width: '200%'}}>Anchor</div>
                </div>
            );

            await waitForDom(() => expect(anchorDiv).to.be.present());
            scrollDiv!.scrollLeft = 50;
            const {driver: popup} = clientRenderer.render(
                <Popup
                    anchor={anchorDiv!}
                    anchorPosition={{vertical: 'bottom', horizontal: 'center'}}
                    open
                    onExitBounds={onExitBounds}
                >
                    <div style={{width: '50px'}}>Body</div>
                </Popup>).withDriver(PopupTestDriver);

            await waitForDom(() => expect(popup.root).to.be.present());
            expect(onExitBounds).to.not.have.been.called;
            scrollDiv!.scrollLeft = 0;

            return waitFor(() => {
                expect(onExitBounds).to.have.been.calledOnce;
            });
        });
    });

    describe('Layout tests', () => {
        const fixture = getFixture();

        for (const popupPos of fixture) {
            for (const anchorPos of fixture) {
                it(`Popup position: V: ${popupPos.vertical} H: ${popupPos.horizontal};
                 Anchor position: V: ${anchorPos.vertical} H: ${anchorPos.horizontal}`, () => {
                    const {driver: popup} = clientRenderer.render(
                        <Popup anchor={anchor} anchorPosition={anchorPos} popupPosition={popupPos} open>
                            <div style={{background: 'green', color: 'white'}}>
                                    <span data-automation-id="SPAN">
                                        Popup Body
                                    </span>
                                <div>some more stuff</div>
                            </div>
                        </Popup>).withDriver(PopupTestDriver);

                    return waitFor(() => runTest(popup.root, anchor, popupPos, anchorPos));
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

function runTest(popup: HTMLElement, anchor: HTMLElement, popupPos: PopupPositionPoint, anchorPos: PopupPositionPoint) {
    const topTests = getLayoutTest('vertical');
    const leftTests = getLayoutTest('horizontal');

    topTests[popupPos.vertical][anchorPos.vertical](anchor, popup);
    leftTests[popupPos.horizontal][anchorPos.horizontal](anchor, popup);
}

function getFixture(): PopupPositionPoint[] {
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
