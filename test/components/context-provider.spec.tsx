import * as React from 'react';
import {ClientRenderer, expect} from 'test-drive-react';

import {ContextProvider} from '../../src';

const automationId = 'CONTEXT_PROVIDER';

xdescribe('<ContextProvider/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    it('renders as a div by default', () => {
        const {select} = clientRenderer.render(<ContextProvider data-automation-id={automationId} />);

        expect(select(automationId)).to.be.instanceof(HTMLDivElement);
    });

    it('allows specifying the root tag element type', () => {
        const {select} = clientRenderer.render(<ContextProvider tagName="p" data-automation-id={automationId} />);

        expect(select(automationId)).to.be.instanceof(HTMLParagraphElement);
    });

    it('renders provided children', () => {
        const {select} = clientRenderer.render(
            <ContextProvider>
                <div data-automation-id="CHILD">Hello</div>
            </ContextProvider>
        );

        expect(select('CHILD')).to.be.present();
        expect(select('CHILD')).to.contain.text('Hello');
    });

    it('accepts className, style, and dir attributes for the root element', () => {
        const {select} = clientRenderer.render(
            <ContextProvider className="context-div" style={{width: 10}} dir="rtl" data-automation-id={automationId} />
        );

        expect(select(automationId)).to.have.class('context-div');
        expect(select(automationId)).to.have.attribute('style', 'width: 10px;');
        expect(select(automationId)).to.have.attribute('dir', 'rtl');
    });

    it('passes provided dir via context', () => {
        class Inner extends React.Component {
            public static contextTypes = {contextProvider: () => null};
            public render() {
                return <div data-automation-id="INNER_DIV" data-dir={this.context.contextProvider.dir} />;
            }
        }

        const {select} = clientRenderer.render(
            <ContextProvider dir="rtl">
                <Inner />
            </ContextProvider>
        );

        expect(select('INNER_DIV')).to.have.attribute('data-dir', 'rtl');
    });

    it('passes any additional props via context', () => {
        const TestComp: React.SFC = ({}, context) => {
            const {x, y} = context.contextProvider;
            return <div data-automation-id="TEST_COMP" data-x={x} data-y={y} />;
        };
        TestComp.contextTypes = {contextProvider: () => null};

        const {select} = clientRenderer.render(
            <ContextProvider x={3} y={'test'}>
                <TestComp />
            </ContextProvider>
        );

        expect(select('TEST_COMP')).to.have.attribute('data-x', '3');
        expect(select('TEST_COMP')).to.have.attribute('data-y', 'test');
    });

    it('forwards provided context while overwriting with its own values', () => {
        const TestComp: React.SFC<{id: string}> = ({id}, context) => {
            const {x, y} = context.contextProvider;
            return <div data-automation-id={id} data-x={x} data-y={y} />;
        };
        TestComp.contextTypes = {contextProvider: () => null};

        const {select} = clientRenderer.render(
            <ContextProvider x={1} y={2}>
                <TestComp id="TEST_COMP_1" />
                <ContextProvider x={5}>
                    <TestComp id="TEST_COMP_2" />
                </ContextProvider>
            </ContextProvider>
        );

        expect(select('TEST_COMP_1')).to.have.attribute('data-x', '1');
        expect(select('TEST_COMP_1')).to.have.attribute('data-y', '2');

        expect(select('TEST_COMP_2')).to.have.attribute('data-x', '5');
        expect(select('TEST_COMP_2')).to.have.attribute('data-y', '2');
    });
});
