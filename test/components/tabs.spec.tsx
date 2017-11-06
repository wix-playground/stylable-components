import * as React from 'react';

import {codes as KeyCodes} from 'keycode';
import {ClientRenderer, expect, sinon} from 'test-drive-react';
import {ContextProvider} from '../../src/components/context-provider';
import {Tab, Tabs} from '../../src/components/tabs';
import {RTLTabsDriver, TabsDriver} from '../../test-kit';

function assertOnChange(
    onChange: sinon.SinonSpy,
    expectedValue?: string
): void {
    expect(onChange).to.have.been.calledOnce;
    expect(onChange.lastCall.args[0]).to.deep.eq({value: expectedValue});
}

describe('<Tabs />', () => {
    const clientRenderer = new ClientRenderer();
    const render = (component: React.ReactElement<any>) =>
        clientRenderer
            .render(component)
            .withDriver(TabsDriver);
    const renderRTL = (component: React.ReactElement<any>) =>
        clientRenderer
            .render(<ContextProvider dir="rtl">{component}</ContextProvider>)
            .withDriver(RTLTabsDriver);
    afterEach(() => clientRenderer.cleanup());

    it('should render a tabList and a tabPanel', () => {
        const {driver} = render(
            <Tabs>
                <Tab label={<span data-automation-id="TAB_1">Tab One</span>}>
                    Tab One Content
                </Tab>
                <Tab label={<span data-automation-id="TAB_2">Tab Two</span>}>
                    Tab Two Content
                </Tab>
            </Tabs>
        );

        expect(driver.tabList).to.be.present();
        expect(driver.selectTabItem('TAB_1')).to.be.present();
        expect(driver.selectTabItem('TAB_2')).to.be.present();
        expect(driver.tabPanel).to.be.present();
    });

    describe('vertical', () => {
        describe('up key', () => {
            it('should select previous tab', () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="vertical-before" value="1" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.up);

                assertOnChange(onChange, '0');
            });

            it('should select the last selectable tab if the first tab is selected', () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="vertical-before" value="0" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                        <Tab label="Tab Three" value="2">
                            <span data-automation-id="THIRD_TAB">Tab Three Content</span>
                        </Tab>
                        <Tab label="Tab Four" value="3" disabled>
                            <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.up);

                assertOnChange(onChange, '2');
            });

            describe('shift modifier', () => {
                it('should select the first selectable tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = render(
                        <Tabs orientation="vertical-before" value="3" onChange={onChange}>
                            <Tab label="Tab One" value="0" disabled>
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="SECOND_TAB">Tab Three Content</span>
                            </Tab>
                            <Tab label="Tab Four" value="3">
                                <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.up, {shiftKey: true});

                    assertOnChange(onChange, '1');
                });

                it('should not select when already on the first tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = render(
                        <Tabs orientation="vertical-before" value="0" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="SECOND_TAB">Tab Three Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.up, {shiftKey: true});

                    expect(onChange).not.to.have.been.called;
                });
            });
        });

        describe('down key', () => {
            it('should select previous tab', () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="vertical-before" value="0" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.down);

                assertOnChange(onChange, '1');
            });

            it('should select the first selectable tab if the last tab is selected', () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="vertical-before" value="3" onChange={onChange}>
                        <Tab label="Tab One" value="0" disabled>
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                        <Tab label="Tab Three" value="2">
                            <span data-automation-id="THIRD_TAB">Tab Three Content</span>
                        </Tab>
                        <Tab label="Tab Four" value="3">
                            <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.down);

                assertOnChange(onChange, '1');
            });

            describe('shift modifier', () => {
                it('should select the last selectable tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = render(
                        <Tabs orientation="vertical-before" value="0" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="SECOND_TAB">Tab Three Content</span>
                            </Tab>
                            <Tab label="Tab Four" value="3" disabled>
                                <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.down, {shiftKey: true});

                    assertOnChange(onChange, '2');
                });

                it('should not select when already on the last tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = render(
                        <Tabs orientation="vertical-before" value="2" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="SECOND_TAB">Tab Three Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.down, {shiftKey: true});

                    expect(onChange).not.to.have.been.called;
                });
            });

        });
    });

    describe('horizontal', () => {
        describe('left key', () => {
            it('should select previous tab', () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="horizontal-top" value="1" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.left);

                assertOnChange(onChange, '0');
            });

            it('should select the last selectable tab if the first tab is selected', () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="horizontal-top" value="0" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                        <Tab label="Tab Three" value="2">
                            <span data-automation-id="THIRD_TAB">Tab Three Content</span>
                        </Tab>
                        <Tab label="Tab Four" value="3" disabled>
                            <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.left);

                assertOnChange(onChange, '2');
            });

            describe('shift modifier', () => {
                it('should select the first selectable tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = render(
                        <Tabs orientation="horizontal-top" value="3" onChange={onChange}>
                            <Tab label="Tab One" value="0" disabled>
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="THIRD_TAB">Tab Three Content</span>
                            </Tab>
                            <Tab label="Tab Four" value="3">
                                <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.left, {shiftKey: true});

                    assertOnChange(onChange, '1');
                });

                it('should not select when already on the first tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = render(
                        <Tabs orientation="horizontal-top" value="0" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="SECOND_TAB">Tab Three Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.left, {shiftKey: true});

                    expect(onChange).not.to.have.been.called;
                });
            });
        });

        describe('right key', () => {
            it('should select next tab', () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="horizontal-top" value="0" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.right);

                assertOnChange(onChange, '1');
            });

            it('should select the first selectable tab if the last tab is selected', () => {
                const onChange = sinon.spy();
                const {driver} = render(
                    <Tabs orientation="horizontal-top" value="3" onChange={onChange}>
                        <Tab label="Tab One" value="0" disabled>
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                        <Tab label="Tab Three" value="2">
                            <span data-automation-id="THIRD_TAB">Tab Three Content</span>
                        </Tab>
                        <Tab label="Tab Four" value="3">
                            <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.right);

                assertOnChange(onChange, '1');
            });

            describe('shift modifier', () => {
                it('should select the last selectable tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = render(
                        <Tabs orientation="horizontal-top" value="0" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="THIRD_TAB">Tab Three Content</span>
                            </Tab>
                            <Tab label="Tab Four" value="3" disabled>
                                <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.right, {shiftKey: true});

                    assertOnChange(onChange, '2');
                });

                it('should not select when already on the last tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = render(
                        <Tabs orientation="horizontal-top" value="2" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="SECOND_TAB">Tab Three Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.right, {shiftKey: true});

                    expect(onChange).not.to.have.been.called;
                });
            });
        });

    });

    describe('horizontal RTL', () => {
        describe('left key', () => {
            it('should select next tab', () => {
                const onChange = sinon.spy();
                const {driver} = renderRTL(
                    <Tabs orientation="horizontal-top" value="0" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.left);

                assertOnChange(onChange, '1');
            });

            it('should select the first selectable tab if the last tab is selected', () => {
                const onChange = sinon.spy();
                const {driver} = renderRTL(
                    <Tabs orientation="horizontal-top" value="3" onChange={onChange}>
                        <Tab label="Tab One" value="0" disabled>
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                        <Tab label="Tab Three" value="2">
                            <span data-automation-id="THIRD_TAB">Tab Three Content</span>
                        </Tab>
                        <Tab label="Tab Four" value="3">
                            <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.left);

                assertOnChange(onChange, '1');
            });

            describe('shift modifier', () => {
                it('should select the last selectable tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = renderRTL(
                        <Tabs orientation="horizontal-top" value="0" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="THIRD_TAB">Tab Three Content</span>
                            </Tab>
                            <Tab label="Tab Four" value="3" disabled>
                                <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.left, {shiftKey: true});

                    assertOnChange(onChange, '2');
                });

                it('should not select when already on the last tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = renderRTL(
                        <Tabs orientation="horizontal-top" value="2" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="SECOND_TAB">Tab Three Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.left, {shiftKey: true});

                    expect(onChange).not.to.have.been.called;
                });
            });
        });

        describe('right key', () => {
            it('should select previous tab', () => {
                const onChange = sinon.spy();
                const {driver} = renderRTL(
                    <Tabs orientation="horizontal-top" value="1" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.right);

                assertOnChange(onChange, '0');
            });

            it('should select the last selectable tab if the first tab is selected', () => {
                const onChange = sinon.spy();
                const {driver} = renderRTL(
                    <Tabs orientation="horizontal-top" value="0" onChange={onChange}>
                        <Tab label="Tab One" value="0">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two" value="1">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                        <Tab label="Tab Three" value="2">
                            <span data-automation-id="THIRD_TAB">Tab Three Content</span>
                        </Tab>
                        <Tab label="Tab Four" value="3" disabled>
                            <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                        </Tab>
                    </Tabs>
                );

                driver.tabListFocus();
                driver.tabListKeyDown(KeyCodes.right);

                assertOnChange(onChange, '2');
            });

            describe('shift modifier', () => {
                it('should select the first selectable tab', () => {
                    const onChange = sinon.spy();
                    const {driver} = renderRTL(
                        <Tabs orientation="horizontal-top" value="3" onChange={onChange}>
                            <Tab label="Tab One" value="0" disabled>
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="THIRD_TAB">Tab Three Content</span>
                            </Tab>
                            <Tab label="Tab Four" value="3">
                                <span data-automation-id="FOURTH_TAB">Tab Four Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.right, {shiftKey: true});

                    assertOnChange(onChange, '1');
                });

                it('should not select when the first tab is selected', () => {
                    const onChange = sinon.spy();
                    const {driver} = renderRTL(
                        <Tabs orientation="horizontal-top" value="0" onChange={onChange}>
                            <Tab label="Tab One" value="0">
                                <span data-automation-id="FIRST_TAB">Tab One Content</span>
                            </Tab>
                            <Tab label="Tab Two" value="1">
                                <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                            </Tab>
                            <Tab label="Tab Three" value="2">
                                <span data-automation-id="SECOND_TAB">Tab Three Content</span>
                            </Tab>
                        </Tabs>
                    );

                    driver.tabListFocus();
                    driver.tabListKeyDown(KeyCodes.right, {shiftKey: true});

                    expect(onChange).not.to.have.been.called;
                });
            });
        });

    });

    describe('uncontrolled', () => {
        describe('defaultValue', () => {
            it('should render corresponding tab as active', () => {
                const {driver} = render(
                    <Tabs defaultValue="1">
                        <Tab label="Tab One">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );
                expect(driver.selectTabContent('FIRST_TAB')).not.to.be.present();
                expect(driver.selectTabContent('SECOND_TAB')).to.be.present();
            });

            it('should render the first tab as active when undefined', async () => {
                const {driver} = render(
                    <Tabs>
                        <Tab label="Tab One">
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </Tab>
                        <Tab label="Tab Two">
                            <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                        </Tab>
                    </Tabs>
                );

                expect(driver.selectTabContent('FIRST_TAB')).to.be.present();
                expect(driver.selectTabContent('SECOND_TAB')).not.to.be.present();
            });
        });

        it('should change tabs on user interactions', () => {
            const {driver} = render(
                <Tabs defaultValue="0">
                    <Tab label="Tab One">
                        <span data-automation-id="FIRST_TAB">Tab One Content</span>
                    </Tab>
                    <Tab label="Tab Two">
                        <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                    </Tab>
                </Tabs>
            );

            expect(
                driver.selectTabContent('FIRST_TAB'),
                'initial: first tab is active'
            ).to.be.present();
            expect(
                driver.selectTabContent('SECOND_TAB'),
                'initial: second tab is not active'
            ).not.to.be.present();

            driver.tabListFocus();
            driver.tabListKeyDown(KeyCodes.right);
            driver.tabListPressEnter();

            expect(
                driver.selectTabContent('FIRST_TAB'),
                'result: first tab is active'
            ).not.to.be.present();
            expect(
                driver.selectTabContent('SECOND_TAB'),
                'result: second tab is not active'
            ).to.be.present();
        });
    });

    describe('unmountInactiveTabs', () => {
        it('should not unmount inactive tabs', () => {
            class TrackMount extends React.Component<{onUnmount: () => void}> {
                public componentWillUnmount() {
                    this.props.onUnmount();
                }
                public render() {
                    return React.Children.only(this.props.children);
                }
            }
            const onUnmount = sinon.spy();
            const {driver} = render(
                <Tabs unmountInactiveTabs={false}>
                    <Tab label="Tab One">
                        <TrackMount onUnmount={onUnmount}>
                            <span data-automation-id="FIRST_TAB">Tab One Content</span>
                        </TrackMount>
                    </Tab>
                    <Tab label="Tab Two">
                        <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                    </Tab>
                </Tabs>
            );

            driver.tabListFocus();
            driver.tabListKeyDown(KeyCodes.right);
            driver.tabListPressEnter();

            expect(onUnmount).not.to.have.been.called;
            expect(driver.selectTabContent('FIRST_TAB')).not.to.be.present();
            expect(driver.selectTabContent('SECOND_TAB')).to.be.present();
        });
    });

    describe('focus', () => {
        it('should select the first selectable tab when no tabs are selected', () => {
            const onChange = sinon.spy();
            const {driver} = render(
                <Tabs orientation="horizontal-top" value="" onChange={onChange}>
                    <Tab label="Tab One" value="0">
                        <span data-automation-id="FIRST_TAB">Tab One Content</span>
                    </Tab>
                    <Tab label="Tab Two" value="1">
                        <span data-automation-id="SECOND_TAB">Tab Two Content</span>
                    </Tab>
                    <Tab label="Tab Three" value="2">
                        <span data-automation-id="SECOND_TAB">Tab Three Content</span>
                    </Tab>
                </Tabs>
            );

            driver.tabListFocus();
            assertOnChange(onChange, '0');
        });
    });
});
