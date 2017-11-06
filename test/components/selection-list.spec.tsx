import keycode = require('keycode');
import * as React from 'react';
import {ClientRenderer, DriverBase, expect, sinon} from 'test-drive-react';
import {SelectionListDemo} from '../../demo/components/selection-list-demo';
import {
    SelectionList,
    SelectionListDividerSymbol as divider,
    SelectionListOption as Option
} from '../../src';
import {SelectionListTestDriver} from '../../test-kit';
import {sleep, WithTheme, WithThemeDAID} from '../utils';

export class SelectionListDemoDriver extends DriverBase {
    public static ComponentClass = SelectionListDemo;

    public readonly food = {
        list: new SelectionListTestDriver(() => this.select('FOOD', 'LIST')),
        result: this.select('FOOD', 'RESULT')
    };

    public readonly emoji = {
        list: new SelectionListTestDriver(() => this.select('EMOJI', 'LIST')),
        result: this.select('EMOJI', 'RESULT')
    };

    public readonly textStyle = {
        list: new SelectionListTestDriver(() => this.select('TEXT_STYLE', 'LIST')),
        result: this.select('TEXT_STYLE', 'RESULT')
    };
}

describe('<SelectionList />', () => {
    const clientRenderer = new ClientRenderer();
    let ThemedContainer;
    let themedContainer: HTMLDivElement;

    beforeEach(() => {
        ThemedContainer = WithTheme();
        const {select} = clientRenderer.render(<ThemedContainer />);
        themedContainer = select(WithThemeDAID) as HTMLDivElement;
    });

    afterEach(() => {
        clientRenderer.cleanup();
    });

    it('Takes a list of options and allows to select one', async () => {
        const {driver: demo, waitForDom} = clientRenderer.render(
            <SelectionListDemo />
        ).withDriver(SelectionListDemoDriver);

        await waitForDom(() => expect(demo.root).to.be.present());
        const {list, result} = demo.food;
        list.click(list.items[1]);
        await waitForDom(() => expect(result).to.contain.text('Bacon'));
    });

    it('Works with a custom renderer and data schema', async () => {
        const {driver: demo, waitForDom} = clientRenderer.render(
            <SelectionListDemo />
        ).withDriver(SelectionListDemoDriver);

        await waitForDom(() => expect(demo.root).to.be.present());
        const {list, result} = demo.emoji;
        expect(list.items[3]).to.contain.text('🐘');
        list.click(list.items[3]);
        await waitForDom(() => expect(result).to.contain.text('elephant'));
    });

    it('Works with options specified as children', async () => {
        const {driver: demo, waitForDom} = clientRenderer.render(
            <SelectionListDemo />
        ).withDriver(SelectionListDemoDriver);

        await waitForDom(() => expect(demo.root).to.be.present());
        const {list, result} = demo.textStyle;
        list.click(list.items[5]);
        await waitForDom(() => expect(result.className).to.match(/text-style-label/));
    });

    it('Renders items under each other using the default renderer', async () => {
        const {driver: list, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['0', '1', divider]} />,
            themedContainer
        ).withDriver(SelectionListTestDriver);

        await waitForDom(() => expect(list.root).to.be.present());
        expect(list.items).to.be.inVerticalSequence();
        expect(list.items).to.be.horizontallyAligned('left');
    });

    it('Fires onChange when an item is clicked', async () => {
        const onChange = sinon.spy();
        const {driver: list, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['0', '1']} value="0" onChange={onChange} />
        ).withDriver(SelectionListTestDriver);

        await waitForDom(() => expect(list.root).to.be.present());
        list.click(list.items[1]);
        await waitForDom(() => {
            expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '1'});
        });
    });

    it('Fires onChange when an element inside of the item is clicked', async () => {
        const onChange = sinon.spy();
        const {driver: list, waitForDom} = clientRenderer.render(
            <SelectionList value="0" onChange={onChange}>
                <Option value="0">Item <strong>#0</strong></Option>
                <Option value="1">Item <strong>#1</strong></Option>
            </SelectionList>
        ).withDriver(SelectionListTestDriver);

        await waitForDom(() => expect(list.root).to.be.present());
        list.click(list.items[1].firstElementChild!);
        await waitForDom(() => {
            expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '1'});
        });
    });

    it(
        `Doesn't fire onChange for clicks on active items, disabled items, and dividers`,
        async () => {
            const onChange = sinon.spy();

            const dataSource = [
                {value: '0', label: 'Zero'},
                {value: '1', label: 'One', disabled: true},
                divider
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={dataSource} value="0" onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.click(list.items[0]);
            list.click(list.items[1]);
            list.click(list.items[2]);
            await sleep(16);
            expect(onChange).to.have.not.been.called;
        }
    );

    it('Renders blank items at the same height as normal items', async () => {
        const {driver: list, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['', '1']} />,
            themedContainer
        ).withDriver(SelectionListTestDriver);

        await waitForDom(() => expect(list.root).to.be.present());
        const [empty, full] = list.items;
        expect(empty).to.have.width.at.least(full);
        expect(empty).to.have.width.at.most(full);
        expect(empty).to.have.height.at.least(full);
        expect(empty).to.have.height.at.most(full);
    });

    it('Renders a divider', async () => {
        const {driver: list, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={[divider]} />
        ).withDriver(SelectionListTestDriver);

        await waitForDom(() => {
            expect(list.root).to.be.not.null;
        });

        expect(list.isDivider(list.items[0])).to.equal(true);
    });

    it('Renders children above dataSource when both are provided', async () => {
        const {driver: list, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['data']}><div>child</div></SelectionList>
        ).withDriver(SelectionListTestDriver);

        await waitForDom(() => expect(list.root).to.be.present());
        expect(list.items[0]).to.contain.text('child');
        expect(list.items[1]).to.contain.text('data');
    });

    it('Moves focus to the selected item when re-rendered with a new value', async () => {
        const {container, driver: list, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={[0, 1, 2, 3]} value={0} />
        ).withDriver(SelectionListTestDriver);

        await waitForDom(() => expect(list.root).to.be.present());

        list.focus();

        clientRenderer.render(
            <SelectionList dataSource={[0, 1, 2, 3]} value={1} />,
            container
        ).withDriver(SelectionListTestDriver);

        await waitForDom(() => expect(list.focusedIndex).to.equal(1));
    });

    describe('Keyboard navigation', async () => {
        it(`Moves down on 'Down' press`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={[0, 1, 2, 3, 4]} value={2} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('down')});
            await waitForDom(() => expect(list.focusedIndex).to.equal(3));
        });

        it(`Moves up on 'Up' press`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={[0, 1, 2, 3, 4]} value={2} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('up')});
            await waitForDom(() => expect(list.focusedIndex).to.equal(1));
        });

        it(`Moves to the beginning on 'Home' press`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={[0, 1, 2, 3, 4]} value={2} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('home')});
            await waitForDom(() => expect(list.focusedIndex).to.equal(0));
        });

        it(`Moves to the end on 'End' press`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={[0, 1, 2, 3, 4]} value={2} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('end')});
            await waitForDom(() => expect(list.focusedIndex).to.equal(4));
        });

        it(`Moves to the beginning on 'Down' press if no item is selected`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={[0, 1, 2, 3, 4]} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('down')});
            await waitForDom(() => expect(list.focusedIndex).to.equal(0));
        });

        it(`Moves to the end on 'Up' press if no item is selected`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={[0, 1, 2, 3, 4]} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('up')});
            await waitForDom(() => expect(list.focusedIndex).to.equal(4));
        });

        it(`Selects item on 'Enter' press`, async () => {
            const onChange = sinon.spy();
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={[0, 1, 2, 3, 4]} value={2} onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('down')});
            list.keyDown({keyCode: keycode('enter')});
            await waitForDom(() => expect(onChange).calledWithExactly({value: 3}));
        });

        it(`Selects item on 'Space' press`, async () => {
            const onChange = sinon.spy();
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={[0, 1, 2, 3, 4]} value={2} onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('down')});
            list.keyDown({keyCode: keycode('space')});
            await waitForDom(() => expect(onChange).calledWithExactly({value: 3}));
        });
    });

    describe('Type ahead', async () => {
        it(`Matches items by prefix`, async () => {
            const items = [
                {value: 0, label: 'collie'},
                {value: 1, label: 'coyote'},
                {value: 2, label: 'cow'}
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={items} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('c'), key: 'c'});
            list.keyDown({keyCode: keycode('o'), key: 'o'});
            list.keyDown({keyCode: keycode('y'), key: 'y'});
            expect(list.focusedIndex).to.equal(1);
        });

        it(`Is case-insensitive and works with non-latin scripts`, async () => {
            const items = [
                {value: 0, label: 'кОлЛи'},
                {value: 1, label: 'кОйОт'},
                {value: 2, label: 'кОрОвА'}
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={items} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('r'), key: 'к'});
            list.keyDown({keyCode: keycode('j'), key: 'о'});
            list.keyDown({keyCode: keycode('q'), key: 'й'});
            expect(list.focusedIndex).to.equal(1);
        });

        it(`Skips disabled items`, async () => {
            const items = [
                {value: 0, label: 'collie', disabled: true},
                {value: 1, label: 'coyote'},
                {value: 2, label: 'cow'}
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={items} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('c'), key: 'c'});
            list.keyDown({keyCode: keycode('o'), key: 'o'});
            expect(list.focusedIndex).to.equal(1);
        });

        it(`Doesn't change focus when no match is found`, async () => {
            const items = [
                {value: 0, label: 'collie'},
                {value: 1, label: 'coyote'},
                {value: 2, label: 'cow'}
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={items} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('c'), key: 'c'});
            list.keyDown({keyCode: keycode('o'), key: 'o'});
            list.keyDown({keyCode: keycode('c'), key: 'c'});
            list.keyDown({keyCode: keycode('o'), key: 'o'});
            expect(list.focusedIndex).to.equal(0);
        });

        it(`Starts matching at the current position`, async () => {
            const items = [
                {value: 0, label: 'collie'},
                {value: 1, label: 'demogorgon'},
                {value: 2, label: 'cow'}
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={items} value={1} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('c'), key: 'c'});
            list.keyDown({keyCode: keycode('o'), key: 'o'});
            expect(list.focusedIndex).to.equal(2);
        });

        it(`Wraps around after reaching the end`, async () => {
            const items = [
                {value: 0, label: 'collie'},
                {value: 1, label: 'demogorgon'},
                {value: 2, label: 'mind flayer'}
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={items} value={1} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('c'), key: 'c'});
            list.keyDown({keyCode: keycode('o'), key: 'o'});
            expect(list.focusedIndex).to.equal(0);
        });

        it(`Cycles through items starting with a certain character when it's pressed repeatedly`, async () => {
            const items = [
                {value: 0, label: 'collie'},
                {value: 1, label: 'coyote'},
                {value: 2, label: 'cow'}
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={items} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('c'), key: 'c'});
            expect(list.focusedIndex).to.equal(0);
            list.keyDown({keyCode: keycode('c'), key: 'c'});
            expect(list.focusedIndex).to.equal(1);
            list.keyDown({keyCode: keycode('c'), key: 'c'});
            expect(list.focusedIndex).to.equal(2);
        });

        it(`Skips the current item when matching based on the first letter`, async () => {
            const items = [
                {value: 0, label: 'collie'},
                {value: 1, label: 'coyote'},
                {value: 2, label: 'cow'}
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={items} value={0} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            expect(list.focusedIndex).to.equal(0);
            list.keyDown({keyCode: keycode('c'), key: 'c'});
            expect(list.focusedIndex).to.equal(1);
        });

        it(`Switches from matching first letter to matching prefix`, async () => {
            const items = [
                {value: 0, label: 'Aardvark'},
                {value: 1, label: 'Armadillo'},
                {value: 2, label: 'Angelfish'}
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={items} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('a'), key: 'a'});
            expect(list.focusedIndex).to.equal(0);
            list.keyDown({keyCode: keycode('a'), key: 'a'});
            expect(list.focusedIndex).to.equal(1);
            list.keyDown({keyCode: keycode('r'), key: 'r'});
            expect(list.focusedIndex).to.equal(0);
        });

        it(`Matches children based on their label attribute or contents if it's a plain string`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList>
                    <Option value={0} label="a">not a</Option>
                    <Option value={1}>a</Option>
                </SelectionList>
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown({keyCode: keycode('a'), key: 'a'});
            expect(list.focusedIndex).to.equal(0);
            list.keyDown({keyCode: keycode('a'), key: 'a'});
            expect(list.focusedIndex).to.equal(1);
        });
    });

    describe('Mouse navigation', async () => {
        it(`Gains focus on mousedown`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={[0, 1]} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            list.mouseDown(list.items[1]);

            await waitForDom(() => {
                expect(list.focusedIndex).to.equal(1);

                // Skipping because simulated mouseDown doesn't affect native focus.
                // expect(list.hasStylableState('focused')).to.equal(true);
                // expect(list.root).to.equal(document.activeElement);
            });
        });

        it(`Doesn't gain focus when a disabled item is clicked`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={[{value: 0, disabled: true}]} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            list.mouseDown(list.items[0]);

            await waitForDom(() => {
                expect(list.focusedIndex).to.equal(-1);

                // Skipping because simulated mouseDown doesn't affect native focus.
                // expect(list.hasStylableState('focused')).to.equal(false);
                // expect(list.root).to.not.equal(document.activeElement);
            });
        });
    });

    describe(`Styling`, () => {
        it(`Puts "disabled" state on disabled items`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={[{value: 0, disabled: true}]} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            expect(list.itemHasStylableState(0, 'disabled')).to.equal(true);
        });

        it(`Puts "focused" state on the container when it's focused`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            expect(list.hasStylableState('focused')).to.equal(false);
            list.focus();
            await waitForDom(() => {
                expect(list.hasStylableState('focused')).to.equal(true);
            });
        });

        it(`Puts "hasSelection" state on the container when one of the items is selected`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['0', '1', '2']} value="1" />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            expect(list.hasStylableState('hasSelection')).to.equal(true);
        });

        it(`Doesn't put "hasSelection" state on the container when selected value is not in the list`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['0', '1', '2']} value="3" />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            expect(list.hasStylableState('hasSelection')).to.equal(false);
        });

        it(`Puts "selected" state on the selected item`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['0', '1']} value={'0'} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            expect(list.itemHasStylableState(0, 'selected')).to.equal(true);
            expect(list.itemHasStylableState(1, 'selected')).to.equal(false);
        });

        it(`Puts "focused" state on the item focused via keyboard and removes it on blur`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['0', '1']} value={'0'} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);

            list.focus();
            await waitForDom(() => {
                expect(list.itemHasStylableState(0, 'focused')).to.equal(true);
                expect(list.itemHasStylableState(1, 'focused')).to.equal(false);
            });

            list.keyDown({keyCode: keycode('down')});
            await waitForDom(() => {
                expect(list.itemHasStylableState(0, 'focused')).to.equal(false);
                expect(list.itemHasStylableState(1, 'focused')).to.equal(true);
            });

            list.blur();
            await waitForDom(() => {
                expect(list.itemHasStylableState(0, 'focused')).to.equal(false);
                expect(list.itemHasStylableState(1, 'focused')).to.equal(false);
            });
        });
    });

    describe(`Accessibility`, () => {
        it(`Adds "listbox" role to the list`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            expect(list.root.getAttribute('role')).to.equal('listbox');
        });

        it(`Adds "aria-activedescendant" to indicate focused item`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['0']} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            list.focus();
            list.keyDown({keyCode: keycode('down')});
            const itemId = list.items[0].id;
            expect(itemId).to.be.not.empty;
            expect(list.root.getAttribute('aria-activedescendant')).to.be.equal(itemId);
        });

        it(`Adds "option" role to items`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['0']} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            expect(list.items[0].getAttribute('role')).to.equal('option');
        });

        it(`Adds "aria-disabled" and "aria-selected" attributes to the items`, async () => {
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={[{value: '0'}, {value: '1', disabled: true}, {value: '2'}]} value="2" />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);
            expect(list.items[0].hasAttribute('aria-disabled')).to.equal(false);
            expect(list.items[0].hasAttribute('aria-selected')).to.equal(false);
            expect(list.items[1].hasAttribute('aria-disabled')).to.equal(true);
            expect(list.items[2].hasAttribute('aria-selected')).to.equal(true);
        });
    });

    describe('Scrolling', () => {
        it(`Scrolls to the selected item when mounted`, async () => {
            const dataSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={dataSource} value="F" style={{height: '100px'}} />,
                themedContainer
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => {
                expect(list.root).to.be.not.null;
                expect(list.items[0]).to.be.outsideOf(list.root);
                expect(list.items[15]).to.be.insideOf(list.root);
            });
        });

        it(`Scrolls to the focused item on focus change`, async () => {
            const dataSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={dataSource} value="0" style={{height: '100px'}} />,
                themedContainer
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.not.null);

            list.focus();
            list.keyDown({keyCode: keycode('end')});

            await waitForDom(() => {
                expect(list.items[0]).to.be.outsideOf(list.root);
                expect(list.items[15]).to.be.insideOf(list.root);
            });
        });
    });
});
