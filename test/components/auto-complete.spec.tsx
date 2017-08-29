import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {AutoCompleteDemo} from '../../demo/components/auto-complete.demo';
import {AutoComplete} from '../../src';

const autoComp = 'AUTO_COMPLETE';
const autoCompDemo = autoComp + '_DEMO';
const input = autoComp + '_INPUT';
const list = autoComp + '_LIST';

const items = ['Muffins', 'Pancakes', 'Cupcakes', 'Souffles', 'Pasta', 'Soup', 'Caramel', 'Avazim', 'Moses'];

describe('<AutoComplete />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('The autocomplete user', () => {
        it('types in the input and selects a value', async () => {
            const {select, waitForDom} = clientRenderer.render(<AutoCompleteDemo />);
            const itemList = select(autoCompDemo, list)!;
            const prefix = 'P';
            const filteredItems = items.filter(item => item.startsWith(prefix)).join('');

            await waitForDom(() => expect(itemList.textContent).to.eql(items.join('')));

            (select(autoCompDemo, input) as HTMLInputElement).value = prefix;
            simulate.change(select(autoCompDemo, input));
            await waitForDom(() => expect(itemList.textContent).to.eql(filteredItems));

            simulate.click(select(autoCompDemo, list, 'LIST')!.children[0]);
            await waitForDom(() => {
                expect(select(autoCompDemo + '_TEXT')).to.have.text('You picked: Pancakes');
            });
        });
    });

    it('renders to the screen', () => {
        const {select, waitForDom} = clientRenderer.render(<AutoComplete />);

        return waitForDom(() => expect(select(autoComp)).to.be.present());
    });

    it('invokes the onChange when text is entered to label', () => {
        const onChange = sinon.spy();
        const {select} = clientRenderer.render(<AutoComplete onChange={onChange}/>);

        (select(autoComp, input) as HTMLInputElement).value = 'abc';
        simulate.change(select(autoComp, input));

        return waitFor(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithMatch({value: 'abc'});
        });
    });

    it('renders the item list if open is given', async () => {
        const {select, waitForDom} = clientRenderer.render(<AutoComplete open/>);

        await waitForDom(() => expect(select(autoComp, list)).to.be.present());
    });

    it('renders the items if given', async () => {
        const {select, waitForDom} = clientRenderer.render(<AutoComplete open dataSource={items}/>);

        await waitForDom(() => expect(select(autoComp, list, 'LIST')!.children[0].innerHTML).to.be.equal('Muffins'));
    });

    it('invokes the onChange when an option is clicked', async () => {
        const onChange = sinon.spy();
        const {select} = clientRenderer.render(
            <AutoComplete open dataSource={['Cat', 'Dog']} onChange={onChange}/>
        );

        simulate.click(select(autoComp, list, 'LIST')!.children[0]);

        await waitFor(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithMatch({value: 'Cat'});
        });
    });

    it('displays filtered results according to given value', async () => {
        const prefix = 'P';
        const {select, waitForDom} = clientRenderer.render(<AutoComplete open dataSource={items} value={prefix}/>);
        const itemList = select(autoComp, list);

        await waitForDom(() => {
            expect(itemList!.textContent).to.eql(items.filter(item => item.startsWith(prefix)).join(''));
        });
    });

    it('does not show suggestions if the number of characters is smaller than maxCharacters', async () => {
        const prefix = 'P';
        const {select, waitForDom} = clientRenderer.render(
            <AutoComplete open dataSource={items} maxCharacters={2} value={prefix}/>
        );

        await waitForDom(() => expect(select(list)).to.be.absent());
    });

    it('shows suggestions if the number of characters is larger than maxCharacters', async () => {
        const prefix = 'Pa';
        const {select, waitForDom} = clientRenderer.render(
            <AutoComplete open dataSource={items} maxCharacters={2} value={prefix}/>
        );

        await waitForDom(() => expect(select(list)).to.be.present());
    });

    it('shows the correct amount of results according to maxSearchResults', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <AutoComplete open dataSource={items} maxSearchResults={2} />
        );

        await waitForDom(() => expect(select(autoComp, list, 'LIST')!.children.length).to.equal(2));
    });

    it('shows the default no suggestions message', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <AutoComplete showNoSuggestions open />
        );

        await waitForDom(() => {
            expect(select(list)).to.be.present();
            expect(select(autoComp, list, 'LIST')!.children[0].innerHTML).to.equal('No Results');
        });
    });

    it('shows the given no suggestions message', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <AutoComplete noSuggestionsNotice={'Wap Wap'} showNoSuggestions open />
        );

        await waitForDom(() => expect(select(autoComp, list, 'LIST')!.children[0].innerHTML).to.equal('Wap Wap'));
    });

    it('disables the autocomplete if the prop is passed', async () => {
        const {select, waitForDom} = clientRenderer.render(<AutoComplete disabled />);

        await waitForDom(() => expect(select(input)).to.have.attribute('disabled'));
    });
});
