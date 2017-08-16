import * as React from 'react';
import { ClientRenderer, expect, simulate, sinon, waitFor } from 'test-drive-react';
import { AutoComplete } from '../../src';

const autoComp = 'AUTO_COMPLETE';
const input = autoComp + '_INPUT';

describe('<AutoComplete />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('renders to the screen', () => {
        const { select, waitForDom } = clientRenderer.render(<AutoComplete />);

        return waitForDom(() => expect(select(autoComp)).to.be.present());
    });

    it('invokes the onChange when text is entered to label', () => {
        const onChange = sinon.spy();
        const { select } = clientRenderer.render(<AutoComplete onChange={onChange}/>);

        (select(autoComp, input) as HTMLInputElement).value = 'abc';
        simulate.change(select(autoComp, input));

        return waitFor(() => expect(onChange).to.have.been.calledWithMatch('abc'));
    });
});
