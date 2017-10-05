import * as keycode from 'keycode';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {properties} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {isRTLContext as isRTL, nearestIndex, noop} from '../../utils';
import {
    getAbsoluteValue,
    getNewValue,
    getRelativeStep,
    getRelativeValue,
    getValueFromElementAndPointer,
    getValueInRange,
    isReverse,
    isVertical
} from './slider-calculations';
import {
    CONTINUOUS_STEP,
    DEFAULT_AXIS,
    DEFAULT_MAX,
    DEFAULT_MIN,
    DEFAULT_STEP,
    DEFAULT_VALUE
} from './slider-constants';
import {AxisOptions, PointerEvent, Step, ValueFromPointer} from './slider-types';
import {SliderView} from './slider-view';

enum ChangeDirection {
    ascend,
    descend
}

function isTouchEvent(event: any): event is TouchEvent | React.TouchEvent<any> {
    return 'changedTouches' in event;
}

export interface SliderProps extends FormInputProps<number[], string>, properties.Props {
    tooltip?: React.ReactNode;

    min?: number;
    max?: number;
    step?: Step;
    axis?: AxisOptions;

    name?: string;
    label?: string;

    disableCross?: boolean;
    displayStopMarks?: boolean;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;

    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;

    onDragStart?(event: PointerEvent): void;
    onDrag?(event: PointerEvent): void;
    onDragStop?(event: PointerEvent): void;
}
export interface SliderState {
    currentHandleIndex: number;
    relativeValue: number[];
    relativeStep: Step;
    isActive: boolean;
    isVertical: boolean;
    isReverse: boolean;
}

@properties
export class Slider extends React.Component<SliderProps, SliderState> {
    public static defaultProps: Partial<SliderProps> = {
        min: DEFAULT_MIN,
        max: DEFAULT_MAX,
        step: DEFAULT_STEP,
        axis: DEFAULT_AXIS,

        disableCross: false,
        onChange: noop,
        onInput: noop,

        onFocus: noop,
        onBlur: noop,

        onDragStart: noop,
        onDrag: noop,
        onDragStop: noop
    };

    public static contextTypes = {
        contextProvider: PropTypes.shape({
            dir: PropTypes.string
        })
    };

    private animationFrameId: number;

    private isActive: boolean = false;

    private currentValueIndex: null | number = null;

    constructor(props: SliderProps, context?: any) {
        super(props, context);

        const {min, max, step, axis} = this.props;

        this.state = {
            currentHandleIndex: -1,
            relativeValue: this.getDefaultValue()
                .map(
                    value => getRelativeValue(value, min!, max!)
                ),
            relativeStep: getRelativeStep(step, min!, max!),
            isActive: false,
            isVertical: isVertical(axis!),
            isReverse: isReverse(axis!) !== isRTL(this.context)
        };
    }

    public render() {
        return (
            <SliderView
                active={this.state.isActive}
                axis={this.props.axis!}
                disabled={this.props.disabled!}
                error={this.props.error!}
                label={this.props.label!}
                name={this.props.name!}
                displayStopMarks={this.props.displayStopMarks!}
                max={this.props.max!}
                min={this.props.min!}
                orientation={isVertical(this.props.axis!) ? 'vertical' : 'horizontal'}
                relativeStep={this.state.relativeStep}
                relativeValue={this.state.relativeValue}
                required={this.props.required!}
                rtl={isRTL(this.context)}
                step={this.props.step!}
                tooltip={this.getTooltip()}
                value={this.getDefaultValue()}

                onSliderFocus={this.onSliderFocus}
                onSliderBlur={this.onSliderBlur}

                onSliderAreaKeyDown={this.onSliderAreaKeyDown}

                onSliderAreaMouseDown={this.onDragStart}
                onSliderAreaMouseMove={this.onDrag}
                onSliderAreaMouseUp={this.onDragStop}

                onSliderAreaTouchStart={this.onDragStart}
                onSliderAreaTouchMove={this.onDrag}
                onSliderAreaTouchEnd={this.onDragStop}
            />
        );
    }

    public componentWillUnmount() {
        cancelAnimationFrame(this.animationFrameId);
    }

    public componentWillReceiveProps(nextProps: SliderProps) {
        if (this.isActive) {
            return;
        }

        const values = nextProps.value === undefined ? this.props.value : nextProps.value;
        const min = nextProps.min === undefined ? this.props.min : nextProps.min;
        const max = nextProps.max === undefined ? this.props.max : nextProps.max;
        const step = nextProps.step === undefined ? this.props.step : nextProps.step;

        const relativeValues = values!.map(value => {
                let normalizedValue = value;
                if (value && (value > max!)) {
                    normalizedValue =  max!;
                }
                if (value && (value < min!)) {
                    normalizedValue =  min!;
                }
                return getRelativeValue(normalizedValue, min!, max!);
            });

        this.setState({
            relativeValue: relativeValues,
            relativeStep: getRelativeStep(step, min!, max!),
            isVertical: isVertical(nextProps.axis || this.props.axis!),
            isReverse: isReverse(nextProps.axis || this.props.axis!) !== isRTL(this.context)
        });
    }

    private getDefaultValue() {
        const {value, min} = this.props;
        const defaultValue = typeof min !== 'undefined' ? min : DEFAULT_VALUE;
        return !value || typeof value![0] === 'undefined' ?
            [defaultValue] :
            value;
    }

    private getRelativeValueFromPointerPositionAndArea(
        event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement> | MouseEvent | TouchEvent,
        sliderArea: HTMLElement
    ): ValueFromPointer {
        const position = isTouchEvent(event) ? event.changedTouches[0] : event;
        const currentHandleValue = getValueFromElementAndPointer(
            sliderArea,
            position,
            this.state.relativeStep,
            this.state.isVertical,
            this.state.isReverse
        );
        const nearestHandleIndex = nearestIndex(this.state.relativeValue, currentHandleValue);

        const relativeValue = getNewValue(
            this.state.relativeValue,
            currentHandleValue,
            nearestHandleIndex
        );

        return {
            relativeValue,
            currentValue: currentHandleValue,
            currentValueIndex: nearestHandleIndex
        };
    }

    private getTooltip(): React.ReactNode {
        return this.props.tooltip;
    }

    private increaseValue(toEdge: boolean = false, multiplier: number = 1) {
        this.changeValue(ChangeDirection.ascend, multiplier, toEdge);
    }

    private decreaseValue(toEdge: boolean = false, multiplier: number = 1) {
        this.changeValue(ChangeDirection.descend, multiplier, toEdge);
    }

    private changeValue(direction: ChangeDirection, multiplier: number = 1, toEdge: boolean = false) {
        const {relativeValue, currentHandleIndex} = this.state;
        const currentValue = relativeValue[currentHandleIndex];
        const isAscending = direction === ChangeDirection.ascend;
        const round = isAscending ? Math.floor : Math.ceil;
        const relativeStep = this.state.relativeStep === CONTINUOUS_STEP ?
            1 :
            this.state.relativeStep;
        const deviation = isAscending ? 1 : -1;

        let newRelativeValue: number[];

        newRelativeValue = getNewValue(
            relativeValue,
            toEdge ?
                isAscending ? 100 : 0 :
                getValueInRange(
                    relativeStep * (round(currentValue / relativeStep) + multiplier * deviation),
                    0, 100
                ),
            currentHandleIndex
        );

        this.setState({
            relativeValue: newRelativeValue
        });

        this.callInput(newRelativeValue);
        this.callChange(newRelativeValue);
    }

    private relativeToAbsoluteValue(relativeValue: number[]): number[] {
        return relativeValue.map(value => getAbsoluteValue(value, this.props.min!, this.props.max!));
    }

    private callInput(relativeValue: number[]): void {
        this.props.onInput!({
            value: JSON.stringify(this.relativeToAbsoluteValue(relativeValue))
        });
    }

    private callChange(relativeValue: number[]): void {
        const value = this.relativeToAbsoluteValue(relativeValue);
        if (value.some((item, index) => item !== this.props.value![index])) {
            this.props.onChange!({value});
        }
    }

    private onSliderFocus = (event: React.FocusEvent<HTMLElement>, currentHandleIndex: number) => {
        this.setState({currentHandleIndex});
        this.props.onFocus!(event);
    }

    private onSliderBlur = (event: React.FocusEvent<HTMLElement>) => {
        this.setState({currentHandleIndex: -1});
        this.props.onBlur!(event);
    }

    private onDragStart = (
        event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
        sliderArea: HTMLElement,
        focusableElement: HTMLElement[]
    ) => {
        if (this.props.disabled) {
            return;
        }

        const {
            relativeValue,
            currentValueIndex
        } = this.getRelativeValueFromPointerPositionAndArea(
            event,
            sliderArea
        );

        focusableElement[currentValueIndex].focus();

        this.setState({
            relativeValue,
            isActive: true
        });
        this.isActive = true;
        this.currentValueIndex = currentValueIndex;

        event.preventDefault();

        this.props.onDragStart!(event.nativeEvent);
        this.callInput(relativeValue);
    }

    private onDrag = (
        event: MouseEvent | TouchEvent,
        sliderArea: HTMLElement
    ) => {
        if (!this.isActive) {
            return;
        }
        const {
            currentValueIndex,
            relativeValue
        } = this.getRelativeValueFromPointerPositionAndArea(
            event,
            sliderArea
        );

        if (this.props.disableCross && currentValueIndex !== this.currentValueIndex) {
            return;
        }

        this.animationFrameId = requestAnimationFrame(() => {
            this.setState({
                relativeValue
            });
        });

        event.preventDefault();

        this.props.onDrag!(event);
        this.callInput(relativeValue);
    }

    private onDragStop = (
        event: MouseEvent | TouchEvent,
        sliderArea: HTMLElement
    ) => {
        if (!this.isActive) {
            return;
        }
        const {
            relativeValue
        } = this.getRelativeValueFromPointerPositionAndArea(
            event,
            sliderArea
        );

        this.setState({
            relativeValue,
            isActive: false
        });
        this.isActive = false;
        this.currentValueIndex = null;

        this.props.onDragStop!(event);
        this.callChange(relativeValue);
    }

    private onSliderAreaKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (this.isActive || this.props.disabled) {
            event.preventDefault();
            return;
        }

        const isReversed = this.state.isReverse;
        const {ctrlKey, shiftKey} = event;
        const ctrlOrShiftPressed = shiftKey || ctrlKey;

        switch (keycode(event.keyCode)) {
            case 'up':
                isReversed ?
                    this.decreaseValue(false, ctrlOrShiftPressed ? 10 : 1) :
                    this.increaseValue(false, ctrlOrShiftPressed ? 10 : 1);
                break;
            case 'right':
                isReversed ?
                    this.decreaseValue(ctrlOrShiftPressed, 1) :
                    this.increaseValue(ctrlOrShiftPressed, 1);
                break;
            case 'down':
                isReversed ?
                    this.increaseValue(false, ctrlOrShiftPressed ? 10 : 1) :
                    this.decreaseValue(false, ctrlOrShiftPressed ? 10 : 1);
                break;
            case 'left':
                isReversed ?
                    this.increaseValue(ctrlOrShiftPressed, 1) :
                    this.decreaseValue(ctrlOrShiftPressed, 1);
                break;
            case 'home':
                isReversed ?
                    this.increaseValue(true) :
                    this.decreaseValue(true);
                break;
            case 'end':
                isReversed ?
                    this.decreaseValue(true) :
                    this.increaseValue(true);
                break;
            case 'page up':
                this.increaseValue(false, 10);
                break;
            case 'page down':
                this.decreaseValue(false, 10);
                break;
            default:
                return;
        }

        event.preventDefault();
    }
}
