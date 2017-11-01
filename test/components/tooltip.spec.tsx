import * as React from 'react';
import {ClientRenderer, DriverBase, expect} from 'test-drive-react';
import {Tooltip, TooltipProps} from '../../src';
import {TooltipDriver} from '../../test-kit';
import {sleep} from '../utils';

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
        return this.tooltip.getBoundingClientRect();
    }
    public get anchorBounds() {
        return this.anchor.getBoundingClientRect();
    }
    public dispatchOnAnchor(type: string) {
        this.anchor.dispatchEvent(new Event(type));
    }
    public get tooltipMargins() {
        const styles = window.getComputedStyle(this.tooltip);
        return {
            left: Number(styles.marginLeft!.slice(0, -2)),
            top: Number(styles.marginTop!.slice(0, -2))
        };
    }
}

function renderWithProps(clientRenderer: ClientRenderer, props?: Partial<TooltipProps>) {
    const {driver} = clientRenderer.render(<Sample {...props}/>).withDriver(SampleDriver);
    return driver;
}

function equal(a: number, b: number) {
    return expect(Math.abs(a - b)).to.below(0.01);
}

describe.only('<Tooltip/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('render without props', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer);
        });

        it('should be aligned to top', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            equal(anchorBounds.top, tooltipBounds.top + tooltipBounds.height - driver.tooltipMargins.top);
        });

        it('should be centerd horizontaly', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            equal(anchorBounds.left + anchorBounds.width / 2, tooltipBounds.left + tooltipBounds.width / 2);
        });
    });

    describe('render with bottom position', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {position: 'bottom'});
        });

        it('should be aligned to top', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            equal(anchorBounds.top + anchorBounds.height, tooltipBounds.top - driver.tooltipMargins.top);
        });

        it('should be centerd horizontaly', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            equal(anchorBounds.left + anchorBounds.width / 2, tooltipBounds.left + tooltipBounds.width / 2);
        });
    });

    describe('render with left position', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {position: 'left'});
        });

        it('should be aligned to left', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            equal(anchorBounds.left, tooltipBounds.left + tooltipBounds.width - driver.tooltipMargins.left);
        });

        it('should be centered verticaly', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            equal(anchorBounds.top + anchorBounds.height / 2, tooltipBounds.top + tooltipBounds.height / 2);
        });
    });

    describe('render with right position', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {position: 'right'});
        });

        it('should be aligned to left', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            equal(anchorBounds.left + anchorBounds.width, tooltipBounds.left - driver.tooltipMargins.left);
        });

        it('should be centered verticaly', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            equal(anchorBounds.top + anchorBounds.height / 2, tooltipBounds.top + tooltipBounds.height / 2);
        });
    });

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
