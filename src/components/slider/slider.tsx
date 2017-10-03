import * as keycode from 'keycode';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {properties} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {isRTLContext as isRTL} from '../../utils';
import {noop} from '../../utils/noop';
import {
    getAbsoluteValue,
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
import {AxisOptions, PointerEvent, Step} from './slider-types';
import {SliderView} from './slider-view';

enum ChangeDirection {
    ascend,
    descend
}

export interface SliderProps extends FormInputProps<number, string>, properties.Props {
    tooltip?: React.ReactNode;

    min?: number;
    max?: number;
    step?: Step;
    axis?: AxisOptions;

    name?: string;
    label?: string;

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
    relativeValue: number;
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

    private isSliderMounted: boolean = false;

    private isActive: boolean = false;

    constructor(props: SliderProps, context?: any) {
        super(props, context);

        const {min, max, step, axis} = this.props;

        this.state = {
            relativeValue: getRelativeValue(this.getDefaultValue(), min!, max!),
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
                value={this.props.value}

                onFocus={this.onSliderFocus}
                onBlur={this.onSliderBlur}

                onSliderAreaKeyDown={this.onSliderAreaKeyDown}

                onSliderAreaMouseDown={this.onSliderAreaMouseDown}
                onSliderAreaMouseMove={this.onSliderAreaMouseMove}
                onSliderAreaMouseUp={this.onSliderAreaMouseUp}

                onSliderAreaTouchStart={this.onSliderAreaTouchStart}
                onSliderAreaTouchMove={this.onSliderAreaTouchMove}
                onSliderAreaTouchEnd={this.onSliderAreaTouchEnd}
            />
        );
    }

    public componentDidMount() {
        this.isSliderMounted = true;
    }

    public componentWillUnmount() {
        this.isSliderMounted = false;
    }

    public componentWillReceiveProps(nextProps: SliderProps) {
        if (this.isActive) {
            return;
        }

        let value = nextProps.value === undefined ? this.props.value : nextProps.value;
        const min = nextProps.min === undefined ? this.props.min : nextProps.min;
        const max = nextProps.max === undefined ? this.props.max : nextProps.max;
        const step = nextProps.step === undefined ? this.props.step : nextProps.step;

        if (value && (value > max!)) {
            value = max;
        }
        if (value && (value < min!)) {
            value = min;
        }

        this.setState({
            relativeValue: getRelativeValue(value!, min!, max!),
            relativeStep: getRelativeStep(step, min!, max!),
            isVertical: isVertical(nextProps.axis || this.props.axis!),
            isReverse: isReverse(nextProps.axis || this.props.axis!) !== isRTL(this.context)
        });
    }

    private getDefaultValue() {
        const {value, min} = this.props;
        return typeof value === 'undefined' ?
            (typeof min !== 'undefined' ? min : DEFAULT_VALUE) :
            value;
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
        const {relativeValue} = this.state;
        let newRelativeValue: number;

        const relativeStep = this.state.relativeStep === CONTINUOUS_STEP ?
            1 :
            this.state.relativeStep;

        if (toEdge) {
            newRelativeValue = direction === ChangeDirection.ascend ?
                100 :
                0;
        } else {
            newRelativeValue = getValueInRange(
                direction === ChangeDirection.ascend ?
                    Math.floor(relativeValue / relativeStep) * relativeStep + relativeStep * multiplier :
                    Math.ceil(relativeValue / relativeStep) * relativeStep - relativeStep * multiplier,
                0, 100
            );
        }

        const newAbsoluteValue = getAbsoluteValue(newRelativeValue, this.props.min!, this.props.max!);

        if (newRelativeValue !== this.state.relativeValue) {
            this.setState({
                relativeValue: newRelativeValue
            });
        }

        this.callInput(newAbsoluteValue);
        if (newAbsoluteValue !== this.props.value) {
            this.callChange(newAbsoluteValue);
        }
    }

    private callInput(value: number | string): void {
        if (typeof value !== 'string') {
            value = String(value);
        }
        this.props.onInput!({value});
    }

    private callChange(value: number): void {
        this.props.onChange!({value});
    }

    private onSliderFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onFocus!(event);
    }

    private onSliderBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onBlur!(event);
    }

    private onSliderAreaMouseDown = (
        event: React.MouseEvent<HTMLElement>,
        sliderArea: HTMLElement,
        focusableElement: HTMLElement
    ) => {
        if (this.props.disabled) {
            return;
        }

        event.preventDefault();

        const relativeValue = getValueFromElementAndPointer(
            sliderArea,
            event,
            this.state.relativeStep,
            this.state.isVertical,
            this.state.isReverse
        );

        focusableElement.focus();
        this.setState({
            relativeValue,
            isActive: true
        });
        this.isActive = true;

        this.onDragStart(event.nativeEvent);
        this.callInput(getAbsoluteValue(relativeValue, this.props.min!, this.props.max!));
    }

    private onSliderAreaMouseMove = (
        event: MouseEvent,
        sliderArea: HTMLElement
    ) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = getValueFromElementAndPointer(
            sliderArea,
            event,
            this.state.relativeStep,
            this.state.isVertical,
            this.state.isReverse
        );

        requestAnimationFrame(() => {
            if (!this.isSliderMounted) {
                return;
            }

            this.setState({
                relativeValue
            });
        });

        this.onDrag(event);
        this.callInput(getAbsoluteValue(relativeValue, this.props.min!, this.props.max!));
    }

    private onSliderAreaMouseUp = (
        event: MouseEvent,
        sliderArea: HTMLElement,
        focusableElement: HTMLElement
    ) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = getValueFromElementAndPointer(
            sliderArea,
            event,
            this.state.relativeStep,
            this.state.isVertical,
            this.state.isReverse
        );
        const value = getAbsoluteValue(relativeValue, this.props.min!, this.props.max!);

        this.setState({
            relativeValue,
            isActive: false
        });
        this.isActive = false;

        focusableElement.focus();
        this.onDragStop(event);
        this.callChange(value);
    }

    private onSliderAreaTouchStart = (
        event: React.TouchEvent<HTMLElement>,
        sliderArea: HTMLElement,
        focusableElement: HTMLElement
    ) => {
        if (this.props.disabled) {
            return;
        }

        focusableElement.focus();

        const relativeValue = getValueFromElementAndPointer(
            sliderArea,
            event.touches[0],
            this.state.relativeStep,
            this.state.isVertical,
            this.state.isReverse
        );

        this.setState({
            relativeValue,
            isActive: true
        });
        this.isActive = true;

        event.preventDefault();

        this.onDragStart(event.nativeEvent);
        this.callInput(getAbsoluteValue(relativeValue, this.props.min!, this.props.max!));
    }

    private onSliderAreaTouchMove = (
        event: TouchEvent,
        sliderArea: HTMLElement
    ) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = getValueFromElementAndPointer(
            sliderArea,
            event.changedTouches[0],
            this.state.relativeStep,
            this.state.isVertical,
            this.state.isReverse
        );
        requestAnimationFrame(() => {
            if (!this.isSliderMounted) {
                return;
            }

            this.setState({
                relativeValue
            });
        });

        event.preventDefault();

        this.onDrag(event);
        this.callInput(getAbsoluteValue(relativeValue, this.props.min!, this.props.max!));
    }

    private onSliderAreaTouchEnd = (
        event: TouchEvent,
        sliderArea: HTMLElement
    ) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = getValueFromElementAndPointer(
            sliderArea,
            event.changedTouches[0],
            this.state.relativeStep,
            this.state.isVertical,
            this.state.isReverse
        );
        const value = getAbsoluteValue(relativeValue, this.props.min!, this.props.max!);

        this.setState({
            relativeValue,
            isActive: false
        });
        this.isActive = false;

        this.onDragStop(event);
        this.callChange(value);
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

    private onDragStart(event: PointerEvent) {
        this.props.onDragStart!(event);
    }

    private onDrag(event: PointerEvent) {
        this.props.onDrag!(event);
    }

    private onDragStop(event: PointerEvent) {
        this.props.onDragStop!(event);
    }
}
