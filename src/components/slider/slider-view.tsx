import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {FormInputProps} from '../../types/forms';
import {last, noop} from '../../utils';
import {GlobalEvent} from '../global-event';
import {
    getPositionProperty,
    getSizeProperty
} from './slider-calculations';
import {
    AXES,
    CONTINUOUS_STEP,
    DEFAULT_AXIS
} from './slider-constants';
import {
    AxisOptions,
    FocusEventHandler,
    KeyboardHandler,
    MouseHandler,
    Step,
    TouchHandler
} from './slider-types';
import style from './slider.st.css';

export interface SliderViewProps extends FormInputProps<number[], string>, properties.Props {
    tooltip: React.ReactNode;

    relativeValue: number[];
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
    displayStopMarks: boolean;
    required: boolean;
    rtl: boolean;

    onSliderFocus: FocusEventHandler;
    onSliderBlur: FocusEventHandler;

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

        onSliderFocus: noop,
        onSliderBlur: noop,

        onSliderAreaKeyDown: noop,

        onSliderAreaMouseDown: noop,
        onSliderAreaMouseMove: noop,
        onSliderAreaMouseUp: noop,

        onSliderAreaTouchStart: noop,
        onSliderAreaTouchMove: noop,
        onSliderAreaTouchEnd: noop
    };

    private focusableElements: HTMLElement[] = [];

    private sliderArea: HTMLElement;

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
                    active: this.props.active,
                    disabled: Boolean(this.props.disabled),
                    error: Boolean(this.props.error),
                    x: this.props.axis === AXES.x !== this.props.rtl,
                    y: this.props.axis === AXES.y,
                    xReverse: this.props.axis === AXES.xReverse !== this.props.rtl,
                    yReverse: this.props.axis === AXES.yReverse
                }}
            >
                <GlobalEvent
                    mousemove={this.onSliderAreaMouseMove}
                    mouseup={this.onSliderAreaMouseUp}
                    touchmove={this.onSliderAreaTouchMove}
                    touchend={this.onSliderAreaTouchEnd}
                    touchcancel={this.onSliderAreaTouchEnd}
                />
                {this.getNativeInput()}
                <div
                    className="track"
                    data-automation-id="SLIDER-TRACK"
                >
                    <div
                        className="progress"
                        data-automation-id="SLIDER-PROGRESS"
                        style={this.getProgressStyles()}
                    />
                    {this.getHandles()}
                    {this.getMarks()}
                </div>
            </div>
        );
    }

    private getTooltip(): React.ReactNode {
        return this.props.tooltip;
    }

    private getNativeInput(): JSX.Element[] {
        return this.props.value!.map((item, index) => (
            <input
                className="nativeInput"
                value={item}
                type="hidden"
                key={index}
                data-automation-id={`NATIVE-INPUT-${index}`}
                name={this.props.value!.length > 1 ? this.props.name + index : this.props.name}
                required={this.props.required}
                disabled={this.props.disabled}
            />
        ));
    }

    private getHandles(): JSX.Element[] {
        return this.props.relativeValue!.map((value, index) => (
            <a
                ref={el => this.focusableElements[index] = el as HTMLElement}
                className="handle"
                data-automation-id={this.props.value!.length > 1 ? `SLIDER-HANDLE-${index}` : 'SLIDER-HANDLE'}
                style={this.getHandleStyles(value)}

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

                key={index}
            >
                <div
                    className="tooltip"
                    data-automation-id="SLIDER-TOOLTIP"
                >
                    {this.getTooltip()}
                </div>
            </a>

        ));
    }

    private getMarks(): JSX.Element[] {
        const {displayStopMarks, min, max, step, relativeStep} = this.props;
        const range = (max! - min!);
        const markElements: JSX.Element[] = [];
        if (
            !displayStopMarks ||
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

    private getProgressStyles(): {[key in 'width' | 'height']?: string} {
        const values = this.props.relativeValue;
        const firstValue = values[0];
        const lastValue = last(values);
        const leftEdge = values.length > 1 ?
            `${firstValue}%` :
            '0';
        const size = values.length > 1 ?
            `${lastValue - firstValue}%` :
            `${lastValue}%`;
        return {
            [getSizeProperty(this.props.axis!)]: size,
            [getPositionProperty(this.props.axis, this.props.rtl)]: leftEdge
        };
    }

    private getHandleStyles(value: number): {[key in 'top' | 'bottom' | 'right' | 'left']?: string} {
        return {
            [getPositionProperty(this.props.axis!, this.props.rtl)]: `${value}%`
        };
    }

    private getMarkStyles(position: number): {[key in 'top' | 'bottom' | 'right' | 'left']?: string} {
        return {
            [getPositionProperty(this.props.axis!, this.props.rtl)]: `${position}%`
        };
    }

    private getMarkClass(position: number): 'markProgress' | 'markTrack' {
        const {relativeValue} = this.props;
        return !(position < relativeValue[0] && relativeValue.length > 1) &&
            position <= last(relativeValue) ?
                'markProgress' :
                'markTrack';
    }

    private onSliderFocus: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onSliderFocus!(event, 0);
    }

    private onSliderBlur: React.FocusEventHandler<HTMLElement> = event => {
        this.props.onSliderBlur!(event, 0);
    }

    private onSliderAreaMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        this.isActive = true;
        this.props.onSliderAreaMouseDown!(event, this.sliderArea, this.focusableElements);
    }

    private onSliderAreaMouseMove = (event: MouseEvent) => {
        if (!this.isActive) {
            return;
        }
        this.props.onSliderAreaMouseMove!(event, this.sliderArea, this.focusableElements);
    }

    private onSliderAreaMouseUp = (event: MouseEvent) => {
        if (!this.isActive) {
            return;
        }
        this.isActive = false;
        this.props.onSliderAreaMouseUp!(event, this.sliderArea, this.focusableElements);
    }

    private onSliderAreaTouchStart = (event: React.TouchEvent<HTMLElement>) => {
        this.isActive = true;
        this.props.onSliderAreaTouchStart!(event, this.sliderArea, this.focusableElements);
    }

    private onSliderAreaTouchMove = (event: TouchEvent) => {
        if (!this.isActive) {
            return;
        }
        this.props.onSliderAreaTouchMove!(event, this.sliderArea, this.focusableElements);
    }

    private onSliderAreaTouchEnd = (event: TouchEvent) => {
        if (!this.isActive) {
            return;
        }
        this.isActive = false;
        this.props.onSliderAreaTouchEnd!(event, this.sliderArea, this.focusableElements);
    }

    private onSliderAreaKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        this.props.onSliderAreaKeyDown!(event);
    }
}
