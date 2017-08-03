import {ClientRenderer, expect, RenderingContext, simulate, sinon, waitFor} from 'test-drive-react';
import React = require('react');
import {CommonComponentProps} from "../../src/common/types";

export function assertRootElementContract(Component: React.ComponentType<CommonComponentProps>): void {
    describe('Root Element contract', function () {
        const clientRenderer = new ClientRenderer();
        function render<P>(element: React.ReactElement<P>): RenderingContext<P> & { node: Element } {
            const output = clientRenderer.render(element);
            return { node: output.container.children[0], ...output};
        }

        afterEach(() => {
            clientRenderer.cleanup();
        });

        it('data-automation-id merge', function () {
             const {select} = render(<Component data-automation-id="CONTRACT_TEST"/>);
             expect(select("CONTRACT_TEST"), 'data-automation-id not properly merged').to.not.equal(null);
        });

        it('inline style merge', function () {
            const sampleColor = 'rgb(255, 0, 0)';
            const {node} = render(<Component style={{ backgroundColor: sampleColor }}/>);
            expect(getComputedStyle(node).backgroundColor, 'inline style not properly merged').to.equal(sampleColor);
        });

        it('className merge', function () {
            const testClassName = "sample-class-name";
            const {node} = render(<Component className={testClassName}/>);
            expect(node.classList.contains(testClassName), 'className not properly merged').to.equal(true);
        });

        it('event handlers merge', async function () {
            const onClick = sinon.spy();
            const {node} = render(<Component onClick={onClick}/>);
            simulate.click(node);
            await waitFor(() => expect(onClick, 'onClick not properly merged').to.have.been.called);
        });
    });
}
