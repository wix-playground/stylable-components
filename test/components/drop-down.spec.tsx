import * as keycode from 'keycode';
import * as React from 'react';
import {selectDom} from 'test-drive';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {DropDownDemo} from '../../demo/components/drop-down.demo';
import {DropDown} from '../../src';

const dropDown = 'DROP_DOWN';
const dropDownDemo = dropDown + '_DEMO';
const input = dropDown + '_INPUT';

describe('<DropDown />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());
    const bodySelect = selectDom(document.body);

    const items = ['Muffins', 'Pancakes', 'Waffles'];

    it('renders a dropdown, opens it with a click, selects an item', async () => {
        const {select, waitForDom} = clientRenderer.render(<DropDownDemo />);

        await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());

        simulate.click(select(dropDownDemo, input));

        await waitForDom(() => expect(bodySelect('LIST')).to.be.present());

        simulate.click(bodySelect('LIST')!.children![0]);

        await waitForDom(() => {
            expect(bodySelect('LIST')).to.be.absent();
            expect(select(dropDownDemo)).to.have.text(items[0]);
        });
    });

    it('renders to the screen', async () => {
        const {select, waitForDom} = clientRenderer.render(<DropDown />);

        await waitForDom(() => {
            expect(select(dropDown)).to.be.present();
            expect(select(dropDown)).to.have.text('Default Text');
        });
    });

    it('has correct selected item text', async () => {
        const item = 'Test';
        const {select, waitForDom} = clientRenderer.render(<DropDown value={item}>{item}</DropDown>);

        await waitForDom(() => {
            expect(select(input)).to.be.present();
            expect(select(input)).to.have.text(item);
        });
    });

    it('doesn\'t open the dropdown if disabled', async () => {
        const {waitForDom, container} = clientRenderer.render(<DropDown open disabled />);

        await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());

        clientRenderer.render(<DropDown open />, container);

        await waitForDom(() => expect(bodySelect('LIST')).to.be.present());
    });

    it('opens the dropdown when focused and openOnFocus is true', async () => {
        const onChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(<DropDown openOnFocus onChange={onChange} />);

        simulate.focus(select(dropDown));

        await waitForDom(() => expect(bodySelect('LIST')).to.be.present());
    });

    it('toggles between dropdown visibility when the input is clicked', async () => {
        const onClick = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(<DropDown />);

        await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());

        simulate.click(select(dropDown, input));

        await waitForDom(() => expect(bodySelect('LIST')).to.be.present());

        simulate.click(select(dropDown, input));

        await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());\
    });

    it('displays item list to choose from when open is true', async () => {
        const {waitForDom} =
            clientRenderer.render(<DropDown open={true} dataSource={items} />);
        const dropDownList = bodySelect('LIST');

        await waitForDom(() => {
            expect(dropDownList).to.be.present();
            items.forEach((elem, idx) => {
                expect(dropDownList!.children[idx]).to.be.present();
                expect(dropDownList!.children[idx]).to.have.text(elem);
            });
        });
    });

    it('invokes onClick handler when an item is clicked', async () => {
        const onClick = sinon.spy();

        clientRenderer.render(<DropDown open={true} dataSource={items} onChange={onClick}/>);
        const dropDownList = bodySelect('LIST');

        simulate.click(dropDownList!.children[0]);

        await waitFor(() => expect(onClick).to.have.been.calledWithMatch({value: items[0]}));
    });

    describe('Keyboard Navigation', () => {
        it('toggles visibility of selection list when SPACE is clicked', async () => {
            const {select, waitForDom} = clientRenderer.render(<DropDownDemo />);

            await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());

            simulate.focus(select(dropDownDemo, dropDown));
            simulate.keyDown(select(dropDownDemo, dropDown), {keyCode: keycode('space')});

            await waitForDom(() => expect(bodySelect('LIST')).to.be.present());

            simulate.keyDown(select(dropDownDemo, dropDown), {keyCode: keycode('space')});

            await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());
        });

        it('closes selection list when ESC is clicked', async () => {
            const {select, waitForDom} = clientRenderer.render(<DropDownDemo />);

            await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());

            simulate.click(select(dropDownDemo, input));

            await waitForDom(() => expect(bodySelect('LIST')).to.be.present());

            simulate.keyDown(select(dropDownDemo, dropDown), {keyCode: keycode('esc')});

            await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());
        });

        it('opens selection list when DOWN is clicked and it is closed', async () => {
            const {select, waitForDom} = clientRenderer.render(<DropDownDemo />);

            await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());

            simulate.focus(select(dropDownDemo, dropDown));
            simulate.keyDown(select(dropDownDemo, dropDown), {keyCode: keycode('down')});

            await waitForDom(() => expect(bodySelect('LIST')).to.be.present());
        });
    });
});
