import * as React from 'react';
import {ClientRenderer, expect, simulate, sinon} from 'test-drive-react';
import {TimePickerDemo} from '../../demo/components/time-picker-demo';
import {TimePicker} from '../../src';
import {
    Format, formatTimeChunk, isTouchTimeInputSupported, isValidValue,
    Segment, to24, toAmpm
} from '../../src/components/time-picker/utils';
import {TimePickerDriver} from '../../test-kit';

const describeNative = isTouchTimeInputSupported ? describe : describe.skip;
const describeDesktop = !isTouchTimeInputSupported ? describe : describe.skip;
const itDesktop = !isTouchTimeInputSupported ? it : it.skip;

interface Suit {
    props: {
        value: string,
        format: Format
    };
    items: [[
        {
            segment: Segment,
            key?: string,
            value?: string,
            inc?: true,
            dec?: true,
            options?: object
        },
        {
            hh: string,
            mm: string,
            ampm?: string,
            value: string | null,
            focus: Segment
        }
    ]];
}

describe.skip('<TimePicker/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());

    describeDesktop('render without value and 12h format', () => {
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
        it('should not render placeholder', () => {
            expect(placeholder).to.be.null;
        });
        it('hours should have placeholder "00"', () => {
            expect(hh).attr('placeholder', '00');
        });
        it('hours should not have value set', () => {
            expect(hh).attr('value', '');
        });
        it('minutes should not have value set', () => {
            expect(mm).attr('value', '');
        });
        it('minutes should have placeholder "00"', () => {
            expect(mm).attr('placeholder', '00');
        });
    });
    describe('render without value and 24h format', () => {
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
        it('hours should not have value set', () => {
            expect(hh).attr('value', '');
        });
        it('hours should have placeholder "00"', () => {
            expect(hh).attr('placeholder', '00');
        });
        it('minutes should not have value set', () => {
            expect(mm).attr('value', '');
        });
        it('minutes should have placeholder "00"', () => {
            expect(mm).attr('placeholder', '00');
        });
    });

    describe('render without value and with placeholder', () => {
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
        it('should render placeholder element', () => {
            expect(placeholder).text('Enter Time');
        });
        it('hours should be empty', () => {
            expect(hh).attr('value', '');
        });
        it('minutes should be empty', () => {
            expect(mm).attr('value', '');
        });
    });

    describe('render with 12h format and value below 12:00 PM', () => {
        let renderer: any;
        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker value="4:36" format="ampm" />).withDriver(TimePickerDriver);
        });
        it('hours should have padding zero and dislay hours segment', () => {
            expect(renderer.driver.hoursInput).attr('value', '04');
        });
        it('minutes should have padding zero and dislay minutes segment', () => {
            expect(renderer.driver.minutesInput).attr('value', '36');
        });
        itDesktop('"AM" label should follow the time', () => {
            expect(renderer.driver.ampm).text('AM');
        });
    });

    describe('render with 12h format and value above 12:00 PM', () => {
        let renderer: any;

        beforeEach(() => {
            renderer = clientRenderer.render(<TimePicker format="ampm" value="23:59"/>).withDriver(TimePickerDriver);
        });

        describeDesktop('on desktop', () => {
            it('hours should be in 12h format', () => {
                expect(renderer.driver.hoursInput).attr('value', '11');
            });
            it('should render ampm', () => {
                expect(renderer.driver.ampm).to.not.null;
            });
            it('should render stepperIncrement', () => {
                expect(renderer.driver.increment).to.not.null;
            });
            it('should render stepperDecrement', () => {
                expect(renderer.driver.decrement).to.not.null;
            });
        });

        describeNative('on touch', () => {
            it('hours should be in 24h format', () => {
                expect(renderer.driver.hoursInput).attr('value', '23');
            });
            it('should not render ampm', () => {
                expect(renderer.driver.ampm).to.be.null;
            });
            it('should not render stepperIncrement', () => {
                expect(renderer.driver.increment).to.be.null;
            });
            it('should not render stepperDecrement', () => {
                expect(renderer.driver.decrement).to.be.null;
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

    const suits: Suit[] = [
        {
            props: {value: '13:55', format: '24h'},
            items: [
                [{segment: 'hh', value: '3'}, {hh: '03', mm: '55', focus: 'mm', value: '03:55'}],
                [{segment: 'hh', value: '2'}, {hh: '2', mm: '55', focus: 'hh', value: null}],
                [{segment: 'mm', value: '7'}, {hh: '13', mm: '07', focus: 'mm', value: '13:07'}],
                [{segment: 'mm', value: '5'}, {hh: '13', mm: '5', focus: 'mm', value: null}],
                [{segment: 'mm', key: 'backspace'}, {hh: '13', mm: '00', focus: 'mm', value: '13:00'}],
                [{segment: 'hh', key: 'backspace'}, {hh: '00', mm: '55', focus: 'hh', value: '00:55'}],
                [{segment: 'hh', key: 'down'}, {hh: '12', mm: '55', focus: 'hh', value: '12:55'}],
                [{segment: 'hh', key: 'up'}, {hh: '14', mm: '55', focus: 'hh', value: '14:55'}],
                [{segment: 'mm', key: 'down'}, {hh: '13', mm: '54', focus: 'mm', value: '13:54'}],
                [{segment: 'mm', key: 'up'}, {hh: '13', mm: '56', focus: 'mm', value: '13:56'}]
            ]
        },
        {
            props: {value: '13:00', format: '24h'},
            items: [
                [{segment: 'mm', key: 'backspace'}, {hh: '13', mm: '00', focus: 'hh', value: null}]
            ]
        },
        {
            props: {value: '13:59', format: '24h'},
            items: [
                [{segment: 'mm', key: 'up'}, {hh: '14', mm: '00', focus: 'mm', value: '14:00'}],
                [
                    {segment: 'mm', key: 'up', options: {shiftKey: true}},
                    {hh: '14', mm: '09', focus: 'mm', value: '14:09'}
                ],
                [
                    {segment: 'mm', key: 'down', options: {shiftKey: true}},
                    {hh: '13', mm: '49', focus: 'mm', value: '13:49'}
                ],
                [
                    {segment: 'hh', key: 'up', options: {shiftKey: true}},
                    {hh: '14', mm: '59', focus: 'hh', value: '14:59'}
                ],
                [
                    {segment: 'hh', key: 'down', options: {shiftKey: true}},
                    {hh: '12', mm: '59', focus: 'hh', value: '12:59'}
                ],
                [
                    {segment: 'mm', inc: true, options: {shiftKey: true}},
                    {hh: '14', mm: '09', focus: 'mm', value: '14:09'}
                ],
                [
                    {segment: 'mm', dec: true, options: {shiftKey: true}},
                    {hh: '13', mm: '49', focus: 'mm', value: '13:49'}
                ],
                [
                    {segment: 'hh', inc: true, options: {shiftKey: true}},
                    {hh: '14', mm: '59', focus: 'hh', value: '14:59'}
                ],
                [
                    {segment: 'hh', dec: true, options: {shiftKey: true}},
                    {hh: '12', mm: '59', focus: 'hh', value: '12:59'}
                ]
            ]
        },
        {
            props: {value: '11:59', format: 'ampm'},
            items: [
                [{segment: 'mm', key: 'up'}, {hh: '12', mm: '00', focus: 'mm', ampm: 'PM', value: '12:00'}],
                [{segment: 'hh', key: 'backspace'}, {hh: '12', mm: '59', focus: 'hh', ampm: 'AM', value: '00:59'}]
            ]
        },
        {
            props: {value: '01:55', format: '24h'},
            items: [
                [{segment: 'hh', value: '1'}, {hh: '1', mm: '55', focus: 'hh', value: null}]
            ]
        },
        {
            props: {value: '23:59', format: 'ampm'},
            items: [
                [{segment: 'hh', key: 'up'}, {hh: '12', mm: '59', focus: 'hh', ampm: 'AM', value: '00:59'}],
                [{segment: 'mm', key: 'up'}, {hh: '12', mm: '00', focus: 'mm', ampm: 'AM', value: '00:00'}]
            ]
        },
        {
            props: {value: '00:00', format: 'ampm'},
            items: [
                [{segment: 'hh', key: 'down'}, {hh: '11', mm: '00', focus: 'hh', ampm: 'PM', value: '23:00'}],
                [{segment: 'mm', key: 'down'}, {hh: '11', mm: '59', focus: 'mm', ampm: 'PM', value: '23:59'}]
            ]
        },
        {
            props: {value: '04:55', format: 'ampm'},
            items: [
                [{segment: 'mm', value: '3'}, {hh: '04', mm: '3', focus: 'mm', value: null}],
                [{segment: 'mm', value: '7'}, {hh: '04', mm: '07', focus: 'ampm', value: '04:07'}],
                [{segment: 'ampm', key: 'space'}, {hh: '04', mm: '55', ampm: 'PM', focus: 'ampm', value: '16:55'}],
                [{segment: 'hh', key: 'space'}, {hh: '04', mm: '55', ampm: 'AM', focus: 'mm', value: null}],
                [{segment: 'mm', key: 'space'}, {hh: '04', mm: '55', ampm: 'AM', focus: 'ampm', value: null}]
            ]
        }

    ];

    function execAction(driver: any, action: any) {
        const suffix = ({mm: 'Minutes', hh: 'Hours', ampm: 'Ampm'} as any)[action.segment];
        if (action.key) {
            driver['keydown' + suffix](action.key, action.options);
        } else if (action.value) {
            driver['change' + suffix](action.value);
        } else if (action.inc) {
            driver['focus' + suffix]();
            driver.clickIncrement(action.options);
        } else {
            driver['focus' + suffix]();
            driver.clickDecrement(action.options);
        }
    }

    function getTitle(action: any) {
        if (action.key) {
            return `pressing "${action.key}" on ${action.segment}`;
        } else if (action.value) {
            return `enter "${action.value}" to ${action.segment}`;
        } else if (action.inc) {
            return 'increment with stepper';
        } else {
            return 'decrement with stepper';
        }
    }

    function getDescribeFunction(condition: boolean) {
        return condition ? describe : describeDesktop;
    }

    suits.forEach(suit => {
        const {props, items} = suit;

        getDescribeFunction(props.format === '24h')(`render with "${props.value}" and "${props.format}" format`, () => {
            let onChange: any;
            let onInput: any;
            let renderer: any;
            let hh: any;
            let mm: any;
            let ampm: any;

            beforeEach(() => {
                onChange = sinon.spy();
                onInput = sinon.spy();
                renderer = clientRenderer.render(<TimePicker {...props} onChange={onChange} onInput={onInput}/>)
                    .withDriver(TimePickerDriver);
                hh = renderer.driver.hoursInput;
                mm = renderer.driver.minutesInput;
                ampm = renderer.driver.ampm;
            });

            items.forEach(test => {
                const [action, expectation] = test;

                getDescribeFunction(!action.inc && !action.dec)(getTitle(action), () => {
                    let focusedElem: any;
                    beforeEach(() => {
                        focusedElem = {hh, mm, ampm}[expectation.focus];
                        execAction(renderer.driver, action);
                    });

                    it('hours should have correct value', () => {
                        expect(hh).attr('value', expectation.hh);
                    });
                    it('minutes should have correct value', () => {
                        expect(mm).attr('value', expectation.mm);
                    });
                    if (expectation.ampm) {
                        itDesktop('ampm should have correct value', () => {
                            expect(ampm).text(expectation.ampm!);
                        });
                    }
                    it(`${expectation.focus} should be focused`, () => {
                        expect(document.activeElement).to.equal(focusedElem);
                    });
                    if (expectation.value) {
                        if (expectation.focus !== 'ampm') {
                            itDesktop(`${expectation.focus} should be selected`, () => {
                                expect([focusedElem.selectionStart, focusedElem.selectionEnd]).to.deep.equal([0, 2]);
                            });
                        }
                        it('onChange should be callen with correct value', () => {
                            expect(onChange).to.be.calledWithExactly({value: expectation.value});
                        });
                    } else {
                        it('onChange should not be callen', async () => {
                            await new Promise(resolve => setTimeout(resolve, 500));
                            expect(onChange).to.not.be.called;
                        });
                    }
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
