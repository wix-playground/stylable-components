import keycode = require('keycode');
import * as React from 'react';
import {ClientRenderer, DriverBase, expect, sinon} from 'test-drive-react';
import {AutoCompleteDemo} from '../../demo/components/auto-complete.demo';
import {AutoComplete} from '../../src';
import {AutoCompleteTestDriver} from '../../test-kit';
import {sleep} from '../utils';

export class AutoCompleteDemoDriver extends DriverBase {
    public static ComponentClass = AutoCompleteDemo;

    public get autocomplete() {
        return new AutoCompleteTestDriver(() => this.select('AUTOCOMPLETE'));
    }

    public get result() {
        return this.select('AUTO_COMPLETE_DEMO_TEXT');
    }
}

describe('<AutoComplete />', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('Works on the happy path', async () => {
        const {driver: demo, waitForDom} = clientRenderer.render(
            <AutoCompleteDemo />
        ).withDriver(AutoCompleteDemoDriver);

        await waitForDom(() => expect(demo.autocomplete.root).to.be.present());

        demo.autocomplete.focus();
        demo.autocomplete.typeText('p');
        demo.autocomplete.keyDown({keyCode: keycode('down')});
        demo.autocomplete.keyDown({keyCode: keycode('down')});
        demo.autocomplete.keyDown({keyCode: keycode('enter')});

        await waitForDom(() => expect(demo.result).to.contain.text('Pasta'));
    });

    it('Renders to the screen', async () => {
        const {driver: autocomplete, waitForDom} = clientRenderer.render(
            <AutoComplete />
        ).withDriver(AutoCompleteTestDriver);

        await waitForDom(() => {
            expect(autocomplete.root).to.be.present();
            expect(autocomplete.input).to.be.present();
            expect(autocomplete.list.root).to.be.absent();
            expect(autocomplete.noSuggestionsNotice).to.be.absent();
        });
    });

    it('Renders the value inside of the input', async () => {
        const {driver: autocomplete, waitForDom} = clientRenderer.render(
            <AutoComplete value="Muffins" />
        ).withDriver(AutoCompleteTestDriver);

        await waitForDom(() => {
            expect(autocomplete.input.value).to.be.equal('Muffins');
        });
    });

    it('Renders the list when open is given', async () => {
        const {driver: autocomplete, waitForDom} = clientRenderer.render(
            <AutoComplete dataSource={['Muffins']} open />
        ).withDriver(AutoCompleteTestDriver);

        await waitForDom(() => {
            expect(autocomplete.list.root).to.be.present();
            expect(autocomplete.root).to.be.present();
        });
    });

    it('Renders noSuggestionsNotice if given', async () => {
        const {driver: autocomplete, waitForDom} = clientRenderer.render(
            <AutoComplete open noSuggestionsNotice="No results" />
        ).withDriver(AutoCompleteTestDriver);

        await waitForDom(() => {
            expect(autocomplete.noSuggestionsNotice).to.be.present();
            expect(autocomplete.noSuggestionsNotice).to.contain.text('No results');
        });
    });

    it(`Doesn't render the list when open is given but there are no items matching the filter`, async () => {
        const {driver: autocomplete, waitForDom} = clientRenderer.render(
            <AutoComplete dataSource={['Muffins']} open value="X" />
        ).withDriver(AutoCompleteTestDriver);

        await waitForDom(() => {
            expect(autocomplete.root).to.be.present();
            expect(autocomplete.list.root).to.be.absent();
        });
    });

    it(`Allows to navigate the list using Up and Down keys`, async () => {
        const {driver: autocomplete, waitForDom} = clientRenderer.render(
            <AutoComplete dataSource={['Muffins', 'Pancakes']} open />
        ).withDriver(AutoCompleteTestDriver);

        await waitForDom(() => expect(autocomplete.root).to.be.present());

        autocomplete.keyDown({keyCode: keycode('down')});
        expect(autocomplete.list.focusedIndex).to.be.equal(0);
        autocomplete.keyDown({keyCode: keycode('down')});
        expect(autocomplete.list.focusedIndex).to.be.equal(1);
        autocomplete.keyDown({keyCode: keycode('up')});
        expect(autocomplete.list.focusedIndex).to.be.equal(0);
    });

    it(`Removes focus from the focused list item on typing`, async () => {
        const {container, driver: autocomplete, waitForDom} = clientRenderer.render(
            <AutoComplete value="p" dataSource={['Muffins', 'Pancakes', 'Pasta']} open />
        ).withDriver(AutoCompleteTestDriver);

        await waitForDom(() => expect(autocomplete.root).to.be.present());

        autocomplete.keyDown({keyCode: keycode('down')});
        autocomplete.keyDown({keyCode: keycode('down')});

        await waitForDom(() => expect(autocomplete.list.focusedIndex).to.be.equal(1));

        clientRenderer.render(
            <AutoComplete value="pa" dataSource={['Muffins', 'Pancakes', 'Pasta']} open />,
            container
        ).withDriver(AutoCompleteTestDriver);

        await waitForDom(() => expect(autocomplete.list.focusedIndex).to.be.equal(-1));
    });

    it(`Works with a custom filter`, async () => {
        const filter = (itemLabel: string, prefix: string) => itemLabel !== prefix;
        const {driver: autocomplete, waitForDom} = clientRenderer.render(
            <AutoComplete value="Pancakes" dataSource={['Muffins', 'Pancakes', 'Pasta']} open filter={filter} />
        ).withDriver(AutoCompleteTestDriver);

        await waitForDom(() => {
            expect(autocomplete.root).to.be.present();
            expect(autocomplete.list.items.length).to.be.equal(2);
            expect(autocomplete.list.items[0]).to.contain.text('Muffins');
            expect(autocomplete.list.items[1]).to.contain.text('Pasta');
        });
    });

    it(`Respects maxShownSuggestions`, async () => {
        const {driver: autocomplete, waitForDom} = clientRenderer.render(
            <AutoComplete dataSource={['Muffins', 'Pancakes', 'Pasta']} maxShownSuggestions={2} open />
        ).withDriver(AutoCompleteTestDriver);

        await waitForDom(() => {
            expect(autocomplete.root).to.be.present();
            expect(autocomplete.list.items.length).to.be.equal(2);
            expect(autocomplete.list.items[0]).to.contain.text('Muffins');
            expect(autocomplete.list.items[1]).to.contain.text('Pancakes');
        });
    });

    describe('Events', () => {
        it('Invokes onChange when text is entered', async () => {
            const onChange = sinon.spy();
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete onChange={onChange} />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => expect(autocomplete.root).to.be.present());

            autocomplete.focus();
            autocomplete.typeText('muffins');

            await waitForDom(() => expect(onChange).to.have.been.calledWithMatch({value: 'muffins'}));
        });

        it('Invokes onOpenStateChange on focus when openOnFocus is given', async () => {
            const onOpenStateChange = sinon.spy();
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete dataSource={[0, 1, 2]} onOpenStateChange={onOpenStateChange} openOnFocus />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => expect(autocomplete.root).to.be.present());

            autocomplete.focus();

            await waitForDom(() => expect(onOpenStateChange).to.be.calledWith({value: true}));
        });

        it(`Doesn't invoke onOpenStateChange on focus when openOnFocus is not given`, async () => {
            const onOpenStateChange = sinon.spy();
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete dataSource={[0, 1, 2]} onOpenStateChange={onOpenStateChange} />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => expect(autocomplete.root).to.be.present());

            autocomplete.focus();

            await sleep(16);
            expect(onOpenStateChange).to.have.not.been.called;
        });

        it(`Invokes onOpenStateChange on blur`, async () => {
            const onOpenStateChange = sinon.spy();
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete dataSource={[0, 1, 2]} open onOpenStateChange={onOpenStateChange} />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => expect(autocomplete.root).to.be.present());

            autocomplete.focus();
            autocomplete.blur();

            await waitForDom(() => {
                expect(onOpenStateChange).to.be.calledOnce;
                expect(onOpenStateChange).to.be.calledWith({value: false});
            });
        });

        it(`Invokes onOpenStateChange on Escape press`, async () => {
            const onOpenStateChange = sinon.spy();
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete dataSource={[0, 1, 2]} open onOpenStateChange={onOpenStateChange} />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => expect(autocomplete.root).to.be.present());

            autocomplete.focus();
            autocomplete.keyDown({keyCode: keycode('escape')});

            await waitForDom(() => {
                expect(onOpenStateChange).to.be.calledOnce;
                expect(onOpenStateChange).to.be.calledWith({value: false});
            });
        });

        it(`Invokes onOpenStateChange when minCharacters is entered`, async () => {
            const onOpenStateChange = sinon.spy();
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete
                    value="muf"
                    dataSource={['muffins']}
                    minCharacters={3}
                    onOpenStateChange={onOpenStateChange}
                />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => expect(autocomplete.root).to.be.present());

            autocomplete.focus();
            autocomplete.typeText('');

            await waitForDom(() => {
                expect(onOpenStateChange).to.be.calledOnce;
                expect(onOpenStateChange).to.be.calledWith({value: true});
            });
        });

        it(`Doesn't invoke onOpenStateChange when less than minCharacters is entered`, async () => {
            const onOpenStateChange = sinon.spy();
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete
                    value="mu"
                    dataSource={['muffins']}
                    minCharacters={3}
                    onOpenStateChange={onOpenStateChange}
                />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => expect(autocomplete.root).to.be.present());

            autocomplete.focus();
            autocomplete.typeText('');

            await sleep(16);
            expect(onOpenStateChange).to.have.not.been.called;
        });

        it(`Invokes onOpenStateChange and onChange when an item is selected from the list using Enter`, async () => {
            const onOpenStateChange = sinon.spy();
            const onChange = sinon.spy();
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete
                    dataSource={['Muffins']}
                    open
                    onOpenStateChange={onOpenStateChange}
                    onChange={onChange}
                />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => expect(autocomplete.root).to.be.present());

            autocomplete.focus();
            autocomplete.keyDown({keyCode: keycode('down')});
            autocomplete.keyDown({keyCode: keycode('enter')});

            await sleep(16);
            expect(onOpenStateChange).to.be.calledOnce;
            expect(onOpenStateChange).to.be.calledWith({value: false});
            expect(onChange).to.be.calledOnce;
            expect(onChange).to.be.calledWith({value: 'Muffins'});
        });

        it(`Invokes onOpenStateChange and onChange when an item is selected from the list using mouse`, async () => {
            const onOpenStateChange = sinon.spy();
            const onChange = sinon.spy();
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete
                    dataSource={['Muffins']}
                    open
                    onOpenStateChange={onOpenStateChange}
                    onChange={onChange}
                />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => expect(autocomplete.root).to.be.present());

            autocomplete.focus();
            autocomplete.list.click(autocomplete.list.items[0]);

            await sleep(16);
            expect(onOpenStateChange).to.be.calledOnce;
            expect(onOpenStateChange).to.be.calledWith({value: false});
            expect(onChange).to.be.calledOnce;
            expect(onChange).to.be.calledWith({value: 'Muffins'});
        });

        it(`Doesn't invoke onOpenStateChange or onChange on item mouseDown`, async () => {
            const onOpenStateChange = sinon.spy();
            const onChange = sinon.spy();
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete
                    dataSource={['muffins']}
                    open
                    onOpenStateChange={onOpenStateChange}
                    onChange={onChange}
                />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => expect(autocomplete.root).to.be.present());

            autocomplete.focus();
            autocomplete.list.mouseDown(autocomplete.list.items[0]);

            await sleep(16);
            expect(onOpenStateChange).to.have.not.been.called;
            expect(onChange).to.have.not.been.called;
        });
    });

    describe('Styling', () => {
        it(`Supports focused state`, async () => {
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => {
                expect(autocomplete.root).to.be.present();
                expect(autocomplete.hasStylableState('focused')).to.be.equal(false);
            });

            autocomplete.focus();

            await waitForDom(() => {
                expect(autocomplete.hasStylableState('focused')).to.be.equal(true);
            });
        });

        it(`Supports disabled state`, async () => {
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete disabled />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => {
                expect(autocomplete.root).to.be.present();
                expect(autocomplete.hasStylableState('disabled')).to.be.equal(true);
                expect(autocomplete.input.disabled).to.be.equal(true);
            });
        });

        it(`Supports readOnly state`, async () => {
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete readOnly />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => {
                expect(autocomplete.root).to.be.present();
                expect(autocomplete.hasStylableState('readOnly')).to.be.equal(true);
                expect(autocomplete.input.readOnly).to.be.equal(true);
            });
        });
    });

    describe('Accessibility', () => {
        it('Gives the correct role and aria attributes to the input', async () => {
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => {
                expect(autocomplete.input).to.have.attribute('role', 'textbox');
                expect(autocomplete.input).to.have.attribute('aria-autocomplete', 'list');
                expect(autocomplete.input).to.have.attribute('aria-expanded', 'false');
                expect(autocomplete.input).to.have.attribute('aria-haspopup', 'true');
            });
        });

        it('Toggles aria-expanded on when open', async () => {
            const {driver: autocomplete, waitForDom} = clientRenderer.render(
                <AutoComplete dataSource={[1, 2, 3]} open />
            ).withDriver(AutoCompleteTestDriver);

            await waitForDom(() => {
                expect(autocomplete.input).to.have.attribute('aria-expanded', 'true');
            });
        });
    });
});
