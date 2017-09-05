import * as React from 'react';
import {ClientRenderer, expect, selectDom, simulate, sinon, trigger, waitForDom as gWaitForDom} from 'test-drive-react';
import {AutoCompleteDemo} from '../../demo/components/auto-complete.demo';
import {AutoComplete} from '../../src';

const autoComp = 'AUTO_COMPLETE';
const autoCompDemo = autoComp + '_DEMO';
const autoCompInput = autoComp + '_INPUT';
const list = autoComp + '_LIST';

const items = ['Muffins', 'Pancakes', 'Cupcakes', 'Souffles', 'Pasta', 'Soup', 'Caramel', 'Avazim', 'Moses'];
const bodySelect = selectDom(document.body);
const bodyWaitForDom = gWaitForDom.bind(null, document.body);

describe('<AutoComplete />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('The autocomplete user', () => {
        it('types in the input and selects a value', async () => {
            const {select, waitForDom} = clientRenderer.render(<AutoCompleteDemo />);
            const prefix = 'P';
            const filteredItems = items.filter(item => item.startsWith(prefix)).join('');

            simulate.click(select(autoComp + '_CARET'));

            const itemList = bodySelect(list)!;
            await bodyWaitForDom(() => {
                expect(itemList).to.be.present();
                expect(itemList.textContent).to.equal(items.join(''));
            });

            trigger.change(bodySelect(autoCompInput), prefix);
            await bodyWaitForDom(() => expect(itemList.textContent).to.equal(filteredItems));

            simulate.click(bodySelect(list, 'LIST')!.children[0]);
            await waitForDom(() => {
                expect(select(autoCompDemo + '_TEXT')).to.have.text('You picked: Pancakes');
            });
        });
    });

    it('renders to the screen', () => {
        const {select, waitForDom} = clientRenderer.render(<AutoComplete />);

        return waitForDom(() => {
            expect(select(autoComp)).to.be.present();
            expect(bodySelect(list)).to.be.absent();
        });
    });

    it('invokes the onChange when text is entered to label', () => {
        const onChange = sinon.spy();
        const {select} = clientRenderer.render(<AutoComplete onChange={onChange}/>);

        select<HTMLInputElement>(autoComp, autoCompInput)!.value = 'abc';
        simulate.change(select(autoComp, autoCompInput));

        return bodyWaitForDom(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithMatch({value: 'abc'});
        });
    });

    it('renders the item list if open is given', async () => {
        clientRenderer.render(<AutoComplete open/>);

        await bodyWaitForDom(() => expect(bodySelect(list)).to.be.present());
    });

    it('renders the items if given', async () => {
        clientRenderer.render(<AutoComplete open dataSource={items}/>);

        await bodyWaitForDom(() => expect(bodySelect(list, 'LIST')!.children[0]).to.have.text('Muffins'));
    });

    it('invokes the onChange when an option is clicked', async () => {
        const onChange = sinon.spy();
        clientRenderer.render(
            <AutoComplete open dataSource={['Cat', 'Dog']} onChange={onChange}/>
        );

        simulate.click(bodySelect(list, 'LIST')!.children[0]);

        await bodyWaitForDom(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithMatch({value: 'Cat'});
        });
    });

    it('displays filtered results according to given value', async () => {
        const prefix = 'P';
        clientRenderer.render(<AutoComplete open dataSource={items} value={prefix}/>);
        const itemList = bodySelect(list);

        await bodyWaitForDom(() => {
            expect(itemList!.textContent).to.equal(items.filter(item => item.startsWith(prefix)).join(''));
        });
    });

    it('places the caret inside the input and centers it', async () => {
        const {select, waitForDom} = clientRenderer.render(<AutoComplete/>);

        await waitForDom(() => {
            const input = select(autoComp, autoCompInput)!;
            const caret = select(autoComp, autoComp + '_CARET')!;

            expect(caret).to.be.insideOf(input);
            expect([input, caret]).to.be.verticallyAligned('center');
        });
    });

    it('calls the onOpenStateChange event when clicking on the caret', async () => {
        const onOpenStateChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(<AutoComplete onOpenStateChange={onOpenStateChange}/>);

        await waitForDom(() => expect(select(autoComp, autoComp + '_CARET')).to.be.present());
        simulate.click(select(autoComp, autoComp + '_CARET'));
        await bodyWaitForDom(() => {
            expect(onOpenStateChange).to.have.been.calledOnce;
            expect(onOpenStateChange).to.have.been.calledWithMatch({value: false});
        });
    });

    it('calls the onOpenStateChange event when selecting an item', async () => {
        const onOpenStateChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(
            <AutoComplete dataSource={items} open onOpenStateChange={onOpenStateChange}/>
        );

        await waitForDom(() => expect(select(autoComp)).to.be.present());
        simulate.click(bodySelect(list, 'LIST')!.children[0]);
        await bodyWaitForDom(() => {
            expect(onOpenStateChange).to.have.been.calledOnce;
            expect(onOpenStateChange).to.have.been.calledWithMatch({value: true});
        });
    });

    it('calls the onOpenStateChange event when first entering a value', async () => {
        const onOpenStateChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(<AutoComplete onOpenStateChange={onOpenStateChange}/>);

        await waitForDom(() => expect(select(autoComp)).to.be.present());
        trigger.change(bodySelect(autoCompInput), 'M');
        await bodyWaitForDom(() => {
            expect(onOpenStateChange).to.have.been.calledOnce;
            expect(onOpenStateChange).to.have.been.calledWithMatch({value: false});
        });
    });
});
