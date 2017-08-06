import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';

import {ToggleDemo} from '../../demo/components/toggle-demo';
import {Toggle} from '../../src';
import styles from '../../src/components/toggle/toggle.st.css';
import {hasCssState} from '../utils/has-css-state';

describe('<Toggle/>', function() {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('render without options', function() {
        let onChange: any;
        let renderer: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange}/>);
        });
        it('should have input', function() {
            expect(renderer.select('TOGGLE_INPUT')).to.not.null;
        });
    });

    describe('render with checked={true}', function() {
        let onChange: any;
        let renderer: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange} checked/>);
        });
        it('should have input', function() {
            expect(renderer.select('TOGGLE_INPUT')).to.not.null;
        });
    });

    describe('render with onChange', function() {
        let onChange: any;
        let renderer: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange}/>);
        });

        it('pressing space on focused input should trigger onChange', function() {
            const input = renderer.select('TOGGLE_INPUT');
            simulate.focus(input);
            simulate.change(input);
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithExactly(true);
        });
    });

    describe('render with disabled={true}', function() {
        let onChange: any;
        let renderer: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toggle onChange={onChange} disabled/>);
        });
        it('should not have input underhood', function() {
            expect(renderer.select('TOGGLE_INPUT')).to.be.null;
        });

        it('click should not trigger onChange', async function()  {
            simulate.click(renderer.select('TOGGLE'));
            await new Promise(resolve => setTimeout(resolve, 500));
            expect(onChange).to.not.have.been.called;
        });
    });

    describe('render <ToggleDemo/>', function() {
        let renderer: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<ToggleDemo/>);
        });

        describe('contorolled toggle', function() {
            let toggle: any;
            beforeEach(() => {
                toggle = renderer.select('TOGGLE_DEMO_CONTROLLED', 'TOGGLE');
            });
            it('should render toggle', function() {
                expect(toggle).to.not.null;
            });
            it('should be unchecked', function() {
                hasCssState(toggle, styles, {checked: false});
            });
            it('should be checked after click', function() {
                simulate.change(toggle.querySelector('input'));
                hasCssState(toggle, styles, {checked: true});
            });
        });

        describe('readonly toggle', function() {
            let toggle: any;
            beforeEach(() => {
                toggle = renderer.select('TOGGLE_DEMO_UNCONTROLLED', 'TOGGLE');
            });
            it('should render toggle', function() {
                expect(toggle).to.not.null;
            });
            it('should be unchecked', function() {
                hasCssState(toggle, styles, {checked: false});
            });
            it('should be unchecked after click', function() {
                simulate.change(toggle.querySelector('input'));
                hasCssState(toggle, styles, {checked: false});
            });
        });
    });

});
