import React = require('react');
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {SelectionListDemo} from '../../demo/components/selection-list-demo';
import sleep from '../../src/common/sleep';
import {divider, SelectionList} from '../../src/components/selection-list';
import style from './selection-list-demo.st.css';

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

        simulate.click(select('FOOD', 'LIST')!.children[4]);

        await waitForDom(() => {
            expect(select('FOOD', 'RESULT')).to.contain.text('Sausage');
        });
    });

    it('Works with a custom renderer and data schema', async () => {
        const {select, waitForDom} = clientRenderer.render(<SelectionListDemo />);

        await waitForDom(() => {
            expect(select('EMOJI', 'LIST')).to.be.present();
        });

        const octopus = select('EMOJI', 'LIST')!.children[3] as HTMLElement;

        expect(octopus).to.be.present();
        expect(octopus.dataset.value).to.be.equal('Octopus');
        expect(octopus).to.contain.text('🐙');
        simulate.click(octopus);

        return waitForDom(() => {
            expect(select('EMOJI', 'RESULT')).to.contain.text('octopus');
        });
    });

    it('Works with options specified as children', async () => {
        const {select, waitForDom} = clientRenderer.render(<SelectionListDemo />);

        await waitForDom(() => {
            expect(select('TEXT_STYLE', 'LIST')).to.be.present();
        });

        const label = select('TEXT_STYLE', 'LIST')!.children[5] as HTMLElement;
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
            const items = Array.from(select('LIST')!.children);
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

        simulate.click(select('LIST')!.children[1]);

        await sleep(100);

        return waitFor(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWithExactly('Two');
        });
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

            simulate.click(select('LIST')!.children[0]);
            simulate.click(select('LIST')!.children[1]);
            simulate.click(select('LIST')!.children[2]);
            simulate.click(select('LIST')!.children[3]);

            await sleep(100);

            return waitFor(() => {
                expect(onChange).to.have.not.been.called;
            });
        }
    );

    it('Renders blank items at the same height as normal items', () => {
        const {select, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['', '1']} />
        );

        return waitForDom(() => {
            const [empty, full] = Array.from(select('LIST')!.children);
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

    it(`Doesn't discard text nodes in the child list`, async () => {
        const {select, waitForDom} = clientRenderer.render(
            <SelectionList>
                <div />
                Hello, World
                <div />
            </SelectionList>
        );

        return waitForDom(() => {
            expect(select('LIST')).to.contain.text('Hello, World');
        });
    });

    it('Allows to use dataSource and children together', async () => {
        const {select, waitForDom} = clientRenderer.render(
            <SelectionList dataSource={['ham', 'spam']}>
                <div data-value="eggs">eggs</div>
                <div data-value="bacon">bacon</div>
            </SelectionList>
        );

        return waitForDom(() => {
            expect(select('LIST')).to.be.present();
            const children = Array.from(select('LIST')!.children) as HTMLElement[];
            const labels = children.map(el => el.textContent);
            const values = children.map(el => el.dataset.value);
            expect(labels).to.be.deep.equal(['ham', 'spam', 'eggs', 'bacon']);
            expect(values).to.be.deep.equal(['ham', 'spam', 'eggs', 'bacon']);
        });
    });
});
