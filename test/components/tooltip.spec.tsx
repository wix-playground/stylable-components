import * as React from 'react';
import {ClientRenderer, DriverBase, expect} from 'test-drive-react';
import {Position, Tooltip, TooltipProps} from '../../src';
import {TooltipDriver} from '../../test-kit';
import {sleep} from '../utils';

function getRect(elem: Element) {
    const rect = elem.getBoundingClientRect();
    const styles = window.getComputedStyle(elem);
    return {
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        marginLeft: Number(styles.marginLeft!.slice(0, -2)),
        marginTop: Number(styles.marginTop!.slice(0, -2))
    };
}

class Sample extends React.Component {
    public render() {
        const id = 'id' + Math.random().toString().slice(2);
        return (
            <div>
                <div data-automation-id="TEST_ANCHOR" data-tooltip-for={id}/>
                <Tooltip id={id} children="I am a tooltip!" open {...this.props}/>
            </div>
        );
    }
}

class SampleDriver extends DriverBase {
    public static ComponentClass = Sample;
    public get tooltip() {
        return new TooltipDriver(() => this.select('PORTAL_REF')).content;
    }
    public get anchor() {
        return this.select('TEST_ANCHOR');
    }
    public get tooltipBounds() {
        return getRect(this.tooltip);
    }
    public get anchorBounds() {
        return getRect(this.anchor);
    }
    public dispatchOnAnchor(type: string) {
        this.anchor.dispatchEvent(new Event(type));
    }
}

function renderWithProps(clientRenderer: ClientRenderer, props?: Partial<TooltipProps>) {
    const {driver} = clientRenderer.render(<Sample {...props}/>).withDriver(SampleDriver);
    return driver;
}

function testPosition(clientRenderer: ClientRenderer, position: Position, expectations: any) {
    describe(`render with ${position} position`, () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {position});
        });

        if (expectations.positionTop) {
            it('should be on the top', () => {
                const tooltipBounds = driver.tooltipBounds;
                const anchorBounds = driver.anchorBounds;
                expect(anchorBounds.top).to.equal(tooltipBounds.top + tooltipBounds.height - tooltipBounds.marginTop);
            });
        }
        if (expectations.positionBottom) {
            it('should be on the bottom', () => {
                const tooltipBounds = driver.tooltipBounds;
                const anchorBounds = driver.anchorBounds;
                expect(anchorBounds.top + anchorBounds.height).to.equal(tooltipBounds.top - tooltipBounds.marginTop);
            });
        }
        if (expectations.positionLeft) {
            it('should be on the left', () => {
                const tooltipBounds = driver.tooltipBounds;
                const anchorBounds = driver.anchorBounds;
                expect(anchorBounds.left)
                    .to.equal(tooltipBounds.left + tooltipBounds.width - tooltipBounds.marginLeft);
            });
        }
        if (expectations.centeredHorizontaly) {
            it('should be centerd horizontaly', () => {
                const tooltipBounds = driver.tooltipBounds;
                const anchorBounds = driver.anchorBounds;
                expect(anchorBounds.left + anchorBounds.width / 2)
                    .to.equal(tooltipBounds.left + tooltipBounds.width / 2);
            });
        }
        if (expectations.centeredVerticaly) {
            it('should be centerd verticaly', () => {
                const tooltipBounds = driver.tooltipBounds;
                const anchorBounds = driver.anchorBounds;
                expect(anchorBounds.top + anchorBounds.height / 2)
                    .to.equal(tooltipBounds.top + tooltipBounds.height / 2);
            });
        }
        if (expectations.positionRight) {
            it('should be on the right', () => {
                const tooltipBounds = driver.tooltipBounds;
                const anchorBounds = driver.anchorBounds;
                expect(anchorBounds.left + anchorBounds.width)
                    .to.equal(tooltipBounds.left - tooltipBounds.marginLeft);
            });
        }
        if (expectations.aligmnentLeft) {
            it('should be alignet to left', () => {
                const tooltipBounds = driver.tooltipBounds;
                const anchorBounds = driver.anchorBounds;
                expect(anchorBounds.left).to.equal(tooltipBounds.left);
            });
        }
        if (expectations.aligmnentRight) {
            it('should be alignet to right', () => {
                const tooltipBounds = driver.tooltipBounds;
                const anchorBounds = driver.anchorBounds;
                expect(anchorBounds.left + anchorBounds.width).to.equal(tooltipBounds.left + tooltipBounds.width);
            });
        }
        if (expectations.aligmnentTop) {
            it('should be alignet to top', () => {
                const tooltipBounds = driver.tooltipBounds;
                const anchorBounds = driver.anchorBounds;
                expect(anchorBounds.top).to.equal(tooltipBounds.top);
            });
        }
        if (expectations.aligmnentBottom) {
            it('should be alignet to bottom', () => {
                const tooltipBounds = driver.tooltipBounds;
                const anchorBounds = driver.anchorBounds;
                expect(anchorBounds.top + anchorBounds.height).to.equal(tooltipBounds.top + tooltipBounds.height);
            });
        }
    });
}

describe.only('<Tooltip/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    testPosition(clientRenderer, 'top', {positionTop: true, centeredHorizontaly: true});
    testPosition(clientRenderer, 'bottom', {positionBottom: true, centeredHorizontaly: true});
    testPosition(clientRenderer, 'left', {positionLeft: true, centeredVerticaly: true});
    testPosition(clientRenderer, 'right', {positionRight: true, centeredVerticaly: true});
    testPosition(clientRenderer, 'topLeft', {positionTop: true, aligmnentLeft: true});
    testPosition(clientRenderer, 'topRight', {positionTop: true, aligmnentRight: true});
    testPosition(clientRenderer, 'bottomLeft', {positionBottom: true, aligmnentLeft: true});
    testPosition(clientRenderer, 'bottomRight', {positionBottom: true, aligmnentRight: true});
    testPosition(clientRenderer, 'leftTop', {positionLeft: true, aligmnentTop: true});
    testPosition(clientRenderer, 'leftBottom', {positionLeft: true, aligmnentBottom: true});
    testPosition(clientRenderer, 'rightTop', {positionRight: true, aligmnentTop: true});
    testPosition(clientRenderer, 'rightBottom', {positionRight: true, aligmnentBottom: true});

    describe('render with showTrigger and hideTrigger (click)', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {open: false, showTrigger: 'click', hideTrigger: 'click'});
        });

        it('should not be visible by default', () => {
            expect(driver.tooltip.offsetParent).to.be.null;
        });

        it('should be visible after click', () => {
            driver.dispatchOnAnchor('click');
            expect(driver.tooltip.offsetParent).to.not.null;
        });

        it('should be hidden after click and click', () => {
            driver.dispatchOnAnchor('click');
            driver.dispatchOnAnchor('click');
            expect(driver.tooltip.offsetParent).to.be.null;
        });
    });

    describe('render with showDelay and hideDelay', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {open: false, showDelay: 100, hideDelay: 200});
        });

        it('should not be visible right after trigger', () => {
            driver.dispatchOnAnchor('mouseenter');
            expect(driver.tooltip.offsetParent).to.be.null;
        });

        it('should be visible after delay', async () => {
            driver.dispatchOnAnchor('mouseenter');
            await sleep(120);
            expect(driver.tooltip.offsetParent).to.not.null;
        });

        it('should be visible right after hide trigger', async () => {
            driver.dispatchOnAnchor('mouseenter');
            await sleep(120);
            driver.dispatchOnAnchor('mouseleave');
            expect(driver.tooltip.offsetParent).to.not.null;
        });

        it('should not be visible after hide trigger and delay', async () => {
            driver.dispatchOnAnchor('mouseenter');
            await sleep(120);
            driver.dispatchOnAnchor('mouseleave');
            await sleep(220);
            expect(driver.tooltip.offsetParent).to.be.null;
        });

        it('should not be visible after rapid triggers', async () => {
            driver.dispatchOnAnchor('mouseenter');
            driver.dispatchOnAnchor('mouseleave');
            await sleep(220);
            expect(driver.tooltip.offsetParent).to.be.null;
        });
    });
});
