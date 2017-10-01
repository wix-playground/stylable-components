import React = require('react');
import {findDOMNode} from 'react-dom';
import {ClientRenderer, expect, RenderingContext} from 'test-drive-react';
import * as WixReactComponents from '../../src';
import {isReactComponent} from '../utils/is-react-component';
import {isDecorated, properties, stylable} from "wix-react-tools";

const allComponents = Object.keys(WixReactComponents);
const failingComponents = [
    'NumberInput', 'Portal', 'Popup', 'TimePicker', 'Modal', 'ContextProvider'
];

describe('Root Element contract', () => {
    allComponents
        .filter(exportName => failingComponents.indexOf(exportName) === -1)
        .forEach(exportName => describe(exportName, () => {
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

    it('is rendered with default props', () => {
        const {rootNode} = render(<Component data-automation-id="CONTRACT_TEST"/>);
        expect(rootNode).to.be.instanceOf(Element);
    });

    it('detects the "properties" feature decorator', () => {
        expect(isDecorated(Component, properties)).to.equal(true);
    });

    it('detects the "stylable" feature decorator', () => {
        expect(isDecorated(Component, stylable)).to.equal(true);
    });

    it('has display values of \'inline-block\' or \'inline-flex\'', () => {
        const {rootNode} = render(<Component />);
        expect(isDisplayInline(rootNode), 'element display is not \'inline-block\' or \'inline-flex\'').to.equal(true);
    });
}
