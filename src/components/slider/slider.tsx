import * as React from 'react';
import {SBComponent} from 'stylable-react-component';

export type PointerEvent = MouseEvent | TouchEvent;
export type Step = number | 'any';

const theme = require('../../style/default-theme/variables.st.css').default;
const style = require('./slider.st.css').default;

const CONTINIOUS_STEP = 'any';
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
  step?: Step;

  name?: string;

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
};

export interface SliderState {
  relativeValue: number;
  relativeStep: Step;
  isActive: boolean;
};

@SBComponent(style)
export class Slider extends React.Component<SliderProps, SliderState> {
  static defaultProps = {
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

    this.state = {
      relativeValue: this.getRelativeValue(this.props.value!, this.props.min!, this.props.max!, this.props.step),
      relativeStep: this.getRelativeStep(props.step, this.props.min!, this.props.max!),
      isActive: false
    }
  }

  componentDidMount() {
    this.isSliderMounted = true;
  }

  componentWillUnmount() {
    this.isSliderMounted = false;
  }

  componentWillReceiveProps(nextProps: SliderProps) {
    if (this.state.isActive) {
      return;
    }

    const value = nextProps.value || this.props.value;
    const min = nextProps.min || this.props.min;
    const max = nextProps.max || this.props.max;
    const step = nextProps.step || this.props.step;

    this.setState({
      relativeValue: this.getRelativeValue(value!, min!, max!, step),
      relativeStep: this.getRelativeStep(step, min!, max!)
    })
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

  private getRelativeStep(step: Step | undefined, min: number, max: number ): Step {
    if (typeof step === 'undefined' || step === CONTINIOUS_STEP) {
      return CONTINIOUS_STEP;
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

    return this.getValueInRange(relativeValue, 0, 100);;
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
    const {relativeStep} = this.state;

    if (typeof relativeStep === 'undefined' || relativeStep === CONTINIOUS_STEP) {
      return relativeValue;
    }
    let value = Math.round(relativeValue / relativeStep) * relativeStep;
    value = value > 100 ?
      value - relativeStep :
      (value < 0 ? value + relativeStep : value)
    
    return value;
  }

  private onSliderAreaMouseDown(event: React.MouseEvent<HTMLElement>) {
    if (this.props.disabled) {
      return;
    }
    const sliderArea = event.currentTarget;
    this.sliderArea = sliderArea;

    this.setState({
      relativeValue: this.getValueFromElementAndPointer(event.currentTarget, event.clientX),
      isActive: true
    });

    this.props.environment!.addEventListener('mousemove', this.onSliderAreaMouseMove);
    this.props.environment!.addEventListener('mouseup', this.onSliderAreaMouseUp);

    event.preventDefault();
    sliderArea.focus();

    this.onDragStart(event.nativeEvent);
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
    const relativeValue = this.getValueFromElementAndPointer(this.sliderArea, event.clientX);
    this.setState({
      relativeValue,
      isActive: false
    });

    this.props.environment!.removeEventListener('mousemove', this.onSliderAreaMouseMove);
    this.props.environment!.removeEventListener('mouseup', this.onSliderAreaMouseUp);
    
    this.onDragStop(event);
    const value = this.getAbsoluteValue(relativeValue);
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

  render() {
    return (
      <div
        className={style['slider-container']}
        data-automation-id='SLIDER-CONTAINER'
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
          data-automation-id='SLIDER-NATIVE-INPUT'
          name={this.props.name}
          required={this.props.required}
          tabIndex={-1}
          readOnly={true}
        />
        <div
          className={style['slider']}
          data-automation-id='SLIDER'
          tabIndex={this.props.disabled ? -1 : 0}
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
