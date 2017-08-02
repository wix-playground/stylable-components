import * as React from 'react';
import { Slider } from '../../src';

export interface SliderDemoProps {
}
export interface SliderDemoState {
  value: number;
}
export class SliderDemo extends React.Component<SliderDemoProps, SliderDemoState> {
  constructor(props: SliderDemoProps) {
    super(props);

    this.state = {
      value: 5
    }
  }
  render() {
    return (
      <div>
        <Slider
          min={0}
          max={10}
          value={this.state.value}
          onChange={value => this.setState({value})}
        />
        <hr></hr>
        <Slider
          min={0}
          max={10}
          value={this.state.value}
          disabled={true}
          onChange={value => this.setState({value})}
        />
      </div>
    );
  }
}
