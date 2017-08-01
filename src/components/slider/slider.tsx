import * as React from 'react';

const theme = require('../../style/default-theme/variables.st.css').default;
const style = require('./slider.st.css').default;

const DEFAULT_STEP = 1;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_VALUE = 50;

function handleDisabledBehavour(this: any, target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDecorator {
  const method = descriptor.value;
  return function(this: any) {
    if (this.props.disabled) {
      return ;
    }
    return method.apply(this, arguments);
  }
}

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

  onChange?(event: React.SyntheticEvent<HTMLInputElement>, value: number): void;
  onInput?(event: React.SyntheticEvent<HTMLInputElement>, value: number): void;

  onFocus?(event: React.SyntheticEvent<HTMLInputElement>): void;
  onBlur?(event: React.SyntheticEvent<HTMLInputElement>): void;

  onDragStart?(event: React.SyntheticEvent<HTMLInputElement>): void;
  onDragStop?(event: React.SyntheticEvent<HTMLInputElement>): void;
};

export interface SliderState {
  relativeValue: number;
};

export class Slider extends React.Component<SliderProps, SliderState> {

  constructor(props: SliderProps, context?: any) {
    super(props, context);
  }

  private onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    this.props.onChange && this.props.onChange(event, Number(event.target.value));
}

  private onInput: React.ChangeEventHandler<HTMLInputElement> = event => {
    this.props.onInput && this.props.onInput(event, Number(event.target.value));
  }

  private onFocus: React.FocusEventHandler<HTMLInputElement> = event => {
    this.props.onFocus && this.props.onFocus(event);
  }

  private onBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    this.props.onBlur && this.props.onBlur(event);
  }

  private getRelativeValue(value: number): number {
    const min = this.props.min || DEFAULT_MIN;
    const max = this.props.max || DEFAULT_MAX;

    const normilizedMax = max - min;
    const normilizedValue = value - min;

    return (normilizedValue * 100) / normilizedMax;
  }

  render() {
    return (
      <div className={style['slider-container']} data-automation-id='SLIDER-CONTAINER'>
        <input
          value={this.props.value}
          type="number"
          className={style['slider-native-input']}
          name={this.props.name}
          required={this.props.required}
          tabIndex={-1}
          readOnly={true}
        />
        <div className={style['slider']} data-automation-id='SLIDER' tabIndex={0}>
          <div className={style['slider-track']} data-automation-id='SLIDER-TRACK'>
            <div className={style['slider-progress']} data-automation-id='SLIDER-PROGRESS'></div>
            <a className={style['slider-handle']} data-automation-id='SLIDER-HANDLE'></a>
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
