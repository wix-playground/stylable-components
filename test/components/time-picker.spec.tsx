import * as keycode from 'keycode';
import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon, waitFor} from 'test-drive-react';
import {TimePicker} from '../../src';
import styles from '../../src/components/time-picker/time-picker.st.css';
import {
    Ampm, formatTimeChunk, isTouch,
    isValidValue, Segment, selectionIndexes, to24, toAmpm, getCircularValue
} from '../../src/components/time-picker/utils';
import {hasCssState} from '../utils/has-css-state';

function setSelection(input: HTMLInputElement, segment: Segment) {
    const [start, end] = selectionIndexes[segment];
    input.selectionStart = start;
    input.selectionEnd = end;
}

function updateSegment(input: HTMLInputElement, segment: Segment, char: string) {
    const [start, end] = selectionIndexes[segment];
    const value = input.value.substr(0, start) + char + input.value.substr(end);
    setSelection(input, segment);
    simulate.focus(input);
    input.value = value;
    input.selectionStart = input.selectionEnd = start + 1;
    simulate.change(input);
}

function hasSelection(input: HTMLInputElement, segment: Segment) {
    expect([input.selectionStart, input.selectionEnd])
        .to.deep.equal(selectionIndexes[segment], 'Selections did not match');
}

function hasCursorInSegment(input: HTMLInputElement, segment: Segment) {
    const [start, end] = selectionIndexes[segment];
    expect(input.selectionStart).to.equal(
        input.selectionEnd,
        `Input has selection [${input.selectionStart}, ${input.selectionEnd}]`
    );
    expect(input.selectionStart).within(start, end);
}

describe('<TimePicker/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describe('render with format="ampm"', () => {
        let renderer: any;
        let input: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="ampm"/>);
            input = renderer.select('TIME_PICKER_INPUT');
        });
        it('should render input with "00:00 AM" placeholder', () => {
            expect(input).attr('placeholder', '00:00 AM');
        });
        it('should not have value set', () => {
            expect(input).attr('value', '');
        });
    });
    describe('render with format="24h"', () => {
        let renderer: any;
        let input: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="24h"/>);
            input = renderer.select('TIME_PICKER_INPUT');
        });
        it('should render input with "00:00" placeholder', () => {
            expect(input).attr('placeholder', '00:00');
        });
        it('should not have value set', () => {
            expect(input).attr('value', '');
        });
    });

    describe('render with value="4:36" format="ampm"', () => {
        let renderer: any;
        let input: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker value="4:36"/>);
            input = renderer.select('TIME_PICKER_INPUT');
        });
        it('should have "04:36 AM" value', () => {
            expect(input).attr('value', '04:36 AM');
        });
    });

    describe('render with placeholder="Enter Time"', () => {
        let renderer: any;
        let input: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker placeholder="Enter Time"/>);
            input = renderer.select('TIME_PICKER_INPUT');
        });
        it('should render hh input with placeholder', () => {
            expect(input).attr('placeholder', 'Enter Time');
        });
        it('should not have value set', () => {
            expect(input).attr('value', '');
        });
    });

    describe('render with format="ampm" value="13:55"', () => {
        let renderer: any;
        let input: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="ampm" value="13:55"/>);
            input = renderer.select('TIME_PICKER_INPUT');
        });
        it('should have input "01:55 PM" value', () => {
            expect(input).attr('value', '01:55 PM');
        });
    });

    describe('render with format="24h" value="13:55"', () => {
        let renderer: any;
        let input: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="24h" value="13:55"/>);
            input = renderer.select('TIME_PICKER_INPUT');
        });
        it('should have input "13:55" value', () => {
            expect(input).attr('value', '13:55');
        });
    });

    describe('render with onChange={onChange} format="24h" value="13:55"', () => {
        let onChange: any;
        let renderer: any;
        let root: any;
        let input: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="24h" value="13:55" onChange={onChange}/>);
            root = renderer.select('TIME_PICKER');
            input = renderer.select('TIME_PICKER_INPUT');
        });

        describe('entering "3" into hh segment', () => {
            beforeEach(() => {
                updateSegment(input, 'hh', '3');
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true});
            });
            it('input should have "03:55" value', () => {
                expect(input).attr('value', '03:55');
            });
            it('should move selection to mm segment', () => {
                hasSelection(input, 'mm');
            });
            it('onChange should be callend with "03:55"', () => {
                expect(onChange).to.be.calledWithExactly('03:55');
            });
        });

        describe('entering "2" into hh segment', () => {
            beforeEach(async () => {
                updateSegment(input, 'hh', '2');
            });
            it('input should have "2:55" value', () => {
                expect(input).attr('value', '2:55');
            });
            it('should keep selection on hh segment', () => {
                hasCursorInSegment(input, 'hh');
            });
            it('onChange should not be callen', async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                expect(onChange).to.not.be.called;
            });
        });

        describe('entering "7" into mm segment', () => {
            beforeEach(() => {
                updateSegment(input, 'mm', '7');
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true});
            });
            it('input should have "13:07" value', () => {
                expect(input).attr('value', '13:07');
            });
            it('should keep selection on mm segment', () => {
                hasCursorInSegment(input, 'mm');
            });
            it('onChange should be callen with "13:07"', async () => {
                expect(onChange).to.be.calledWithExactly('13:07');
            });
        });

        describe('entering "5" into mm input', () => {
            beforeEach(() => {
                updateSegment(input, 'mm', '5');
            });
            it('input should have "13:5" value', () => {
                expect(input).attr('value', '13:5');
            });
            it('should keep selection on mm segment', () => {
                hasCursorInSegment(input, 'mm');
            });
            it('onChange should not be callen', async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                expect(onChange).to.not.called;
            });
        });

        describe('backspace on mm segment', () => {
            beforeEach(() => {
                simulate.focus(input);
                setSelection(input, 'mm');
                simulate.click(input);
                simulate.keyDown(input, {keyCode: keycode('backspace')});
            });
            it('mm input should have "13:00" value', async () => {
                expect(input).attr('value', '13:00');
            });
            it('should keep selection on mm segment', () => {
                hasSelection(input, 'mm');
            });
        });
        describe('backspace x 2 on mm segment', () => {
            beforeEach(() => {
                simulate.focus(input);
                setSelection(input, 'mm');
                simulate.click(input);
                simulate.keyDown(input, {keyCode: keycode('backspace')});
                simulate.keyDown(input, {keyCode: keycode('backspace')});
            });
            it('mm input should have "13:00" value', async () => {
                expect(input).attr('value', '13:00');
            });
            it('should keep selection on hh segment', () => {
                hasSelection(input, 'hh');
            });
        });

    });

    describe('render with value="01:59" format="ampm"', () => {
        let renderer: any;
        let input: any;
        let stepperIncrement: any;
        let stepperDecrement: any;

        beforeEach(function() {
            if (isTouch) {
                this.skip();
            }
        });
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="ampm" value="01:59"/>);
            input = renderer.select('TIME_PICKER_INPUT');
            stepperIncrement = renderer.select('STEPPER_INCREMENT');
            stepperDecrement = renderer.select('STEPPER_DECREMENT');
        });
        describe('select hh segment', () => {
            beforeEach(() => {
                setSelection(input, 'hh');
            });
            it('should not disable stepper up', () => {
                expect(stepperIncrement).not.attr('disabled');
            });
            it('should disable stepper down', () => {
                expect(stepperDecrement).attr('disabled');
            });
        });

        describe('select mm segment', () => {
            beforeEach(() => {
                setSelection(input, 'hh');
                simulate.keyDown(input, {keyCode: keycode('tab')});
            });
            it('should disable stepper up', () => {
                expect(stepperIncrement).attr('disabled');
            });
            it('should not disable stepper down', () => {
                expect(stepperDecrement).not.attr('disabled');
            });
        });

        describe('select ampm segment', () => {
            beforeEach(() => {
                setSelection(input, 'hh');
                simulate.keyDown(input, {keyCode: keycode('tab')});
                simulate.keyDown(input, {keyCode: keycode('tab')});
            });
            it('should not disable stepper up', () => {
                expect(stepperIncrement).not.attr('disabled');
            });
            it('should not disable stepper down', () => {
                expect(stepperDecrement).not.attr('disabled');
            });
        });
    });

    describe('render with value="01:59" format="ampm" (for mobile)', () => {
        let renderer: any;
        let stepperIncrement: any;
        let stepperDecrement: any;

        beforeEach(function() {
            if (!isTouch) {
                this.skip();
            }
        });
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
        let input: any;
        beforeEach(() => {
            onChange = sinon.spy();
            renderer = clientRenderer.render(<TimePicker format="ampm" value="04:55" onChange={onChange}/>);
            root = renderer.select('TIME_PICKER');
            input = renderer.select('TIME_PICKER_INPUT');
        });
        describe('entering "3" into mm segment', () => {
            beforeEach(() => {
                updateSegment(input, 'mm', '3');
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true});
            });
            it('input should have "04:3 AM" value', () => {
                expect(input).attr('value', '04:3 AM');
            });
            it('should keep selection on mm segment', () => {
                hasCursorInSegment(input, 'mm');
            });
            it('onChange should not be callen', async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                expect(onChange).to.not.be.called;
            });
        });

        describe('entering "7" into mm segment', () => {
            beforeEach(() => {
                updateSegment(input, 'mm', '7');
            });
            it('should set focus state', () => {
                hasCssState(root, styles, {focus: true});
            });
            it('input should have "04:07 AM" value', () => {
                expect(input).attr('value', '04:07 AM');
            });
            it('should move selection on ampm segment', () => {
                hasSelection(input, 'ampm');
            });
            it('onChange should be callen with "04:07"', async () => {
                expect(onChange).to.be.calledWithExactly('04:07');
            });
        });

        describe('focus and change ampm input', () => {
            beforeEach(() => {
                simulate.focus(input);
                setSelection(input, 'ampm');
                simulate.click(input);
                simulate.keyDown(input, {keyCode: keycode('space')});
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
        })
        it('60 minites = 0', () => {
            expect(getCircularValue('mm', 60, Ampm.NONE)).to.equal(0);
        })
        it('-5 minites = 55', () => {
            expect(getCircularValue('mm', -5, Ampm.NONE)).to.equal(55);
        })
        it('13 hh AM = 1', () => {
            expect(getCircularValue('hh', 13, Ampm.AM)).to.equal(1);
        })
        it('13 hh = 13', () => {
            expect(getCircularValue('hh', 13, Ampm.NONE)).to.equal(13);
        })
        it('24 hh AM = 12', () => {
            expect(getCircularValue('hh', 12, Ampm.AM)).to.equal(12);
        })
        it('24 hh = 0', () => {
            expect(getCircularValue('hh', 24, Ampm.NONE)).to.equal(0);
        })
        it('-2 hh = 22', () => {
            expect(getCircularValue('hh', -2, Ampm.NONE)).to.equal(22);
        })
    })
});
