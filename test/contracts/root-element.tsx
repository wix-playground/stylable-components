import {ClientRenderer, expect, RenderingContext, simulate, sinon, waitFor} from 'test-drive-react';
import React = require('react');
import {findDOMNode} from 'react-dom';

export function assertRootElementContract(Component: React.ComponentType<any>): void {
    describe('Root Element contract', function() {
        const clientRenderer = new ClientRenderer();
        function render<P>(element: React.ReactElement<P>): RenderingContext<P> & { node: Element } {
            const output = clientRenderer.render(element);
            return { node: findDOMNode(output.result as React.ReactInstance), ...output};
        }

        afterEach(() => {
            clientRenderer.cleanup();
        });

        it('assumes data-automation-id merge', function() {
             const {select} = render(<Component data-automation-id="CONTRACT_TEST"/>);
             expect(select('CONTRACT_TEST'), 'data-automation-id not properly merged').to.not.equal(null);
        });

        it('assumes data-* attribute merge', function() {
            const customValue = 'some-custom-value';
            const {node} = render(<Component data-some-custom-attr={customValue}/>);
            expect(node).to.have.attribute('data-some-custom-attr');
            expect(node.getAttribute('data-some-custom-attr')).to.contain(customValue);
        });

        it('assumes inline style merge', function() {
            const sampleColor = 'rgb(255, 0, 0)';
            const {node} = render(<Component style={{ backgroundColor: sampleColor }}/>);
            expect(getComputedStyle(node).backgroundColor, 'inline style not properly merged').to.equal(sampleColor);
        });

        it('assumes className merge', function() {
            const testClassName = 'sample-class-name';
            const {node} = render(<Component className={testClassName}/>);
            expect(node.classList.contains(testClassName), 'className not properly merged').to.equal(true);
        });

    });
}
