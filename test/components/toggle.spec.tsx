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

    describe('render with custom icons', () => {
        it('unchecked should have custom iconUnchecked', () => {
            const onChange = sinon.spy();
            const renderer = clientRenderer.render(
                <Toogle
                    onChange={onChange}
                    iconChecked={<div data-automation-id='TEST_ICON_CHECKED'/>}
                    iconUnchecked={<div data-automation-id='TEST_ICON_UNCHECKED'/>}
                />
            )
            expect(renderer.select('TEST_ICON_UNCHECKED')).to.not.null;
            expect(renderer.select('TEST_ICON_CHECKED')).to.be.null;
        })

        it('unchecked should have custom iconChecked', () => {
            const onChange = sinon.spy();
            const renderer = clientRenderer.render(
                <Toogle
                    checked
                    onChange={onChange}
                    iconChecked={<div data-automation-id='TEST_ICON_CHECKED'/>}
                    iconUnchecked={<div data-automation-id='TEST_ICON_UNCHECKED'/>}
                />
            )
            expect(renderer.select('TEST_ICON_CHECKED')).to.not.null;
            expect(renderer.select('TEST_ICON_UNCHECKED')).to.be.null;
        })
    })

});
