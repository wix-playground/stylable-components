import keycode = require('keycode');
import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon} from 'test-drive-react';
import {SelectionListDemo} from '../../demo/components/selection-list-demo';
import {divider, SelectionList} from '../../src/components/selection-list';
import baseStyle from '../../src/components/selection-list/selection-list.st.css';
import {sleep} from '../utils';
import {hasCssState} from '../utils/has-css-state';

function simulateKeyDown(element: Element, key: string) {
    simulate.keyDown(element, {keyCode: keycode(key)});
}

function hasState(element: Element, state: string): boolean {
    try {
        hasCssState(element, baseStyle, {[state]: true});
        return true;
    } catch (e) {
        return false;
    }
}

function getListItems(list: Element | null): Element[] {
    return list ? Array.from(list.children) : [];
}

function getItemValue(item: Element): string | undefined {
    return (item as HTMLElement).dataset.value;
}

describe('<SelectionList />', () => {
    const clientRenderer = new ClientRenderer();

    afterEach(() => {
        clientRenderer.cleanup();
    });

    it('Takes a list of options and allows to select one', async () => {
        const {select, waitForDom} = clientRenderer.render(<SelectionListDemo />);

        await waitForDom(() => {
            expect(select('FOOD', 'LIST')).to.be.present();
        });

        const items = getListItems(select('FOOD', 'LIST'));
        simulate.click(items[1]);

        await waitForDom(() => {
            expect(select('FOOD', 'RESULT')).to.contain.text('Bacon');
        });
    });

    it('Works with a custom renderer and data schema', async () => {
        const {select, waitForDom} = clientRenderer.render(<SelectionListDemo />);

        await waitForDom(() => {
            expect(select('EMOJI', 'LIST')).to.be.present();
        });

        const elephant = getListItems(select('EMOJI', 'LIST'))[3];

        expect(elephant).to.be.present();
        expect(getItemValue(elephant)).to.be.equal('Elephant');
        expect(elephant).to.contain.text('🐘');
        simulate.click(elephant);

        return waitForDom(() => {
            expect(select('EMOJI', 'RESULT')).to.contain.text('elephant');
        });
    });

    it('Works with options specified as children', async () => {
        const {select, waitForDom} = clientRenderer.render(<SelectionListDemo />);

        await waitForDom(() => {
            expect(select('TEXT_STYLE', 'LIST')).to.be.present();
        });

        const label = getListItems(select('TEXT_STYLE', 'LIST'))[5];
        simulate.click(label);

        return waitForDom(() => {
            expect(select('TEXT_STYLE', 'RESULT')!.className).to.match(/text-style-label/);
        });
    });

    it('Renders items under each other using the default renderer', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['One', 'Two', divider, 'Three']} />
        );

        return waitForDom(() => {
            const items = getListItems(select('LIST'));
            expect(items).to.be.inVerticalSequence();
            expect(items).to.be.horizontallyAligned('left');
        });
    });

    it('Fires onChange when an item is clicked', async () => {
        const dataSource = ['One', 'Two', 'Three'];
        const onChange = sinon.spy();
        const {select, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={dataSource} value="One" onChange={onChange} />
        );

        await waitForDom(() => {
            expect(select('LIST')).to.be.present();
        });

        simulate.click(getListItems(select('LIST'))[1]);

        await sleep(100);

        expect(onChange).to.have.been.calledOnce.calledWithExactly({value: 'Two'});
    });

    it(
        `Doesn't fire onChange for clicks on active items, dividers, disabled items, and items without value`,
        async () => {
            const dataSource = [
                'One',
                divider,
                {label: 'Two'},
                {value: 'Three', label: 'Three', disabled: true}
            ];
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={dataSource} value="One" onChange={onChange} />
            );

            await waitForDom(() => {
                expect(select('LIST')).to.be.present();
            });

            const items = getListItems(select('LIST'));
            simulate.click(items[0]);
            simulate.click(items[1]);
            simulate.click(items[2]);
            simulate.click(items[3]);

            await sleep(100);

            expect(onChange).to.have.not.been.called;
        }
    );

    it('Renders blank items at the same height as normal items', () => {
        const {select, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['', '1']} />
        );

        return waitForDom(() => {
            const [empty, full] = getListItems(select('LIST'));
            expect(empty).to.be.present();
            expect(full).to.be.present();
            expect(empty).to.have.width.at.least(full);
            expect(empty).to.have.width.at.most(full);
            expect(empty).to.have.height.at.least(full);
            expect(empty).to.have.height.at.most(full);
        });
    });

    it('Renders a divider', () => {
        const {select, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={[divider]} />
        );

        return waitForDom(() => {
            expect(select('LIST', 'DIVIDER')).to.be.present();
        });
    });

    it('Renders dataSource below children when both are provided', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['ham', 'spam']}>
                <div data-value="eggs">eggs</div>
                <div data-value="bacon">bacon</div>
            </SelectionList>
        );

        return waitForDom(() => {
            expect(select('LIST')).to.be.present();
            const items = getListItems(select('LIST'));
            const labels = items.map(el => el.textContent);
            const values = items.map(el => getItemValue(el));
            expect(labels).to.be.deep.equal(['eggs', 'bacon', 'ham', 'spam']);
            expect(values).to.be.deep.equal(['eggs', 'bacon', 'ham', 'spam']);
        });
    });

    describe('Keyboard navigation', () => {
        it(`Moves down on 'Down' press`, async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList  dataSource={['1', '2', '3', '4', '5']} value="3" onChange={onChange} />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());

            const list = select('LIST') as HTMLElement;
            simulate.focus(list);
            simulateKeyDown(list, 'down');
            simulateKeyDown(list, 'enter');
            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '4'});
            });
        });

        it(`Moves up on 'Up' press`, async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['1', '2', '3', '4', '5']} value="3" onChange={onChange} />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());

            const list = select('LIST') as HTMLElement;
            simulate.focus(list);
            simulateKeyDown(list, 'up');
            simulateKeyDown(list, 'enter');

            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '2'});
            });
        });

        it(`Moves to the beginning on 'Home' press`, async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['1', '2', '3', '4', '5']} value="3" onChange={onChange} />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());

            const list = select('LIST') as HTMLElement;
            simulate.focus(list);
            simulateKeyDown(list, 'home');
            simulateKeyDown(list, 'enter');

            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '1'});
            });
        });

        it(`Moves to the end on 'End' press`, async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['1', '2', '3', '4', '5']} value="3" onChange={onChange} />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());

            const list = select('LIST') as HTMLElement;
            simulate.focus(list);
            simulateKeyDown(list, 'end');
            simulateKeyDown(list, 'enter');

            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '5'});
            });
        });

        it(`Moves to the beginning on 'Down' press if no item is selected`, async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['1', '2', '3', '4', '5']} onChange={onChange} />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());

            const list = select('LIST') as HTMLElement;
            simulate.focus(list);
            simulateKeyDown(list, 'down');
            simulateKeyDown(list, 'enter');

            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '1'});
            });
        });

        it(`Moves to the end on 'Up' press if no item is selected`, async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['1', '2', '3', '4', '5']} onChange={onChange} />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());

            const list = select('LIST') as HTMLElement;
            simulate.focus(list);
            simulateKeyDown(list, 'up');
            simulateKeyDown(list, 'enter');

            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '5'});
            });
        });

        it(`Selects item on 'Enter' press`, async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['1', '2', '3', '4', '5']} value="3" onChange={onChange} />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());

            const list = select('LIST') as HTMLElement;
            simulate.focus(list);
            simulateKeyDown(list, 'down');
            simulateKeyDown(list, 'enter');

            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '4'});
            });
        });

        it(`Selects item on 'Space' press`, async () => {
            const onChange = sinon.spy();
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['1', '2', '3', '4', '5']} value="3" onChange={onChange} />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());

            const list = select('LIST') as HTMLElement;
            simulate.focus(list);
            simulateKeyDown(list, 'down');
            simulateKeyDown(list, 'space');

            await waitForDom(() => {
                expect(onChange).to.have.been.calledOnce.calledWithExactly({value: '4'});
            });
        });
    });

    describe(`Styling`, () => {
        it(`Puts "focused" state on the container when it's focused`, async () => {
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());
            const list = select('LIST') as HTMLElement;
            expect(hasState(list, 'focused')).to.be.false;
            simulate.focus(list);
            await waitForDom(() => {
                expect(hasState(list, 'focused')).to.be.true;
            });
        });

        it(`Puts "selected" state on the selected item`, async () => {
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['1', '2']} value="1" />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());
            const items = getListItems(select('LIST'));
            expect(hasState(items[0], 'selected')).to.be.true;
            expect(hasState(items[1], 'selected')).to.be.false;
        });

        it(`Puts "focused" state on the item focused via keyboard`, async () => {
            const {select, waitForDom} = clientRenderer.render(
                <SelectionList dataSource={['1', '2']} value="1" />
            );

            await waitForDom(() => expect(select('LIST')).to.be.present());

            const list = select('LIST') as HTMLElement;
            const item = getListItems(list)[1];
            expect(hasState(item, 'focused')).to.be.false;
            simulate.focus(list);
            simulateKeyDown(list, 'down');

            await waitForDom(() => {
                expect(hasState(item, 'focused')).to.be.true;
            });
        });
    });
});
