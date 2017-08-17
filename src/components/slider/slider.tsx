import * as keycode from 'keycode';
import * as React from 'react';
import { SBComponent } from 'stylable-react-component';

export type PointerEvent = MouseEvent | TouchEvent;
export interface PointerPosition {
    clientX: number;
    clientY: number;
}
export type Step = number | 'any';

enum ChangeDirrection {
    ascend,
    descend
}

export const AXISES = {
    x: 'x',
    y: 'y',
    xReverse: 'x-reverse',
    yReverse: 'y-reverse'
};

export type AxisOptions = 'x' | 'y' | 'x-reverse' | 'y-reverse';

import style from './slider.st.css';

const CONTINUOUS_STEP = 'any';
const DEFAULT_STEP = 1;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_VALUE = 50;
const DEFAULT_AXIS = AXISES.x;

function noop() { }

export interface SliderProps {
    value?: number;
    min?: number;
    max?: number;
    step?: Step;
    axis?: AxisOptions;

    name?: string;
    label?: string;

    disabled?: boolean;
    required?: boolean;
    error?: boolean;

    environment?: Element;

    onChange?(value: number): void;
    onInput?(value: string): void;

    onFocus?(event: React.SyntheticEvent<HTMLElement>): void;
    onBlur?(event: React.SyntheticEvent<HTMLElement>): void;

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

@SBComponent(style)
export class Slider extends React.Component<SliderProps, SliderState> {
    public static defaultProps = {
        min: DEFAULT_MIN,
        max: DEFAULT_MAX,
        step: DEFAULT_STEP,
        value: DEFAULT_VALUE,
        axis: DEFAULT_AXIS,

        environment: document,

        onChange: noop,
        onInput: noop,

        onFocus: noop,
        onBlur: noop,

        onDragStart: noop,
        onDrag: noop,
        onDragStop: noop
    };

    private sliderArea: HTMLElement;

    private isSliderMounted: boolean = false;

    constructor(props: SliderProps, context?: any) {
        super(props, context);

        this.state = {
            relativeValue: this.getRelativeValue(this.props.value!, this.props.min!, this.props.max!, this.props.step),
            relativeStep: this.getRelativeStep(props.step, this.props.min!, this.props.max!),
            isActive: false,
            isVertical: this.isVertical(this.props.axis!),
            isReverse: this.isReverse(this.props.axis!)
        };
    }

    public render() {
        return (
            <div
                className="container"
                data-automation-id="SLIDER-CONTAINER"
                cssStates={{
                    'active': this.state.isActive,
                    'disabled': Boolean(this.props.disabled),
                    'error': Boolean(this.props.error),
                    'x': this.props.axis === AXISES.x,
                    'y': this.props.axis === AXISES.y,
                    'x-reverse': this.props.axis === AXISES.xReverse,
                    'y-reverse': this.props.axis === AXISES.yReverse
                }}
            >
                <input
                    className="native-input"
                    value={this.props.value}
                    type="number"
                    data-automation-id="SLIDER-NATIVE-INPUT"
                    name={this.props.name}
                    required={this.props.required}
                    disabled={this.props.disabled}
                    tabIndex={-1}
                    readOnly={true}
                />
                <div
                    className="slider"
                    data-automation-id="SLIDER"
                    title={this.props.label}
                    tabIndex={this.props.disabled ? -1 : 0}

                    onMouseDown={this.onSliderAreaMouseDown}
                    onTouchStart={this.onSliderAreaTouchStart}
                    onKeyDown={this.onSliderAreaKeyDown}

                    onFocus={this.onSliderFocus}
                    onBlur={this.onSliderBlur}

                    role="slider"
                    aria-label={this.props.label}
                    aria-orientation="horizontal"
                    aria-valuemin={`${this.props.min}`}
                    aria-valuemax={`${this.props.max}`}
                    aria-valuenow={`${this.props.value}`}
                >
                    <div
                        className="track"
                        data-automation-id="SLIDER-TRACK"
                    >
                        <div
                            className="progress"
                            data-automation-id="SLIDER-PROGRESS"
                            style={
                                this.state.isVertical ?
                                    {height: `${this.state.relativeValue}%`} :
                                    {width: `${this.state.relativeValue}%`}
                            }
                        />
                        <a
                            className="handle"
                            data-automation-id="SLIDER-HANDLE"
                            style={
                                this.state.isReverse ?
                                    (this.state.isVertical ?
                                        {top: `${this.state.relativeValue}%`} :
                                        {right: `${this.state.relativeValue}%`}) :
                                    (this.state.isVertical ?
                                        {bottom: `${this.state.relativeValue}%`} :
                                        {left: `${this.state.relativeValue}%`})
                            }
                        >
                            <div
                                className="tooltip"
                                data-automation-id="SLIDER-TOOLTIP"
                            >
                                {this.getTooltip()}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    public componentDidMount() {
        this.isSliderMounted = true;
    }

    public componentWillUnmount() {
        this.isSliderMounted = false;
    }

    public componentWillReceiveProps(nextProps: SliderProps) {
        if (this.state.isActive) {
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
            isReverse: this.isReverse(nextProps.axis || this.props.axis!)
        });
    }

    private getTooltip(): number | string | React.ReactElement<any> | undefined {
        return React.Children
            .toArray(this.props.children)
            .find(
                item => typeof item === 'object' ?
                    item.props['data-slot'] === 'tooltip' :
                    false
            );
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

    private increaseValue(toEdge: boolean = false, multiplier: number = 1) {
        this.changeValue(ChangeDirrection.ascend, multiplier, toEdge);
    }

    private decreaseValue(toEdge: boolean = false, multiplier: number = 1) {
        this.changeValue(ChangeDirrection.descend, multiplier, toEdge);
    }

    private changeValue(dirrection: ChangeDirrection, multiplier: number = 1, toEdge: boolean = false) {
        let newRelativeValue: number;

        const relativeStep = this.state.relativeStep === CONTINUOUS_STEP ?
            1 :
            this.state.relativeStep * multiplier;

        if (toEdge) {
            newRelativeValue = dirrection === ChangeDirrection.ascend ?
                100 :
                0;
        } else {
            newRelativeValue = this.getValueInRange(
                dirrection === ChangeDirrection.ascend ?
                    this.state.relativeValue + relativeStep :
                    this.state.relativeValue - relativeStep,
                0, 100
            );
        }

        const newAbsoluteValue = this.getAbsoluteValue(newRelativeValue);

        if (newRelativeValue !== this.state.relativeValue) {
            this.setState({
                relativeValue: newRelativeValue
            });
        }

        this.props.onInput!(String(newAbsoluteValue));
        if (newAbsoluteValue !== this.props.value) {
            this.props.onChange!(newAbsoluteValue);
        }
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

    private getValueFromElementAndPointer(element: HTMLElement, pointerPosition: PointerPosition): number {
        const { relativeStep, isVertical, isReverse } = this.state;

        const sliderBounds = element.getBoundingClientRect();

        const sliderOffset = isVertical ? sliderBounds.top : sliderBounds.left;
        const sliderSize = isVertical ? sliderBounds.height : sliderBounds.width;
        const sliderCoordinate = isVertical ? pointerPosition.clientY : pointerPosition.clientX;

        let relativeValue = this.getRelativeValue(sliderCoordinate - sliderOffset, 0, sliderSize);

        relativeValue = isReverse ?
            (isVertical ? relativeValue : 100 - relativeValue) :
            (isVertical ? 100 - relativeValue : relativeValue);

        if (typeof relativeStep === 'undefined' || relativeStep === CONTINUOUS_STEP) {
            return relativeValue;
        }
        let value = Math.round(relativeValue / relativeStep) * relativeStep;
        value = value > 100 ?
            value - relativeStep :
            (value < 0 ? value + relativeStep : value);

        return value;
    }

    private onSliderAreaMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }
        const sliderArea = event.currentTarget;
        this.sliderArea = sliderArea;

        this.props.environment!.addEventListener('mousemove', this.onSliderAreaMouseMove);
        this.props.environment!.addEventListener('mouseup', this.onSliderAreaMouseUp);

        event.preventDefault();
        sliderArea.focus();

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event);

        this.setState({
            relativeValue,
            isActive: true
        });

        this.onDragStart(event.nativeEvent);
        this.props.onInput!(String(this.getAbsoluteValue(relativeValue)));
    }

    private onSliderAreaMouseMove = (event: MouseEvent) => {
        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event);

        requestAnimationFrame(() => {
            if (!this.isSliderMounted) {
                return;
            }

            this.setState({
                relativeValue
            });
        });

        this.onDrag(event);
        this.props.onInput!(String(this.getAbsoluteValue(relativeValue)));
    }

    private onSliderAreaMouseUp = (event: MouseEvent) => {
        this.props.environment!.removeEventListener('mousemove', this.onSliderAreaMouseMove);
        this.props.environment!.removeEventListener('mouseup', this.onSliderAreaMouseUp);

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event);
        const value = this.getAbsoluteValue(relativeValue);

        this.setState({
            relativeValue,
            isActive: false
        });

        this.onDragStop(event);
        this.props.onChange!(value);
    }

    private onSliderAreaTouchStart = (event: React.TouchEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }
        const sliderArea = event.currentTarget;
        this.sliderArea = sliderArea;

        this.props.environment!.addEventListener('touchmove', this.onSliderAreaTouchMove);
        this.props.environment!.addEventListener('touchup', this.onSliderAreaTouchEnd);
        this.props.environment!.addEventListener('touchend', this.onSliderAreaTouchEnd);
        this.props.environment!.addEventListener('touchcancel', this.onSliderAreaTouchEnd);

        sliderArea.focus();

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.touches[0]);

        this.setState({
            relativeValue,
            isActive: true
        });

        event.preventDefault();

        this.onDragStart(event.nativeEvent);
        this.props.onInput!(String(this.getAbsoluteValue(relativeValue)));
    }

    private onSliderAreaTouchMove = (event: TouchEvent) => {
        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.changedTouches[0]);
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
        this.props.onInput!(String(this.getAbsoluteValue(relativeValue)));
    }

    private onSliderAreaTouchEnd = (event: TouchEvent) => {
        this.props.environment!.removeEventListener('touchmove', this.onSliderAreaTouchMove);
        this.props.environment!.removeEventListener('touchup', this.onSliderAreaTouchEnd);
        this.props.environment!.removeEventListener('touchend', this.onSliderAreaTouchEnd);
        this.props.environment!.removeEventListener('touchcancel', this.onSliderAreaTouchEnd);

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.changedTouches[0]);
        const value = this.getAbsoluteValue(relativeValue);

        this.setState({
            relativeValue,
            isActive: false
        });

        this.onDragStop(event);
        this.props.onChange!(value);
    }

    private onSliderAreaKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }

        const {isReverse} = this.state;
        const multiplier = event.shiftKey ? 10 : 1;

        switch (keycode(event.keyCode)) {
            case 'page down':
                this.decreaseValue(false, multiplier);
                break;
            case 'down':
            case 'left':
                isReverse ?
                    this.increaseValue(false, multiplier) :
                    this.decreaseValue(false, multiplier);
                break;
            case 'page up':
                this.increaseValue(false, multiplier);
                break;
            case 'up':
            case 'right':
                isReverse ?
                    this.decreaseValue(false, multiplier) :
                    this.increaseValue(false, multiplier);
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
