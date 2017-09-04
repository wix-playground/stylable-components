import React = require('react');
import {findDOMNode} from 'react-dom';
import {ClientRenderer, expect, RenderingContext} from 'test-drive-react';
import * as WixReactComponents from '../../src';
import {isReactComponent} from '../utils/is-react-component';

const allComponents = Object.keys(WixReactComponents);
const failingComponents = [
    'TreeView', 'NumberInput', 'Toggle', 'BirthdayPicker',
     'Portal', 'Popup', 'TimePicker', 'Modal'
];

describe('Root Element contract', function() {
    allComponents
        .filter(exportName => failingComponents.indexOf(exportName) === -1)
        .forEach(exportName => describe(exportName, function() {
            const ComponentClass = (WixReactComponents as any)[exportName];
            if (isReactComponent(ComponentClass)) {
                assertRootElementContract(ComponentClass);
            }
    }));
});

export function assertRootElementContract(Component: React.ComponentType<any>): void {
    const clientRenderer = new ClientRenderer();
    function render<P>(element: React.ReactElement<P>): RenderingContext<P> & { rootNode: Element } {
        const output = clientRenderer.render(element);
        return {rootNode: findDOMNode(output.result as React.ReactInstance), ...output};
    }

    function isDisplayInline(rootNode: Element): boolean {
        const display = window.getComputedStyle(rootNode).display;
        return display === 'inline-block' || display === 'inline-flex';
    }

    afterEach(() => {
        clientRenderer.cleanup();
    });

    it('is rendered with default props', function() {
        const {rootNode} = render(<Component data-automation-id="CONTRACT_TEST"/>);
        expect(rootNode).to.be.instanceOf(Element);
    });

    it('performs data-automation-id merge', function() {
         const {select, rootNode} = render(<Component data-automation-id="CONTRACT_TEST"/>);
         expect(select('CONTRACT_TEST'), 'data-automation-id not properly merged').to.equal(rootNode);
    });

    it('performs data-* attribute merge', function() {
        const customValue = 'some-custom-value';
        const {rootNode} = render(<Component data-some-custom-attr={customValue}/>);
        expect(rootNode).to.have.attribute('data-some-custom-attr');
        expect(rootNode.getAttribute('data-some-custom-attr')).to.contain(customValue);
    });

    it('performs inline style merge', function() {
        const sampleColor = 'rgb(255, 0, 0)';
        const {rootNode} = render(<Component style={{backgroundColor: sampleColor}}/>);
        expect(getComputedStyle(rootNode).backgroundColor, 'inline style not properly merged').to.equal(sampleColor);
    });

    it('performs className merge', function() {
        const testClassName = 'sample-class-name';
        const {rootNode} = render(<Component className={testClassName}/>);
        expect(rootNode.classList.contains(testClassName), 'className not properly merged').to.equal(true);
    });

    it('has display values of \'inline-block\' or \'inline-flex\'', function() {
        const {rootNode} = render(<Component />);
        expect(isDisplayInline(rootNode), 'element display is not \'inline-block\' or \'inline-flex\'').to.equal(true);
    });
}
