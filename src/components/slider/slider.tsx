import * as React from 'react';

const style = require('./slider.st.css').default;

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_VALUE = 50;
export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number | 'any';

  name?: string;

  disabled?: boolean;
  required?: boolean;

  onChange?(event: React.SyntheticEvent<HTMLInputElement>, value: number | undefined): void;
  onInput?(event: React.SyntheticEvent<HTMLInputElement>, value: number | undefined): void;

  onFocus?(event: React.SyntheticEvent<HTMLInputElement>): void;
  onBlur?(event: React.SyntheticEvent<HTMLInputElement>): void;

  onDragStart?(event: React.SyntheticEvent<HTMLInputElement>): void;
  onDragStop?(event: React.SyntheticEvent<HTMLInputElement>): void;
};

export interface SliderState {
  relativeValue: number;
  trackBackgroudStyle: string;
};

export class Slider extends React.Component<SliderProps, SliderState> {

  constructor(props: SliderProps, context?: any) {
    super(props, context);

    this.updateTrackBackgroundGradient(this.props.value || DEFAULT_VALUE);
  }

  private onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    this.props.onChange && this.props.onChange(event, Number(event.target.value));
  }

  private onInput: React.ChangeEventHandler<HTMLInputElement> = event => {
    this.props.onInput && this.props.onInput(event, Number(event.target.value));

    this.updateTrackBackgroundGradient(Number(event.target.value));
  }

  private onFocus: React.FocusEventHandler<HTMLInputElement> = event => {
    this.props.onFocus && this.props.onFocus(event);
  }

  private onBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    this.props.onBlur && this.props.onBlur(event);
  }

  private updateTrackBackgroundGradient(value: number) {
    const relativeValue = this.getRelativeValue(value);

    this.setState({
      trackBackgroudStyle: this.getTrackBackgroundGradient(relativeValue, '#aaa', '#fff')
    });
  }

  private getRelativeValue(value: number): number {
    const min = this.props.min || DEFAULT_MIN;
    const max = this.props.max || DEFAULT_MAX;

    const normilizedMax = max - min;
    const normilizedValue = value - min;

    return (normilizedValue * 100) / normilizedMax;
  }

  private getTrackBackgroundGradient(thumbPosition: number, progressColor: string, trackColor: string): string {
    return `background: ${trackColor};
      background: -moz-linear-gradient(left, ${progressColor} 0%, ${progressColor} ${thumbPosition - 0.1}%, ${trackColor} ${thumbPosition + 0.1}%, ${trackColor} 100%);
      background: -webkit-linear-gradient(left, ${progressColor} 0%, ${progressColor} ${thumbPosition - 0.1}%, ${trackColor} ${thumbPosition + 0.1}%, ${trackColor} 100%);
      background: linear-gradient(to right, ${progressColor} 0%, ${progressColor} ${thumbPosition - 0.1}%, ${trackColor} ${thumbPosition + 0.1}%, ${trackColor} 100%);`;
  }

  render() {
    return (
      <div className={style['slider-container']} data-automation-id='SLIDER'>
        <input
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}

          name={this.props.name}

          disabled={this.props.disabled}
          required={this.props.required}

          className={style['slider']}
          type="range"

          onChange={this.onChange}
          onInput={this.onInput}

          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}
