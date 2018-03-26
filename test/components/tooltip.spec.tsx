import * as React from 'react'; import {ClientRenderer, DriverBase, expect} from 'test-drive-react';
import {Position, Tooltip, TooltipProps} from '../../src';
import {TooltipDriver} from '../../test-kit';
import {sleep} from '../utils';

const TAIL_OFFSET = 10;

function getRect(elem: Element) {
    const rect = elem.getBoundingClientRect();
    const styles = window.getComputedStyle(elem);
    return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        marginLeft: Number(styles.marginLeft!.slice(0, -2)),
        marginTop: Number(styles.marginTop!.slice(0, -2))
    };
}

type SampleProps = Partial<TooltipProps> & {style?: React.CSSProperties};
class Sample extends React.Component<SampleProps> {
    public render() {
        const id = 'id' + Math.random().toString().slice(2);
        const {style, ...props} = this.props;
        return (
            <div style={style}>
                <div
                    data-automation-id="TEST_ANCHOR"
                    data-tooltip-for={id}
                    children="I am an anchor!"
                    style={{width: 100}}
                />
                <Tooltip
                    id={id}
                    children="I am a tooltip!"
                    open
                    {...props}
                />
            </div>
        );
    }
}

function createEvent(type: string): Event {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, false, null);
    return event;
}

class SampleDriver extends DriverBase {
    public static ComponentClass = Sample;
    public get tooltip() {
        return new TooltipDriver(() => this.select('PORTAL_REF'));
    }
    public get anchor() {
        return this.select('TEST_ANCHOR');
    }
    public get tooltipBounds() {
        return getRect(this.tooltip.content);
    }
    public get anchorBounds() {
        return getRect(this.anchor);
    }
    public get tailBounds() {
        return getRect(this.tooltip.tail);
    }
    public dispatchOnAnchor(type: string) {
        this.anchor.dispatchEvent(createEvent(type));
    }
    public dispatchOutside(type: string) {
        window.dispatchEvent(createEvent(type));
    }
    public dispatchOnTooltip(type: string) {
        this.tooltip.content.dispatchEvent(createEvent(type));
    }
}

function renderWithProps(clientRenderer: ClientRenderer, props?: SampleProps) {
    const {driver} = clientRenderer.render(<Sample {...props}/>).withDriver(SampleDriver);
    return driver;
}

function equal(a: number, b: number) {
    return expect(Math.abs(a - b)).to.lte(0.5);
}

function testPosition(position: Position, expectations: any) {
    describe(`render with ${position} position`, () => {
        const clientRenderer = new ClientRenderer();
        afterEach(() => clientRenderer.cleanup());

        let driver: any;
        let tooltipBounds: any;
        let anchorBounds: any;
        let tailBounds: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {position, disableAutoPosition: true});
            tooltipBounds = driver.tooltipBounds;
            anchorBounds = driver.anchorBounds;
            tailBounds = driver.tailBounds;
        });

        if (expectations.positionTop) {
            it('should be on the top', () => {
                equal(anchorBounds.top, tooltipBounds.top + tooltipBounds.height - tooltipBounds.marginTop);
            });
        }
        if (expectations.positionBottom) {
            it('should be on the bottom', () => {
                equal(anchorBounds.top + anchorBounds.height, tooltipBounds.top - tooltipBounds.marginTop);
            });
        }
        if (expectations.positionLeft) {
            it('should be on the left', () => {
                equal(anchorBounds.left, tooltipBounds.left + tooltipBounds.width - tooltipBounds.marginLeft);
            });
        }

        if (expectations.centeredHorizontaly) {
            it('should be centered horizontally', () => {
                equal(anchorBounds.left + anchorBounds.width / 2, tooltipBounds.left + tooltipBounds.width / 2);
            });
            it('tail should be centered horizontally', () => {
                equal(anchorBounds.left + anchorBounds.width / 2, tailBounds.left + tailBounds.width / 2);
            });
        }

        if (expectations.centeredVerticaly) {
            it('should be centered vertically', () => {
                equal(anchorBounds.top + anchorBounds.height / 2, tooltipBounds.top + tooltipBounds.height / 2);
            });
            it('tail should be centered vertically', () => {
                equal(anchorBounds.top + anchorBounds.height / 2, tailBounds.top + tailBounds.height / 2);
            });
        }

        if (expectations.positionRight) {
            it('should be on the right', () => {
                equal(anchorBounds.left + anchorBounds.width, tooltipBounds.left - tooltipBounds.marginLeft);
            });
        }
        if (expectations.aligmnentLeft) {
            it('should be aligned to left', () => {
                equal(anchorBounds.left, tooltipBounds.left);
            });
            it('tail should be aligned to left', () => {
                equal(anchorBounds.left, tailBounds.left - TAIL_OFFSET);
            });
        }
        if (expectations.aligmnentRight) {
            it('should be aligned to right', () => {
                equal(anchorBounds.left + anchorBounds.width, tooltipBounds.left + tooltipBounds.width);
            });
            it('tail should be aligned to right', () => {
                equal(anchorBounds.left + anchorBounds.width, tailBounds.left + tailBounds.width + TAIL_OFFSET);
            });
        }
        if (expectations.aligmnentTop) {
            it('should be aligned to top', () => {
                equal(anchorBounds.top, tooltipBounds.top);
            });
            it('tail should be aligned to top', () => {
                equal(anchorBounds.top, tailBounds.top - TAIL_OFFSET);
            });
        }
        if (expectations.aligmnentBottom) {
            it('should be aligned to bottom', () => {
                equal(anchorBounds.top + anchorBounds.height, tooltipBounds.top + tooltipBounds.height);
            });
            it('tail should be aligned to bottom', () => {
                equal(anchorBounds.top + anchorBounds.height, tailBounds.top + tailBounds.height + TAIL_OFFSET);
            });
        }
    });
}

function testAutoPosition(style: React.CSSProperties, positionName: string, expectedPosition: Position) {
    describe(`render in ${positionName}`, () => {
        let driver: any;

        const clientRenderer = new ClientRenderer();
        afterEach(() => clientRenderer.cleanup());

        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {style});
        });

        it(`should have "${expectedPosition}" position`, () => {
            expect(driver.tooltip.position).to.equal(expectedPosition);
        });
    });
}

describe('<Tooltip/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    testPosition('top', {positionTop: true, centeredHorizontaly: true});
    testPosition('bottom', {positionBottom: true, centeredHorizontaly: true});
    testPosition('left', {positionLeft: true, centeredVerticaly: true});
    testPosition('right', {positionRight: true, centeredVerticaly: true});
    testPosition('topLeft', {positionTop: true, aligmnentLeft: true});
    testPosition('topRight', {positionTop: true, aligmnentRight: true});
    testPosition('bottomLeft', {positionBottom: true, aligmnentLeft: true});
    testPosition('bottomRight', {positionBottom: true, aligmnentRight: true});
    testPosition('leftTop', {positionLeft: true, aligmnentTop: true});
    testPosition('leftBottom', {positionLeft: true, aligmnentBottom: true});
    testPosition('rightTop', {positionRight: true, aligmnentTop: true});
    testPosition('rightBottom', {positionRight: true, aligmnentBottom: true});

    testAutoPosition({position: 'fixed', top: 0, left: 0}, 'top left corner', 'rightTop');
    testAutoPosition({position: 'fixed', top: 0, right: 0}, 'top right corner', 'bottomRight');
    testAutoPosition({position: 'fixed', bottom: 0, right: 0}, 'bottom right corner', 'topRight');
    testAutoPosition({position: 'fixed', bottom: 0, left: 0}, 'bottom left corner', 'topLeft');
    testAutoPosition({position: 'fixed', top: 0, left: '20%'}, 'top center', 'rightTop');
    testAutoPosition({position: 'fixed', top: '50%', right: 0}, 'right center', 'topRight');
    testAutoPosition({position: 'fixed', bottom: 0, left: '20%'}, 'bottom center', 'top');
    testAutoPosition({position: 'fixed', top: '50%', left: 0}, 'left center', 'topLeft');

    describe('render with showTrigger and hideTrigger (click)', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {open: false, showTrigger: 'click', hideTrigger: 'click'});
        });

        it('should not be visible by default', () => {
            expect(driver.tooltip.isOpen).to.be.false;
            expect(driver.tooltip.content).to.be.equal(null); // make sure tooltip is not rendered by default.
        });

        it('should be visible after click', () => {
            driver.dispatchOnAnchor('click');
            expect(driver.tooltip.isOpen).to.be.true;
        });

        it('should be hidden after click and click', () => {
            driver.dispatchOnAnchor('click');
            driver.dispatchOnAnchor('click');
            expect(driver.tooltip.isOpen).to.be.false;
        });

        it('should be hidden after click and then mousedown outside', () => {
            driver.dispatchOnAnchor('click');
            driver.dispatchOutside('mousedown');
            expect(driver.tooltip.isOpen).to.be.false;
        });

        it('should be visible after click and then mousedown on tooltip', () => {
            driver.dispatchOnAnchor('click');
            driver.dispatchOnTooltip('mousedown');
            expect(driver.tooltip.isOpen).to.be.true;
        });

        it('should be visible after click and then mousedown on anchor', () => {
            driver.dispatchOnAnchor('click');
            driver.dispatchOnAnchor('mousedown');
            expect(driver.tooltip.isOpen).to.be.true;
        });
    });

    describe('render two tooltips', () => {
        let tooltip1: TooltipDriver;
        let tooltip2: TooltipDriver;
        let anchor1: HTMLElement | null;
        let anchor2: HTMLElement | null;
        beforeEach(() => {
            const {select} = clientRenderer.render((
                <div>
                    <div data-automation-id="PAIR_1">
                        <div
                            data-automation-id="ANCHOR_1"
                            data-tooltip-for="double-tooltip-1"
                            children="I am an anchor!"
                            style={{width: 100}}
                        />
                        <Tooltip
                            id="double-tooltip-1"
                            data-automation-id="TOOLTIP_1"
                            children="I am a tooltip!"
                            showTrigger="click"
                            hideTrigger="click"
                        />
                    </div>
                    <div data-automation-id="PAIR_2">
                        <div
                            data-automation-id="ANCHOR_2"
                            data-tooltip-for="double-tooltip-2"
                            children="I am an anchor!"
                            style={{width: 100}}
                        />
                        <Tooltip
                            id="double-tooltip-2"
                            data-automation-id="TOOLTIP_2"
                            children="I am a tooltip!"
                            showTrigger="mousedown"
                            hideTrigger="click"
                        />
                    </div>
                </div>
            ));
            tooltip1 = new TooltipDriver(() => select('PAIR_1', 'PORTAL_REF') as HTMLElement);
            tooltip2 = new TooltipDriver(() => select('PAIR_2', 'PORTAL_REF') as HTMLElement);
            anchor1 = select('ANCHOR_1');
            anchor2 = select('ANCHOR_2');
        });

        it('mousedown on any anchor should close any open tooltip except own', () => {
            anchor1!.dispatchEvent(createEvent('click'));
            expect(tooltip1.isOpen).to.be.true;
            anchor2!.dispatchEvent(createEvent('mousedown'));
            expect(tooltip1.isOpen).to.be.false;
        });
    });

    describe('render with showDelay and hideDelay', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {open: false, showDelay: 100, hideDelay: 200});
        });

        it('should not be visible right after trigger', () => {
            driver.dispatchOnAnchor('mouseenter');
            expect(driver.tooltip.isOpen).to.be.false;
        });

        it('should be visible after delay', async () => {
            driver.dispatchOnAnchor('mouseenter');
            await sleep(120);
            expect(driver.tooltip.isOpen).to.be.true;
        });

        it('should be visible right after hide trigger', async () => {
            driver.dispatchOnAnchor('mouseenter');
            await sleep(120);
            driver.dispatchOnAnchor('mouseleave');
            expect(driver.tooltip.isOpen).to.be.true;
        });

        it('should not be visible after hide trigger and delay', async () => {
            driver.dispatchOnAnchor('mouseenter');
            await sleep(120);
            driver.dispatchOnAnchor('mouseleave');
            await sleep(220);
            expect(driver.tooltip.isOpen).to.be.false;
        });

        it('should not be visible after rapid triggers', async () => {
            driver.dispatchOnAnchor('mouseenter');
            driver.dispatchOnAnchor('mouseleave');
            await sleep(220);
            expect(driver.tooltip.isOpen).to.be.false;
        });
    });

});
