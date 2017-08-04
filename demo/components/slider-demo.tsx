import * as React from 'react';
import {Slider} from '../../src';
import {SBComponent} from 'stylable-react-component';
import style from './slider-demo.st.css';


export interface SliderDemoProps {
}
export interface SliderDemoState {
  value: number;
}

@SBComponent(style)
export class SliderDemo extends React.Component<SliderDemoProps, SliderDemoState> {
  constructor(props: SliderDemoProps) {
    super(props);

    this.state = {
      value: 50
    }
  }
  render() {
    return (
      <table cellSpacing="24px">
        <thead>
          <tr>
            <th>Default Slider</th>
            <th>Disabled Slider</th>
            <th>Slider with step</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Slider
                value={this.state.value}
                onChange={value => this.setState({ value })}
              />
            </td>
            <td>
              <Slider
                value={this.state.value}
                disabled={true}
                onChange={value => this.setState({ value })}
              />
            </td>
            <td>
              <Slider
                value={this.state.value}
                step={10}
                onChange={value => this.setState({ value })}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
