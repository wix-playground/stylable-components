import * as React from 'react';
import * as keycode from 'keycode';
import { ClientRenderer, expect, simulate, sinon, waitFor } from 'test-drive-react';
import { DropDown } from '../../src';
import { DropDownDemo } from '../../demo/components/drop-down.demo';

const dropDown = 'DROP_DOWN';
const dropDownDemo = dropDown + '_DEMO';
const input = dropDown + '_INPUT';
const list = dropDown + '_LIST';

const KeyCodes: any = {
    ENTER: keycode('enter'),
    UP: keycode('up'),
    DOWN: keycode('down'),
    SPACE: keycode('space'),
    ESC: keycode('escape')
};

describe('<DropDown />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    const items = [
        { label: 'Muffins' },
        { label: 'Pancakes' },
        { label: 'Waffles' }
    ];

    it('renders a dropdown, opens it with a click, selects an item', async () => {
        const { select, waitForDom } = clientRenderer.render(<DropDownDemo />);

        await waitForDom(() => expect(select(dropDownDemo, list)).to.be.absent());

        simulate.click(select(dropDownDemo, input));

        await waitForDom(() => expect(select(dropDownDemo, list)).to.be.present());

        simulate.click(select(dropDownDemo, list)!.children![0].children[0]);

        return waitForDom(() => {
            expect(select(dropDownDemo, list)).to.be.absent();
            expect(select(dropDownDemo)).to.have.text(items[0].label);
        });
    });

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

    it('invokes onClick handler when an item is clicked', () => {
        const onClick = sinon.spy();

        const { select } =
            clientRenderer.render(<DropDown selectedItem={undefined} open={true} items={items} onItemClick={onClick}/>);
        const dropDownList = select(dropDown, list, 'LIST');

        simulate.click(dropDownList!.children[0]);

        return waitFor(() => expect(onClick).to.have.been.calledWithMatch(items[0]));
    });

    describe('Keyboard Navigation', () => {
        it('toggles visibility of selection list when SPACE is clicked', async () => {
            const { select, waitForDom } = clientRenderer.render(<DropDownDemo />);

            await waitForDom(() => expect(select(dropDownDemo, list)).to.be.absent());

            simulate.focus(select(dropDownDemo, dropDown));
            simulate.keyDown(select(dropDownDemo, dropDown), { keyCode: KeyCodes.SPACE });

            await waitForDom(() => expect(select(dropDownDemo, list)).to.be.present());

            simulate.keyDown(select(dropDownDemo, dropDown), { keyCode: KeyCodes.SPACE });

            return waitForDom(() => expect(select(dropDownDemo, list)).to.be.absent());
        });

        it('closes selection list when ESC is clicked', async () => {
            const { select, waitForDom } = clientRenderer.render(<DropDownDemo />);

            await waitForDom(() => expect(select(dropDownDemo, list)).to.be.absent());

            simulate.click(select(dropDownDemo, input));

            await waitForDom(() => expect(select(dropDownDemo, list)).to.be.present());

            simulate.keyDown(select(dropDownDemo, dropDown), { keyCode: KeyCodes.ESC });

            return waitForDom(() => expect(select(dropDownDemo, list)).to.be.absent());
        });

        it('opens selection list when DOWN is clicked and it is closed', async () => {
            const { select, waitForDom } = clientRenderer.render(<DropDownDemo />);

            await waitForDom(() => expect(select(dropDownDemo, list)).to.be.absent());

            simulate.focus(select(dropDownDemo, dropDown));
            simulate.keyDown(select(dropDownDemo, dropDown), { keyCode: KeyCodes.DOWN });

            return waitForDom(() => expect(select(dropDownDemo, list)).to.be.present());
        });

        it('closes selection list when UP is clicked if first item is focused', async () => {
            const { select, waitForDom } = clientRenderer.render(<DropDownDemo />);

            await waitForDom(() => expect(select(dropDownDemo, list)).to.be.absent());

            simulate.click(select(dropDownDemo, input));

            await waitForDom(() => expect(select(dropDownDemo, list)).to.be.present());

            // the additional click is because after we click the first child
            // the list closes automatically
            simulate.click(select(dropDownDemo, list)!.children![0].children[0]);
            simulate.click(select(dropDownDemo, input));

            simulate.keyDown(select(dropDownDemo, dropDown), { keyCode: KeyCodes.UP });

            return waitForDom(() => expect(select(dropDownDemo, list)).to.be.absent());
        });
    });
});
