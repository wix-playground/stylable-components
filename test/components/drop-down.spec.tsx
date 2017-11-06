import * as keycode from 'keycode';
import * as React from 'react';
import {ClientRenderer, DriverBase, expect, sinon, waitFor} from 'test-drive-react';
import {DropDownDemo} from '../../demo/components/drop-down.demo';
import {DropDown} from '../../src';
import {DropDownDriver} from '../../test-kit';
import {WithTheme, WithThemeDAID} from '../utils';

class DropDownDemoDriver extends DriverBase {
    public static ComponentClass = DropDownDemo;

    public dropdown = new DropDownDriver(() => this.select('DROP_DOWN_DEMO', 'DROP_DOWN'));

    public text(): string | null {
        return this.select('DROP_DOWN_DEMO').textContent;
    }
}

xdescribe('<DropDown />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    const items = ['Muffins', 'Pancakes', 'Waffles'];

    it('renders a dropdown, opens it with a click, selects an item', async () => {
        const {driver: demo, waitForDom} = clientRenderer.render(
            <DropDownDemo />
        ).withDriver(DropDownDemoDriver);

        const dropdown = demo.dropdown;

        await waitForDom(() => expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false));

        dropdown.clickOnDropDown();

        await waitForDom(() => expect(dropdown.isOpen(), 'expected list to be open').to.equal(true));

        dropdown.clickOnItem(0);

        await waitForDom(() => {
            expect(dropdown.list).to.be.absent();
            expect(demo.text()).to.equal('Muffins');
        });
    });

    it('renders to the screen', async () => {
        const ThemedContainer = WithTheme();
        const {select} = clientRenderer.render(<ThemedContainer />);
        const container = select(WithThemeDAID) as HTMLDivElement;
        const {driver: dropdown, waitForDom} = clientRenderer.render(
            <DropDown />,
            container
        ).withDriver(DropDownDriver);

        await waitForDom(() => {
            expect(dropdown.root).to.be.present();
            expect(dropdown.selection).to.equal('');
        });
    });

    it('has correct selected item text', async () => {
        const item = 'Test';
        const {driver: dropdown, waitForDom} = clientRenderer.render(
            <DropDown value={item}>{item}</DropDown>
        ).withDriver(DropDownDriver);

        await waitForDom(() => {
            expect(dropdown.root).to.be.present();
            expect(dropdown.selection).to.equal(item);
        });
    });

    it('doesn\'t open the dropdown if disabled', async () => {
        const {driver: dropdown, waitForDom, container} = clientRenderer.render(
            <DropDown open disabled />
        ).withDriver(DropDownDriver);

        await waitForDom(() => expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false));

        clientRenderer.render(<DropDown open />, container);

        await waitForDom(() => expect(dropdown.isOpen(), 'expected list to be open').to.equal(true));
    });

    it('opens the dropdown when focused and openOnFocus is true', async () => {
        const onOpenStateChange = sinon.spy();
        const {driver: dropdown, waitForDom} = clientRenderer.render(
            <DropDown openOnFocus onOpenStateChange={onOpenStateChange}/>
        ).withDriver(DropDownDriver);

        await waitForDom(() => expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false));

        dropdown.focus();

        await waitForDom(() => {
            expect(onOpenStateChange).to.have.been.calledOnce;
            expect(onOpenStateChange).to.have.been.calledWithMatch({value: true});
        });
    });

    it('displays item list to choose from when open is true', async () => {
        const {driver: dropdown, waitForDom} = clientRenderer.render(
            <DropDown open dataSource={items} />
        ).withDriver(DropDownDriver);

        await waitForDom(() => {
            expect(dropdown.list).to.be.present();
            expect(dropdown.items).to.have.length(3);

            items.forEach((elem, idx) => {
                expect(dropdown.items![idx]).to.be.present();
                expect(dropdown.items![idx]).to.have.text(elem);
            });
        });
    });

    it('invokes onClick handler when an item is clicked', async () => {
        const onClick = sinon.spy();
        const {driver: dropdown} = clientRenderer.render(
            <DropDown open dataSource={items} onChange={onClick}/>
        ).withDriver(DropDownDriver);

        dropdown.clickOnItem(0);

        await waitFor(() => expect(onClick).to.have.been.calledWithMatch({value: items[0]}));
    });

    it('invokes onOpenStateChange event when the open state changes (closed -> opened)', async () => {
        const onOpenStateChange = sinon.spy();
        const {driver: dropdown, waitForDom} =
            clientRenderer.render(<DropDown onOpenStateChange={onOpenStateChange}/>).withDriver(DropDownDriver);

        await waitForDom(() => expect(dropdown.isOpen()).to.equal(false));

        dropdown.clickOnDropDown();

        return waitForDom(() => expect(onOpenStateChange).to.have.been.calledWithMatch({value: true}));
    });

    it('invokes onOpenStateChange event when the open state changes (opened -> closed)', async () => {
        const onOpenStateChange = sinon.spy();
        const {driver: dropdown, waitForDom} =
            clientRenderer.render(<DropDown open onOpenStateChange={onOpenStateChange}/>).withDriver(DropDownDriver);

        await waitForDom(() => expect(dropdown.isOpen()).to.equal(true));

        dropdown.clickOnDropDown();

        return waitForDom(() => expect(onOpenStateChange).to.have.been.calledWithMatch({value: false}));
    });

    describe('Keyboard Navigation', () => {
        it('toggles visibility of selection list when SPACE is clicked (closed -> opened)', async () => {
            const onOpenStateChange = sinon.spy();
            const {driver: dropdown, waitForDom} =
                clientRenderer.render(<DropDown onOpenStateChange={onOpenStateChange}/>).withDriver(DropDownDriver);

            await waitForDom(() => expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false));

            dropdown.focus();
            dropdown.keyDown(keycode('space'));

            return waitForDom(() => expect(onOpenStateChange).to.have.been.calledWithMatch({value: true}));
        });

        it('toggles visibility of selection list when SPACE is clicked (opened -> closed)', async () => {
            const onOpenStateChange = sinon.spy();
            const {driver: dropdown, waitForDom} =
                clientRenderer
                    .render(<DropDown open onOpenStateChange={onOpenStateChange}/>)
                    .withDriver(DropDownDriver);

            await waitForDom(() => expect(dropdown.isOpen(), 'expected list to be open').to.equal(true));

            dropdown.focus();
            dropdown.keyDown(keycode('space'));

            return waitForDom(() => expect(onOpenStateChange).to.have.been.calledWithMatch({value: false}));
        });

        it('closes selection list when ESC is clicked', async () => {
            const onOpenStateChange = sinon.spy();
            const {driver: dropdown, waitForDom} =
                clientRenderer
                    .render(<DropDown open onOpenStateChange={onOpenStateChange}/>)
                    .withDriver(DropDownDriver);

            await waitForDom(() => expect(dropdown.isOpen(), 'expected list to be open').to.equal(true));

            dropdown.keyDown(keycode('esc'));

            return waitForDom(() => expect(onOpenStateChange).to.have.been.calledWithMatch({value: false}));
        });

        it('opens selection list when DOWN is clicked and it is closed', async () => {
            const onOpenStateChange = sinon.spy();
            const {driver: dropdown, waitForDom} =
                clientRenderer
                    .render(<DropDown onOpenStateChange={onOpenStateChange}/>)
                    .withDriver(DropDownDriver);

            await waitForDom(() => expect(dropdown.isOpen(), 'expected list to be closed').to.equal(false));

            dropdown.keyDown(keycode('down'));

            return waitForDom(() => expect(onOpenStateChange).to.have.been.calledWithMatch({value: true}));
        });
    });
});
