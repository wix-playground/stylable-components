import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {noop} from '../../utils/noop';
import {GlobalEvent} from '../global-event';
import {isVertical} from './slider-calculations';
import {
    AXISES,
    CONTINUOUS_STEP,
    DEFAULT_AXIS
} from './slider-constants';
import {
    AxisOptions,
    KeyboardHandler,
    MouseHandler,
    Step,
    TouchHandler
} from './slider-types';
import style from './slider.st.css';

export interface SliderViewProps extends FormInputProps<number, string>, properties.Props {
    tooltip: React.ReactNode;

    relativeValue: number;
    relativeStep: Step;

    min: number;
    max: number;
    step: Step;
    axis: AxisOptions;
    orientation: 'vertical' | 'horizontal';

    name: string;
    label: string;

    active: boolean;
    disabled: boolean;
    error: boolean;
    marks: boolean;
    required: boolean;
    rtl: boolean;

    onFocus: React.FocusEventHandler<HTMLElement>;
    onBlur: React.FocusEventHandler<HTMLElement>;

    onSliderAreaKeyDown: KeyboardHandler;

    onSliderAreaMouseDown: MouseHandler;
    onSliderAreaMouseMove: MouseHandler;
    onSliderAreaMouseUp: MouseHandler;

    onSliderAreaTouchStart: TouchHandler;
    onSliderAreaTouchMove: TouchHandler;
    onSliderAreaTouchEnd: TouchHandler;
}

@stylable(style)
@properties
export class SliderView extends React.Component<SliderViewProps, {}> {
    public static defaultProps: Partial<SliderViewProps> = {
        axis: DEFAULT_AXIS,
        orientation: 'horizontal',

        onFocus: noop,
        onBlur: noop,

        onSliderAreaKeyDown: noop,

        onSliderAreaMouseDown: noop,
        onSliderAreaMouseMove: noop,
        onSliderAreaMouseUp: noop,

        onSliderAreaTouchStart: noop,
        onSliderAreaTouchMove: noop,
        onSliderAreaTouchEnd: noop
    };

    private focusableElement: HTMLElement;

    private sliderArea: HTMLElement;

    private isActive: boolean = false;

    constructor(props: SliderViewProps, context?: any) {
        super(props, context);
    }

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
                    data-automation-id="NATIVE-INPUT"
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
                        aria-orientation={this.props.orientation}
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

    private getTooltip(): React.ReactNode {
        return this.props.tooltip;
    }

    private getMarks(): JSX.Element[] {
        const {marks, min, max, step, relativeStep} = this.props;
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
        return isVertical(this.props.axis!) ?
            {height: `${this.props.relativeValue}%`} :
            {width: `${this.props.relativeValue}%`};
    }

    private getHandleStyles() {
        const isReverse = this.isReverse(this.props.axis!);
        return isVertical(this.props.axis!) ?
            (isReverse ?
                {top: `${this.props.relativeValue}%`} :
                {bottom: `${this.props.relativeValue}%`}) :
            (isReverse ?
                {right: `${this.props.relativeValue}%`} :
                {left: `${this.props.relativeValue}%`});
    }

    private getMarkStyles(position: number) {
        const vertical = isVertical(this.props.axis!);
        return this.isReverse(this.props.axis!) ?
            (vertical ?
                {top: `${position}%`} :
                {right: `${position}%`}) :
            (vertical ?
                {bottom: `${position}%`} :
                {left: `${position}%`});
    }

    private getMarkClass(position: number) {
        const {relativeValue} = this.props;
        return position <= relativeValue ?
            'markProgress' :
            'markTrack';
    }

    private isReverse(axis: AxisOptions): boolean {
        return (axis === AXISES.xReverse || axis === AXISES.yReverse) !== this.isRTL();
    }

    private onSliderFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onFocus!(event);
    }

    private onSliderBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onBlur!(event);
    }

    private isRTL(): boolean {
        return Boolean(this.props.rtl);
    }

    private onSliderAreaMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        this.isActive = true;
        this.props.onSliderAreaMouseDown!(event, this.sliderArea, this.focusableElement);
    }

    private onSliderAreaMouseMove = (event: MouseEvent) => {
        if (!this.isActive) {
            return;
        }
        this.props.onSliderAreaMouseMove!(event, this.sliderArea, this.focusableElement);
    }

    private onSliderAreaMouseUp = (event: MouseEvent) => {
        if (!this.isActive) {
            return;
        }
        this.isActive = false;
        this.props.onSliderAreaMouseUp!(event, this.sliderArea, this.focusableElement);
    }

    private onSliderAreaTouchStart = (event: React.TouchEvent<HTMLElement>) => {
        this.isActive = true;
        this.props.onSliderAreaTouchStart!(event, this.sliderArea, this.focusableElement);
    }

    private onSliderAreaTouchMove = (event: TouchEvent) => {
        if (!this.isActive) {
            return;
        }
        this.props.onSliderAreaTouchMove!(event, this.sliderArea, this.focusableElement);
    }

    private onSliderAreaTouchEnd = (event: TouchEvent) => {
        if (!this.isActive) {
            return;
        }
        this.isActive = false;
        this.props.onSliderAreaTouchEnd!(event, this.sliderArea, this.focusableElement);
    }

    private onSliderAreaKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        this.props.onSliderAreaKeyDown!(event);
    }
}
