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
                contextProvider: PropTypes.shape({
                    dir: PropTypes.string
                })
            };
            public render() {
                return <div data-automation-id="TEST_DIV" dir={this.context.contextProvider.dir}/>;
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
        it('should pass "dir" as "contextProvider.dir" context property', () => {
            expect(renderer.select('TEST_DIV')).attr('dir', 'rtl');
        });
    });

    // this could not be done since react does not allow to pass Symbol properties
    // @see https://github.com/facebook/react/issues/7552
    describe.skip('render with Symbol property', () => {
        const prop = Symbol();

        class Inner extends React.Component {
            public static contextTypes = {
                contextProvider: PropTypes.shape({
                    [prop]: PropTypes.any
                })
            };
            public render() {
                return <div data-automation-id="TEST_DIV">{this.context.contextProvider[prop]}</div>;
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

        it('should pass the contenxt {contextProvider: {[Symbol]: "baz"}}', () => {
            expect(renderer.select('TEST_DIV')).text('baz');
        });

    });

    describe('nested contextProvider', () => {
        class Inner extends React.Component<{id: string}> {
            public static contextTypes = {
                contextProvider: PropTypes.shape({
                    dir: PropTypes.string,
                    x: PropTypes.number
                })
            };
            public render() {
                return (
                    <div
                        data-automation-id={this.props.id}
                        dir={this.context.contextProvider.dir}
                        children={this.context.contextProvider.x}
                    />
                );
            }
        }

        let inner1: any;
        let inner2: any;

        beforeEach(() => {
            const renderer = clientRenderer.render((
                <ContextProvider dir="ltr" x={10}>
                    <Inner id="TEST_DIV_1"/>
                    <ContextProvider dir="rtl" x={20}>
                        <Inner id="TEST_DIV_2"/>
                    </ContextProvider>
                </ContextProvider>
            ));
            inner1 = renderer.select('TEST_DIV_1');
            inner2 = renderer.select('TEST_DIV_2');
        });

        it('first Inner component should have dir="ltr', () => {
            expect(inner1).attr('dir', 'ltr');
        });
        it('first Inner component should have content "10"', () => {
            expect(inner1).text('10');
        });
        it('second Inner component should have dir="rtl', () => {
            expect(inner2).attr('dir', 'rtl');
        });
        it('second Inner component should have content "20"', () => {
            expect(inner2).text('20');
        });

    });
});
