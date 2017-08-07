import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {TimePicker} from '../../src';
import {hasCssState} from '../utils/has-css-state';
import styles from '../../src/components/time-picker/time-picker.st.css';

describe.only('<TimePicker/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('render without options', () => {
        let renderer: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker/>);
        });
        it('should render hh input with "––" placeholder', () => {
            expect(renderer.select('TIME_PICKER_HH')).attr('placeholder', '––');
        });
        it('should render mm input with "––" placeholder', () => {
            expect(renderer.select('TIME_PICKER_MM')).attr('placeholder', '––');
        });
    });

    describe('render with value="4:36"', () => {
        let renderer: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker value='4:36'/>);
        });
        it('should have "04" hours', () => {
            expect(renderer.select('TIME_PICKER_HH')).attr('value', '04');
        });
        it('should have "36" minutes', () => {
            expect(renderer.select('TIME_PICKER_MM')).attr('value', '36');
        });
    });

    describe('render with placeholder="Enter Time"', () => {
        let renderer: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker placeholder="Enter Time"/>);
        });
        it('should render hh input with placeholder', () => {
            expect(renderer.select('TIME_PICKER_HH')).attr('placeholder', 'Enter Time');
        });
        it('should not render mm input', () => {
            expect(renderer.select('TIME_PICKER_MM')).to.be.null;
        });
    });

    describe('render with use12Hours={true} value="13:55"', () => {
        let renderer: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker use12Hours value="13:55"/>);
        });
        it('should have "01" hours', () => {
            expect(renderer.select('TIME_PICKER_HH')).attr('value', '01');
        });
        it('should have "55" minutes', () => {
            expect(renderer.select('TIME_PICKER_MM')).attr('value', '55');
        });
        it('should have AMPM input with "PM" value', () => {
            expect(renderer.select('TIME_PICKER_AMPM_INPUT')).attr('value', 'PM');
        });
    });

    describe('render with use12Hours={false} value="13:55"', () => {
        let renderer: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker use12Hours={false} value="13:55"/>);
        });
        it('should have "13" hours', () => {
            expect(renderer.select('TIME_PICKER_HH')).attr('value', '13');
        });
        it('should have "55" minutes', () => {
            expect(renderer.select('TIME_PICKER_MM')).attr('value', '55');
        });
        it('should not render AMPM input', () => {
            expect(renderer.select('TIME_PICKER_AMPM_INPUT')).to.be.null;
        });
    });

    describe('render with onChange', () => {
        let onChange: any;
        let renderer: any;
        let root: any;
        let hhInput: any;
        let mmInput: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker use12Hours={false} value="13:55" onChange={onChange}/>);
            root = renderer.select('TIME_PICKER');
            hhInput = renderer.select('TIME_PICKER_HH');
            mmInput = renderer.select('TIME_PICKER_MM');
        });

        describe('entering "3" into hh input', () => {
            beforeEach(() => {
                simulate.focus(hhInput);
                hhInput.value = '3';
                simulate.change(hhInput);
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true})
            });
            it('hh input should have "03" value', () => {
                expect(hhInput).attr('value', '03');
            });
            it('should move focus to mm input', () => {
                expect(document.activeElement).to.equal(mmInput, 'mm input has no focus');
            });
            it('onChange should be callend with "03:55"', () => {
                expect(onChange).to.be.calledWithExactly('03:55');
            });
        });

        describe('entering "2" into hh input', () => {
            beforeEach(() => {
                simulate.focus(hhInput);
                hhInput.value = '2';
                simulate.change(hhInput);
            });
            it('hh input should have "2" value', () => {
                expect(hhInput).attr('value', '2');
            });
            it('hh input should wait for input (to keep focus)', () => {
                expect(document.activeElement).to.equal(hhInput, 'hh input has no focus');
            });
            it('onChange should not be callen', async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                expect(onChange).to.not.be.called;
            });
        });

        describe('entering "7" into mm input', () => {
            beforeEach(() => {
                simulate.focus(mmInput);
                mmInput.value = '7';
                simulate.change(mmInput);
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true})
            });
            it('mm input should have "07" value', () => {
                expect(mmInput).attr('value', '07');
            });
            it('mm input should keep focus', () => {
                expect(document.activeElement).to.equal(mmInput, 'mm input has no focus');
            });
            it('onChange should be callen with "13:07"', async () => {
                expect(onChange).to.be.calledWithExactly('13:07');
            });
        });

        describe('entering "5" into mm input', () => {
            beforeEach(() => {
                simulate.focus(mmInput);
                mmInput.value = '5';
                simulate.change(mmInput);
            });
            it('mm input should have "5" value', () => {
                expect(mmInput).attr('value', '5');
            });
            it('mm input should keep focus', () => {
                expect(document.activeElement).to.equal(mmInput, 'mm input has no focus');
            });
            it('onChange should not be callen', async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                expect(onChange).to.not.called;
            });
        });

    });

});

describe('TimePicker/utils', () => {
    describe('pad2()', () => {

    })
    describe('to24()', () => {
    })
    describe('toAmpm()', () => {
    })
    describe('isValidValue()', () => {

    })
})
