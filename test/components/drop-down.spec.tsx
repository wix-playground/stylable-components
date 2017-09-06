import * as keycode from 'keycode';
import * as React from 'react';
import {selectDom} from 'test-drive';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {DropDownDemo} from '../../demo/components/drop-down.demo';
import {DropDown} from '../../src';

const dropDown = 'DROP_DOWN';
const dropDownDemo = dropDown + '_DEMO';
const input = dropDown + '_INPUT';

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
    const bodySelect = selectDom(document.body);

    const items = ['Muffins', 'Pancakes', 'Waffles'];

    it('renders a dropdown, opens it with a click, selects an item', async () => {
        const {select, waitForDom} = clientRenderer.render(<DropDownDemo />);

        await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());

        simulate.click(select(dropDownDemo, input));

        await waitForDom(() => expect(bodySelect('LIST')).to.be.present());

        simulate.click(bodySelect('LIST')!.children![0]);

        return waitForDom(() => {
            expect(bodySelect('LIST')).to.be.absent();
            expect(select(dropDownDemo)).to.have.text(items[0]);
        });
    });

    it('renders to the screen', () => {
        const {select, waitForDom} = clientRenderer.render(<DropDown />);

        return waitForDom(() => {
            expect(select(dropDown)).to.be.present();
            expect(select(dropDown)).to.have.text('Default Text');
        });
    });

    it('has correct selected item text', () => {
        const item = 'Test';
        const {select, waitForDom} = clientRenderer.render(<DropDown value={item}>{item}</DropDown>);

        return waitForDom(() => {
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

    it('calls onChange when focused and openOnFocus is true', async () => {
        const onChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(<DropDown openOnFocus onChange={onChange} />);

        simulate.focus(select(dropDown));

        await waitForDom(() => expect(onChange).to.have.been.calledOnce);
    });

    it('invokes the onClick when dropdown label is clicked', () => {
        const onClick = sinon.spy();
        const {select} = clientRenderer.render(<DropDown onChange={onClick}/>);
        simulate.click(select(dropDown, input));

        return waitFor(() => expect(onClick).to.have.been.calledOnce);
    });

    it('displays item list to choose from when open is true', () => {
        const {waitForDom} =
            clientRenderer.render(<DropDown open={true} dataSource={items} />);
        const dropDownList = bodySelect('LIST');

        return waitForDom(() => {
            expect(dropDownList).to.be.present();
            items.forEach((elem, idx) => {
                expect(dropDownList!.children[idx]).to.be.present();
                expect(dropDownList!.children[idx]).to.have.text(elem);
            });
        });
    });

    it('invokes onClick handler when an item is clicked', () => {
        const onClick = sinon.spy();

        clientRenderer.render(<DropDown open={true} dataSource={items} onChange={onClick}/>);
        const dropDownList = bodySelect('LIST');

        simulate.click(dropDownList!.children[0]);

        return waitFor(() => expect(onClick).to.have.been.calledWithMatch({value: items[0]}));
    });

    describe('Keyboard Navigation', () => {
        it('toggles visibility of selection list when SPACE is clicked', async () => {
            const {select, waitForDom} = clientRenderer.render(<DropDownDemo />);

            await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());

            simulate.focus(select(dropDownDemo, dropDown));
            simulate.keyDown(select(dropDownDemo, dropDown), {keyCode: KeyCodes.SPACE});

            await waitForDom(() => expect(bodySelect('LIST')).to.be.present());

            simulate.keyDown(select(dropDownDemo, dropDown), {keyCode: KeyCodes.SPACE});

            return waitForDom(() => expect(bodySelect('LIST')).to.be.absent());
        });

        it('closes selection list when ESC is clicked', async () => {
            const {select, waitForDom} = clientRenderer.render(<DropDownDemo />);

            await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());

            simulate.click(select(dropDownDemo, input));

            await waitForDom(() => expect(bodySelect('LIST')).to.be.present());

            simulate.keyDown(select(dropDownDemo, dropDown), {keyCode: KeyCodes.ESC});

            return waitForDom(() => expect(bodySelect('LIST')).to.be.absent());
        });

        it('opens selection list when DOWN is clicked and it is closed', async () => {
            const {select, waitForDom} = clientRenderer.render(<DropDownDemo />);

            await waitForDom(() => expect(bodySelect('LIST')).to.be.absent());

            simulate.focus(select(dropDownDemo, dropDown));
            simulate.keyDown(select(dropDownDemo, dropDown), {keyCode: KeyCodes.DOWN});

            return waitForDom(() => expect(bodySelect('LIST')).to.be.present());
        });
    });
});
