import React = require('react');
import {findDOMNode} from 'react-dom';
import {ClientRenderer, expect, RenderingContext} from 'test-drive-react';
import * as WixReactComponents from '../../src';
import {isReactComponent} from '../utils/is-react-component';

// const allComponents = Object.keys(WixReactComponents);
// Not all components are passing the contract test right now.
// failing: TreeView, NumberInput, Toggle, BirthdayPicker, RadioButton, RadioGroup, Portal

const testedComponents: string[] = ['DatePicker', 'CheckBox', 'Image', 'DropDown'];

describe('Root Element contract', function() {
    testedComponents.forEach(exportName => describe(exportName, function() {
        const ComponentClass = (WixReactComponents as any)[exportName];
        if (isReactComponent(ComponentClass)) {
            assertRootElementContract(ComponentClass);
        }
    }));
});

export function assertRootElementContract(Component: React.ComponentType<any>): void {
    const clientRenderer = new ClientRenderer();
    function render<P>(element: React.ReactElement<P>): RenderingContext<P> & { node: Element } {
        const output = clientRenderer.render(element);
        return {node: findDOMNode(output.result as React.ReactInstance), ...output};
    }

    afterEach(() => {
        clientRenderer.cleanup();
    });

    it('performs data-automation-id merge', function() {
         const {select} = render(<Component data-automation-id="CONTRACT_TEST"/>);
         expect(select('CONTRACT_TEST'), 'data-automation-id not properly merged').to.not.equal(null);
    });

    it('performs data-* attribute merge', function() {
        const customValue = 'some-custom-value';
        const {node} = render(<Component data-some-custom-attr={customValue}/>);
        expect(node).to.have.attribute('data-some-custom-attr');
        expect(node.getAttribute('data-some-custom-attr')).to.contain(customValue);
    });

    it('performs inline style merge', function() {
        const sampleColor = 'rgb(255, 0, 0)';
        const {node} = render(<Component style={{backgroundColor: sampleColor}}/>);
        expect(getComputedStyle(node).backgroundColor, 'inline style not properly merged').to.equal(sampleColor);
    });

    it('performs className merge', function() {
        const testClassName = 'sample-class-name';
        const {node} = render(<Component className={testClassName}/>);
        expect(node.classList.contains(testClassName), 'className not properly merged').to.equal(true);
    });
}
