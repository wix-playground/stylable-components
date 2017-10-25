import * as React from 'react';
import {ClientRenderer, DriverBase, expect} from 'test-drive-react';
import {Tooltip, TooltipProps} from '../../src';
import {TooltipDriver} from '../../test-kit';

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
        return new TooltipDriver(() => this.select('PORTAL_REF'));
    }
    public get anchor() {
        return this.select('TEST_ANCHOR');
    }
    public get tooltipBounds() {
        return this.tooltip.content.getBoundingClientRect();
    }
    public get anchorBounds() {
        return this.anchor.getBoundingClientRect();
    }
    public get tooltipOffset() {
        // TODO make this smarter;
        return 5;
    }
}

function renderWithProps(clientRenderer: ClientRenderer, props?: Partial<TooltipProps>) {
    const {driver} = clientRenderer.render(<Sample {...props}/>).withDriver(SampleDriver);
    return driver;
}

describe.only('<Tooltip/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('render without props', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer);
        });

        it('should be alignet to top', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            expect(anchorBounds.top).to.equal(tooltipBounds.top + tooltipBounds.height + driver.tooltipOffset);
        });

        it('should be centerd horizontaly', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            expect(anchorBounds.left + anchorBounds.width / 2).to.equal(tooltipBounds.left + tooltipBounds.width / 2);
        });
    });

    describe('render with bottom position', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {position: 'bottom'});
        });

        it('should be alignet to top', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            expect(anchorBounds.top + anchorBounds.height).to.equal(tooltipBounds.top - driver.tooltipOffset);
        });

        it('should be centerd horizontaly', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            expect(anchorBounds.left + anchorBounds.width / 2).to.equal(tooltipBounds.left + tooltipBounds.width / 2);
        });
    });

    describe('render with left position', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {position: 'left'});
        });

        it('should be alignet to left', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            expect(anchorBounds.left).to.equal(tooltipBounds.left + tooltipBounds.width + driver.tooltipOffset);
        });

        it('should be centerd verticaly', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            expect(anchorBounds.top + anchorBounds.height / 2).to.equal(tooltipBounds.top + tooltipBounds.height / 2);
        });
    });

    describe('render with right position', () => {
        let driver: any;
        beforeEach(() => {
            driver = renderWithProps(clientRenderer, {position: 'right'});
        });

        it('should be alignet to left', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            expect(anchorBounds.left + anchorBounds.width).to.equal(tooltipBounds.left - driver.tooltipOffset);
        });

        it('should be centerd verticaly', () => {
            const tooltipBounds = driver.tooltipBounds;
            const anchorBounds = driver.anchorBounds;
            expect(anchorBounds.top + anchorBounds.height / 2).to.equal(tooltipBounds.top + tooltipBounds.height / 2);
        });
    });
});
