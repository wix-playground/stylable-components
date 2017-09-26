import * as keycode from 'keycode';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {isRTLContext} from '../../utils';
import {noop} from '../../utils/noop';
import {SliderView} from './slider-view';
import style from './slider.st.css';

export const AXISES: {[name: string]: AxisOptions} = {
    x: 'x',
    y: 'y',
    xReverse: 'x-reverse',
    yReverse: 'y-reverse'
};
const CONTINUOUS_STEP = 'any';
const DEFAULT_STEP = 1;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_VALUE = DEFAULT_MIN;
const DEFAULT_AXIS = AXISES.x;

enum ChangeDirrection {
    ascend,
    descend
}

export type PointerEvent = MouseEvent | TouchEvent;
export type Step = number | 'any';
export type AxisOptions = 'x' | 'y' | 'x-reverse' | 'y-reverse';
export interface PointerPosition {
    clientX: number;
    clientY: number;
}
export interface SliderProps extends FormInputProps<number, string>, properties.Props {
    tooltip?: React.ReactNode;

    min?: number;
    max?: number;
    step?: Step;
    axis?: AxisOptions;

    name?: string;
    label?: string;

    marks?: boolean;
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

@stylable(style)
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
            relativeValue: this.getRelativeValue(this.getDefaultValue(), min!, max!, step),
            relativeStep: this.getRelativeStep(step, min!, max!),
            isActive: false,
            isVertical: this.isVertical(axis!),
            isReverse: this.isReverse(axis!) !== this.isRTL()
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
                marks={this.props.marks!}
                max={this.props.max!}
                min={this.props.min!}
                orientation={this.isVertical(this.props.axis!) ? 'vertical' : 'horizontal'}
                relativeStep={this.state.relativeStep}
                relativeValue={this.state.relativeValue}
                required={this.props.required!}
                rtl={this.isRTL()}
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
            relativeValue: this.getRelativeValue(value!, min!, max!, step),
            relativeStep: this.getRelativeStep(step, min!, max!),
            isVertical: this.isVertical(nextProps.axis || this.props.axis!),
            isReverse: this.isReverse(nextProps.axis || this.props.axis!) !== this.isRTL()
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

    private onSliderFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onFocus!(event);
    }

    private onSliderBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onBlur!(event);
    }

    private isVertical(axis: AxisOptions): boolean {
        return axis === AXISES.y || axis === AXISES.yReverse;
    }

    private isReverse(axis: AxisOptions): boolean {
        return axis === AXISES.xReverse || axis === AXISES.yReverse;
    }

    private isRTL(): boolean {
        return isRTLContext(this.context);
    }

    private increaseValue(toEdge: boolean = false, multiplier: number = 1) {
        this.changeValue(ChangeDirrection.ascend, multiplier, toEdge);
    }

    private decreaseValue(toEdge: boolean = false, multiplier: number = 1) {
        this.changeValue(ChangeDirrection.descend, multiplier, toEdge);
    }

    private changeValue(dirrection: ChangeDirrection, multiplier: number = 1, toEdge: boolean = false) {
        const {relativeValue} = this.state;
        let newRelativeValue: number;

        const relativeStep = this.state.relativeStep === CONTINUOUS_STEP ?
            1 :
            this.state.relativeStep;

        if (toEdge) {
            newRelativeValue = dirrection === ChangeDirrection.ascend ?
                100 :
                0;
        } else {
            newRelativeValue = this.getValueInRange(
                dirrection === ChangeDirrection.ascend ?
                    Math.floor(relativeValue / relativeStep) * relativeStep + relativeStep * multiplier :
                    Math.ceil(relativeValue / relativeStep) * relativeStep - relativeStep * multiplier,
                0, 100
            );
        }

        const newAbsoluteValue = this.getAbsoluteValue(newRelativeValue);

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

    private getRelativeStep(step: Step | undefined, min: number, max: number): Step {
        if (typeof step === 'undefined' || step === CONTINUOUS_STEP) {
            return CONTINUOUS_STEP;
        }
        return 100 * step / (max - min);
    }

    private getRelativeValue(value: number, min: number, max: number, step?: Step): number {
        const normilizedMax = max - min;
        const normilizedValue = value - min;

        const relativeValue = (normilizedValue * 100) / normilizedMax;

        return this.getValueInRange(relativeValue, 0, 100);
    }

    private getAbsoluteValue(relativeValue: number): number {
        const range = this.props.max! - this.props.min!;
        const absoluteValue = range * relativeValue / 100 + this.props.min!;
        return this.getValueInRange(absoluteValue, this.props.min!, this.props.max!);
    }

    private getValueInRange(value: number, min: number, max: number): number {
        return value < min ? min : (value > max ? max : value);
    }

    private getValueFromElementAndPointer(element: HTMLElement, {clientX, clientY}: PointerPosition): number {
        const {relativeStep, isVertical, isReverse} = this.state;
        const {top, left, height, width} = element.getBoundingClientRect();

        const sliderOffset = isVertical ? top : left;
        const sliderSize = isVertical ? height : width;
        const sliderCoordinate = isVertical ? clientY : clientX;

        let relativeValue = this.getRelativeValue(sliderCoordinate - sliderOffset, 0, sliderSize);

        relativeValue = isReverse ?
            (isVertical ? relativeValue : 100 - relativeValue) :
            (isVertical ? 100 - relativeValue : relativeValue);

        if (relativeStep === undefined || relativeStep === CONTINUOUS_STEP) {
            return relativeValue;
        }
        let value = Math.round(relativeValue / relativeStep) * relativeStep;
        value = value > 100 ?
            value - relativeStep :
            (value < 0 ? value + relativeStep : value);

        return value;
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

        const relativeValue = this.getValueFromElementAndPointer(sliderArea, event);

        focusableElement.focus();
        this.setState({
            relativeValue,
            isActive: true
        });
        this.isActive = true;

        this.onDragStart(event.nativeEvent);
        this.callInput(this.getAbsoluteValue(relativeValue));
    }

    private onSliderAreaMouseMove = (
        event: MouseEvent,
        sliderArea: HTMLElement
    ) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = this.getValueFromElementAndPointer(sliderArea, event);

        requestAnimationFrame(() => {
            if (!this.isSliderMounted) {
                return;
            }

            this.setState({
                relativeValue
            });
        });

        this.onDrag(event);
        this.callInput(this.getAbsoluteValue(relativeValue));
    }

    private onSliderAreaMouseUp = (
        event: MouseEvent,
        sliderArea: HTMLElement,
        focusableElement: HTMLElement
    ) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = this.getValueFromElementAndPointer(sliderArea, event);
        const value = this.getAbsoluteValue(relativeValue);

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

        const relativeValue = this.getValueFromElementAndPointer(sliderArea, event.touches[0]);

        this.setState({
            relativeValue,
            isActive: true
        });
        this.isActive = true;

        event.preventDefault();

        this.onDragStart(event.nativeEvent);
        this.callInput(this.getAbsoluteValue(relativeValue));
    }

    private onSliderAreaTouchMove = (
        event: TouchEvent,
        sliderArea: HTMLElement
    ) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = this.getValueFromElementAndPointer(sliderArea, event.changedTouches[0]);
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
        this.callInput(this.getAbsoluteValue(relativeValue));
    }

    private onSliderAreaTouchEnd = (
        event: TouchEvent,
        sliderArea: HTMLElement
    ) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = this.getValueFromElementAndPointer(sliderArea, event.changedTouches[0]);
        const value = this.getAbsoluteValue(relativeValue);

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

        const {isReverse} = this.state;
        const {ctrlKey, shiftKey} = event;
        const ctrlOrShiftPressed = shiftKey || ctrlKey;

        switch (keycode(event.keyCode)) {
            case 'up':
                isReverse ?
                    this.decreaseValue(false, ctrlOrShiftPressed ? 10 : 1) :
                    this.increaseValue(false, ctrlOrShiftPressed ? 10 : 1);
                break;
            case 'right':
                isReverse ?
                    this.decreaseValue(ctrlOrShiftPressed, 1) :
                    this.increaseValue(ctrlOrShiftPressed, 1);
                break;
            case 'down':
                isReverse ?
                    this.increaseValue(false, ctrlOrShiftPressed ? 10 : 1) :
                    this.decreaseValue(false, ctrlOrShiftPressed ? 10 : 1);
                break;
            case 'left':
                isReverse ?
                    this.increaseValue(ctrlOrShiftPressed, 1) :
                    this.decreaseValue(ctrlOrShiftPressed, 1);
                break;
            case 'home':
                isReverse ?
                    this.increaseValue(true) :
                    this.decreaseValue(true);
                break;
            case 'end':
                isReverse ?
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
