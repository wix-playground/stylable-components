import * as React from 'react';
import * as keycode from 'keycode';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {TimePicker} from '../../src';
import {hasCssState} from '../utils/has-css-state';
import styles from '../../src/components/time-picker/time-picker.st.css';
import {pad2, to24, toAmpm, isValidValue, Ampm} from '../../src/components/time-picker/utils';

describe('<TimePicker/>', () => {
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

    describe('render with onChange={onChange} use12Hours={false}', () => {
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

        describe('backspace on mm input', () => {
            beforeEach(() => {
                simulate.focus(mmInput);
                mmInput.value = '';
                simulate.change(mmInput);
                simulate.keyDown(mmInput, {keyCode: keycode('backspace')});
            });
            it('mm input should have "00" value', async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                expect(mmInput).attr('value', '00');
            });
            it('should move focus to hh input', () => {
                expect(document.activeElement).to.equal(hhInput, 'hh input has no focus');
            });
        });

    });
    describe('render with onChange={onChange} use12Hours={true}', () => {
        let onChange: any;
        let renderer: any;
        let root: any;
        let hhInput: any;
        let mmInput: any;
        let ampmInput: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker use12Hours={true} value="04:55" onChange={onChange}/>);
            root = renderer.select('TIME_PICKER');
            hhInput = renderer.select('TIME_PICKER_HH');
            mmInput = renderer.select('TIME_PICKER_MM');
            ampmInput = renderer.select('TIME_PICKER_AMPM_INPUT');
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
            it('should move focus to ampm input', () => {
                expect(document.activeElement).to.equal(ampmInput, 'ampm input has no focus');
            });
            it('onChange should be callen with "04:07"', async () => {
                expect(onChange).to.be.calledWithExactly('04:07');
            });
        });

        describe('focus and change ampm input', () => {
            beforeEach(() => {
                simulate.focus(ampmInput);
                simulate.keyDown(ampmInput, {keyCode: keycode('space')});
            });
            it('onChange should be callen with "16:55"', () => {
                expect(onChange).to.be.calledWithExactly('16:55');
            });
        });
    });

});

describe('TimePicker/utils', () => {
    describe('pad2()', () => {
        it('""', () => {
            expect(pad2('')).to.equal('00');
        });
        it('"1"', () => {
            expect(pad2('1')).to.equal('01');
        });
        it('"12"', () => {
            expect(pad2('12')).to.equal('12');
        });
    });
    describe('to24()', () => {
        it('12 AM = 0', () => {
            expect(to24(12, Ampm.AM)).to.equal(0);
        });
        it('1 AM = 1', () => {
            expect(to24(1, Ampm.AM)).to.equal(1);
        });
        it('12 PM = 12', () => {
            expect(to24(12, Ampm.PM)).to.equal(12);
        });
        it('11 PM = 23', () => {
            expect(to24(11, Ampm.PM)).to.equal(23);
        });
    });
    describe('toAmpm()', () => {
        it('0 = 12 AM', () => {
            expect(toAmpm(0)).to.deep.equal({hh: 12, ampm: Ampm.AM});
        });
        it('1 = 1 AM', () => {
            expect(toAmpm(1)).to.deep.equal({hh: 1, ampm: Ampm.AM});
        });
        it('12 = 12 PM', () => {
            expect(toAmpm(12)).to.deep.equal({hh: 12, ampm: Ampm.PM});
        });
        it('15 = 3 PM', () => {
            expect(toAmpm(15)).to.deep.equal({hh: 3, ampm: Ampm.PM});
        });
    });
    describe('isValidValue()', () => {
        it('11:00 AM = true', () => {
            expect(isValidValue(11, 'hh', Ampm.AM)).to.equal(true);
        });
        it('11:00 PM = true', () => {
            expect(isValidValue(11, 'hh', Ampm.PM)).to.equal(true);
        });
        it('13:00 PM = false', () => {
            expect(isValidValue(13, 'hh', Ampm.PM)).to.equal(false);
        });
        it('13:00 = true', () => {
            expect(isValidValue(13, 'hh', Ampm.NONE)).to.equal(true);
        });
        it('25:00 = false', () => {
            expect(isValidValue(25, 'hh', Ampm.NONE)).to.equal(false);
        });
        it('11:25 = true', () => {
            expect(isValidValue(25, 'mm', Ampm.NONE)).to.equal(true);
        });
        it('11:65 = false', () => {
            expect(isValidValue(65, 'mm', Ampm.NONE)).to.equal(false);
        });
    });
});
