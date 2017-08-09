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

    this.onSliderChange = this.onSliderChange.bind(this);

    this.state = {
      value: 50
    }
  }

  onSliderChange(value: number) {
    this.setState({ value });
  }

  render() {
    const min = 0;
    const max = 100;
    const headerCellStyles = style['table-head-cell'];


    return (
      <table cellSpacing="24px">
        <thead>
          <tr>
            <th className={headerCellStyles}>Default Slider</th>
            <th className={headerCellStyles}>Disabled Slider</th>
            <th className={headerCellStyles}>Slider with step</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Slider
                value={this.state.value}
                min={min}
                max={max}
                onChange={this.onSliderChange}
              />
            </td>
            <td>
              <Slider
                value={this.state.value}
                min={min}
                max={max}
                disabled={true}
                onChange={this.onSliderChange}
              />
            </td>
            <td>
              <Slider
                value={this.state.value}
                min={min}
                max={max}
                step={10}
                onChange={this.onSliderChange}
              />
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th className={headerCellStyles}>Slider with error state</th>
            <th className={headerCellStyles}></th>
            <th className={headerCellStyles}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Slider
                value={this.state.value}
                min={min}
                max={max}
                error={true}
                onChange={this.onSliderChange}
              />
            </td>
            <td>
            </td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
