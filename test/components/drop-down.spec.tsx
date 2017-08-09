import * as React from 'react';
import { ClientRenderer, expect, simulate, sinon, waitFor } from 'test-drive-react';
import { DropDown } from '../../src';

const dropDown = 'DROP_DOWN';
const input = dropDown + '_INPUT';

describe('<DropDown />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('renders to the screen', () => {
        const { select, waitForDom } = clientRenderer.render(<DropDown />);

        return waitForDom(() => {
            expect(select(dropDown)).to.be.present();
            expect(select(dropDown)).to.have.text('Default Text');
        });
    });

    it('has correct selected item text', () => {
        const item = { label: 'Test'};
        const { select, waitForDom } = clientRenderer.render(<DropDown selectedItem={item}/>);

        return waitForDom(() => {
            expect(select(input)).to.be.present();
            expect(select(input)).to.have.text(item.label);
        });
    });

    it('invokes the onClick when dropdown label is clicked', () => {
        const onClick = sinon.spy();
        const { select } = clientRenderer.render(<DropDown onInputClick={onClick}/>);
        simulate.click(select(dropDown, input));
        return waitFor(() => expect(onClick).to.have.been.calledOnce);
    });
});
