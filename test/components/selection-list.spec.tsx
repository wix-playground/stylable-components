import keycode = require('keycode');
import * as React from 'react';
import {ClientRenderer, DriverBase, expect, sinon} from 'test-drive-react';
import {SelectionListDemo} from '../../demo/components/selection-list-demo';
import {
    SelectionList,
    SelectionListDividerSymbol as divider,
    SelectionListOption as Option
} from '../../src';
import dividerStyle from '../../src/components/selection-list/divider.st.css';
import optionStyle from '../../src/components/selection-list/option.st.css';
import {SelectionListTestDriver} from '../../test-kit';
import {sleep} from '../utils';

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
            <SelectionList dataSource={['0', '1', divider]} />
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
        `Doesn't fire onChange for clicks on active items, disabled items, items without value, and dividers`,
        async () => {
            const onChange = sinon.spy();

            const dataSource = [
                {value: '0', label: 'Zero'},
                {value: '1', label: 'One', disabled: true},
                {label: 'Three'},
                divider
            ];

            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={dataSource} value="0" onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.click(list.items[0]);
            list.click(list.items[1]);
            list.click(list.items[2]);
            list.click(list.items[3]);
            await sleep(16);
            expect(onChange).to.have.not.been.called;
        }
    );

    it('Renders blank items at the same height as normal items', async () => {
        const {driver: list, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['', '1']} />
        ).withDriver(SelectionListTestDriver);

        await waitForDom(() => expect(list.root).to.be.present());
        const [empty, full] = list.items;
        expect(empty).to.have.width.at.least(full);
        expect(empty).to.have.width.at.most(full);
        expect(empty).to.have.height.at.least(full);
        expect(empty).to.have.height.at.most(full);
    });

    it('Renders children above dataSource when both are provided', async () => {
        const {driver: list, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['data']}><div>child</div></SelectionList>
        ).withDriver(SelectionListTestDriver);

        await waitForDom(() => expect(list.root).to.be.present());
        expect(list.items[0]).to.contain.text('child');
        expect(list.items[1]).to.contain.text('data');
    });

    describe('Keyboard navigation', async () => {
        it(`Moves down on 'Down' press`, async () => {
            const onChange = sinon.spy();
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={['-2', '-1', '0', '+1', '+2']} value="0" onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown(keycode('down'));
            list.keyDown(keycode('enter'));
            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '+1'});
            });
        });

        it(`Moves up on 'Up' press`, async () => {
            const onChange = sinon.spy();
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={['-2', '-1', '0', '+1', '+2']} value="0" onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown(keycode('up'));
            list.keyDown(keycode('enter'));
            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '-1'});
            });
        });

        it(`Moves to the beginning on 'Home' press`, async () => {
            const onChange = sinon.spy();
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={['-2', '-1', '0', '+1', '+2']} value="0" onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown(keycode('home'));
            list.keyDown(keycode('enter'));
            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '-2'});
            });
        });

        it(`Moves to the end on 'End' press`, async () => {
            const onChange = sinon.spy();
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={['-2', '-1', '0', '+1', '+2']} value="0" onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown(keycode('end'));
            list.keyDown(keycode('enter'));
            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '+2'});
            });
        });

        it(`Moves to the beginning on 'Down' press if no item is selected`, async () => {
            const onChange = sinon.spy();
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={['-2', '-1', '0', '+1', '+2']} onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown(keycode('down'));
            list.keyDown(keycode('enter'));
            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '-2'});
            });
        });

        it(`Moves to the end on 'Up' press if no item is selected`, async () => {
            const onChange = sinon.spy();
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={['-2', '-1', '0', '+1', '+2']} onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown(keycode('up'));
            list.keyDown(keycode('enter'));
            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '+2'});
            });
        });

        it(`Selects item on 'Enter' press`, async () => {
            const onChange = sinon.spy();
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={['-2', '-1', '0', '+1', '+2']} value="0" onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown(keycode('down'));
            list.keyDown(keycode('enter'));
            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '+1'});
            });
        });

        it(`Selects item on 'Space' press`, async () => {
            const onChange = sinon.spy();
            const {driver: list, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={['-2', '-1', '0', '+1', '+2']} value="0" onChange={onChange} />
            ).withDriver(SelectionListTestDriver);

            await waitForDom(() => expect(list.root).to.be.present());
            list.focus();
            list.keyDown(keycode('down'));
            list.keyDown(keycode('space'));
            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '+1'});
            });
        });
    });
});
