import * as React from 'react';
import {expect, ClientRenderer, sinon, simulate, waitFor} from 'test-drive-react';

import {Toogle} from '../../src';

describe('<Toggle/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('render without options', () => {
        let onChange: any
        let renderer: any
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toogle onChange={onChange}/>)
        })
        it('should have input', () => {
            expect(renderer.select('TOGGLE_INPUT')).to.not.null
        })
        it('should have default unchecked icon', () => {
            expect(renderer.select('TOGGLE_UNCHECKED_ICON')).to.not.null
        })
        it('should not have default checked icon', () => {
            expect(renderer.select('TOGGLE_CHECKED_ICON')).to.be.null
        })
    })

    describe('render with checked={true}', () => {
        let onChange: any
        let renderer: any
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toogle onChange={onChange} checked/>)
        })
        it('should have input', () => {
            expect(renderer.select('TOGGLE_INPUT')).to.not.null
        })
        it('should have default checked icon', () => {
            expect(renderer.select('TOGGLE_CHECKED_ICON')).to.not.null
        })
        it('should not have default unchecked icon', () => {
            expect(renderer.select('TOGGLE_UNCHECKED_ICON')).to.be.null
        })
    })

    describe('render with onChange', () => {
        let onChange: any
        let renderer: any
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toogle onChange={onChange}/>)
        })

        it('click should trigger onChange', () => {
            simulate.click(renderer.select('TOGGLE'))
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithExactly(true);
        })

        it('pressing space on focused input should trigger onChange', () => {
            const input = renderer.select('TOGGLE_INPUT');
            simulate.focus(input)
            simulate.click(input)
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithExactly(true);
        })
    })

    describe('render with disabled={true}', () => {
        let onChange: any
        let renderer: any
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<Toogle onChange={onChange} disabled/>)
        })
        it('should not have input underhood', () => {
            expect(renderer.select('TOGGLE_INPUT')).to.be.null;
        })

        it('click should not trigger onChange', () => {
            simulate.click(renderer.select('TOGGLE'))
            expect(onChange).to.not.have.been.called;
        })
    })

});
