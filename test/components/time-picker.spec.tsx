import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon} from 'test-drive-react';
import {TimePickerDemo} from '../../demo/components/time-picker-demo';
import {TimePicker} from '../../src';
import {
    formatTimeChunk,
    isTouchTimeInputSupported, isValidValue, to24, toAmpm
} from '../../src/components/time-picker/utils';
import {TimePickerDriver} from '../../test-kit';

const describeNative = isTouchTimeInputSupported ? describe : describe.skip;
const describeDesktop = !isTouchTimeInputSupported ? describe : describe.skip;
const itDesktop = !isTouchTimeInputSupported ? it : it.skip;
const itNative = isTouchTimeInputSupported ? it : it.skip;

describe('<TimePicker/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describeDesktop('render with format="ampm"', () => {
        let renderer: any;
        let hh: any;
        let mm: any;
        let placeholder: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="ampm"/>).withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
            placeholder = renderer.driver.placeholder;
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
            renderer = clientRenderer.render(<TimePicker format="24h"/>).withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
            placeholder = renderer.driver.placeholder;
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
            renderer = clientRenderer.render(<TimePicker value="4:36" format="ampm" />).withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
            ampm = renderer.driver.ampm;
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
            renderer = clientRenderer.render(<TimePicker placeholder="Enter Time"/>).withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
            placeholder = renderer.driver.placeholder;
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
            renderer = clientRenderer.render(<TimePicker format="ampm" value="13:55"/>).withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
            ampm = renderer.driver.ampm;
        });

        describeDesktop('desktop', () => {
            it('hh input should have "01" value', () => {
                expect(hh).attr('value', '01');
            });
            it('mm input should have "55" value', () => {
                expect(mm).attr('value', '55');
            });
            it('ampm should have input "PM" value', () => {
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
            renderer = clientRenderer.render(<TimePicker format="24h" value="13:55"/>).withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
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
        let hh: any;
        let mm: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="24h" value="13:55" onChange={onChange}/>)
                .withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
        });

        describe('entering "3" into hh segment', () => {
            beforeEach(() => {
                renderer.driver.changeHours('3');
            });
            it('should set focus state', () => {
                expect(renderer.driver.getCssState('focus')).to.be.true;
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
                expect(onChange).to.be.calledWithExactly({value: '03:55'});
            });
        });

        describe('entering "2" into hh segment', () => {
            beforeEach(async () => {
                renderer.driver.changeHours('2');
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
                renderer.driver.changeMinutes('7');
            });
            it('should set focus state', () => {
                expect(renderer.driver.getCssState('focus')).to.be.true;
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
                expect(onChange).to.be.calledWithExactly({value: '13:07'});
            });
        });

        describe('entering "5" into mm input', () => {
            beforeEach(() => {
                renderer.driver.changeMinutes('5');
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
                renderer.driver.keydownMinutes('backspace');
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
                renderer.driver.keydownMinutes('backspace');
                renderer.driver.keydownMinutes('backspace');
            });
            it('hh input should have "13" value', () => {
                expect(hh).attr('value', '13');
            });
            it('mm input should have "00" value', () => {
                expect(mm).attr('value', '00');
            });
            it('should move selection on hh segment', () => {
                expect(document.activeElement).to.equal(hh);
            });
            it('onChange should be callen with "13:00"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '13:00'});
            });
        });

        describe('backspace on hh segment', () => {
            beforeEach(() => {
                renderer.driver.keydownHours('backspace');
            });
            it('hh input should have "00" value', () => {
                expect(hh).attr('value', '00');
            });
            it('focus should stay on hh section', () => {
                expect(document.activeElement).to.equal(hh);
            });
            it('onChange should be callen with "00:55"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '00:55'});
            });
        });

        describe('arrow down on hh segment', () => {
            beforeEach(() => {
                renderer.driver.keydownHours('down');
            });
            it('hh input should have "12" value', () => {
                expect(hh).attr('value', '12');
            });
            it('onChange should be callen with "12:55"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '12:55'});
            });
        });

        describe('arrow up on hh segment', () => {
            beforeEach(() => {
                renderer.driver.keydownHours('up');
            });
            it('hh input should have "14" value', () => {
                expect(hh).attr('value', '14');
            });
            it('onChange should be callen with "14:55"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '14:55'});
            });
        });

        describe('arrow down on mm segment', () => {
            beforeEach(() => {
                renderer.driver.keydownMinutes('down');
            });
            it('mm input should have "54" value', () => {
                expect(mm).attr('value', '54');
            });
            it('onChange should be callen with "13:54"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '13:54'});
            });
        });

        describe('arrow up on mm segment', () => {
            beforeEach(() => {
                renderer.driver.keydownMinutes('up');
            });
            it('mm input should have "56" value', () => {
                expect(mm).attr('value', '56');
            });
            it('onChange should be callen with "13:56"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '13:56'});
            });
        });

    });

    describe('render with onChange={onChange} onInput={onInput} format="24h" value="13:55"', () => {
        let onChange: any;
        let onInput: any;
        let renderer: any;
        let hh: any;
        beforeEach(() => {
            onChange = sinon.spy();
            onInput = sinon.spy();
            renderer = clientRenderer.render(
                <TimePicker format="24h" value="13:55" onChange={onChange} onInput={onInput}/>
            ).withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
        });

        describe('entering "3" into hh segment', () => {
            beforeEach(() => {
                renderer.driver.changeHours('3');
            });
            it('onChange should be callend with "03:55"', () => {
                expect(onChange).to.be.calledWithExactly({value: '03:55'});
            });
            it('onInput should be callend with "03:55"', () => {
                expect(onInput).to.be.calledWithExactly({value: '03:55'});
            });
        });
    });

    describe('render with onChange={onChange} format="24h" value="13:59"', () => {
        let onChange: any;
        let renderer: any;
        let hh: any;
        let mm: any;

        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="24h" value="13:59" onChange={onChange}/>)
                .withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
        });

        describe('arrow up on mm segment', () => {
            beforeEach(() => {
                renderer.driver.keydownMinutes('up');
            });
            it('hh input should have "14" value', () => {
                expect(hh).attr('value', '14');
            });
            it('mm input should have "00" value', () => {
                expect(mm).attr('value', '00');
            });
            itDesktop('mm input should have selection', () => {
                expect([mm.selectionStart, mm.selectionEnd]).to.deep.equal([0, 2]);
            });
            it('onChange should be callen with "14:00"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '14:00'});
            });
        });

        describe('arrow shift + up on mm segment', () => {
            beforeEach(() => {
                renderer.driver.keydownMinutes('up', {shiftKey: true});
            });
            it('hh input should have "14" value', () => {
                expect(hh).attr('value', '14');
            });
            it('mm input should have "09" value', () => {
                expect(mm).attr('value', '09');
            });
            it('onChange should be callen with "14:09"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '14:09'});
            });
        });

        describe('arrow shift + down on mm segment', () => {
            beforeEach(() => {
                renderer.driver.keydownMinutes('down', {shiftKey: true});
            });
            it('mm input should have "49" value', () => {
                expect(mm).attr('value', '49');
            });
            it('onChange should be callen with "13:49"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '13:49'});
            });
        });

        describe('arrow shift + up on hh segment', () => {
            beforeEach(() => {
                renderer.driver.keydownHours('up', {shiftKey: true});
            });
            it('hh input should have "14" value', () => {
                expect(hh).attr('value', '14');
            });
            it('onChange should be callen with "14:59"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '14:59'});
            });
        });

        describe('arrow shift + down on hh segment', () => {
            beforeEach(() => {
                renderer.driver.keydownHours('down', {shiftKey: true});
            });
            it('hh input should have "12" value', () => {
                expect(hh).attr('value', '12');
            });
            it('onChange should be callen with "12:59"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '12:59'});
            });
        });

        describeDesktop('shift + stepper up (mm focus)', () => {
            beforeEach(() => {
                renderer.driver.focusMinutes();
                renderer.driver.clickIncrement({shiftKey: true});
            });
            it('hh input should have "14" value', () => {
                expect(hh).attr('value', '14');
            });
            it('mm input should have "09" value', () => {
                expect(mm).attr('value', '09');
            });
            itDesktop('mm input should have selection', () => {
                expect([mm.selectionStart, mm.selectionEnd]).to.deep.equal([0, 2]);
            });
            it('onChange should be callen with "14:09"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '14:09'});
            });
        });

        describeDesktop('shift + stepper down (mm focus)', () => {
            beforeEach(() => {
                renderer.driver.focusMinutes();
                renderer.driver.clickDecrement({shiftKey: true});
            });
            it('mm input should have "49" value', () => {
                expect(mm).attr('value', '49');
            });
            it('onChange should be callen with "13:49"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '13:49'});
            });
        });

        describeDesktop('shift + stepper up (hh focus)', () => {
            beforeEach(() => {
                renderer.driver.focusHours();
                renderer.driver.clickIncrement({shiftKey: true});
            });
            it('hh input should have "14" value', () => {
                expect(hh).attr('value', '14');
            });
            itDesktop('hh input should have selection', () => {
                expect([hh.selectionStart, hh.selectionEnd]).to.deep.equal([0, 2]);
            });
            it('onChange should be callen with "14:59"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '14:59'});
            });
        });

        describeDesktop('shift + stepper down (hh focus)', () => {
            beforeEach(() => {
                renderer.driver.focusHours();
                renderer.driver.clickDecrement({shiftKey: true});
            });
            it('hh input should have "12" value', () => {
                expect(hh).attr('value', '12');
            });
            itDesktop('hh input should have selection', () => {
                expect([hh.selectionStart, hh.selectionEnd]).to.deep.equal([0, 2]);
            });
            it('onChange should be callen with "12:59"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '12:59'});
            });
        });

        describe('arrow up on mm segment', () => {
            beforeEach(() => {
                renderer.driver.keydownMinutes('up');
            });
            it('hh input should have "14" value', () => {
                expect(hh).attr('value', '14');
            });
            it('mm input should have "00" value', () => {
                expect(mm).attr('value', '00');
            });
            it('onChange should be callen with "14:00"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '14:00'});
            });
        });

    });

    describe('render with onChange={onChange} format=ampm" value="11:59"', () => {
        let onChange: any;
        let renderer: any;
        let hh: any;
        let mm: any;
        let ampm: any;

        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="ampm" value="11:59" onChange={onChange}/>)
                .withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
            ampm = renderer.driver.ampm;
        });

        describe('arrow up on mm segment', () => {
            beforeEach(() => {
                renderer.driver.keydownMinutes('up');
            });
            it('hh input should have "12" value', () => {
                expect(hh).attr('value', '12');
            });
            it('mm input should have "00" value', () => {
                expect(mm).attr('value', '00');
            });
            itDesktop('ampm input should have "PM" value', () => {
                expect(ampm).text('PM');
            });
            it('onChange should be callen with "12:00"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '12:00'});
            });
        });

        describeDesktop('backspace on hh segment', () => {
            beforeEach(() => {
                renderer.driver.keydownHours('backspace');
            });
            it('hh input should have "12" value', () => {
                expect(hh).attr('value', '12');
            });
            it('focus should stay on hh section', () => {
                expect(document.activeElement).to.equal(hh);
            });
            it('ampm should have AM text', () => {
                expect(renderer.driver.ampm).text('AM');
            });
            it('onChange should be callen with "00:59"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '00:59'});
            });
        });
    });

    describe('render with onChange={onChange} format="ampm" value="23:59"', () => {
        let onChange: any;
        let renderer: any;
        let hh: any;
        let mm: any;
        let ampm: any;

        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="ampm" value="23:59" onChange={onChange}/>)
                .withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
            ampm = renderer.driver.ampm;
        });

        describe('arrow up on hh segment', () => {
            beforeEach(() => {
                renderer.driver.keydownHours('up');
            });
            itDesktop('hh input should have "12" value', () => {
                expect(hh).attr('value', '12');
            });
            itNative('hh input should have "00" value', () => {
                expect(hh).attr('value', '00');
            });
            it('mm input should have "59" value', () => {
                expect(mm).attr('value', '59');
            });
            itDesktop('ampm input should have "AM" value', () => {
                expect(ampm).text('AM');
            });
            it('onChange should be callen with "00:59"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '00:59'});
            });
        });
    });

    describe('render with onChange={onChange} format="ampm" value="00:00"', () => {
        let onChange: any;
        let renderer: any;
        let hh: any;
        let mm: any;
        let ampm: any;

        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="ampm" value="00:00" onChange={onChange}/>)
                .withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
            ampm = renderer.driver.ampm;
        });

        describe('arrow down on mm segment', () => {
            beforeEach(() => {
                renderer.driver.keydownMinutes('down');
            });
            itDesktop('hh input should have "11" value', () => {
                expect(hh).attr('value', '11');
            });
            itNative('hh input should have "23" value', () => {
                expect(hh).attr('value', '23');
            });
            it('mm input should have "59" value', () => {
                expect(mm).attr('value', '59');
            });
            itDesktop('ampm input should have "PM" value', () => {
                expect(ampm).text('PM');
            });
            it('onChange should be callen with "23:59"', async () => {
                expect(onChange).to.be.calledWithExactly({value: '23:59'});
            });
        });
    });

    describe('render with format="24h" value="01:55"', () => {
        let renderer: any;
        let hh: any;
        let mm: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="24h" value="01:55"/>).withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
        });

        describe('entering "1" into hh segment', () => {
            beforeEach(() => {
                renderer.driver.changeHours('1');
            });
            it('should set focus state', () => {
                expect(renderer.driver.getCssState('focus')).to.be.true;
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

        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="ampm" value="01:59"/>).withDriver(TimePickerDriver);
        });
        it ('should not render stepperIncrement', () => {
            expect(renderer.driver.increment).to.be.null;
        });
        it ('should not render stepperDecrement', () => {
            expect(renderer.driver.decrement).to.be.null;
        });
    });

    describe('render with onChange={onChange} format="ampm" value="04:55"', () => {
        let onChange: any;
        let renderer: any;
        let hh: any;
        let mm: any;
        let ampm: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="ampm" value="04:55" onChange={onChange}/>)
                .withDriver(TimePickerDriver);
            hh = renderer.driver.hoursInput;
            mm = renderer.driver.minutesInput;
            ampm = renderer.driver.ampm;
        });
        describe('entering "3" into mm segment', () => {
            beforeEach(() => {
                renderer.driver.changeMinutes('3');
            });
            it('should set focus state', () => {
                expect(renderer.driver.getCssState('focus')).to.be.true;
            });
            it('hh input should have "04" value', () => {
                expect(hh).attr('value', '04');
            });
            it('mm input should have "3" value', () => {
                expect(mm).attr('value', '3');
            });
            itDesktop('ampm should have "AM" value', () => {
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
                renderer.driver.changeMinutes('7');
            });
            it('should set focus state', () => {
                expect(renderer.driver.getCssState('focus')).to.be.true;
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
                expect(onChange).to.be.calledWithExactly({value: '04:07'});
            });
        });

        describeDesktop('focus and change ampm input', () => {
            beforeEach(() => {
                renderer.driver.keydownAmpm('space');
            });
            it('onChange should be callen with "16:55"', () => {
                expect(onChange).to.be.calledWithExactly({value: '16:55'});
            });
        });
    });

    describeDesktop('Render <TimePickerDemo/>', () => {
        let renderer: any;
        let firstInputHH: any;
        let firstInputMM: any;
        let firstStepperUp: any;
        let secondInputHH: any;
        let secondInputMM: any;
        let secondStepperUp: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePickerDemo/>);
            firstInputHH = renderer.select('TIME_PICKER_DEMO_CONTROLLED_24', 'TIME_PICKER_INPUT_HH');
            firstInputMM = renderer.select('TIME_PICKER_DEMO_CONTROLLED_24', 'TIME_PICKER_INPUT_MM');
            firstStepperUp = renderer.select('TIME_PICKER_DEMO_CONTROLLED_24', 'STEPPER_INCREMENT');
            secondInputHH = renderer.select('TIME_PICKER_DEMO_CONTROLLED_AMPM', 'TIME_PICKER_INPUT_HH');
            secondInputMM = renderer.select('TIME_PICKER_DEMO_CONTROLLED_AMPM', 'TIME_PICKER_INPUT_MM');
            secondStepperUp = renderer.select('TIME_PICKER_DEMO_CONTROLLED_AMPM', 'STEPPER_INCREMENT');
        });

        describe('focus on hh segment on first input', () => {
            it('should keep focus on hh segment of first input', () => {
                simulate.focus(firstInputHH);
                simulate.click(firstStepperUp);
                expect(document.activeElement === firstInputHH).to.be.true;
            });
        });

        describe('focus on mm segment on first input', () => {
            it('should keep focus on mm segment on first input', () => {
                simulate.focus(firstInputMM);
                simulate.click(firstStepperUp);
                expect(document.activeElement === firstInputMM).to.be.true;
            });
        });

        describe('initial click on stepper inside first input', () => {
            it('should move focus on hh segment on first input', () => {
                simulate.click(firstStepperUp);
                expect(document.activeElement === firstInputHH).to.be.true;
            });
        });

        describe('focus on mm segment on first input then on mm segment on second input then', () => {
            beforeEach(() => {
                simulate.click(firstInputMM);
                simulate.focus(firstInputMM);
            });
            describe('focus on mm segment on second input', () => {
                beforeEach(() => {
                    simulate.blur(firstInputMM);
                    simulate.click(secondInputMM);
                    simulate.focus(secondInputMM);
                });
                describe.skip('click on stepper in first input', () => {
                    it('should set focus on hh on first input', () => {
                        simulate.blur(secondInputMM);
                        simulate.focus(firstStepperUp);
                        simulate.click(firstStepperUp);
                        expect(document.activeElement === firstInputHH).to.be.true;
                    });
                });
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
            expect(to24(12, 'am')).to.equal(0);
        });
        it('1 AM = 1', () => {
            expect(to24(1, 'am')).to.equal(1);
        });
        it('12 PM = 12', () => {
            expect(to24(12, 'pm')).to.equal(12);
        });
        it('11 PM = 23', () => {
            expect(to24(11, 'pm')).to.equal(23);
        });
    });
    describe('toAmpm()', () => {
        it('0 = 12 AM', () => {
            expect(toAmpm(0)).to.deep.equal({hh: 12, ampm: 'am'});
        });
        it('1 = 1 AM', () => {
            expect(toAmpm(1)).to.deep.equal({hh: 1, ampm: 'am'});
        });
        it('12 = 12 PM', () => {
            expect(toAmpm(12)).to.deep.equal({hh: 12, ampm: 'pm'});
        });
        it('15 = 3 PM', () => {
            expect(toAmpm(15)).to.deep.equal({hh: 3, ampm: 'pm'});
        });
    });
    describe('isValidValue()', () => {
        it('11:00 AM = true', () => {
            expect(isValidValue(11, 'hh', 'am')).to.equal(true);
        });
        it('11:00 PM = true', () => {
            expect(isValidValue(11, 'hh', 'pm')).to.equal(true);
        });
        it('13:00 PM = false', () => {
            expect(isValidValue(13, 'hh', 'pm')).to.equal(false);
        });
        it('13:00 = true', () => {
            expect(isValidValue(13, 'hh', 'none')).to.equal(true);
        });
        it('25:00 = false', () => {
            expect(isValidValue(25, 'hh', 'none')).to.equal(false);
        });
        it('11:25 = true', () => {
            expect(isValidValue(25, 'mm', 'none')).to.equal(true);
        });
        it('11:65 = false', () => {
            expect(isValidValue(65, 'mm', 'none')).to.equal(false);
        });
    });
});
