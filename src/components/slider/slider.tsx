import * as React from 'react';
import {SBComponent} from 'stylable-react-component';

export type PointerEvent = MouseEvent | TouchEvent;

const theme = require('../../style/default-theme/variables.st.css').default;
const style = require('./slider.st.css').default;

const DEFAULT_STEP = 1;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_VALUE = 50;

function noop() {}

function getPercent(value: number, min: number, max: number): number {
  let percent = (value - min) / (max - min);
  if (isNaN(percent)) {
    percent = 0;
  }

  return percent;
}

export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number | 'any';

  name?: string;

  disabled?: boolean;
  required?: boolean;

  onChange?(value: number): void;
  onInput?(value: string): void;

  onFocus?(event: React.SyntheticEvent<HTMLInputElement>): void;
  onBlur?(event: React.SyntheticEvent<HTMLInputElement>): void;

  onDragStart?(event: PointerEvent): void;
  onDrag?(event: PointerEvent): void;
  onDragStop?(event: PointerEvent): void;
};

export interface SliderState {
  relativeValue: number;
  isActive: boolean;
};

@SBComponent(style)
export class Slider extends React.Component<SliderProps, SliderState> {
  static defaultProps = {
    min: DEFAULT_MIN,
    max: DEFAULT_MAX,
    step: DEFAULT_STEP,
    value: DEFAULT_VALUE,
    onChange: noop,
    onInput: noop,

    onFocus: noop,
    onBlur: noop,

    onDragStart: noop,
    onDrag: noop,
    onDragStop: noop
  };

  private sliderArea: HTMLElement;

  constructor(props: SliderProps, context?: any) {
    super(props, context);

    this.onSliderAreaMouseDown = this.onSliderAreaMouseDown.bind(this);
    this.onSliderAreaMouseMove = this.onSliderAreaMouseMove.bind(this);
    this.onSliderAreaMouseUp = this.onSliderAreaMouseUp.bind(this);

    this.state = {
      relativeValue: this.getRelativeValue(this.props.value!, this.props.min!, this.props.max!),
      isActive: false
    }
  }

  private onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    this.props.onChange!(Number(event.target.value));
}

  private onInput: React.ChangeEventHandler<HTMLInputElement> = event => {
    this.props.onInput!(String(event.target.value));
  }

  private onFocus: React.FocusEventHandler<HTMLInputElement> = event => {
    this.props.onFocus!(event);
  }

  private onBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    this.props.onBlur!(event);
  }

  private getValueInRange(value: number, min: number, max: number): number {
    return value < min ? min : (value > max ? max : value);
  }

  private getRelativeValue(value: number, min: number, max: number): number {
    const normilizedMax = max - min;
    const normilizedValue = value - min;

    const relativeValue = (normilizedValue * 100) / normilizedMax;

    return this.getValueInRange(relativeValue, 0, 100);;
  }

  private getAbsoluteValue(relativeValue: number) {
    const range = this.props.max! - this.props.min!;
    const absoluteValue = range * 100 / relativeValue + this.props.min!
    return this.getValueInRange(absoluteValue, this.props.min!, this.props.max!);
  }

  private getValueFromElementAndPointer(element: HTMLElement, pointerPosition: number): number {
    const sliderBounds = element.getBoundingClientRect();
    const sliderOffset = sliderBounds.left;
    const sliderSize = sliderBounds.width;

    return this.getRelativeValue(pointerPosition - sliderOffset, 0, sliderSize);
  }

  private onSliderAreaMouseDown(event: React.MouseEvent<HTMLElement>) {
    const sliderArea = event.currentTarget;
    this.sliderArea = sliderArea;

    this.setState({
      relativeValue: this.getValueFromElementAndPointer(event.currentTarget, event.clientX),
      isActive: true
    });

    document.addEventListener('mousemove', this.onSliderAreaMouseMove);
    document.addEventListener('mouseup', this.onSliderAreaMouseUp);

    event.preventDefault();
    sliderArea.focus();

    this.onDragStart(event.nativeEvent);
  }

  private onSliderAreaMouseMove(event: MouseEvent) {
    const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.clientX);

    requestAnimationFrame(() => {
      this.setState({
        relativeValue
      });
    });

    this.onDrag(event);
  }

  private onSliderAreaMouseUp(event: MouseEvent) {
    const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.clientX);
    this.setState({
      relativeValue,
      isActive: false
    });

    document.removeEventListener('mousemove', this.onSliderAreaMouseMove);
    document.removeEventListener('mouseup', this.onSliderAreaMouseUp);
    
    this.onDragStop(event);
    this.props.onChange!(this.getAbsoluteValue(relativeValue));
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

  render() {
    return (
      <div
        className={style['slider-container']}
        data-automation-id='SLIDER-CONTAINER'
        cssStates={{
          active: this.state.isActive
        }}
      >
        <input
          value={this.props.value}
          type="number"
          className={style['slider-native-input']}
          data-automation-id='SLIDER-NATIVE-INPUT'
          name={this.props.name}
          required={this.props.required}
          tabIndex={-1}
          readOnly={true}
        />
        <div
          className={style['slider']}
          data-automation-id='SLIDER'
          tabIndex={0}
          onMouseDown={this.onSliderAreaMouseDown}
        >
          <div className={style['slider-track']} data-automation-id='SLIDER-TRACK'>
            <div
              className={style['slider-progress']}
              data-automation-id='SLIDER-PROGRESS'
              style={{
                width: `${this.state.relativeValue}%`
              }}
            ></div>
            <a
              className={style['slider-handle']}
              data-automation-id='SLIDER-HANDLE'
              style={{
                left: `${this.state.relativeValue}%`
              }}
            ></a>
          </div>
        </div>
        <div className={style['slider-scale-container']} data-automation-id='SLIDER-SCALE-CONTAINER'></div>

      </div>
    );
  }
}

/* <input
  value={this.props.value}
  min={this.props.min}
  max={this.props.max}
  step={this.props.step}

  name={this.props.name}

  required={this.props.required}

  className={style['slider']}
  type="range"

  onChange={this.onChange}
  onInput={this.onInput}

  onFocus={this.onFocus}
  onBlur={this.onBlur}
/> */
