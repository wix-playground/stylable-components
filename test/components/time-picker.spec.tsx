import * as keycode from 'keycode';
import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon} from 'test-drive-react';
import {TimePicker} from '../../src';
import styles from '../../src/components/time-picker/time-picker.st.css';
import {
    Ampm, formatTimeChunk, getCircularValue,
    isTouchTimeInputSupported, isValidValue, to24, toAmpm
} from '../../src/components/time-picker/utils';
import {hasCssState} from '../utils/has-css-state';

const describeNative = isTouchTimeInputSupported ? describe : describe.skip;
const describeDesktop = !isTouchTimeInputSupported ? describe : describe.skip;
const itDesktop = !isTouchTimeInputSupported ? it : it.skip;

describe('<TimePicker/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describeDesktop('render with format="ampm"', () => {
        let renderer: any;
        let hh: any;
        let mm: any;
        let placeholder: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="ampm"/>);
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            placeholder = renderer.select('TIME_PICKER_PLACEHOLDER');
        });
        it('should not render with placeholder', () => {
            expect(placeholder).to.be.null;
        });
        it('hh should not have value set', () => {
            expect(hh).attr('value', '');
        });
        it('hh should have placeholder "00"', () => {
            expect(hh).attr('placeholder', '00');
        });
        it('mm should not have value set', () => {
            expect(mm).attr('value', '');
        });
        it('mm should have placeholder "00"', () => {
            expect(mm).attr('placeholder', '00');
        });
    });
    describe('render with format="24h"', () => {
        let renderer: any;
        let hh: any;
        let mm: any;
        let placeholder: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="24h"/>);
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            placeholder = renderer.select('TIME_PICKER_PLACEHOLDER');
        });
        it('should not render with placeholder', () => {
            expect(placeholder).to.be.null;
        });
        it('hh should not have value set', () => {
            expect(hh).attr('value', '');
        });
        it('hh should have placeholder "00"', () => {
            expect(hh).attr('placeholder', '00');
        });
        it('mm should not have value set', () => {
            expect(mm).attr('value', '');
        });
        it('mm should have placeholder "00"', () => {
            expect(mm).attr('placeholder', '00');
        });
    });

    describe('render with value="4:36" format="ampm"', () => {
        let renderer: any;
        let hh: any;
        let mm: any;
        let ampm: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker value="4:36"/>);
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            ampm = renderer.select('TIME_PICKER_AMPM');
        });
        it('hh input should have "04" value', () => {
            expect(hh).attr('value', '04');
        });
        it('mm input should have "36" value', () => {
            expect(mm).attr('value', '36');
        });
        itDesktop('ampm should have "AM" value', () => {
            expect(ampm).text('AM');
        });
    });

    describe('render with placeholder="Enter Time"', () => {
        let renderer: any;
        let hh: any;
        let mm: any;
        let placeholder: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker placeholder="Enter Time"/>);
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            placeholder = renderer.select('TIME_PICKER_PLACEHOLDER');
        });
        it('placeholder should render with "Enter Time"', () => {
            expect(placeholder).text('Enter Time');
        });
        it('hh should not have value set', () => {
            expect(hh).attr('value', '');
        });
        it('mm should not have value set', () => {
            expect(mm).attr('value', '');
        });
    });

    describe('render with format="ampm" value="13:55"', () => {
        let renderer: any;
        let hh: any;
        let mm: any;
        let ampm: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="ampm" value="13:55"/>);
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            ampm = renderer.select('TIME_PICKER_AMPM');
        });

        describeDesktop('desktop', () => {
            it('hh input should have "01" value', () => {
                expect(hh).attr('value', '01');
            });
            it('mm input should have "55" value', () => {
                expect(mm).attr('value', '55');
            });
            it('ampm should have input "PM" value', function() {
                expect(ampm).text('PM');
            });
        });
        describeNative('mobile', () => {
            it('hh input should have "13" value', () => {
                expect(hh).attr('value', '13');
            });
            it('mm input should have "55" value', () => {
                expect(mm).attr('value', '55');
            });
        });
    });

    describe('render with format="24h" value="13:55"', () => {
        let renderer: any;
        let hh: any;
        let mm: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="24h" value="13:55"/>);
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
        });
        it('hh input should have "13" value', () => {
            expect(hh).attr('value', '13');
        });
        it('mm input should have "55" value', () => {
            expect(mm).attr('value', '55');
        });
    });

    describe('render with onChange={onChange} format="24h" value="13:55"', () => {
        let onChange: any;
        let renderer: any;
        let root: any;
        let hh: any;
        let mm: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="24h" value="13:55" onChange={onChange}/>);
            root = renderer.select('TIME_PICKER');
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
        });

        describe('entering "3" into hh segment', () => {
            beforeEach(() => {
                simulate.focus(hh);
                hh.value = '3';
                simulate.change(hh);
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true});
            });
            it('hh input should have "03" value', () => {
                expect(hh).attr('value', '03');
            });
            it('mm input should have "55" value', () => {
                expect(mm).attr('value', '55');
            });
            it('should move selection to mm segment', () => {
                expect(document.activeElement).to.equal(mm);
            });
            it('onChange should be callend with "03:55"', () => {
                expect(onChange).to.be.calledWithExactly('03:55');
            });
        });

        describe('entering "2" into hh segment', () => {
            beforeEach(async () => {
                simulate.focus(hh);
                hh.value = '2';
                simulate.change(hh);
            });
            it('hh input should have "2" value', () => {
                expect(hh).attr('value', '2');
            });
            it('mm input should have "55" value', () => {
                expect(mm).attr('value', '55');
            });
            it('should keep selection on hh segment', () => {
                expect(document.activeElement).to.equal(hh);
            });
            it('onChange should not be callen', async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                expect(onChange).to.not.be.called;
            });
        });

        describe('entering "7" into mm segment', () => {
            beforeEach(() => {
                simulate.focus(mm);
                mm.value = '7';
                simulate.change(mm);
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true});
            });
            it('hh input should have "13" value', () => {
                expect(hh).attr('value', '13');
            });
            it('mm input should have "07" value', () => {
                expect(mm).attr('value', '07');
            });
            it('should keep selection on mm segment', () => {
                expect(document.activeElement).to.equal(mm);
            });
            it('onChange should be callen with "13:07"', async () => {
                expect(onChange).to.be.calledWithExactly('13:07');
            });
        });

        describe('entering "5" into mm input', () => {
            beforeEach(() => {
                simulate.focus(mm);
                mm.value = '5';
                simulate.change(mm);
            });
            it('hh input should have "13" value', () => {
                expect(hh).attr('value', '13');
            });
            it('mm input should have "5" value', () => {
                expect(mm).attr('value', '5');
            });
            it('should keep selection on mm segment', () => {
                expect(document.activeElement).to.equal(mm);
            });
            it('onChange should not be callen', async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                expect(onChange).to.not.called;
            });
        });

        describe('backspace on mm segment', () => {
            beforeEach(() => {
                simulate.focus(mm);
                simulate.click(mm);
                simulate.keyDown(mm, {keyCode: keycode('backspace')});
            });
            it('hh input should have "13" value', () => {
                expect(hh).attr('value', '13');
            });
            it('mm input should have "00" value', () => {
                expect(mm).attr('value', '00');
            });
            it('should keep selection on mm segment', () => {
                expect(document.activeElement).to.equal(mm);
            });
        });
        describe('backspace x 2 on mm segment', () => {
            beforeEach(() => {
                simulate.focus(mm);
                simulate.click(mm);
                simulate.keyDown(mm, {keyCode: keycode('backspace')});
                simulate.keyDown(mm, {keyCode: keycode('backspace')});
            });
            it('hh input should have "13" value', () => {
                expect(hh).attr('value', '13');
            });
            it('mm input should have "00" value', () => {
                expect(mm).attr('value', '00');
            });
            it('should move selection on hh segment', () => {
                expect(document.activeElement).to.equal(mm);
            });
        });

        describe('arrow down on hh segment', () => {
            beforeEach(() => {
                simulate.focus(hh);
                simulate.click(hh);
                simulate.keyDown(hh, {keyCode: keycode('down')});
            });
            it('hh input should have "12" value', () => {
                expect(hh).attr('value', '12');
            });
            it('onChange should be callen with "12:55"', async () => {
                expect(onChange).to.be.calledWithExactly('12:55');
            });
        });

        describe('arrow up on hh segment', () => {
            beforeEach(() => {
                simulate.focus(hh);
                simulate.click(hh);
                simulate.keyDown(hh, {keyCode: keycode('up')});
            });
            it('hh input should have "14" value', () => {
                expect(hh).attr('value', '14');
            });
            it('onChange should be callen with "14:55"', async () => {
                expect(onChange).to.be.calledWithExactly('14:55');
            });
        });

        describe('arrow down on mm segment', () => {
            beforeEach(() => {
                simulate.focus(mm);
                simulate.click(mm);
                simulate.keyDown(mm, {keyCode: keycode('down')});
            });
            it('mm input should have "54" value', () => {
                expect(mm).attr('value', '54');
            });
            it('onChange should be callen with "13:54"', async () => {
                expect(onChange).to.be.calledWithExactly('13:54');
            });
        });

        describe('arrow up on mm segment', () => {
            beforeEach(() => {
                simulate.focus(mm);
                simulate.click(mm);
                simulate.keyDown(mm, {keyCode: keycode('up')});
            });
            it('mm input should have "56" value', () => {
                expect(mm).attr('value', '56');
            });
            it('onChange should be callen with "13:56"', async () => {
                expect(onChange).to.be.calledWithExactly('13:56');
            });
        });

    });

    describe.only('render with onChange={onChange} format="24h" value="13:59"', () => {
        let onChange: any;
        let renderer: any;
        let hh: any;
        let mm: any;
        let stepperIncrement: any;
        let stepperDecrement: any;

        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="24h" value="13:59" onChange={onChange}/>);
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            stepperIncrement = renderer.select('STEPPER_INCREMENT');
            stepperDecrement = renderer.select('STEPPER_DECREMENT');
        });

        describe('arrow up on mm segment', () => {
            beforeEach(() => {
                simulate.focus(mm);
                simulate.click(mm);
                simulate.keyDown(mm, {keyCode: keycode('up')});
            });
            it('mm input should have "00" value', () => {
                expect(mm).attr('value', '00');
            });
            it('onChange should be callen with "13:00"', async () => {
                expect(onChange).to.be.calledWithExactly('13:00');
            });
        });

        describe('arrow shift + up on mm segment', () => {
            beforeEach(() => {
                simulate.focus(mm);
                simulate.click(mm);
                simulate.keyDown(mm, {keyCode: keycode('up'), shiftKey: true});
            });
            it('mm input should have "09" value', () => {
                expect(mm).attr('value', '09');
            });
            it('onChange should be callen with "13:09"', async () => {
                expect(onChange).to.be.calledWithExactly('13:09');
            });
        });


        describe('arrow shift + down on mm segment', () => {
            beforeEach(() => {
                simulate.focus(mm);
                simulate.click(mm);
                simulate.keyDown(mm, {keyCode: keycode('down'), shiftKey: true});
            });
            it('mm input should have "49" value', () => {
                expect(mm).attr('value', '49');
            });
            it('onChange should be callen with "13:49"', async () => {
                expect(onChange).to.be.calledWithExactly('13:49');
            });
        });


        describe('arrow shift + up on hh segment', () => {
            beforeEach(() => {
                simulate.focus(hh);
                simulate.click(hh);
                simulate.keyDown(mm, {keyCode: keycode('up'), shiftKey: true});
            });
            it('hh input should have "14" value', () => {
                expect(hh).attr('value', '14');
            });
            it('onChange should be callen with "14:59"', async () => {
                expect(onChange).to.be.calledWithExactly('14:59');
            });
        });

        describe('arrow shift + down on hh segment', () => {
            beforeEach(() => {
                simulate.focus(hh);
                simulate.click(hh);
                simulate.keyDown(mm, {keyCode: keycode('down'), shiftKey: true});
            });
            it('hh input should have "12" value', () => {
                expect(hh).attr('value', '12');
            });
            it('onChange should be callen with "12:59"', async () => {
                expect(onChange).to.be.calledWithExactly('12:59');
            });
        });

        describe('shift + stepper up (mm focus)', () => {
            beforeEach(() => {
                simulate.focus(mm);
                simulate.click(mm);
                simulate.click(stepperIncrement, {shiftKey: true});
            });
            it('mm input should have "09" value', () => {
                expect(mm).attr('value', '09');
            });
            it('onChange should be callen with "13:09"', async () => {
                expect(onChange).to.be.calledWithExactly('13:09');
            });
        });

        describe('shift + stepper down (mm focus)', () => {
            beforeEach(() => {
                simulate.focus(mm);
                simulate.click(mm);
                simulate.click(stepperDecrement, {shiftKey: true});
            });
            it('mm input should have "49" value', () => {
                expect(mm).attr('value', '49');
            });
            it('onChange should be callen with "13:49"', async () => {
                expect(onChange).to.be.calledWithExactly('13:49');
            });
        });

        describe('shift + stepper up (hh focus)', () => {
            beforeEach(() => {
                simulate.focus(hh);
                simulate.click(hh);
                simulate.click(stepperIncrement, {shiftKey: true});
            });
            it('hh input should have "14" value', () => {
                expect(hh).attr('value', '14');
            });
            it('onChange should be callen with "14:59"', async () => {
                expect(onChange).to.be.calledWithExactly('14:59');
            });
        });

        describe('shift + stepper down (hh focus)', () => {
            beforeEach(() => {
                simulate.focus(hh);
                simulate.click(hh);
                simulate.click(stepperDecrement, {shiftKey: true});
            });
            it('hh input should have "12" value', () => {
                expect(hh).attr('value', '12');
            });
            it('onChange should be callen with "12:59"', async () => {
                expect(onChange).to.be.calledWithExactly('12:59');
            });
        });


    });

    describe('render with format="24h" value="01:55"', () => {
        let renderer: any;
        let root: any;
        let hh: any;
        let mm: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="24h" value="01:55"/>);
            root = renderer.select('TIME_PICKER');
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
        });

        describe('entering "1" into hh segment', () => {
            beforeEach(() => {
                simulate.focus(hh);
                hh.value = '1';
                simulate.change(hh);
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true});
            });
            it('hh input should have "1" value', () => {
                expect(hh).attr('value', '1');
            });
            it('mm input should have "55" value', () => {
                expect(mm).attr('value', '55');
            });
            it('should keep curson in hh segment', () => {
                expect(document.activeElement).to.equal(hh);
            });
        });
    });

    describeNative('render with value="01:59" format="ampm" (touch)', () => {
        let renderer: any;
        let stepperIncrement: any;
        let stepperDecrement: any;

        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="ampm" value="01:59"/>);
            stepperIncrement = renderer.select('STEPPER_INCREMENT');
            stepperDecrement = renderer.select('STEPPER_DECREMENT');
        });
        it ('should not render stepperIncrement', () => {
            expect(stepperIncrement).to.be.null;
        });
        it ('should not render stepperDecrement', () => {
            expect(stepperDecrement).to.be.null;
        });
    });

    describe('render with onChange={onChange} format="ampm" value="04:55"', () => {
        let onChange: any;
        let renderer: any;
        let root: any;
        let hh: any;
        let mm: any;
        let ampm: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="ampm" value="04:55" onChange={onChange}/>);
            root = renderer.select('TIME_PICKER');
            hh = renderer.select('TIME_PICKER_INPUT_HH');
            mm = renderer.select('TIME_PICKER_INPUT_MM');
            ampm = renderer.select('TIME_PICKER_AMPM');
        });
        describe('entering "3" into mm segment', () => {
            beforeEach(() => {
                simulate.focus(mm);
                mm.value = '3';
                simulate.change(mm);
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true});
            });
            it('hh input should have "04" value', () => {
                expect(hh).attr('value', '04');
            });
            it('mm input should have "3" value', () => {
                expect(mm).attr('value', '3');
            });
            itDesktop('ampm should have "AM" value', function() {
                expect(ampm).text('AM');
            });
            it('should keep selection on mm segment', () => {
                expect(document.activeElement).to.equal(mm);
            });
            it('onChange should not be callen', async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                expect(onChange).to.not.be.called;
            });
        });

        describe('entering "7" into mm segment', () => {
            beforeEach(() => {
                simulate.focus(mm);
                mm.value = '7';
                simulate.change(mm);
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true});
            });
            it('hh input should have "04" value', () => {
                expect(hh).attr('value', '04');
            });
            it('mm input should have "07" value', () => {
                expect(mm).attr('value', '07');
            });
            itDesktop('ampm should have "AM" value', () => {
                expect(ampm).text('AM');
            });
            itDesktop('should move selection on ampm segment', () => {
                expect(document.activeElement).to.equal(ampm);
            });
            it('onChange should be callen with "04:07"', async () => {
                expect(onChange).to.be.calledWithExactly('04:07');
            });
        });

        describeDesktop('focus and change ampm input', () => {
            beforeEach(() => {
                simulate.focus(ampm);
                simulate.keyDown(ampm, {keyCode: keycode('space')});
            });
            it('onChange should be callen with "16:55"', () => {
                expect(onChange).to.be.calledWithExactly('16:55');
            });
        });
    });

});

describe('TimePicker/utils', () => {
    describe('formatTimeChunk()', () => {
        it('""', () => {
            expect(formatTimeChunk('')).to.equal('00');
        });
        it('"1"', () => {
            expect(formatTimeChunk('1')).to.equal('01');
        });
        it('"12"', () => {
            expect(formatTimeChunk('12')).to.equal('12');
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
    describe('getCircularValue', () => {
        it('55 minites = 55', () => {
            expect(getCircularValue('mm', 55, Ampm.NONE)).to.equal(55);
        });
        it('60 minites = 0', () => {
            expect(getCircularValue('mm', 60, Ampm.NONE)).to.equal(0);
        });
        it('-5 minites = 55', () => {
            expect(getCircularValue('mm', -5, Ampm.NONE)).to.equal(55);
        });
        it('13 hh AM = 1', () => {
            expect(getCircularValue('hh', 13, Ampm.AM)).to.equal(1);
        });
        it('13 hh = 13', () => {
            expect(getCircularValue('hh', 13, Ampm.NONE)).to.equal(13);
        });
        it('24 hh AM = 12', () => {
            expect(getCircularValue('hh', 12, Ampm.AM)).to.equal(12);
        });
        it('24 hh = 0', () => {
            expect(getCircularValue('hh', 24, Ampm.NONE)).to.equal(0);
        });
        it('-2 hh = 22', () => {
            expect(getCircularValue('hh', -2, Ampm.NONE)).to.equal(22);
        });
    });
});
