import * as React from 'react';
import { ClientRenderer, expect, simulate, sinon, waitFor } from 'test-drive-react';
import { DropDown } from '../../src';

const dropDown = 'DROP_DOWN';
const label = dropDown + '_LABEL';

describe('<DropDown />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    const item = { label: 'Test' };

    const items = [
        { label: 'Test1' },
        { label: 'Test2' },
        { label: 'Test3' }
    ];

    it('renders to the screen', () => {
       const { select, waitForDom } = clientRenderer.render(<DropDown selectedItem={item} />);
       return waitForDom(() => expect(select(dropDown)).to.be.present());
    });

    it('has default text initially', () => {
        const { select, waitForDom } = clientRenderer.render(<DropDown selectedItem={item}/>);
        return waitForDom(() => expect(select(dropDown, label)).to.be.present());
    });

    it('invokes the onClick when dropdown label is clicked', () => {
        const onClick = sinon.spy();
        const { select } = clientRenderer.render(<DropDown selectedItem={item} onLabelClick={onClick}/>);
        simulate.click(select(dropDown, label));
        return waitFor(() => expect(onClick).to.have.been.calledOnce);
    });

    it('displays item list to choose from when open is true', () => {
        // const { select, waitForDom } = clientRenderer.render(<DropDown selectedItem={undefined} open={true} items={items} />);
        // return waitForDom(() => {});
    });
});
