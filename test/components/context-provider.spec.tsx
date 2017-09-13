import * as PropTypes from 'prop-types';
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {ClientRenderer, expect} from 'test-drive-react';
import {ContextProvider} from '../../src';

describe('<ContextProvider/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('render with no properties', () => {
        let root: any;
        beforeEach(() => {
            const renderer = clientRenderer.render(<ContextProvider/>);
            root = findDOMNode(renderer.result as React.ReactInstance);
        });
        it('should render div', () => {
            expect(root).instanceof(HTMLDivElement);
        });
    });

    describe('render with tagName="p" ', () => {
        let root: any;
        beforeEach(() => {
            const renderer = clientRenderer.render(<ContextProvider tagName="p"/>);
            root = findDOMNode(renderer.result as React.ReactInstance);
        });
        it('should render paragraph', () => {
            expect(root).instanceof(HTMLParagraphElement);
        });
    });

    describe('render with children ', () => {
        let renderer: any;
        let root: any;
        beforeEach(() => {
            renderer = clientRenderer.render(
                <ContextProvider>
                    <div data-automation-id="TEST_DIV">Hello</div>
                </ContextProvider>
            );
            root = findDOMNode(renderer.result as React.ReactInstance);
        });
        it('should render child', () => {
            expect(renderer.select('TEST_DIV')).to.not.null;
        });
    });

    describe('render with "style" and "className" ', () => {
        let renderer: any;
        let root: any;
        beforeEach(() => {
            renderer = clientRenderer.render(
                <ContextProvider
                    className="context-div"
                    style={{width: 10}}
                />
            );
            root = findDOMNode(renderer.result as React.ReactInstance);
        });
        it('should have "className"', () => {
            expect(root).to.have.class('context-div');
        });
        it('should have inline styles', () => {
            expect(root).attr('style', 'width: 10px;');
        });
    });

    describe('render with dir="rtl" ', () => {
        class Inner extends React.Component {
            public static contextTypes = {
                'context-provider-dir': PropTypes.string
            };
            public render() {
                return <div data-automation-id="TEST_DIV" dir={this.context['context-provider-dir']}/>;
            }
        }
        let renderer: any;
        let root: any;
        beforeEach(() => {
            renderer = clientRenderer.render(
                <ContextProvider dir="rtl">
                    <Inner/>
                </ContextProvider>
            );
            root = findDOMNode(renderer.result as React.ReactInstance);
        });
        it('should render component with div="rtl"', () => {
            expect(root).attr('dir', 'rtl');
        });
        it('should pass "dir" as "context-provider-dir" context property', () => {
            expect(renderer.select('TEST_DIV')).attr('dir', 'rtl');
        });
    });

    describe('render with context-foo="bar"', () => {
        class Inner extends React.Component {
            public static contextTypes = {
                foo: PropTypes.string
            };
            public render() {
                return <div data-automation-id="TEST_DIV">{this.context.foo}</div>;
            }
        }

        let renderer: any;
        let root: any;

        beforeEach(() => {
            renderer = clientRenderer.render(
                <ContextProvider context-foo="bar">
                    <Inner/>
                </ContextProvider>
            );
            root = findDOMNode(renderer.result as React.ReactInstance);
        });

        it('should pass the contenxt {foo: "bar"}', () => {
            expect(renderer.select('TEST_DIV')).text('bar');
        });

    });

    // this could not be done since react does not allow to pass Symbol properties
    // @see https://codepen.io/anon/pen/WZNmNX?editors=0010
    describe.skip('render with Symbol property', () => {
        const prop = Symbol();

        class Inner extends React.Component {
            public static contextTypes = {
                [prop]: PropTypes.string
            };
            public render() {
                return <div data-automation-id="TEST_DIV">{this.context[prop]}</div>;
            }
        }

        let renderer: any;
        let root: any;

        beforeEach(() => {
            const props = {
                [prop]: 'baz',
                qwe: 123
            };
            renderer = clientRenderer.render(
                <ContextProvider {...props}>
                    <Inner/>
                </ContextProvider>
            );
            root = findDOMNode(renderer.result as React.ReactInstance);
        });

        it('should pass the contenxt {[Symbol]: "baz"}', () => {
            expect(renderer.select('TEST_DIV')).text('baz');
        });

    });
});
