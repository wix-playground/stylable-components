import * as React from 'react';
import {
    ClientRenderer,
    expect,
    simulate,
    sinon
} from 'test-drive-react';

describe('Slottable Components', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('plain props', () => {
        it('should render in corresponding slots', async () => {

            class Slotted extends React.Component<{
                prefix: React.ReactNode,
                suffix: React.ReactNode
            }> {
                public render() {
                    const {children, prefix, suffix} = this.props;

                    return (
                        <div>
                            <div data-automation-id="slot-prefix">{prefix}</div>
                            {children}
                            <div data-automation-id="slot-suffix">{suffix}</div>
                        </div>
                    );
                }
            }

            const {select, waitForDom} = clientRenderer.render(
                <Slotted
                    prefix={<span data-automation-id="prefix">prefix</span>}
                    suffix={<span data-automation-id="suffix">suffix</span>}
                >
                    <span data-automation-id="content">content</span>
                </Slotted>
            );

            await waitForDom(() => {
                expect(select('slot-prefix', 'prefix'), 'prefix in slot').to.be.present();
                expect(select('slot-suffix', 'suffix'), 'suffix in slot').to.be.present();
                expect(select('content'), 'children').to.be.present();
            });

        });
    });

    describe('groupChildren', () => {
        let groupChildren: (slotNames: string[]) => {[S: string]: React.ReactNode};

        it('should exist', () => {
            expect(groupChildren).to.exist;
        });

        describe('component using [data-slot]', () => {
            class Slottable extends React.Component {
                groupChildren(slotNames: string[]): {[S: string]: React.ReactNode} {return {}; }
            }

            it('should render in corresponding slots', async () => {
                class Slotted extends Slottable {
                    public render() {
                        const {
                            prefix,
                            suffix,
                            children
                        } = this.groupChildren(['prefix', 'suffix']);

                        return (
                            <div>
                                <div data-automation-id="slot-prefix">{prefix}</div>
                                {children}
                                <div data-automation-id="slot-suffix">{suffix}</div>
                            </div>
                        );
                    }
                }

                const {select, waitForDom} = clientRenderer.render(
                    <Slotted>
                        <span data-slot="prefix" data-automation-id="prefix">prefix</span>
                        <span data-automation-id="content">content</span>
                        <span data-slot="suffix" data-automation-id="suffix">suffix</span>
                    </Slotted>
                );

                await waitForDom(() => {
                    expect(select('slot-prefix', 'prefix'), 'prefix in slot').to.be.present();
                    expect(select('slot-suffix', 'suffix'), 'suffix in slot').to.be.present();
                    expect(select('content'), 'children').to.be.present();
                });
            });
        });

        describe('<Slot name="slot-name" />', () => {
            class Slot extends React.Component<{name?: string}> {}

            it('should exist', async () => {
                const {select, waitForDom, result} = clientRenderer.render(<Slot />);

                await waitForDom(() => {
                    expect(result).to.exist;
                });

            });

            describe('component using <Slot />', () => {
                it('should render in corresponding slots', async () => {
                    class Slotted extends React.Component {
                        public render() {
                            const {
                                prefix,
                                suffix,
                                children
                            } = this.groupChildren(['prefix', 'suffix']);
                            return (
                                <div>
                                    <div data-automation-id="slot-prefix">{prefix}</div>
                                    {children}
                                    <div data-automation-id="slot-suffix">{suffix}</div>
                                </div>
                            );
                        }
                    }

                    const {select, waitForDom} = clientRenderer.render(
                        <Slotted>
                            <Slot name="prefix">
                                <span data-automation-id="prefix">prefix</span>
                            </Slot>
                            <span data-automation-id="content">content</span>
                            <Slot name="suffix">
                                <span data-automation-id="suffix">suffix</span>                        
                            </Slot>
                        </Slotted>
                    );

                    await waitForDom(() => {
                        expect(select('slot-prefix', 'prefix'), 'prefix in slot').to.be.present();
                        expect(select('slot-suffix', 'suffix'), 'suffix in slot').to.be.present();
                        expect(select('content'), 'children').to.be.present();
                    });
                });
            });
        });
    });

});
