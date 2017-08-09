import * as React from 'react';
import { ClientRenderer, expect, simulate, sinon, waitFor } from 'test-drive-react';
import { DropDown, dropDownDefaultText } from '../../src';

const dropDown = 'DROP_DOWN';
const input = dropDown + '_INPUT';
const list = dropDown + '_LIST';

describe('<DropDown />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    const item = { label: 'Test' };

    const items = [
        { label: 'Muffins' },
        { label: 'Pancakes' },
        { label: 'Waffles' }
    ];

    it('renders to the screen', () => {
        const { select, waitForDom } = clientRenderer.render(<DropDown />);

        return waitForDom(() => {
            expect(select(dropDown)).to.be.present();
            expect(select(dropDown)).to.have.text(dropDownDefaultText);
        });
    });

    it('has correct selected item text', () => {
        const { select, waitForDom } = clientRenderer.render(<DropDown selectedItem={item}/>);

        return waitForDom(() => {
            expect(select(input)).to.be.present();
            expect(select(input)).to.have.text(item.label);
        });
    });

    it('invokes the onClick when dropdown label is clicked', () => {
        const onClick = sinon.spy();
        const { select } = clientRenderer.render(<DropDown selectedItem={item} onLabelClick={onClick} items={[]}/>);

        simulate.click(select(dropDown, input));

        return waitFor(() => expect(onClick).to.have.been.calledOnce);
    });

    it('displays item list to choose from when open is true', () => {
        const { select, waitForDom } =
            clientRenderer.render(<DropDown selectedItem={undefined} open={true} items={items} />);
        const dropDownList = select(dropDown, list, 'LIST');
        return waitForDom(() => {
            expect(dropDownList).to.be.present();
            items.forEach((elem, idx) => {
                expect(dropDownList!.children[idx]).to.be.present();
                expect(dropDownList!.children[idx]).to.have.text(elem.label);
            });
        });
    });
});
