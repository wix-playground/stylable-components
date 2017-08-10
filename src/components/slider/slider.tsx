import * as React from 'react';
import { SBComponent } from 'stylable-react-component';

export type PointerEvent = MouseEvent | TouchEvent;
export type Step = number | 'any';

import style from './slider.st.css';

const CONTINUOUS_STEP = 'any';
const DEFAULT_STEP = 1;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_VALUE = 50;

function noop() { }

export interface SliderProps {
    value?: number;
    min?: number;
    max?: number;
    step?: Step;

    name?: string;
    label?: string;

    disabled?: boolean;
    required?: boolean;
    error?: boolean;

    environment?: Element;

    onChange?(value: number): void;
    onInput?(value: string): void;

    onFocus?(event: React.SyntheticEvent<HTMLInputElement>): void;
    onBlur?(event: React.SyntheticEvent<HTMLInputElement>): void;

    onDragStart?(event: PointerEvent): void;
    onDrag?(event: PointerEvent): void;
    onDragStop?(event: PointerEvent): void;
}

export interface SliderState {
    relativeValue: number;
    relativeStep: Step;
    isActive: boolean;
}

@SBComponent(style)
export class Slider extends React.Component<SliderProps, SliderState> {
    public static defaultProps = {
        min: DEFAULT_MIN,
        max: DEFAULT_MAX,
        step: DEFAULT_STEP,
        value: DEFAULT_VALUE,

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

        this.onSliderAreaMouseDown = this.onSliderAreaMouseDown.bind(this);
        this.onSliderAreaMouseMove = this.onSliderAreaMouseMove.bind(this);
        this.onSliderAreaMouseUp = this.onSliderAreaMouseUp.bind(this);

        this.onSliderAreaTouchStart = this.onSliderAreaTouchStart.bind(this);
        this.onSliderAreaTouchMove = this.onSliderAreaTouchMove.bind(this);
        this.onSliderAreaTouchEnd = this.onSliderAreaTouchEnd.bind(this);

        this.state = {
            relativeValue: this.getRelativeValue(this.props.value!, this.props.min!, this.props.max!, this.props.step),
            relativeStep: this.getRelativeStep(props.step, this.props.min!, this.props.max!),
            isActive: false
        };
    }

    public render() {
        return (
            <div
                className={style['slider-container']}
                data-automation-id="SLIDER-CONTAINER"
                cssStates={{
                    active: this.state.isActive,
                    disabled: Boolean(this.props.disabled),
                    error: Boolean(this.props.error)
                }}
            >
                <input
                    value={this.props.value}
                    type="number"
                    className={style['slider-native-input']}
                    data-automation-id="SLIDER-NATIVE-INPUT"
                    name={this.props.name}
                    required={this.props.required}
                    disabled={this.props.disabled}
                    tabIndex={-1}
                    readOnly={true}
                />
                <div
                    className={style.slider}
                    data-automation-id="SLIDER"
                    title={this.props.label}
                    tabIndex={this.props.disabled ? -1 : 0}

                    onMouseDown={this.onSliderAreaMouseDown}
                    onTouchStart={this.onSliderAreaTouchStart}

                    role="slider"
                    aria-label={this.props.label}
                    aria-orientation="horizontal"
                    aria-valuemin={`${this.props.min}`}
                    aria-valuemax={`${this.props.max}`}
                    aria-valuenow={`${this.props.value}`}
                >
                    <div className={style['slider-track']} data-automation-id="SLIDER-TRACK">
                        <div
                            className={style['slider-progress']}
                            data-automation-id="SLIDER-PROGRESS"
                            style={{
                                width: `${this.state.relativeValue}%`
                            }}
                        />
                        <a
                            className={style['slider-handle']}
                            data-automation-id="SLIDER-HANDLE"
                            style={{
                                left: `${this.state.relativeValue}%`
                            }}
                        />
                    </div>
                </div>
                <div className={style['slider-scale-container']} data-automation-id="SLIDER-SCALE-CONTAINER" />

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
            relativeStep: this.getRelativeStep(step, min!, max!)
        });
    }

    private onFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        this.props.onFocus!(event);
    }

    private onBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        this.props.onBlur!(event);
    }

    private getRelativeStep(step: Step | undefined, min: number, max: number): Step {
        if (typeof step === 'undefined' || step === CONTINUOUS_STEP) {
            return CONTINUOUS_STEP;
        }
        return 100 * step / (max - min);
    }

    private getValueInRange(value: number, min: number, max: number): number {
        return value < min ? min : (value > max ? max : value);
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

    private getValueFromElementAndPointer(element: HTMLElement, pointerPosition: number): number {
        const sliderBounds = element.getBoundingClientRect();
        const sliderOffset = sliderBounds.left;
        const sliderSize = sliderBounds.width;
        const relativeValue = this.getRelativeValue(pointerPosition - sliderOffset, 0, sliderSize);
        const { relativeStep } = this.state;

        if (typeof relativeStep === 'undefined' || relativeStep === CONTINUOUS_STEP) {
            return relativeValue;
        }
        let value = Math.round(relativeValue / relativeStep) * relativeStep;
        value = value > 100 ?
            value - relativeStep :
            (value < 0 ? value + relativeStep : value);

        return value;
    }

    private onSliderAreaMouseDown(event: React.MouseEvent<HTMLElement>) {
        if (this.props.disabled) {
            return;
        }
        const sliderArea = event.currentTarget;
        this.sliderArea = sliderArea;

        this.props.environment!.addEventListener('mousemove', this.onSliderAreaMouseMove);
        this.props.environment!.addEventListener('mouseup', this.onSliderAreaMouseUp);

        event.preventDefault();
        sliderArea.focus();

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.clientX);

        this.setState({
            relativeValue,
            isActive: true
        });

        this.onDragStart(event.nativeEvent);
        this.props.onInput!(String(this.getAbsoluteValue(relativeValue)));
    }

    private onSliderAreaMouseMove(event: MouseEvent) {
        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.clientX);

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

    private onSliderAreaMouseUp(event: MouseEvent) {
        this.props.environment!.removeEventListener('mousemove', this.onSliderAreaMouseMove);
        this.props.environment!.removeEventListener('mouseup', this.onSliderAreaMouseUp);

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.clientX);
        const value = this.getAbsoluteValue(relativeValue);

        this.setState({
            relativeValue,
            isActive: false
        });

        this.onDragStop(event);
        this.props.onChange!(value);
    }

    private onSliderAreaTouchStart(event: React.TouchEvent<HTMLElement>) {
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

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.touches[0].clientX);

        this.setState({
            relativeValue,
            isActive: true
        });

        event.preventDefault();

        this.onDragStart(event.nativeEvent);
        this.props.onInput!(String(this.getAbsoluteValue(relativeValue)));
    }

    private onSliderAreaTouchMove(event: TouchEvent) {
        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.changedTouches[0].clientX);

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

    private onSliderAreaTouchEnd(event: TouchEvent) {
        this.props.environment!.removeEventListener('touchmove', this.onSliderAreaTouchMove);
        this.props.environment!.removeEventListener('touchup', this.onSliderAreaTouchEnd);
        this.props.environment!.removeEventListener('touchend', this.onSliderAreaTouchEnd);
        this.props.environment!.removeEventListener('touchcancel', this.onSliderAreaTouchEnd);

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.changedTouches[0].clientX);
        const value = this.getAbsoluteValue(relativeValue);

        this.setState({
            relativeValue,
            isActive: false
        });

        this.onDragStop(event);
        this.props.onChange!(value);
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
