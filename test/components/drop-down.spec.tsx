import * as React from 'react';
import { ClientRenderer, expect, simulate, sinon, waitFor } from 'test-drive-react';
import { DropDown } from '../../src';

const dropDown = 'DROP_DOWN';

describe('<DropDown />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('renders to the screen', () => {
       const { select, waitForDom } = clientRenderer.render(<DropDown />);
       return waitForDom(() => expect(select(dropDown)).to.be.present());
    });
});
