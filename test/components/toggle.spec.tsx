import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon} from 'test-drive-react';

import {ToggleDemo} from '../../demo/components/toggle-demo';
import {Toggle} from '../../src';
import styles from '../../src/components/toggle/toggle.st.css';
import {ToggleDriver} from '../../test-kit';
import {hasCssState} from '../utils';

xdescribe('<Toggle/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('render without options', () => {
        let onChange: any;
        let renderer: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange}/>).withDriver(ToggleDriver);
        });
        it('should have input', () => {
            expect(renderer.driver.nativeInput).to.not.null;
        });
    });

    describe('render with value={true}', () => {
        let onChange: any;
        let renderer: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange} value={true}/>).withDriver(ToggleDriver);
        });
        it('should have input', () => {
            expect(renderer.driver.nativeInput).to.not.null;
        });
    });

    describe('render with onChange', () => {
        let onChange: any;
        let renderer: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange}/>).withDriver(ToggleDriver);
        });

        it('pressing space on focused input should trigger onChange', () => {
            renderer.driver.click();
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithExactly({value: true});
        });
    });

    describe('render with disabled={true}', () => {
        let onChange: any;
        let renderer: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange} disabled/>).withDriver(ToggleDriver);
        });
        it('should not have input underhood', () => {
            expect(renderer.driver.nativeInput).to.be.null;
        });

        it('click should not trigger onChange', async () => {
            renderer.driver.click();
            await new Promise(resolve => setTimeout(resolve, 500));
            expect(onChange).to.not.have.been.called;
        });
    });

    describe('render <ToggleDemo/>', () => {
        let renderer: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<ToggleDemo/>);
        });

        describe('contorolled toggle', () => {
            let toggle: any;
            beforeEach(() => {
                toggle = renderer.select('TOGGLE_DEMO_CONTROLLED', 'TOGGLE');
            });
            it('should render toggle', () => {
                expect(toggle).to.not.null;
            });
            it('should be unchecked', () => {
                hasCssState(toggle, styles, {checked: false});
            });
            it('should be checked after click', () => {
                simulate.change(toggle.querySelector('input'));
                hasCssState(toggle, styles, {checked: true});
            });
        });

        describe('readonly toggle', () => {
            let toggle: any;
            beforeEach(() => {
                toggle = renderer.select('TOGGLE_DEMO_UNCONTROLLED', 'TOGGLE');
            });
            it('should render toggle', () => {
                expect(toggle).to.not.null;
            });
            it('should be unchecked', () => {
                hasCssState(toggle, styles, {checked: false});
            });
            it('should be unchecked after click', () => {
                simulate.change(toggle.querySelector('input'));
                hasCssState(toggle, styles, {checked: false});
            });
        });
    });

});
