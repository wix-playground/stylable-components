import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import {Slottable} from '../../src';

describe('Slottable', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('via props', () => {
        it('should render in corresponding slots', async () => {

            class Slotted extends Slottable<{}, {}, 'prefix' | 'suffix'> {
                render() {
                    const {children} = this.props;
                    const {prefix, suffix} = this.slots;

                    return <div>
                        <div>{prefix}</div>
                        {children}
                        <div>{suffix}</div>
                    </div>
                }
            }

            const {select, waitForDom} = clientRenderer.render(
                <Slotted
                    prefix={<span data-automation-id="prefix"></span>}
                    suffix={<span data-automation-id="suffix"></span>}
                >
                    <span data-automaion-id="content"></span>
                </Slotted>
            );

            await waitForDom(() => {
                expect(select('prefix')).to.be.present();
                expect(select('suffix')).to.be.present();
                expect(select('content')).to.be.present();
            });

        });
    });
});
