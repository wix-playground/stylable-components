import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {isRTLContext} from '../../utils';
import {GlobalEvent} from '../global-event';
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

export type Step = number | 'any';
export type AxisOptions = 'x' | 'y' | 'x-reverse' | 'y-reverse';

export interface PointerPosition {
    clientX: number;
    clientY: number;
}

export interface SliderViewProps extends FormInputProps<number, string>, properties.Props {
    name?: string;
    label?: string;

    min?: number;
    max?: number;

    active?: boolean;
    error?: boolean;
    disabled?: boolean;
    marks?: boolean;
    required?: boolean;
    rtl?: boolean;

    axis?: AxisOptions;

    step?: Step;
    tooltip?: React.ReactNode;
}

export interface SliderViewState {
    relativeValue: number;
    relativeStep: Step;
    isActive: boolean;
    isVertical: boolean;
    isReverse: boolean;
}

@stylable(style)
export class SliderView extends React.Component<SliderViewProps, SliderViewState> {
    private focusableElement: HTMLElement;

    private sliderArea: HTMLElement;

    private isSliderMounted: boolean = false;

    private isActive: boolean = false;

    public render() {
        return (
            <div
                data-automation-id="SLIDER"
                ref={el => this.sliderArea = el as HTMLElement}
                className="container"
                title={this.props.label}

                onMouseDown={this.onSliderAreaMouseDown}
                onTouchStart={this.onSliderAreaTouchStart}

                style-state={{
                    'active': this.props.active,
                    'disabled': Boolean(this.props.disabled),
                    'error': Boolean(this.props.error),
                    'x': this.props.axis === AXISES.x !== this.isRTL(),
                    'y': this.props.axis === AXISES.y,
                    'x-reverse': this.props.axis === AXISES.xReverse !== this.isRTL(),
                    'y-reverse': this.props.axis === AXISES.yReverse
                }}
            >
                <GlobalEvent
                    mousemove={this.onSliderAreaMouseMove}
                    mouseup={this.onSliderAreaMouseUp}
                    touchmove={this.onSliderAreaTouchMove}
                    touchend={this.onSliderAreaTouchEnd}
                    touchcancel={this.onSliderAreaTouchEnd}
                />
                <input
                    className="native-input"
                    value={this.props.value}
                    type="hidden"
                    data-automation-id="SLIDER-NATIVE-INPUT"
                    name={this.props.name}
                    required={this.props.required}
                    disabled={this.props.disabled}
                />
                <div
                    className="track"
                    data-automation-id="SLIDER-TRACK"
                >
                    <div
                        className="progress"
                        data-automation-id="SLIDER-PROGRESS"
                        style={this.getProgressStyles()}
                    />
                    <a
                        ref={el => this.focusableElement = el as HTMLElement}
                        className="handle"
                        data-automation-id="SLIDER-HANDLE"
                        style={this.getHandleStyles()}

                        onKeyDown={this.onSliderAreaKeyDown}

                        onFocus={this.onSliderFocus}
                        onBlur={this.onSliderBlur}

                        role="slider"
                        aria-label={this.props.label}
                        aria-orientation={this.state.isVertical ? 'vertical' : 'horizontal'}
                        aria-valuemin={`${this.props.min}`}
                        aria-valuemax={`${this.props.max}`}
                        aria-valuenow={`${this.props.value}`}
                        tabIndex={this.props.disabled ? -1 : 0}
                    >
                        <div
                            className="tooltip"
                            data-automation-id="SLIDER-TOOLTIP"
                        >
                            {this.getTooltip()}
                        </div>
                    </a>
                    {this.getMarks()}
                </div>
            </div>
        );
    }

    private isRTL(): boolean {
        return Boolean(this.props.rtl);
    }

    private getTooltip(): React.ReactNode {
        return this.props.tooltip;
    }

    private getMarks(): JSX.Element[] {
        const {marks, min, max, step} = this.props;
        const {relativeStep} = this.state;
        const range = (max! - min!);
        const markElements: JSX.Element[] = [];
        if (
            !marks ||
            typeof step === 'undefined' ||
            step === CONTINUOUS_STEP ||
            relativeStep === CONTINUOUS_STEP ||
            range % step
        ) {
            return markElements;
        }

        for (let i = 0; i <= range / step; i++) {
            const position = relativeStep * i;

            markElements.push((
                <span
                    data-automation-id={`SLIDER-MARKS-${i}`}
                    key={i}
                    className={this.getMarkClass(position)}
                    style={this.getMarkStyles(position)}
                />
            ));
        }

        return markElements;
    }

    private getProgressStyles() {
        return this.state.isVertical ?
            {height: `${this.state.relativeValue}%`} :
            {width: `${this.state.relativeValue}%`};
    }

    private getHandleStyles() {
        return this.state.isVertical ?
            (this.state.isReverse ?
                {top: `${this.state.relativeValue}%`} :
                {bottom: `${this.state.relativeValue}%`}) :
            (this.state.isReverse ?
                {right: `${this.state.relativeValue}%`} :
                {left: `${this.state.relativeValue}%`});
    }

    private getMarkStyles(position: number) {
        const {isReverse, isVertical} = this.state;
        return isReverse ?
            (isVertical ?
                {top: `${position}%`} :
                {right: `${position}%`}) :
            (isVertical ?
                {bottom: `${position}%`} :
                {left: `${position}%`});
    }

    private getMarkClass(position: number) {
        const {relativeValue} = this.state;
        return position <= relativeValue ?
            'markProgress' :
            'markTrack';
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

    private onSliderAreaMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }

        event.preventDefault();
        this.focusableElement.focus();

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event);

        this.setState({
            relativeValue,
            isActive: true
        });
        this.isActive = true;

        this.onDragStart(event.nativeEvent);
        this.callInput(this.getAbsoluteValue(relativeValue));
    }

    private onSliderAreaMouseMove = (event: MouseEvent) => {
        if (!this.isActive) {
            return;
        }
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
        this.callInput(this.getAbsoluteValue(relativeValue));
    }

    private onSliderAreaMouseUp = (event: MouseEvent) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event);
        const value = this.getAbsoluteValue(relativeValue);

        this.setState({
            relativeValue,
            isActive: false
        });
        this.isActive = false;

        this.focusableElement.focus();
        this.onDragStop(event);
        this.callChange(value);
    }

    private onSliderAreaTouchStart = (event: React.TouchEvent<HTMLElement>) => {
        if (this.props.disabled) {
            return;
        }
        const focusableElement = event.currentTarget;
        this.focusableElement = focusableElement;

        focusableElement.focus();

        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.touches[0]);

        this.setState({
            relativeValue,
            isActive: true
        });
        this.isActive = true;

        event.preventDefault();

        this.onDragStart(event.nativeEvent);
        this.callInput(this.getAbsoluteValue(relativeValue));
    }

    private onSliderAreaTouchMove = (event: TouchEvent) => {
        if (!this.isActive) {
            return;
        }
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
        this.callInput(this.getAbsoluteValue(relativeValue));
    }

    private onSliderAreaTouchEnd = (event: TouchEvent) => {
        if (!this.isActive) {
            return;
        }
        const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.changedTouches[0]);
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

    private onSliderFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onFocus!(event);
    }

    private onSliderBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onBlur!(event);
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
