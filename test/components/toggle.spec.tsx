import * as React from 'react';
import {expect, ClientRenderer, sinon, simulate, waitFor} from 'test-drive-react';

import {Toogle} from '../../src';

describe('<Toggle/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('render without options', () => {
        const {select, waitForDom} = clientRenderer.render(<Toogle/>)
        it('should have input', () => {
            return waitForDom(() => expect(select('TOGGLE_INPUT')).to.not.null);
        })
        it('should render default unchecked icon', () => {
            return waitForDom(() => expect(select('TOGGLE_UNCHECKED_ICON')).to.not.null);
        })
        it('should not render default checked icon', () => {
            return waitForDom(() => expect(select('TOGGLE_CHECKED_ICON')).to.null);
        })
    })

    describe('render with checked={true}', () => {
        const {select, waitForDom} = clientRenderer.render(<Toogle checked/>)
        it('should not render default unchecked icon', () => {
            return waitForDom(() => expect(select('TOGGLE_UNCHECKED_ICON')).to.null);
        })
        it('should not render default checked icon', () => {
            return waitForDom(() => expect(select('TOGGLE_CHECKED_ICON')).to.not.null);
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

        it('pressing space on focus should trigger onChange', () => {
            const input = renderer.select('TOGGLE_INPUT');
            simulate.focus(input)
            simulate.keyPress(input, {keyCode: 13})
            simulate.keyPress(input, {keyCode: 32})
            simulate.keyUp(input, {keyCode: 32})
            simulate.keyUp(input, {keyCode: 13})
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithExactly(true);
        })
    })

});
