import * as React from 'react';

const style = require('./slider.css');

export interface SliderProps {};

export interface SliderState {};

export class Slider extends React.Component<SliderProps, SliderState> {
  render() {
    return (
      <div className={style['slider-container']} data-automation-id='SLIDER'>
        <input className={style['slider']} type="range" />
      </div>
    );
  }
}
